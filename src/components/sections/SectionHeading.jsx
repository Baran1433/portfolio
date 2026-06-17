export function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text-main)] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-[var(--text-muted)]">{subtitle}</p>
      )}
    </div>
  );
}
