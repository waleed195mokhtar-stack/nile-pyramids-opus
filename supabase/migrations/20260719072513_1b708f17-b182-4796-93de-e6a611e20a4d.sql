
ALTER TABLE public.operations
  ADD COLUMN IF NOT EXISTS customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES public.suppliers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS price numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS description text;

CREATE INDEX IF NOT EXISTS operations_customer_id_idx ON public.operations(customer_id);
CREATE INDEX IF NOT EXISTS operations_supplier_id_idx ON public.operations(supplier_id);
