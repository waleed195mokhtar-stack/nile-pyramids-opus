CREATE TABLE public.employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_ar text,
  role_title text,
  role_title_ar text,
  department text,
  department_ar text,
  email text,
  phone text,
  hire_date date,
  salary numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'online',
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.employees TO authenticated;
GRANT ALL ON public.employees TO service_role;

ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved users view employees" ON public.employees
  FOR SELECT TO authenticated
  USING (public.is_approved(auth.uid()) AND public.has_section_access(auth.uid(), 'hr'));

CREATE POLICY "HR editors insert employees" ON public.employees
  FOR INSERT TO authenticated
  WITH CHECK (public.is_approved(auth.uid()) AND public.has_section_edit(auth.uid(), 'hr'));

CREATE POLICY "HR editors update employees" ON public.employees
  FOR UPDATE TO authenticated
  USING (public.is_approved(auth.uid()) AND public.has_section_edit(auth.uid(), 'hr'))
  WITH CHECK (public.is_approved(auth.uid()) AND public.has_section_edit(auth.uid(), 'hr'));

CREATE POLICY "HR editors delete employees" ON public.employees
  FOR DELETE TO authenticated
  USING (public.is_approved(auth.uid()) AND public.has_section_edit(auth.uid(), 'hr'));

CREATE TRIGGER employees_set_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

INSERT INTO public.employees (name, name_ar, role_title, role_title_ar, department, department_ar, email, phone, hire_date, salary, status) VALUES
  ('Ahmed Hassan', 'أحمد حسن', 'Operations Manager', 'مدير التشغيل', 'Operations', 'التشغيل', 'ahmed@nilepyramids.com', '+20 100 111 2233', '2021-03-15', 18000, 'online'),
  ('Mona Adel', 'منى عادل', 'Sales Lead', 'مسؤول المبيعات', 'Sales', 'المبيعات', 'mona@nilepyramids.com', '+20 100 222 3344', '2022-06-01', 14500, 'online'),
  ('Karim Fouad', 'كريم فؤاد', 'Senior Tour Guide', 'مرشد سياحي أول', 'Guides', 'المرشدون', 'karim@nilepyramids.com', '+20 100 333 4455', '2019-11-20', 12000, 'leave'),
  ('Salma Nabil', 'سلمى نبيل', 'Accountant', 'محاسبة', 'Finance', 'المالية', 'salma@nilepyramids.com', '+20 100 444 5566', '2023-01-09', 13000, 'online'),
  ('Youssef Tarek', 'يوسف طارق', 'Reservations Agent', 'موظف حجوزات', 'Bookings', 'الحجوزات', 'youssef@nilepyramids.com', '+20 100 555 6677', '2024-02-17', 9500, 'offline'),
  ('Nour Ibrahim', 'نور إبراهيم', 'HR Specialist', 'أخصائي موارد بشرية', 'HR', 'الموارد البشرية', 'nour@nilepyramids.com', '+20 100 666 7788', '2022-09-05', 11000, 'online');