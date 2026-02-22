const roles = [
  {
    title: "Role title",
    company: "Company • Location",
    impact: "Quantified impact goes here (e.g., +12% precision, -30% latency).",
    stack: ["Python", "SQL", "ML", "Dashboards"],
  },
  {
    title: "Role title",
    company: "Company • Location",
    impact: "Responsibilities and technologies with measurable outcomes.",
    stack: ["Modeling", "ETL", "Experimentation"],
  },
];

export default function Experience() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">Experience</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Timeline</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          v2 can animate the timeline drawing as you scroll and expand roles on click.
        </p>
      </header>

      <section className="mt-10 space-y-4">
        {roles.map((r, idx) => (
          <article key={idx} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="font-display text-xl font-semibold">{r.title}</h2>
              <p className="font-mono text-xs text-muted-foreground">{r.company}</p>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{r.impact}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.stack.map((s) => (
                <span key={s} className="rounded-md border border-border/60 bg-background/30 px-2 py-1 font-mono text-xs text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
