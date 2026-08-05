import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ROLE_OPTIONS = ["admin", "manager", "member", "viewer"] as const;
export type AppRole = (typeof ROLE_OPTIONS)[number];

export const ROLE_LABELS: Record<AppRole, { en: string; ar: string }> = {
  admin: { en: "Admin", ar: "مدير النظام" },
  manager: { en: "Manager", ar: "مدير" },
  member: { en: "Member", ar: "موظف" },
  viewer: { en: "Viewer", ar: "مشاهدة فقط" },
};

export const SECTION_KEYS = [
  "dashboard",
  "sales",
  "customers",
  "suppliers",
  "operations",
  "bookings",
  "finance",
  "hr",
  "reports",
  "files",
  "settings",
] as const;

export type Permission = { role: string; section: string; can_view: boolean; can_edit: boolean };

export function useAccess() {
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setRoles([]);
      setPermissions([]);
      setLoading(false);
      return;
    }
    const [{ data: r }, { data: p }] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", user.id),
      supabase.from("role_permissions").select("role, section, can_view, can_edit"),
    ]);
    setRoles(((r ?? []).map((x) => x.role) as AppRole[]) ?? []);
    setPermissions((p ?? []) as Permission[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const onRefresh = () => load();
    window.addEventListener("permissions:refresh", onRefresh);
    return () => window.removeEventListener("permissions:refresh", onRefresh);
  }, [load]);

  const isAdmin = roles.includes("admin");
  const primaryRole: AppRole =
    (ROLE_OPTIONS.find((r) => roles.includes(r)) as AppRole) ?? "member";

  const canView = useCallback(
    (section: string) => {
      if (isAdmin) return true;
      return permissions.some(
        (p) => roles.includes(p.role as AppRole) && p.section === section && p.can_view,
      );
    },
    [isAdmin, permissions, roles],
  );

  const canEdit = useCallback(
    (section: string) => {
      if (isAdmin) return true;
      return permissions.some(
        (p) => roles.includes(p.role as AppRole) && p.section === section && p.can_edit,
      );
    },
    [isAdmin, permissions, roles],
  );

  return { roles, primaryRole, isAdmin, permissions, canView, canEdit, loading, reload: load };
}
