const certs = [
  { name: "Certification name", org: "Issuer", year: "2025" },
  { name: "Certification name", org: "Issuer", year: "2024" },
  { name: "Achievement", org: "Organization", year: "2023" },
];

export default function Certifications() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">Certifications</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Achievements</h1>
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c) => (
          <article key={c.name} className="group rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold">{c.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.org}</p>
              </div>
              <span className="rounded-md border border-border/60 bg-background/30 px-2 py-1 font-mono text-xs text-muted-foreground">
                {c.year}
              </span>
            </div>
            <div className="mt-6 h-px w-full bg-gradient-data opacity-0 transition-opacity duration-300 group-hover:opacity-25" />
          </article>
        ))}
      </section>
    </main>
  );
}
