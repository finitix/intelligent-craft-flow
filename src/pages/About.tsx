export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Human + Engineer</h1>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <div className="aspect-[4/5] w-full rounded-lg border border-border/60 bg-background/40 shadow-glow-xs" />
          <p className="mt-4 text-sm text-muted-foreground">
            Portrait placeholder — replace with a professional photo when ready.
          </p>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <h2 className="font-display text-xl font-semibold">Why I build</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>AI/ML: I enjoy turning research-grade ideas into systems that can survive reality.</p>
            <p>Data Science: I value statistical rigor, strong baselines, and honest evaluation.</p>
            <p>Analytics: I care about decisions—metrics, narratives, and measurable impact.</p>
          </div>

          <div className="mt-6 rounded-lg border border-border/60 bg-background/35 p-4">
            <p className="font-mono text-xs text-muted-foreground">Education</p>
            <p className="mt-2 font-display text-base font-semibold">Master’s in Data Science</p>
            <p className="mt-1 text-sm text-muted-foreground">Focus: ML systems, experimentation, and applied analytics.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
