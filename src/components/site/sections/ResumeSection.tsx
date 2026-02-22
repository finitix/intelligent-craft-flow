import { useEffect, useState } from "react";
import SectionReveal from "@/components/site/SectionReveal";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type ResumeRow = { id: string; public_url: string; file_path: string };

export default function ResumeSection() {
  const [row, setRow] = useState<ResumeRow | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("resume")
        .select("id,public_url,file_path")
        .order("updated_at", { ascending: false })
        .limit(1);

      if (!alive) return;
      if (error) {
        console.error(error);
        setRow(null);
      } else {
        setRow(((data ?? [])[0] as ResumeRow) ?? null);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <SectionReveal id="resume" eyebrow="Resume" title="Recruiter-friendly">
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg font-semibold">Pranadeep Devasani</p>
          <Button asChild variant="hero" disabled={!row?.public_url}>
            <a href={row?.public_url ?? "#"} target="_blank" rel="noreferrer">
              Download Resume
            </a>
          </Button>
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
            <p className="font-mono text-xs text-muted-foreground">Quick links</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Projects on GitHub</li>
              <li>• Resume PDF (latest)</li>
            </ul>
          </div>
        </div>
        {!row && <p className="mt-4 text-sm text-muted-foreground">Resume not uploaded yet — add it in /admin.</p>}
      </div>
    </SectionReveal>
  );
}
