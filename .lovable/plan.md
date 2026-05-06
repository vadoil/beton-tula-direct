
# Перенос ТулБетон на собственный VPS

Домен: **бетон-тула.рф** (punycode: `xn--h1aagca8acci.xn--p1ai`)
API-поддомен: **api.бетон-тула.рф** (punycode: `api.xn--h1aagca8acci.xn--p1ai`)
Имя проекта на сервере: **tulbeton** → `/var/www/tulbeton`
Supabase project ref: `yrupuuxauttnqowabosf`

---

## Что я создам в репозитории (этот шаг)

### 1. `deploy/nginx/tulbeton-frontend.conf`
nginx-конфиг для фронта:
- `server_name xn--h1aagca8acci.xn--p1ai www.xn--h1aagca8acci.xn--p1ai;`
- `root /var/www/tulbeton/current;`
- SPA fallback (`try_files $uri /index.html`)
- `Cache-Control: public, max-age=31536000, immutable` для `/assets/*`
- `Cache-Control: no-store` для `index.html`
- gzip + brotli (если есть), security headers
- CSP с `connect-src 'self' https://api.xn--h1aagca8acci.xn--p1ai https://*.supabase.co wss://*.supabase.co`
- placeholder `listen 80;` — `certbot` сам добавит 443/SSL

### 2. `deploy/nginx/tulbeton-api.conf`
nginx-прокси на Supabase:
- `server_name api.xn--h1aagca8acci.xn--p1ai;`
- `proxy_pass https://yrupuuxauttnqowabosf.supabase.co;`
- `resolver 1.1.1.1 8.8.8.8 valid=300s;` (динамический резолв)
- проброс заголовков `Host`, `apikey`, `Authorization`, `X-Client-Info`
- WebSocket upgrade для Realtime
- CORS: `Access-Control-Allow-Origin: https://xn--h1aagca8acci.xn--p1ai` + preflight OPTIONS

### 3. `.github/workflows/deploy.yml`
GitHub Actions:
- триггер: `push` в `main`, `workflow_dispatch`
- `concurrency: cancel-in-progress: true`
- шаги: checkout → Node 20 → `npm ci` → `npm run build` (с `VITE_SUPABASE_URL=https://api.xn--h1aagca8acci.xn--p1ai` из секретов) → `rsync dist/` в `releases/release-<ts>-<sha>/` → атомарный `mv -Tf` симлинка `current` → `sudo nginx -t && sudo systemctl reload nginx` → удалить релизы кроме последних 5 → healthcheck `curl https://xn--h1aagca8acci.xn--p1ai/` (5 попыток)
- `DEPLOY_ROOT: /var/www/tulbeton`

### 4. `deploy/README.md`
Пошаговая инструкция (то, что нужно сделать вручную на сервере и в GitHub):
- установка nginx/certbot/rsync/ufw
- создание пользователя `deploy` + sudoers
- генерация SSH-ключа для GHA
- DNS A-записи на оба домена
- копирование nginx-конфигов, активация, certbot для punycode-доменов
- «нулевой» релиз
- список 6 GitHub Secrets (`VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VITE_SUPABASE_URL=https://api.бетон-тула.рф`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`)
- проверки после деплоя, откат, частые проблемы

---

## Что вы делаете руками (после моих файлов)

1. На сервере: установить пакеты, создать `deploy`, дерево каталогов, sudoers, SSH-ключ — по `deploy/README.md`.
2. В DNS-провайдере: A-записи `бетон-тула.рф`, `www.бетон-тула.рф`, `api.бетон-тула.рф` → IP сервера.
3. Скопировать nginx-конфиги на сервер, `sudo nginx -t`, `certbot --nginx` для всех трёх punycode-доменов.
4. Сделать «нулевой» релиз.
5. Добавить 6 GitHub Secrets.
6. `git push` — деплой пойдёт автоматически.

---

## Технические детали

- **Cyrillic-домены**: nginx требует **punycode** в `server_name` и certbot. Везде использую `xn--h1aagca8acci.xn--p1ai`. В `Access-Control-Allow-Origin` тоже punycode.
- **API-прокси через единый origin**: фронт собирается с `VITE_SUPABASE_URL=https://api.бетон-тула.рф`, поэтому `src/integrations/supabase/client.ts` (auto-generated, не трогаем) подхватит этот URL во время сборки. CORS не нужен — same-site, но в api.conf оставлю CORS на всякий случай.
- **Файл `client.ts` не редактирую** — это запрещено и не нужно, всё через env.
- **Edge Functions** (`/functions/v1/chat`) пойдут через тот же api-прокси — `proxy_pass` ловит весь путь.
- **Realtime WebSocket**: в api.conf пробрасываю `Upgrade`/`Connection` заголовки.
- **Атомарный деплой**: `mv -Tf current.new current` атомарен на одной FS, нулевой downtime.
- **Откат за 5 сек**: симлинк `current` переключается на любой из последних 5 релизов.
- **Healthcheck в CI**: если `curl` не вернул 200 — job красный, видно сразу.

После имплементации останется только пройти 6 шагов на сервере + `git push`.
