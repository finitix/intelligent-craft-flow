import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function NeuralBackdrop() {
  const reduceMotion = useReducedMotion();

  const { points, links } = useMemo(() => {
    const rand = mulberry32(42);
    const pts = Array.from({ length: 34 }).map(() => ({
      x: rand() * 100,
      y: rand() * 100,
      r: 0.8 + rand() * 1.6,
      a: 0.35 + rand() * 0.45,
    }));

    const lks: Array<{ a: number; b: number; o: number }> = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 22 && lks.length < 90) lks.push({ a: i, b: j, o: 0.18 + rand() * 0.18 });
      }
    }

    return { points: pts, links: lks };
  }, []);

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-hero-grid" />
      <div className="absolute inset-0 bg-hero-radial" />

      {/* scanline */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-data blur-2xl opacity-15 animate-scanline" />
        </div>
      )}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="dataGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="55%" stopColor="hsl(var(--data-purple))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* links */}
        {links.map((l, idx) => {
          const a = points[l.a];
          const b = points[l.b];
          return (
            <line
              key={idx}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#dataGradient)"
              strokeOpacity={l.o}
              strokeWidth={0.12}
            />
          );
        })}

        {/* nodes */}
        {points.map((p, idx) => (
          <circle key={idx} cx={p.x} cy={p.y} r={p.r} fill="url(#dataGradient)" opacity={p.a} />
        ))}
      </svg>

      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {points.slice(0, 18).map((p, i) => (
          <div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent/40 shadow-glow-xs"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
              animation: reduceMotion ? undefined : `float-slow ${7 + (i % 5)}s ease-in-out ${i * 0.25}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-background/35" />
    </div>
  );
}
