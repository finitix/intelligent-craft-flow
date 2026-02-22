-- Replace overly-broad ALL policy with explicit ones + safe bootstrap
DROP POLICY IF EXISTS admin_manage_roles ON public.user_roles;

DROP POLICY IF EXISTS roles_select_admin ON public.user_roles;
CREATE POLICY roles_select_admin
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS roles_insert_admin_or_bootstrap ON public.user_roles;
CREATE POLICY roles_insert_admin_or_bootstrap
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  (
    public.is_admin()
    OR (
      user_id = auth.uid()
      AND role = 'admin'
      AND NOT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.role = 'admin')
    )
  )
);

DROP POLICY IF EXISTS roles_update_admin ON public.user_roles;
CREATE POLICY roles_update_admin
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS roles_delete_admin ON public.user_roles;
CREATE POLICY roles_delete_admin
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_admin());
