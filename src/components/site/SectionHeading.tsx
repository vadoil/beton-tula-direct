import { ReactNode } from "react";

interface Props {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}

export const SectionHeading = ({ label, title, description, align = "left", invert }: Props) => (
  <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    {label && <span className="section-label">{label}</span>}
    <h2 className={`heading-lg mt-4 text-balance ${invert ? "text-white" : "text-foreground"}`}>{title}</h2>
    {description && (
      <p className={`mt-5 text-base sm:text-lg leading-relaxed ${invert ? "text-white/70" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
  </div>
);
