import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Sheet = {
  id: string;
  title_en: string;
  title_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  url: string;
  category: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  allowed_roles: string[];
};

const COLUMNS =
  "id, title_en, title_ar, description_en, description_ar, url, category, icon, sort_order, is_active, allowed_roles";

export function useSheets(includeInactive = false) {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    let q = supabase.from("sheets").select(COLUMNS).order("sort_order", { ascending: true });
    if (!includeInactive) q = q.eq("is_active", true);
    const { data } = await q;
    setSheets((data ?? []) as Sheet[]);
    setLoading(false);
  }, [includeInactive]);

  useEffect(() => {
    load();
    const onRefresh = () => load();
    window.addEventListener("sheets:refresh", onRefresh);
    return () => window.removeEventListener("sheets:refresh", onRefresh);
  }, [load]);

  return { sheets, loading, reload: load };
}

export function refreshSheets() {
  window.dispatchEvent(new Event("sheets:refresh"));
}
