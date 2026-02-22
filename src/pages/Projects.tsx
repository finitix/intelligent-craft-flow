import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AI prediction system",
    meta: "ML • deployment-ready",
    desc: "A flagship system focused on measurable outcomes, careful evaluation, and robust pipelines.",
  },
  {
    title: "Data science research project",
    meta: "research • reproducible",
    desc: "Methodical experimentation, ablations, and clear reporting of limitations and insights.",
  },
  {
    title: "Analytics dashboard",
    meta: "SQL • KPIs",
    desc: "From raw data to decision-ready metrics, storytelling, and actionable recommendations.",
  },
];

export default function Projects() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">Projects</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Flagship work</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Each card will expand into a full-screen case study (problem → dataset → approach → results → impact).
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} className="group rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <p className="font-mono text-xs text-muted-foreground">{p.meta}</p>
            <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">{p.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            <div className="mt-6">
              <Button variant="glowOutline" className="w-full">Open case study</Button>
            </div>
            <div className="pointer-events-none mt-6 h-px w-full bg-gradient-data opacity-0 transition-opacity duration-300 group-hover:opacity-25" />
          </article>
        ))}
      </section>
    </main>
  );
}
