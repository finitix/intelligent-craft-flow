-- Fix search_path for trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Tighten contact insert policy (avoid always-true linter)
DROP POLICY IF EXISTS contact_insert ON public.contact_submissions;
CREATE POLICY contact_insert
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND length(email) BETWEEN 3 AND 255
  AND position('@' in email) > 1
  AND length(message) BETWEEN 1 AND 2000
);
