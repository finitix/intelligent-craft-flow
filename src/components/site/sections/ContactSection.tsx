import { useMemo, useState } from "react";
import { z } from "zod";
import SectionReveal from "@/components/site/SectionReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactDetails = useMemo(
    () => [
      { k: "Phone", v: "+91 9100711715", href: "tel:+919100711715" },
      { k: "Email", v: "devasanipranadeep@gmail.com", href: "mailto:devasanipranadeep@gmail.com" },
    ],
    [],
  );

  return (
    <SectionReveal id="contact" eyebrow="Contact" title="Let’s collaborate">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md md:col-span-1">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Reach out for internships, full-time roles, or collaborations in AI/ML, data science, and analytics.
          </p>
          <dl className="mt-6 space-y-4">
            {contactDetails.map((c) => (
              <div key={c.k} className="rounded-lg border border-border/60 bg-background/30 p-4">
                <dt className="font-mono text-xs text-muted-foreground">{c.k}</dt>
                <dd className="mt-2">
                  <a className="text-sm text-foreground hover:underline" href={c.href}>
                    {c.v}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="max-w-2xl rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md md:col-span-2">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const parsed = contactSchema.safeParse({ name, email, message });
              if (!parsed.success) {
                toast({
                  title: "Check your inputs",
                  description: parsed.error.issues[0]?.message ?? "Please fill all fields correctly.",
                });
                return;
              }

              setLoading(true);
              const { error } = await supabase.from("contact_submissions").insert({
                name: parsed.data.name,
                email: parsed.data.email,
                message: parsed.data.message,
                user_agent: navigator.userAgent,
                page_url: window.location.href,
              });
              setLoading(false);

              if (error) {
                console.error(error);
                toast({ title: "Couldn’t send", description: "Please try again in a moment." });
                return;
              }

              setName("");
              setEmail("");
              setMessage("");
              toast({ title: "Message sent", description: "Thanks — I’ll get back to you soon." });
            }}
          >
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@domain.com" />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Tell me what you’re building…"
                className="min-h-32"
              />
            </div>
            <div className="pt-2">
              <Button variant="hero" disabled={loading} className="w-full">
                {loading ? "Sending…" : "Send"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SectionReveal>
  );
}
