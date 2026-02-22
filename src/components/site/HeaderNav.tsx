import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/research", label: "Research" },
  { to: "/experience", label: "Experience" },
  { to: "/lab", label: "Lab" },
  { to: "/certifications", label: "Certs" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function HeaderNav({ currentPath }: { currentPath: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="group inline-flex items-center gap-2 rounded-md px-2 py-1"
            activeClassName=""
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-md border border-border/60 bg-card/40 shadow-glow-xs">
              <span className="font-mono text-xs text-muted-foreground">PD</span>
              <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-hero-radial" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-tight">Pranadeep</p>
              <p className="font-mono text-[11px] text-muted-foreground">AI/ML • DS • DA</p>
            </div>
          </NavLink>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="glowOutline" className="hidden sm:inline-flex">
            <a href="/projects">View Work</a>
          </Button>
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            <a href="/resume">Download</a>
          </Button>
          <Button asChild variant="glowOutline" size="icon" className="md:hidden" aria-label="Open menu">
            <a href={currentPath === "/contact" ? "/" : "/contact"}>
              <span className="font-mono text-xs">↗</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
