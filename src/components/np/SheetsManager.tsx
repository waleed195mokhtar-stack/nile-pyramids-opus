import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, FileSpreadsheet, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSheets, type Sheet, refreshSheets } from "@/hooks/useSheets";
import { ROLE_OPTIONS, ROLE_LABELS } from "@/hooks/useAccess";

const ICON_CHOICES = [
  "FileSpreadsheet",
  "TrendingUp",
  "Users",
  "Truck",
  "ClipboardList",
  "Wallet",
  "BarChart3",
  "CalendarDays",
  "Briefcase",
  "FolderOpen",
  "Receipt",
  "MapPin",
];

type Draft = Omit<Sheet, "id"> & { id?: string };

const emptyDraft = (order: number): Draft => ({
  title_en: "",
  title_ar: "",
  description_en: "",
  description_ar: "",
  url: "",
  category: "general",
  icon: "FileSpreadsheet",
  sort_order: order,
  is_active: true,
  allowed_roles: [...ROLE_OPTIONS],
});

export function SheetsManager() {
  const { sheets, loading } = useSheets(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!draft) return;
    if (!draft.title_en.trim() || !draft.url.trim()) {
      toast.error("الاسم والرابط مطلوبين");
      return;
    }
    setSaving(true);
    const payload = {
      title_en: draft.title_en.trim(),
      title_ar: draft.title_ar?.trim() || null,
      description_en: draft.description_en?.trim() || null,
      description_ar: draft.description_ar?.trim() || null,
      url: draft.url.trim(),
      category: draft.category || "general",
      icon: draft.icon,
      sort_order: Number(draft.sort_order) || 0,
      is_active: draft.is_active,
      allowed_roles: draft.allowed_roles.length ? draft.allowed_roles : [...ROLE_OPTIONS],
    };
    const { error } = draft.id
      ? await supabase.from("sheets").update(payload).eq("id", draft.id)
      : await supabase.from("sheets").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(draft.id ? "تم تحديث الشيت" : "تمت إضافة الشيت");
    setDraft(null);
    refreshSheets();
  };

  const remove = async (s: Sheet) => {
    if (!confirm(`حذف "${s.title_ar || s.title_en}"؟`)) return;
    const { error } = await supabase.from("sheets").delete().eq("id", s.id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    refreshSheets();
  };

  const toggleActive = async (s: Sheet) => {
    const { error } = await supabase
      .from("sheets")
      .update({ is_active: !s.is_active })
      .eq("id", s.id);
    if (error) return toast.error(error.message);
    refreshSheets();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-white/50">
          أضف شيتات Excel / OneDrive وحدّد مين يشوفها — تظهر تلقائياً في Quick Access.
        </p>
        <button
          onClick={() => setDraft(emptyDraft(sheets.length + 1))}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#D4AF37] px-3.5 py-2 text-sm font-semibold text-[#081C3A] hover:bg-[#e0bd4d]"
        >
          <Plus size={15} /> شيت جديد
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
          </div>
        ) : sheets.length === 0 ? (
          <div className="p-12 text-center text-sm text-white/50">
            <FileSpreadsheet className="mx-auto mb-3 text-[#D4AF37]" size={28} />
            لا توجد شيتات بعد
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr className="text-left text-xs uppercase tracking-wider text-white/50">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">الشيت</th>
                  <th className="px-4 py-3">القسم</th>
                  <th className="px-4 py-3">الصلاحيات</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {sheets.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 text-white/40">{s.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{s.title_ar || s.title_en}</div>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#D4AF37]/80 hover:text-[#D4AF37] truncate block max-w-[240px]"
                      >
                        {s.url}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/60">{s.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.allowed_roles.map((r) => (
                          <span
                            key={r}
                            className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-white/60"
                          >
                            {ROLE_LABELS[r as keyof typeof ROLE_LABELS]?.ar ?? r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(s)}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${
                          s.is_active
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-white/5 text-white/40"
                        }`}
                      >
                        {s.is_active ? <Eye size={11} /> : <EyeOff size={11} />}
                        {s.is_active ? "ظاهر" : "مخفي"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setDraft({ ...s })}
                          className="rounded-md bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => remove(s)}
                          className="rounded-md bg-red-500/15 p-2 text-red-400 hover:bg-red-500/25"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {draft && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="my-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0A2547]/95 p-6 backdrop-blur-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3
                className="text-xl text-white"
                style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }}
              >
                {draft.id ? "تعديل شيت" : "شيت جديد"}
              </h3>
              <button onClick={() => setDraft(null)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="الاسم (EN)">
                <Input
                  value={draft.title_en}
                  onChange={(v) => setDraft({ ...draft, title_en: v })}
                />
              </Field>
              <Field label="الاسم (AR)">
                <Input
                  value={draft.title_ar ?? ""}
                  onChange={(v) => setDraft({ ...draft, title_ar: v })}
                />
              </Field>
              <Field label="الوصف (EN)">
                <Input
                  value={draft.description_en ?? ""}
                  onChange={(v) => setDraft({ ...draft, description_en: v })}
                />
              </Field>
              <Field label="الوصف (AR)">
                <Input
                  value={draft.description_ar ?? ""}
                  onChange={(v) => setDraft({ ...draft, description_ar: v })}
                />
              </Field>
              <div className="md:col-span-2">
                <Field label="الرابط (OneDrive / Excel Online)">
                  <Input
                    value={draft.url}
                    onChange={(v) => setDraft({ ...draft, url: v })}
                    placeholder="https://..."
                  />
                </Field>
              </div>
              <Field label="القسم">
                <Input
                  value={draft.category}
                  onChange={(v) => setDraft({ ...draft, category: v })}
                />
              </Field>
              <Field label="الأيقونة">
                <select
                  value={draft.icon}
                  onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                >
                  {ICON_CHOICES.map((ic) => (
                    <option key={ic} value={ic} className="bg-[#0A2547]">
                      {ic}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="الترتيب">
                <Input
                  value={String(draft.sort_order)}
                  onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })}
                />
              </Field>
              <Field label="الحالة">
                <button
                  onClick={() => setDraft({ ...draft, is_active: !draft.is_active })}
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm font-medium ${
                    draft.is_active
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-white/10 bg-white/5 text-white/50"
                  }`}
                >
                  {draft.is_active ? "ظاهر للمستخدمين" : "مخفي"}
                </button>
              </Field>
              <div className="md:col-span-2">
                <Field label="مين يشوف الشيت؟">
                  <div className="flex flex-wrap gap-2">
                    {ROLE_OPTIONS.map((r) => {
                      const on = draft.allowed_roles.includes(r);
                      return (
                        <button
                          key={r}
                          onClick={() =>
                            setDraft({
                              ...draft,
                              allowed_roles: on
                                ? draft.allowed_roles.filter((x) => x !== r)
                                : [...draft.allowed_roles, r],
                            })
                          }
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                            on
                              ? "border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37]"
                              : "border-white/10 bg-white/5 text-white/50 hover:text-white"
                          }`}
                        >
                          {ROLE_LABELS[r].ar}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setDraft(null)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white"
              >
                إلغاء
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-2 text-sm font-semibold text-[#081C3A] hover:bg-[#e0bd4d] disabled:opacity-60"
              >
                {saving && <Loader2 size={14} className="animate-spin" />} حفظ
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs text-white/50">{label}</div>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/50"
    />
  );
}
