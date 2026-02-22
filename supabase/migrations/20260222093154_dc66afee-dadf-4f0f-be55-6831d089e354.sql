-- Roles enum
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin','user');
  END IF;
END $$;

-- User roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Admin check helper
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = COALESCE(_user_id, auth.uid())
      AND ur.role = 'admin'
  );
$$;

-- Content tables
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  meta text,
  description text,
  github_url text,
  published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text NOT NULL,
  name text NOT NULL,
  level text,
  published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text,
  year text,
  url text,
  published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.resume (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path text NOT NULL,
  public_url text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_agent text,
  page_url text
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Updated-at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_projects_updated_at') THEN
    CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_skills_updated_at') THEN
    CREATE TRIGGER set_skills_updated_at BEFORE UPDATE ON public.skills
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_certifications_updated_at') THEN
    CREATE TRIGGER set_certifications_updated_at BEFORE UPDATE ON public.certifications
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;

-- RLS policies
-- user_roles
DROP POLICY IF EXISTS admin_manage_roles ON public.user_roles;
CREATE POLICY admin_manage_roles
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- projects
DROP POLICY IF EXISTS projects_read ON public.projects;
CREATE POLICY projects_read
ON public.projects
FOR SELECT
TO anon, authenticated
USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS projects_insert ON public.projects;
CREATE POLICY projects_insert
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS projects_update ON public.projects;
CREATE POLICY projects_update
ON public.projects
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS projects_delete ON public.projects;
CREATE POLICY projects_delete
ON public.projects
FOR DELETE
TO authenticated
USING (public.is_admin());

-- skills
DROP POLICY IF EXISTS skills_read ON public.skills;
CREATE POLICY skills_read
ON public.skills
FOR SELECT
TO anon, authenticated
USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS skills_insert ON public.skills;
CREATE POLICY skills_insert
ON public.skills
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS skills_update ON public.skills;
CREATE POLICY skills_update
ON public.skills
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS skills_delete ON public.skills;
CREATE POLICY skills_delete
ON public.skills
FOR DELETE
TO authenticated
USING (public.is_admin());

-- certifications
DROP POLICY IF EXISTS certs_read ON public.certifications;
CREATE POLICY certs_read
ON public.certifications
FOR SELECT
TO anon, authenticated
USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS certs_insert ON public.certifications;
CREATE POLICY certs_insert
ON public.certifications
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS certs_update ON public.certifications;
CREATE POLICY certs_update
ON public.certifications
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS certs_delete ON public.certifications;
CREATE POLICY certs_delete
ON public.certifications
FOR DELETE
TO authenticated
USING (public.is_admin());

-- resume
DROP POLICY IF EXISTS resume_read ON public.resume;
CREATE POLICY resume_read
ON public.resume
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS resume_insert ON public.resume;
CREATE POLICY resume_insert
ON public.resume
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS resume_update ON public.resume;
CREATE POLICY resume_update
ON public.resume
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS resume_delete ON public.resume;
CREATE POLICY resume_delete
ON public.resume
FOR DELETE
TO authenticated
USING (public.is_admin());

-- contact submissions
DROP POLICY IF EXISTS contact_insert ON public.contact_submissions;
CREATE POLICY contact_insert
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS contact_admin_read ON public.contact_submissions;
CREATE POLICY contact_admin_read
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Storage bucket for resume
INSERT INTO storage.buckets (id, name, public)
VALUES ('resume', 'resume', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, admin write
DROP POLICY IF EXISTS resume_public_read ON storage.objects;
CREATE POLICY resume_public_read
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'resume');

DROP POLICY IF EXISTS resume_admin_insert ON storage.objects;
CREATE POLICY resume_admin_insert
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resume' AND public.is_admin());

DROP POLICY IF EXISTS resume_admin_update ON storage.objects;
CREATE POLICY resume_admin_update
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'resume' AND public.is_admin())
WITH CHECK (bucket_id = 'resume' AND public.is_admin());

DROP POLICY IF EXISTS resume_admin_delete ON storage.objects;
CREATE POLICY resume_admin_delete
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'resume' AND public.is_admin());
