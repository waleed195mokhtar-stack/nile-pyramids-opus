
-- 1. Drop unused/insecure role column on profiles (prevents self-escalation)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- 2. Lock down SECURITY DEFINER trigger functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.promote_admin_on_verify() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.tg_profiles_updated_at() FROM anon, authenticated, PUBLIC;
