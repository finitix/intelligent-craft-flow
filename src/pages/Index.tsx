import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import HeroExperience from "@/components/site/HeroExperience";
import SectionReveal from "@/components/site/SectionReveal";
import { useState } from "react";

const Index = () => {
  const [loading, setLoading] = useState(false);

  return (
    <main id="top" className="bg-background text-foreground">
      <h1 className="sr-only">Pranadeep Devasani — AI/ML Engineer</h1>
      <HeroExperience />

      <section className="relative mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              k: "Focus",
              t: "AI → Impact",
              d: "Building intelligent systems that are measurable, deployable, and tied to real-world outcomes.",
            },
            {
              k: "Strength",
              t: "Data Science",
              d: "Statistical thinking, experimentation, and model evaluation—without buzzwords.",
            },
            {
              k: "Clarity",
              t: "Analytics",
              d: "Dashboards, SQL pipelines, and KPI design that drive decisions.",
            },
          ].map((c) => (
            <div key={c.k} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <p className="font-mono text-xs text-muted-foreground">{c.k}</p>
              <h2 className="mt-2 font-display text-xl font-semibold">{c.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
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
              <div className="mt-6 rounded-lg border border-border/60 bg-background/35 p-4">
                <p className="font-mono text-xs text-muted-foreground">Education</p>
                <p className="mt-2 font-display text-base font-semibold">Master’s in Data Science</p>
                <p className="mt-1 text-sm text-muted-foreground">B.Tech in Artificial Intelligence & Machine Learning</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="skills" eyebrow="Expertise" title="Skills">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "AI / ML",
                items: ["Model development", "Feature engineering", "MLOps concepts", "Model evaluation"],
              },
              {
                name: "Data Science",
                items: ["Statistical modeling", "Predictive analytics", "Experiment design", "NLP / CV basics"],
              },
              {
                name: "Data Analytics",
                items: ["Dashboarding", "SQL pipelines", "Business insights", "KPI modeling"],
              },
            ].map((d) => (
              <div key={d.name} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
                <p className="font-display text-lg font-semibold">{d.name}</p>
                <ul className="mt-4 space-y-2">
                  {d.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-md border border-border/60 bg-background/30 px-3 py-2 text-sm text-muted-foreground"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="projects" eyebrow="Projects" title="Flagship work">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "AI prediction system",
                meta: "ML • deployment-ready",
                desc: "Measurable outcomes, careful evaluation, and robust pipelines.",
              },
              {
                title: "Data science research project",
                meta: "research • reproducible",
                desc: "Methodical experimentation, ablations, and clear reporting.",
              },
              {
                title: "Analytics dashboard",
                meta: "SQL • KPIs",
                desc: "From raw data to decision-ready metrics and insight narratives.",
              },
            ].map((p) => (
              <article key={p.title} className="group rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
                <p className="font-mono text-xs text-muted-foreground">{p.meta}</p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-6">
                  <Button variant="glowOutline" className="w-full">
                    Open case study
                  </Button>
                </div>
                <div className="pointer-events-none mt-6 h-px w-full bg-gradient-data opacity-0 transition-opacity duration-300 group-hover:opacity-25" />
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="research" eyebrow="Research" title="Publications">
          <div className="space-y-4">
            {[
              { title: "Research publication title", venue: "Journal / Conference • Year" },
              { title: "Applied ML study", venue: "Preprint • Year" },
            ].map((p) => (
              <article key={p.title} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
                <p className="font-mono text-xs text-muted-foreground">{p.venue}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">Expandable summaries and citations in v2.</p>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="experience" eyebrow="Experience" title="Timeline">
          <div className="space-y-4">
            {[
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
            ].map((r, idx) => (
              <article key={idx} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                  <p className="font-mono text-xs text-muted-foreground">{r.company}</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.impact}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border/60 bg-background/30 px-2 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="certifications" eyebrow="Certifications" title="Achievements">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Certification name", org: "Issuer", year: "2025" },
              { name: "Certification name", org: "Issuer", year: "2024" },
              { name: "Achievement", org: "Organization", year: "2023" },
            ].map((c) => (
              <article key={c.name} className="group rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.org}</p>
                  </div>
                  <span className="rounded-md border border-border/60 bg-background/30 px-2 py-1 font-mono text-xs text-muted-foreground">
                    {c.year}
                  </span>
                </div>
                <div className="mt-6 h-px w-full bg-gradient-data opacity-0 transition-opacity duration-300 group-hover:opacity-25" />
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="resume" eyebrow="Resume" title="Recruiter-friendly view">
          <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
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
          </div>
        </SectionReveal>

        <SectionReveal id="contact" eyebrow="Contact" title="Let’s collaborate">
          <div className="max-w-2xl rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                window.setTimeout(() => {
                  setLoading(false);
                  toast({
                    title: "Message queued",
                    description: "Thanks — I’ll get back to you soon.",
                  });
                }, 550);
              }}
            >
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">Name</label>
                <Input required placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">Email</label>
                <Input required type="email" placeholder="you@domain.com" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">Message</label>
                <Textarea required placeholder="Tell me what you’re building…" className="min-h-32" />
              </div>
              <div className="pt-2">
                <Button variant="hero" disabled={loading} className="w-full">
                  {loading ? "Sending…" : "Send"}
                </Button>
              </div>
            </form>
          </div>
        </SectionReveal>

        <div className="pb-20" />
      </div>
    </main>
  );
};

export default Index;
