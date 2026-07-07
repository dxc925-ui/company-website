interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionTitleProps) {
  return (
    <div
      className={`mb-12 ${
        align === "center" ? "text-center mx-auto" : "text-left"
      }`}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-px bg-street-neon" />
          <span className="font-mono text-xs tracking-[0.3em] text-street-neonDark uppercase">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-clamp-xl tracking-wide leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-street-muted max-w-xl text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
