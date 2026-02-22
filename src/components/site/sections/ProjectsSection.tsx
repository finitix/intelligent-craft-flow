import { useEffect, useState } from "react";
import SectionReveal from "@/components/site/SectionReveal";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type ProjectRow = {
  id: string;
  title: string;
  meta: string | null;
  description: string | null;
  github_url: string | null;
};

export default function ProjectsSection() {
  const [items, setItems] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,meta,description,github_url")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!alive) return;
      if (error) {
        console.error(error);
        setItems([]);
      } else {
        setItems((data ?? []) as ProjectRow[]);
      }
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  const hasProjects = items.length > 0;


  return (
    <SectionReveal id="projects" eyebrow="Projects" title="Flagship work">
      {!hasProjects && !loading && (
        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <p className="text-sm text-muted-foreground">No projects yet — add them in <span className="font-mono">/admin</span>.</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {loading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <div className="h-3 w-24 rounded bg-muted/40" />
              <div className="mt-4 h-6 w-2/3 rounded bg-muted/40" />
              <div className="mt-4 h-3 w-full rounded bg-muted/40" />
              <div className="mt-2 h-3 w-5/6 rounded bg-muted/40" />
              <div className="mt-6 h-10 w-full rounded bg-muted/40" />
            </div>
          ))}

        {!loading &&
          items.map((p) => (
            <article key={p.id} className="group rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <p className="font-mono text-xs text-muted-foreground">{p.meta ?? "Project"}</p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description ?? ""}</p>
              <div className="mt-6">
                <Button asChild variant="glowOutline" className="w-full" disabled={!p.github_url}>
                  <a href={p.github_url ?? "#"} target="_blank" rel="noreferrer">
                    {p.github_url ? "View on GitHub" : "GitHub link missing"}
                  </a>
                </Button>
              </div>
              <div className="pointer-events-none mt-6 h-px w-full bg-gradient-data opacity-0 transition-opacity duration-300 group-hover:opacity-25" />
            </article>
          ))}
      </div>
    </SectionReveal>
  );
}
