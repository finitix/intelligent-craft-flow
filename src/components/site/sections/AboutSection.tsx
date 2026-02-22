import SectionReveal from "@/components/site/SectionReveal";

export default function AboutSection() {
  return (
    <SectionReveal id="about" eyebrow="About" title="Human + Engineer">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <div className="aspect-[4/5] w-full rounded-lg border border-border/60 bg-background/40 shadow-glow-xs" />
          <p className="mt-4 text-sm text-muted-foreground">Professional portrait goes here.</p>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <h3 className="font-display text-xl font-semibold">Why I build</h3>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>AI/ML: turning research-grade ideas into systems that survive reality.</p>
            <p>Data Science: rigorous baselines, honest evaluation, reproducible experimentation.</p>
            <p>Analytics: metrics and narratives that change decisions.</p>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-lg border border-border/60 bg-background/35 p-4">
              <p className="font-mono text-xs text-muted-foreground">Education</p>
              <p className="mt-2 font-display text-base font-semibold">Master’s in Data Science</p>
              <p className="mt-1 text-sm text-muted-foreground">Chandigarh University — 2027</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/35 p-4">
              <p className="font-mono text-xs text-muted-foreground">Education</p>
              <p className="mt-2 font-display text-base font-semibold">B.Tech in Artificial Intelligence & Machine Learning</p>
              <p className="mt-1 text-sm text-muted-foreground">Vaagdevi Engineering College — 2024</p>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
