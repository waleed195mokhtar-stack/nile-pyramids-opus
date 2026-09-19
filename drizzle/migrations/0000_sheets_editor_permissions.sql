CREATE OR REPLACE FUNCTION public.has_section_edit(_user_id uuid, _section text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role = ur.role::text
    WHERE ur.user_id = _user_id
      AND rp.section = _section
      AND rp.can_edit
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_section_edit(uuid, text) FROM anon;

CREATE POLICY "Files editors can insert sheets"
ON public.sheets FOR INSERT TO authenticated
WITH CHECK (public.is_approved(auth.uid()) AND public.has_section_edit(auth.uid(), 'files'));

CREATE POLICY "Files editors can update sheets"
ON public.sheets FOR UPDATE TO authenticated
USING (public.is_approved(auth.uid()) AND public.has_section_edit(auth.uid(), 'files'))
WITH CHECK (public.is_approved(auth.uid()) AND public.has_section_edit(auth.uid(), 'files'));

CREATE POLICY "Files editors can delete sheets"
ON public.sheets FOR DELETE TO authenticated
USING (public.is_approved(auth.uid()) AND public.has_section_edit(auth.uid(), 'files'));