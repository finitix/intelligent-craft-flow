import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header>
        <p className="font-mono text-xs text-muted-foreground">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Let’s build intelligent systems together.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Minimal, professional collaboration form. (v1 uses local toast; we can wire this to email via Cloud later.)
        </p>
      </header>

      <section className="mt-10 max-w-2xl rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            window.setTimeout(() => {
              setLoading(false);
              toast({
                title: "Message queued",
                description: "Thanks — I’ll get back to you soon.",
              });
            }, 550);
          }}
        >
          <div className="space-y-2">
            <label className="font-mono text-xs text-muted-foreground">Name</label>
            <Input required placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs text-muted-foreground">Email</label>
            <Input required type="email" placeholder="you@domain.com" />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs text-muted-foreground">Message</label>
            <Textarea required placeholder="Tell me what you’re building…" className="min-h-32" />
          </div>
          <div className="pt-2">
            <Button variant="hero" disabled={loading} className="w-full">
              {loading ? "Sending…" : "Send"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
