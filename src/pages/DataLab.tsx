export default function DataLab() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">Data Visualization Lab</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Interactive graphs</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Next: add animated Recharts experiments, tooltips, and “insight stories” with scroll-based loading.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <div className="h-56 rounded-lg border border-border/60 bg-background/35 shadow-glow-xs" />
          <p className="mt-4 font-mono text-xs text-muted-foreground">Chart placeholder</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <div className="h-56 rounded-lg border border-border/60 bg-background/35 shadow-glow-xs" />
          <p className="mt-4 font-mono text-xs text-muted-foreground">Chart placeholder</p>
        </div>
      </section>
    </main>
  );
}
