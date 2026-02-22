import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import NeuralBackdrop from "@/components/site/NeuralBackdrop";
import { Button } from "@/components/ui/button";

const roles = ["AI/ML Engineer", "Data Scientist", "Data Analyst"] as const;

function useRotatingText(items: readonly string[], intervalMs = 2200) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, intervalMs, reduceMotion]);

  return items[index];
}

function useMouseParallax() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [reduceMotion]);

  return ref;
}

export default function HeroExperience() {
  const role = useRotatingText(roles);
  const reduceMotion = useReducedMotion();
  const parallaxRef = useMouseParallax();

  const nameChars = useMemo(() => "Pranadeep Devasani".split(""), []);

  return (
    <section
      ref={parallaxRef}
      className="relative min-h-[92vh] overflow-hidden border-b border-border/60"
      style={{
        // subtle parallax depth via CSS vars
        transform: "translateZ(0)",
      }}
    >
      <NeuralBackdrop />

      {/* Parallax sheen layer (signature moment) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: "var(--gradient-sheen)",
          transform: reduceMotion
            ? undefined
            : "translate3d(calc((var(--mx, 0.5) - 0.5) * -18px), calc((var(--my, 0.5) - 0.5) * -12px), 0)",
          transition: "transform 120ms linear",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-center px-6 pb-20 pt-16 sm:pt-20">
        <div className="rounded-full border border-border/60 bg-card/30 px-4 py-2 backdrop-blur-md shadow-glow-xs">
          <p className="font-mono text-xs text-muted-foreground">Master’s in Data Science • B.Tech in AI & ML</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <h2 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
            <span className="block text-gradient-data">{nameChars.map((c, i) => (
              <motion.span
                key={`${c}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : i * 0.035,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}</span>
          </h2>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="font-mono text-sm text-muted-foreground">Role:</p>
            <motion.p
              key={role}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-lg text-foreground"
            >
              {role}
            </motion.p>
          </div>

          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Transforming data into intelligent systems.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild variant="glowOutline" size="lg">
              <a href="#resume">Download Resume</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 w-full"
        >
          <div className="grid gap-3 rounded-xl border border-border/60 bg-card/30 p-4 backdrop-blur-md sm:grid-cols-4">
            {["AI", "Data Science", "Analytics", "Impact"].map((s, i) => (
              <div key={s} className="relative overflow-hidden rounded-lg border border-border/60 bg-background/30 p-4">
                <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-display text-base font-semibold">{s}</p>
                <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-gradient-data opacity-10 blur-xl" />
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">Scroll to explore • everything moves with intent</p>
        </motion.div>
      </div>
    </section>
  );
}
