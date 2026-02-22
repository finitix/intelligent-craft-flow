import { Button } from "@/components/ui/button";

export default function Resume() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">Resume</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Recruiter-friendly view</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          v1 includes a clean reading layout; next we can add filters (AI / DS / DA) and a real downloadable PDF.
        </p>
      </header>

      <section className="mt-10 rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg font-semibold">Pranadeep Devasani</p>
          <Button variant="hero">Download Resume</Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-background/30 p-4">
            <p className="font-mono text-xs text-muted-foreground">Summary</p>
            <p className="mt-2 text-sm text-muted-foreground">
              AI/ML Engineer with strong foundations in Data Science and Analytics, focused on building intelligent,
              data-driven systems that create real-world impact.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/30 p-4">
            <p className="font-mono text-xs text-muted-foreground">Core areas</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Model development & evaluation</li>
              <li>• Predictive analytics & experimentation</li>
              <li>• SQL pipelines & KPI modeling</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
