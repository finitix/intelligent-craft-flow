import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function HeaderNav({ currentPath }: { currentPath: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.6 });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/55 backdrop-blur-xl">
      {/* scroll progress */}
      {!reduceMotion && currentPath === "/" && (
        <motion.div
          className="h-[2px] origin-left bg-gradient-data"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      )}

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <a href="#top" className="group inline-flex items-center gap-2 rounded-md px-2 py-1">
            <span className="relative grid h-8 w-8 place-items-center rounded-md border border-border/60 bg-card/40 shadow-glow-xs">
              <span className="font-mono text-xs text-muted-foreground">PD</span>
              <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-hero-radial" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-tight">Pranadeep</p>
              <p className="font-mono text-[11px] text-muted-foreground">AI/ML • DS • DA</p>
            </div>
          </a>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="glowOutline" className="hidden sm:inline-flex">
            <a href="#projects">View Work</a>
          </Button>
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            <a href="#contact">Contact</a>
          </Button>
          <Button asChild variant="glowOutline" size="icon" className="md:hidden" aria-label="Jump to contact">
            <a href="#contact">
              <span className="font-mono text-xs">↗</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

