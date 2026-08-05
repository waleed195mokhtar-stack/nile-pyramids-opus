-- 1. new roles
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'manager';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'viewer';

-- 2. sheets (admin-managed quick access links)
CREATE TABLE public.sheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text,
  description_en text,
  description_ar text,
  url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  icon text NOT NULL DEFAULT 'FileSpreadsheet',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  allowed_roles text[] NOT NULL DEFAULT ARRAY['admin','manager','member','viewer'],
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sheets TO authenticated;
GRANT ALL ON public.sheets TO service_role;
ALTER TABLE public.sheets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved users can view sheets"
  ON public.sheets FOR SELECT TO authenticated
  USING (public.is_approved(auth.uid()));

CREATE POLICY "Admins can insert sheets"
  ON public.sheets FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update sheets"
  ON public.sheets FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete sheets"
  ON public.sheets FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER trg_sheets_updated_at
  BEFORE UPDATE ON public.sheets
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 3. role -> section permissions
CREATE TABLE public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('admin','manager','member','viewer')),
  section text NOT NULL,
  can_view boolean NOT NULL DEFAULT true,
  can_edit boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (role, section)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.role_permissions TO authenticated;
GRANT ALL ON public.role_permissions TO service_role;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed in users can view role permissions"
  ON public.role_permissions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can insert role permissions"
  ON public.role_permissions FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update role permissions"
  ON public.role_permissions FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete role permissions"
  ON public.role_permissions FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER trg_role_permissions_updated_at
  BEFORE UPDATE ON public.role_permissions
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 4. seed defaults
INSERT INTO public.role_permissions (role, section, can_view, can_edit)
SELECT r.role, s.section,
       true,
       CASE
         WHEN r.role = 'admin' THEN true
         WHEN r.role = 'manager' AND s.section <> 'settings' THEN true
         WHEN r.role = 'member' AND s.section IN ('customers','suppliers','operations','bookings') THEN true
         ELSE false
       END
FROM (VALUES ('admin'),('manager'),('member'),('viewer')) AS r(role)
CROSS JOIN (VALUES
  ('dashboard'),('sales'),('customers'),('suppliers'),('operations'),
  ('bookings'),('finance'),('hr'),('reports'),('files'),('settings')
) AS s(section)
WHERE
  r.role = 'admin'
  OR (r.role = 'manager' AND s.section <> 'settings')
  OR (r.role = 'member' AND s.section IN ('dashboard','customers','suppliers','operations','bookings','files','reports'))
  OR (r.role = 'viewer' AND s.section IN ('dashboard','reports','files'))
ON CONFLICT (role, section) DO NOTHING;

-- 5. helper: does a user have view access to a section
CREATE OR REPLACE FUNCTION public.has_section_access(_user_id uuid, _section text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role = ur.role::text
    WHERE ur.user_id = _user_id
      AND rp.section = _section
      AND rp.can_view
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_section_access(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_section_access(uuid, text) TO authenticated;

-- 6. seed a few starter sheets from the existing quick-access list
INSERT INTO public.sheets (title_en, title_ar, description_en, description_ar, url, category, icon, sort_order)
VALUES
  ('Sales Sheet','شيت المبيعات','Monthly sales tracking','متابعة المبيعات الشهرية','https://YOUR_ONEDRIVE_LINK/sales.xlsx','sales','TrendingUp',1),
  ('Customers Sheet','شيت العملاء','Customer database','قاعدة بيانات العملاء','https://YOUR_ONEDRIVE_LINK/customers.xlsx','customers','Users',2),
  ('Suppliers Sheet','شيت الموردين','Suppliers and balances','الموردين والأرصدة','https://YOUR_ONEDRIVE_LINK/suppliers.xlsx','suppliers','Truck',3),
  ('Operations Sheet','شيت التشغيل','Daily operations plan','خطة التشغيل اليومية','https://YOUR_ONEDRIVE_LINK/operations.xlsx','operations','ClipboardList',4),
  ('Finance Sheet','الشيت المالي','Cashflow and invoices','التدفقات والفواتير','https://YOUR_ONEDRIVE_LINK/finance.xlsx','finance','Wallet',5),
  ('Reports Sheet','شيت التقارير','Performance reports','تقارير الأداء','https://YOUR_ONEDRIVE_LINK/reports.xlsx','reports','BarChart3',6);