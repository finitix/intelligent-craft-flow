const papers = [
  {
    title: "Research publication title",
    venue: "Journal / Conference • Year",
    note: "Expandable summaries and citation hover will come in v2.",
  },
  {
    title: "Applied ML study",
    venue: "Preprint • Year",
    note: "Clean academic layout with subtle page-turn micro-interactions.",
  },
];

export default function Research() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">Research</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Publications</h1>
      </header>

      <section className="mt-10 space-y-4">
        {papers.map((p) => (
          <article key={p.title} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <p className="font-mono text-xs text-muted-foreground">{p.venue}</p>
            <h2 className="mt-2 font-display text-xl font-semibold">{p.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{p.note}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
