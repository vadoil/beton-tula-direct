# Деплой ТулБетон на VPS

- **Домен фронта:** бетон-тула.рф (punycode: `xn----8sbbq5akg5adk.xn--p1ai`)
- **Домен API:** api.бетон-тула.рф (punycode: `api.xn----8sbbq5akg5adk.xn--p1ai`)
- **Имя проекта на сервере:** `tulbeton` → `/var/www/tulbeton`
- **Backend (Lovable Cloud):** `yrupuuxauttnqowabosf.supabase.co`

Везде в nginx и certbot **используем punycode** — кириллицу nginx не понимает.

---

## 1. Подготовка сервера (один раз)

Ubuntu 22.04+/Debian 12+, открыты порты 80/443.

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx rsync ufw idn2
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## 2. Пользователь deploy + дерево каталогов

```bash
sudo useradd -m -s /bin/bash deploy
sudo mkdir -p /var/www/tulbeton/releases
sudo chown -R deploy:deploy /var/www/tulbeton

# sudoers — deploy может тестировать и перезагружать nginx без пароля
echo "deploy ALL=(ALL) NOPASSWD: /usr/sbin/nginx -t, /bin/systemctl reload nginx" \
  | sudo tee /etc/sudoers.d/deploy
sudo chmod 440 /etc/sudoers.d/deploy
```

## 3. SSH-ключ для GitHub Actions

```bash
sudo -iu deploy
ssh-keygen -t ed25519 -f ~/.ssh/gha_deploy -N ""
cat ~/.ssh/gha_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Скопируйте приватный ключ — он пойдёт в GitHub Secret VPS_SSH_KEY
cat ~/.ssh/gha_deploy
exit
```

## 4. DNS

У регистратора создайте **A-записи** на IP сервера:

| Имя | Тип | Значение |
|---|---|---|
| `бетон-тула.рф` (`@`) | A | `IP_СЕРВЕРА` |
| `www.бетон-тула.рф` | A | `IP_СЕРВЕРА` |
| `api.бетон-тула.рф` | A | `IP_СЕРВЕРА` |

Дождитесь распространения (`dig +short xn----8sbbq5akg5adk.xn--p1ai` должен вернуть ваш IP).

## 5. nginx-конфиги

Скопируйте из репозитория:

```bash
sudo cp deploy/nginx/tulbeton-frontend.conf /etc/nginx/sites-available/
sudo cp deploy/nginx/tulbeton-api.conf      /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/tulbeton-frontend.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/tulbeton-api.conf      /etc/nginx/sites-enabled/
sudo nginx -t
```

## 6. «Нулевой» релиз (чтобы nginx не упал на отсутствующем `current`)

```bash
sudo -u deploy mkdir -p /var/www/tulbeton/releases/init
echo "<h1>Deploying…</h1>" | sudo -u deploy tee /var/www/tulbeton/releases/init/index.html
sudo -u deploy ln -sfn releases/init /var/www/tulbeton/current
sudo systemctl reload nginx
```

## 7. SSL через certbot (только punycode!)

```bash
sudo certbot --nginx \
  -d xn----8sbbq5akg5adk.xn--p1ai \
  -d www.xn----8sbbq5akg5adk.xn--p1ai \
  -d api.xn----8sbbq5akg5adk.xn--p1ai
```

Certbot допишет блоки `listen 443 ssl` и пути к сертификатам в оба конфига.
Автообновление работает через системный таймер `certbot.timer`.

## 8. GitHub Secrets

В репозитории → **Settings → Secrets and variables → Actions** добавьте:

| Secret | Значение |
|---|---|
| `VPS_HOST` | IP сервера |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | приватный ключ из шага 3 целиком, включая `-----BEGIN/END-----` |
| `VITE_SUPABASE_URL` | `https://api.xn----8sbbq5akg5adk.xn--p1ai` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | значение из `.env` Lovable |
| `VITE_SUPABASE_PROJECT_ID` | `yrupuuxauttnqowabosf` |

> Так фронт собирается с API-URL = ваш собственный домен. Запросы к БД, авторизации, Realtime и Edge Functions пойдут через `api.бетон-тула.рф` и проксируются в Lovable Cloud.
>
> Если хотите оставить прямые запросы к `*.supabase.co`, поставьте `VITE_SUPABASE_URL=https://yrupuuxauttnqowabosf.supabase.co` — тогда api-конфиг и DNS-запись `api.*` не нужны.

## 9. Деплой

```bash
git push origin main
```

GitHub Actions:
1. соберёт `npm run build` с вашими env;
2. зальёт `dist/` в `/var/www/tulbeton/releases/release-<ts>-<sha>/`;
3. атомарно переключит симлинк `current`;
4. перезагрузит nginx;
5. удалит старые релизы, оставив последние 5;
6. сделает healthcheck `https://бетон-тула.рф/`.

## 10. Откат

```bash
ssh deploy@VPS_HOST
cd /var/www/tulbeton
ls -1t releases/
ln -sfn releases/release-XXXX current.new && mv -Tf current.new current
sudo systemctl reload nginx
```

## 11. Проверки

```bash
# Фронт
curl -I https://xn----8sbbq5akg5adk.xn--p1ai/
curl -I https://xn----8sbbq5akg5adk.xn--p1ai/assets/index-*.js   # max-age=31536000, immutable

# API-прокси
curl -i "https://api.xn----8sbbq5akg5adk.xn--p1ai/rest/v1/" \
  -H "apikey: $VITE_SUPABASE_PUBLISHABLE_KEY"

# Edge Function (chat)
curl -i "https://api.xn----8sbbq5akg5adk.xn--p1ai/functions/v1/chat" \
  -X POST -H "Content-Type: application/json" \
  -H "apikey: $VITE_SUPABASE_PUBLISHABLE_KEY" \
  -H "Authorization: Bearer $VITE_SUPABASE_PUBLISHABLE_KEY" \
  -d '{"messages":[{"role":"user","content":"ping"}]}'
```

В DevTools → Network запросы должны идти на `api.бетон-тула.рф`, без CORS-ошибок.

## 12. Частые проблемы

| Симптом | Решение |
|---|---|
| `502 Bad Gateway` на api | проверьте `resolver` в `tulbeton-api.conf`, перезапустите nginx |
| Белый экран после деплоя | hard reload (Ctrl+F5). Должно лечиться `Cache-Control: no-store` для `index.html` |
| CORS-ошибка | домен фронта не совпадает с `$cors_origin` в api.conf |
| `nginx: [emerg] duplicate listen options for [::]:443` | у соседнего сайта уже `listen 443 ssl http2` — уберите `http2` либо у нас, либо у них |
| GHA: `Permission denied (publickey)` | публичный ключ не в `authorized_keys` пользователя `deploy` |
| certbot ругается на кириллический домен | передавайте ему **punycode**: `xn----8sbbq5akg5adk.xn--p1ai` |
