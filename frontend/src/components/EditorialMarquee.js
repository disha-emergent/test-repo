const ITEMS = ["COUNT", "OBSERVE", "REPEAT", "KINETIC", "EPHEMERAL", "ACCUMULATE"];

export default function EditorialMarquee() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      className="marquee-shell relative overflow-hidden border-y border-[var(--line)] py-6 bg-[var(--bg2)]"
      data-testid="editorial-marquee"
    >
      <div className="marquee-track flex w-max items-baseline gap-10 whitespace-nowrap pr-10">
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex items-baseline gap-10" aria-hidden={copy > 0}>
            {ITEMS.map((w, i) => (
              <span key={`${copy}-${w}`} className="flex items-baseline gap-10">
                <span
                  className={
                    i % 2 === 0
                      ? "font-display font-extrabold uppercase tracking-tight text-3xl sm:text-4xl text-[var(--ink)]"
                      : "font-mono-s italic text-2xl sm:text-3xl text-[var(--muted2)]"
                  }
                >
                  {w}
                </span>
                <span className="h-2 w-2 bg-[var(--accent)] self-center" />
              </span>
            ))}
          </div>
        ))}
        {row.length === 0 && null}
      </div>
    </div>
  );
}
