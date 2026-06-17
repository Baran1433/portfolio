const TONE = {

  1: "section-tone-1",

  2: "section-tone-2",

  3: "section-tone-3",

  4: "section-tone-4",

};



export function SectionShell({

  id,

  variant = 1,

  children,

  className = "",

  showTopDivider = true,

  padding = "py-24",

}) {

  return (

    <section

      id={id}

      className={`section-snap section-surface relative overflow-hidden px-6 sm:px-8 ${padding} ${TONE[variant] ?? TONE[1]} ${className}`}

    >

      {showTopDivider && (

        <div className="section-glow-divider pointer-events-none absolute inset-x-0 top-0 z-[1]" aria-hidden />

      )}



      <div

        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent to-black/20"

        aria-hidden

      />



      <div

        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-white/[0.06]"

        aria-hidden

      />



      <div className="relative z-10">{children}</div>

    </section>

  );

}

