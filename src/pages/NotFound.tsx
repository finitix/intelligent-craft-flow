import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16">
        <p className="font-mono text-sm text-muted-foreground">404 • route: {location.pathname}</p>
        <h1 className="mt-4 text-balance text-center font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          This model failed to converge.
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-center text-base text-muted-foreground sm:text-lg">
          The page you requested doesn’t exist in this hypothesis space.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="hero" size="lg">
            <a href="/">Return to Home</a>
          </Button>
          <Button asChild variant="glowOutline" size="lg">
            <a href="/projects">Explore Projects</a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
