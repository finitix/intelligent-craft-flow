import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

type ProjectRow = { id: string; title: string; meta: string | null; description: string | null; github_url: string | null; published: boolean; sort_order: number };
type SkillRow = { id: string; domain: string; name: string; level: string | null; published: boolean; sort_order: number };
type CertRow = { id: string; title: string; issuer: string | null; year: string | null; url: string | null; published: boolean; sort_order: number };
type ContactRow = { id: string; name: string; email: string; message: string; created_at: string };

function AdminShell({ children, onSignOut }: { children: React.ReactNode; onSignOut: () => void }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs text-muted-foreground">Admin</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Manage portfolio content</h1>
        </div>
        <Button variant="glowOutline" onClick={onSignOut}>Sign out</Button>
      </header>
      <div className="mt-8">{children}</div>
    </main>
  );
}

export default function Admin() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // auth state
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionChecked(true);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  // admin check
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!session?.user) {
        setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase.rpc("is_admin");
      if (!alive) return;
      if (error) {
        console.error(error);
        setIsAdmin(false);
      } else {
        setIsAdmin(Boolean(data));
      }
    })();

    return () => {
      alive = false;
    };
  }, [session?.user?.id]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // data
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [certs, setCerts] = useState<CertRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);

  const refreshAll = async () => {
    if (!isAdmin) return;

    const [p, s, c, cs] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
      supabase.from("skills").select("*").order("domain", { ascending: true }).order("sort_order", { ascending: true }),
      supabase.from("certifications").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("id,name,email,message,created_at").order("created_at", { ascending: false }).limit(200),
    ]);

    if (p.error) console.error(p.error);
    if (s.error) console.error(s.error);
    if (c.error) console.error(c.error);
    if (cs.error) console.error(cs.error);

    setProjects((p.data ?? []) as ProjectRow[]);
    setSkills((s.data ?? []) as SkillRow[]);
    setCerts((c.data ?? []) as CertRow[]);
    setContacts((cs.data ?? []) as ContactRow[]);
  };

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const bootstrapAdmin = async () => {
    if (!session?.user) return;
    const { error } = await supabase.from("user_roles").insert({ user_id: session.user.id, role: "admin" });
    if (error) {
      console.error(error);
      toast({ title: "Bootstrap failed", description: error.message });
      return;
    }
    toast({ title: "Admin enabled", description: "Reloading admin permissions…" });
    const { data } = await supabase.rpc("is_admin");
    setIsAdmin(Boolean(data));
  };

  const upsertResume = async (file: File) => {
    if (!session?.user) return;
    const fileName = `resume_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const upload = await supabase.storage.from("resume").upload(fileName, file, { upsert: true });
    if (upload.error) {
      console.error(upload.error);
      toast({ title: "Upload failed", description: upload.error.message });
      return;
    }

    const { data: pub } = supabase.storage.from("resume").getPublicUrl(fileName);
    const publicUrl = pub.publicUrl;

    const existing = await supabase.from("resume").select("id").order("updated_at", { ascending: false }).limit(1);
    const existingId = (existing.data?.[0] as { id: string } | undefined)?.id;

    const op = existingId
      ? supabase.from("resume").update({ file_path: fileName, public_url: publicUrl }).eq("id", existingId)
      : supabase.from("resume").insert({ file_path: fileName, public_url: publicUrl });

    const res = await op;
    if (res.error) {
      console.error(res.error);
      toast({ title: "Resume save failed", description: res.error.message });
      return;
    }

    toast({ title: "Resume updated", description: "Public download button is now live." });
  };

  // forms
  const [newProject, setNewProject] = useState({ title: "", meta: "", description: "", github_url: "" });
  const [newSkill, setNewSkill] = useState({ domain: "AI / ML", name: "", level: "" });
  const [newCert, setNewCert] = useState({ title: "", issuer: "", year: "", url: "" });

  const canRender = sessionChecked;

  if (!canRender) {
    return <main className="mx-auto max-w-6xl px-6 py-16"><p className="text-sm text-muted-foreground">Loading…</p></main>;
  }

  if (!session?.user) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <header>
          <p className="font-mono text-xs text-muted-foreground">Admin</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-4 text-sm text-muted-foreground">Use email/password. First admin can be bootstrapped after login.</p>
        </header>

        <section className="mt-10 rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setAuthLoading(true);
              const { error } = await supabase.auth.signInWithPassword({ email, password });
              setAuthLoading(false);
              if (error) toast({ title: "Sign-in failed", description: error.message });
            }}
          >
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground">Password</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={authLoading}>
              {authLoading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-border/60 bg-background/30 p-4">
            <p className="font-mono text-xs text-muted-foreground">No account?</p>
            <p className="mt-2 text-sm text-muted-foreground">Create one, then come back and sign in.</p>
            <Button
              className="mt-3 w-full"
              variant="glowOutline"
              onClick={async () => {
                setAuthLoading(true);
                const { error } = await supabase.auth.signUp({ email, password });
                setAuthLoading(false);
                if (error) toast({ title: "Sign-up failed", description: error.message });
                else toast({ title: "Check your email", description: "Confirm your email, then sign in." });
              }}
              disabled={authLoading}
            >
              Create account
            </Button>
          </div>
        </section>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <header>
          <p className="font-mono text-xs text-muted-foreground">Admin</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Access not granted</h1>
          <p className="mt-4 text-sm text-muted-foreground">If this is the first time, you can bootstrap the first admin account.</p>
        </header>

        <section className="mt-10 rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
          <Button variant="hero" onClick={bootstrapAdmin} className="w-full">Become Admin (first account only)</Button>
          <Button
            className="mt-3 w-full"
            variant="glowOutline"
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </Button>
        </section>
      </main>
    );
  }

  const stats = [
    { k: "Projects", v: projects.length },
    { k: "Skills", v: skills.length },
    { k: "Certificates", v: certs.length },
    { k: "Messages", v: contacts.length },
  ];

  return (
    <AdminShell
      onSignOut={async () => {
        await supabase.auth.signOut();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.k} className="rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur-md">
            <p className="font-mono text-xs text-muted-foreground">{s.k}</p>
            <p className="mt-2 font-display text-2xl font-semibold">{s.v}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="projects" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="skills">Skills & Certs</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <p className="font-mono text-xs text-muted-foreground">Add project</p>
              <div className="mt-4 space-y-3">
                <Input placeholder="Title" value={newProject.title} onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))} />
                <Input placeholder="Meta (e.g., ML • deployment-ready)" value={newProject.meta} onChange={(e) => setNewProject((p) => ({ ...p, meta: e.target.value }))} />
                <Textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject((p) => ({ ...p, description: e.target.value }))} />
                <Input placeholder="GitHub URL" value={newProject.github_url} onChange={(e) => setNewProject((p) => ({ ...p, github_url: e.target.value }))} />
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={async () => {
                    const { error } = await supabase.from("projects").insert({
                      title: newProject.title,
                      meta: newProject.meta || null,
                      description: newProject.description || null,
                      github_url: newProject.github_url || null,
                      published: true,
                      sort_order: projects.length,
                    });
                    if (error) return toast({ title: "Create failed", description: error.message });
                    setNewProject({ title: "", meta: "", description: "", github_url: "" });
                    await refreshAll();
                  }}
                  disabled={!newProject.title.trim()}
                >
                  Add project
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-muted-foreground">Manage</p>
                <Button variant="glowOutline" onClick={refreshAll}>Refresh</Button>
              </div>

              <div className="mt-4 space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="rounded-lg border border-border/60 bg-background/30 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-base font-semibold">{p.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{p.meta ?? ""}</p>
                      </div>
                      <Button
                        variant="glowOutline"
                        onClick={async () => {
                          const { error } = await supabase.from("projects").delete().eq("id", p.id);
                          if (error) toast({ title: "Delete failed", description: error.message });
                          await refreshAll();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    {p.github_url && (
                      <a className="mt-2 block font-mono text-xs text-muted-foreground hover:underline" href={p.github_url} target="_blank" rel="noreferrer">
                        {p.github_url}
                      </a>
                    )}
                  </div>
                ))}
                {projects.length === 0 && <p className="text-sm text-muted-foreground">No projects yet.</p>}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resume" className="mt-6">
          <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <p className="font-mono text-xs text-muted-foreground">Upload / replace resume PDF</p>
            <Input
              className="mt-4"
              type="file"
              accept="application/pdf"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                await upsertResume(f);
              }}
            />
            <p className="mt-3 text-sm text-muted-foreground">The public site always uses the latest uploaded resume.</p>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-muted-foreground">Latest messages</p>
              <Button variant="glowOutline" onClick={refreshAll}>Refresh</Button>
            </div>

            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="align-top">{c.name}</TableCell>
                      <TableCell className="align-top">
                        <a className="hover:underline" href={`mailto:${c.email}`}>{c.email}</a>
                      </TableCell>
                      <TableCell className="align-top max-w-[420px]">
                        <p className="line-clamp-3 text-sm text-muted-foreground">{c.message}</p>
                      </TableCell>
                      <TableCell className="align-top font-mono text-xs text-muted-foreground">
                        {new Date(c.created_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {contacts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-sm text-muted-foreground">No submissions yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <p className="font-mono text-xs text-muted-foreground">Add skill</p>
              <div className="mt-4 space-y-3">
                <Input placeholder="Domain (AI / ML, Data Science, Data Analytics)" value={newSkill.domain} onChange={(e) => setNewSkill((s) => ({ ...s, domain: e.target.value }))} />
                <Input placeholder="Skill name" value={newSkill.name} onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))} />
                <Input placeholder="Level (optional)" value={newSkill.level} onChange={(e) => setNewSkill((s) => ({ ...s, level: e.target.value }))} />
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={async () => {
                    const { error } = await supabase.from("skills").insert({
                      domain: newSkill.domain,
                      name: newSkill.name,
                      level: newSkill.level || null,
                      published: true,
                      sort_order: skills.length,
                    });
                    if (error) return toast({ title: "Create failed", description: error.message });
                    setNewSkill({ domain: "AI / ML", name: "", level: "" });
                    await refreshAll();
                  }}
                  disabled={!newSkill.domain.trim() || !newSkill.name.trim()}
                >
                  Add skill
                </Button>
              </div>

              <div className="mt-6 space-y-2">
                {skills.map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/30 p-3">
                    <div>
                      <p className="text-sm text-foreground">{s.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{s.domain}{s.level ? ` • ${s.level}` : ""}</p>
                    </div>
                    <Button
                      variant="glowOutline"
                      onClick={async () => {
                        const { error } = await supabase.from("skills").delete().eq("id", s.id);
                        if (error) toast({ title: "Delete failed", description: error.message });
                        await refreshAll();
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
                {skills.length === 0 && <p className="text-sm text-muted-foreground">No skills yet.</p>}
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-md">
              <p className="font-mono text-xs text-muted-foreground">Add certificate / achievement</p>
              <div className="mt-4 space-y-3">
                <Input placeholder="Title" value={newCert.title} onChange={(e) => setNewCert((c) => ({ ...c, title: e.target.value }))} />
                <Input placeholder="Issuer" value={newCert.issuer} onChange={(e) => setNewCert((c) => ({ ...c, issuer: e.target.value }))} />
                <Input placeholder="Year" value={newCert.year} onChange={(e) => setNewCert((c) => ({ ...c, year: e.target.value }))} />
                <Input placeholder="URL (optional)" value={newCert.url} onChange={(e) => setNewCert((c) => ({ ...c, url: e.target.value }))} />
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={async () => {
                    const { error } = await supabase.from("certifications").insert({
                      title: newCert.title,
                      issuer: newCert.issuer || null,
                      year: newCert.year || null,
                      url: newCert.url || null,
                      published: true,
                      sort_order: certs.length,
                    });
                    if (error) return toast({ title: "Create failed", description: error.message });
                    setNewCert({ title: "", issuer: "", year: "", url: "" });
                    await refreshAll();
                  }}
                  disabled={!newCert.title.trim()}
                >
                  Add certificate
                </Button>
              </div>

              <div className="mt-6 space-y-2">
                {certs.map((c) => (
                  <div key={c.id} className="flex items-start justify-between gap-3 rounded-lg border border-border/60 bg-background/30 p-3">
                    <div>
                      <p className="text-sm text-foreground">{c.title}</p>
                      <p className="font-mono text-xs text-muted-foreground">{[c.issuer, c.year].filter(Boolean).join(" • ")}</p>
                      {c.url && (
                        <a className="mt-1 block font-mono text-xs text-muted-foreground hover:underline" href={c.url} target="_blank" rel="noreferrer">
                          Link
                        </a>
                      )}
                    </div>
                    <Button
                      variant="glowOutline"
                      onClick={async () => {
                        const { error } = await supabase.from("certifications").delete().eq("id", c.id);
                        if (error) toast({ title: "Delete failed", description: error.message });
                        await refreshAll();
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
                {certs.length === 0 && <p className="text-sm text-muted-foreground">No certificates yet.</p>}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AdminShell>
  );
}
