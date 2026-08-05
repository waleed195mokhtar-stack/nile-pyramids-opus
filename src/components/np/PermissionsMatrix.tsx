import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ROLE_OPTIONS, ROLE_LABELS, SECTION_KEYS, type AppRole } from "@/hooks/useAccess";
import { sidebarItems } from "@/config/navigation";

type Row = { role: string; section: string; can_view: boolean; can_edit: boolean };

const key = (r: string, s: string) => `${r}:${s}`;

export function PermissionsMatrix() {
  const [map, setMap] = useState<Record<string, { can_view: boolean; can_edit: boolean }>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("role_permissions")
      .select("role, section, can_view, can_edit");
    if (error) toast.error(error.message);
    const next: Record<string, { can_view: boolean; can_edit: boolean }> = {};
    for (const r of (data ?? []) as Row[]) {
      next[key(r.role, r.section)] = { can_view: r.can_view, can_edit: r.can_edit };
    }
    setMap(next);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = (role: AppRole, section: string, field: "can_view" | "can_edit") => {
    const k = key(role, section);
    const cur = map[k] ?? { can_view: false, can_edit: false };
    const next = { ...cur, [field]: !cur[field] };
    if (field === "can_view" && !next.can_view) next.can_edit = false;
    if (field === "can_edit" && next.can_edit) next.can_view = true;
    setMap({ ...map, [k]: next });
  };

  const save = async () => {
    setSaving(true);
    const rows: Row[] = [];
    for (const role of ROLE_OPTIONS) {
      for (const section of SECTION_KEYS) {
        const v = map[key(role, section)] ?? { can_view: false, can_edit: false };
        rows.push({ role, section, can_view: v.can_view, can_edit: v.can_edit });
      }
    }
    const { error } = await supabase
      .from("role_permissions")
      .upsert(rows, { onConflict: "role,section" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("تم حفظ الصلاحيات");
    window.dispatchEvent(new Event("permissions:refresh"));
  };

  const sectionLabel = (s: string) =>
    sidebarItems.find((i) => i.key === s)?.labelAr ?? s;

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-white/50">
          حدّد لكل دور الأقسام المسموح بمشاهدتها (عين) والتعديل عليها (قلم).
        </p>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#081C3A] hover:bg-[#e0bd4d] disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} حفظ
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03]">
            <tr className="text-xs uppercase tracking-wider text-white/50">
              <th className="px-4 py-3 text-left">القسم</th>
              {ROLE_OPTIONS.map((r) => (
                <th key={r} className="px-4 py-3 text-center">
                  <span className="inline-flex items-center gap-1">
                    {r === "admin" && <ShieldCheck size={12} className="text-[#D4AF37]" />}
                    {ROLE_LABELS[r].ar}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SECTION_KEYS.map((s) => (
              <tr key={s} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">{sectionLabel(s)}</td>
                {ROLE_OPTIONS.map((r) => {
                  const v = map[key(r, s)] ?? { can_view: false, can_edit: false };
                  const locked = r === "admin";
                  return (
                    <td key={r} className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Toggle
                          label="عرض"
                          on={locked || v.can_view}
                          disabled={locked}
                          onClick={() => toggle(r, s, "can_view")}
                        />
                        <Toggle
                          label="تعديل"
                          on={locked || v.can_edit}
                          disabled={locked}
                          onClick={() => toggle(r, s, "can_edit")}
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-white/40">
        دور مدير النظام (Admin) مفتوح دائماً على كل الأقسام ولا يمكن تقييده.
      </p>
    </div>
  );
}

function Toggle({
  label,
  on,
  disabled,
  onClick,
}: {
  label: string;
  on: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`rounded-md px-2 py-1 text-[10px] font-semibold transition ${
        on
          ? "bg-[#D4AF37]/20 text-[#D4AF37]"
          : "bg-white/5 text-white/30 hover:text-white/60"
      } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
    >
      {label}
    </button>
  );
}
