const domains = [
  {
    name: "AI / ML",
    items: ["Model development", "Feature engineering", "MLOps concepts", "Evaluation"],
  },
  {
    name: "Data Science",
    items: ["Statistical modeling", "Predictive analytics", "Experiment design", "NLP / CV basics"],
  },
  {
    name: "Data Analytics",
    items: ["Dashboarding", "SQL pipelines", "Business insights", "KPI modeling"],
  },
];

export default function Skills() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">Expertise</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Skills as a knowledge graph</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          v1 ships the structure and visual language. Next iteration can add interactive “connected nodes” behavior.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {domains.map((d) => (
          <div key={d.name} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <p className="font-display text-lg font-semibold">{d.name}</p>
            <ul className="mt-4 space-y-2">
              {d.items.map((i) => (
                <li key={i} className="rounded-md border border-border/60 bg-background/30 px-3 py-2 text-sm text-muted-foreground">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
