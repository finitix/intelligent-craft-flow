import { useEffect, useState } from "react";
import SectionReveal from "@/components/site/SectionReveal";
import { supabase } from "@/integrations/supabase/client";

type CertRow = {
  id: string;
  title: string;
  issuer: string | null;
  year: string | null;
  url: string | null;
};

export default function CertificationsSection() {
  const [items, setItems] = useState<CertRow[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("certifications")
        .select("id,title,issuer,year,url")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!alive) return;
      if (error) {
        console.error(error);
        setItems([]);
      } else {
        setItems((data ?? []) as CertRow[]);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <SectionReveal id="certifications" eyebrow="Credentials" title="Achievements & certificates">
      {items.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <p className="text-sm text-muted-foreground">Add achievements and certificates in <span className="font-mono">/admin</span>.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <article key={c.id} className="group rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.issuer ?? ""}</p>
                </div>
                {c.year && (
                  <span className="rounded-md border border-border/60 bg-background/30 px-2 py-1 font-mono text-xs text-muted-foreground">
                    {c.year}
                  </span>
                )}
              </div>
              {c.url && (
                <a className="mt-4 inline-block font-mono text-xs text-muted-foreground hover:underline" href={c.url} target="_blank" rel="noreferrer">
                  View
                </a>
              )}
              <div className="mt-6 h-px w-full bg-gradient-data opacity-0 transition-opacity duration-300 group-hover:opacity-25" />
            </article>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
