import { useEffect, useMemo, useState } from "react";
import SectionReveal from "@/components/site/SectionReveal";
import { supabase } from "@/integrations/supabase/client";

type SkillRow = {
  id: string;
  domain: string;
  name: string;
  level: string | null;
};

export default function SkillsSection() {
  const [items, setItems] = useState<SkillRow[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("id,domain,name,level")
        .eq("published", true)
        .order("domain", { ascending: true })
        .order("sort_order", { ascending: true });

      if (!alive) return;
      if (error) {
        console.error(error);
        setItems([]);
      } else {
        setItems((data ?? []) as SkillRow[]);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, SkillRow[]>();
    for (const s of items) {
      map.set(s.domain, [...(map.get(s.domain) ?? []), s]);
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <SectionReveal id="skills" eyebrow="Expertise" title="Skills">
      {grouped.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <p className="text-sm text-muted-foreground">Skills will appear here once added in <span className="font-mono">/admin</span>.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {grouped.map(([domain, list]) => (
            <div key={domain} className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <p className="font-display text-lg font-semibold">{domain}</p>
              <ul className="mt-4 space-y-2">
                {list.map((i) => (
                  <li
                    key={i.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-background/30 px-3 py-2 text-sm"
                  >
                    <span className="text-foreground">{i.name}</span>
                    {i.level && <span className="font-mono text-xs text-muted-foreground">{i.level}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
