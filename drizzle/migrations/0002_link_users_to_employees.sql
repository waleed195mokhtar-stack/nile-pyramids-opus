-- 1) link column
ALTER TABLE public.employees
  ADD COLUMN IF NOT EXISTS user_id uuid;

CREATE UNIQUE INDEX IF NOT EXISTS employees_user_id_key
  ON public.employees(user_id) WHERE user_id IS NOT NULL;

-- 2) auto-create / sync employee row from profile
CREATE OR REPLACE FUNCTION public.sync_employee_from_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  SELECT id INTO v_id FROM public.employees WHERE user_id = NEW.id;

  IF v_id IS NULL THEN
    -- adopt an existing employee row that matches by email, otherwise create one
    SELECT id INTO v_id
    FROM public.employees
    WHERE user_id IS NULL
      AND NEW.email IS NOT NULL
      AND lower(email) = lower(NEW.email)
    LIMIT 1;

    IF v_id IS NULL THEN
      INSERT INTO public.employees (name, email, status, user_id)
      VALUES (
        COALESCE(NULLIF(NEW.full_name, ''), split_part(COALESCE(NEW.email, 'user'), '@', 1)),
        NEW.email,
        'online',
        NEW.id
      );
      RETURN NEW;
    END IF;

    UPDATE public.employees SET user_id = NEW.id WHERE id = v_id;
  END IF;

  UPDATE public.employees
  SET name  = COALESCE(NULLIF(NEW.full_name, ''), name),
      email = COALESCE(NEW.email, email)
  WHERE id = v_id;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_employee_from_profile() FROM anon, authenticated;

DROP TRIGGER IF EXISTS tg_profiles_sync_employee ON public.profiles;
CREATE TRIGGER tg_profiles_sync_employee
AFTER INSERT OR UPDATE OF full_name, email ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.sync_employee_from_profile();

-- 3) remove employee link when the account is deleted (keep the employee record)
CREATE OR REPLACE FUNCTION public.unlink_employee_on_profile_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.employees SET user_id = NULL WHERE user_id = OLD.id;
  RETURN OLD;
END;
$$;

REVOKE ALL ON FUNCTION public.unlink_employee_on_profile_delete() FROM anon, authenticated;

DROP TRIGGER IF EXISTS tg_profiles_unlink_employee ON public.profiles;
CREATE TRIGGER tg_profiles_unlink_employee
BEFORE DELETE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.unlink_employee_on_profile_delete();

-- 4) backfill existing users
UPDATE public.employees e
SET user_id = p.id
FROM public.profiles p
WHERE e.user_id IS NULL
  AND p.email IS NOT NULL
  AND lower(e.email) = lower(p.email)
  AND NOT EXISTS (SELECT 1 FROM public.employees x WHERE x.user_id = p.id);

INSERT INTO public.employees (name, email, status, user_id)
SELECT
  COALESCE(NULLIF(p.full_name, ''), split_part(COALESCE(p.email, 'user'), '@', 1)),
  p.email,
  'online',
  p.id
FROM public.profiles p
WHERE NOT EXISTS (SELECT 1 FROM public.employees e WHERE e.user_id = p.id);
