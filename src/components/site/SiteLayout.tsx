import { Outlet, useLocation } from "react-router-dom";
import HeaderNav from "@/components/site/HeaderNav";

export default function SiteLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-foreground focus:shadow-glow-xs"
      >
        Skip to content
      </a>

      <HeaderNav currentPath={location.pathname} />
      <div id="content">
        <Outlet />
      </div>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pranadeep Devasani — Building intelligent, data-driven systems.
          </p>
          <p className="font-mono text-xs text-muted-foreground">v1 • crafted with purpose</p>
        </div>
      </footer>
    </div>
  );
}
