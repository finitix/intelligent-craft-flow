import HeroExperience from "@/components/site/HeroExperience";

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <h1 className="sr-only">Pranadeep Devasani — AI/ML Engineer</h1>
      <HeroExperience />

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <p className="font-mono text-xs text-muted-foreground">Focus</p>
            <h2 className="mt-2 font-display text-xl font-semibold">AI → Impact</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Building intelligent systems that are measurable, deployable, and tied to real-world outcomes.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <p className="font-mono text-xs text-muted-foreground">Strength</p>
            <h2 className="mt-2 font-display text-xl font-semibold">Data Science</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Statistical thinking, experimentation, and model evaluation—without buzzwords.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <p className="font-mono text-xs text-muted-foreground">Clarity</p>
            <h2 className="mt-2 font-display text-xl font-semibold">Analytics</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Dashboards, SQL pipelines, and KPI design that drive decisions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
