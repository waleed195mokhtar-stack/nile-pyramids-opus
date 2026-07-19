import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type FieldType = "text" | "number" | "date" | "email" | "select" | "textarea" | "reference";

export type FieldDef = {
  key: string;
  label: string;
  labelAr?: string;
  type?: FieldType;
  options?: string[];
  /** For type: "reference" — load {id,label} pairs from another table */
  refTable?: string;
  refLabelKey?: string;
  refLabelKeyAr?: string;
  required?: boolean;
  hideInTable?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
  width?: string;
};

type Row = Record<string, unknown> & { id: string };

export function CrudSection({
  table,
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
  fields,
  orderBy = "created_at",
  ar,
  searchKeys,
}: {
  table: string;
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  fields: FieldDef[];
  orderBy?: string;
  ar: boolean;
  searchKeys: string[];
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table as never).select("*").order(orderBy, { ascending: false });
    if (error) toast.error(error.message);
    else setRows((data ?? []) as Row[]);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditing({ id: "" } as Row); setOpen(true); };
  const openEdit = (r: Row) => { setEditing(r); setOpen(true); };
  const close = () => { setOpen(false); setEditing(null); };

  const save = async (values: Record<string, unknown>) => {
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const v = values[f.key];
      if (v === "" || v === undefined) payload[f.key] = null;
      else if (f.type === "number") payload[f.key] = v === null ? null : Number(v);
      else payload[f.key] = v;
    }
    if (editing && editing.id) {
      const { error } = await supabase.from(table as never).update(payload as never).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success(ar ? "تم التحديث" : "Updated");
    } else {
      const { error } = await supabase.from(table as never).insert(payload as never);
      if (error) { toast.error(error.message); return; }
      toast.success(ar ? "تمت الإضافة" : "Created");
    }
    close();
    load();
  };

  const remove = async (r: Row) => {
    if (!confirm(ar ? "حذف هذا العنصر؟" : "Delete this item?")) return;
    const { error } = await supabase.from(table as never).delete().eq("id", r.id);
    if (error) { toast.error(error.message); return; }
    toast.success(ar ? "تم الحذف" : "Deleted");
    load();
  };


  const filtered = rows.filter((r) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q));
  });

  const tableFields = fields.filter((f) => !f.hideInTable);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold">
            <span className="bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">{ar ? titleAr : titleEn}</span>
          </h1>
          {(subtitleEn || subtitleAr) && <p className="mt-1 text-sm text-white/50">{ar ? subtitleAr : subtitleEn}</p>}
        </div>
      </motion.div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-xl">
          <Search size={15} className="text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ar ? "بحث…" : "Search…"}
            className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
          />
        </div>
        <button onClick={openNew} className="flex items-center gap-1.5 rounded-xl bg-[#D4AF37] px-3 py-2 text-xs font-semibold text-[#081C3A] hover:bg-[#E8C866]">
          <Plus size={13} /> {ar ? "إضافة" : "New"}
        </button>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-left text-[11px] uppercase tracking-widest text-white/50">
                {tableFields.map((f) => (
                  <th key={f.key} className="px-4 py-3 font-semibold">{ar && f.labelAr ? f.labelAr : f.label}</th>
                ))}
                <th className="px-4 py-3 font-semibold text-right">{ar ? "إجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={tableFields.length + 1} className="px-4 py-10 text-center text-white/50">
                  <Loader2 className="mx-auto animate-spin" size={20} />
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={tableFields.length + 1} className="px-4 py-10 text-center text-white/40">
                  {ar ? "لا توجد بيانات — اضغط إضافة" : "No records yet — click New"}
                </td></tr>
              ) : filtered.map((r, i) => (
                <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.03]">
                  {tableFields.map((f) => (
                    <td key={f.key} className="px-4 py-3 text-white/80">
                      {f.render ? f.render(r[f.key], r) : (r[f.key] === null || r[f.key] === undefined || r[f.key] === "" ? <span className="text-white/30">—</span> : String(r[f.key]))}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <button onClick={() => openEdit(r)} className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-white/70 hover:bg-white/10" title={ar ? "تعديل" : "Edit"}>
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => remove(r)} className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-300 hover:bg-rose-500/20" title={ar ? "حذف" : "Delete"}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <AnimatePresence>
        {open && editing && (
          <EditorDialog
            ar={ar}
            fields={fields}
            initial={editing}
            onClose={close}
            onSave={save}
            titleEn={editing.id ? "Edit" : "New"}
            titleAr={editing.id ? "تعديل" : "إضافة"}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EditorDialog({ ar, fields, initial, onClose, onSave, titleEn, titleAr }: {
  ar: boolean;
  fields: FieldDef[];
  initial: Row;
  onClose: () => void;
  onSave: (values: Record<string, unknown>) => Promise<void>;
  titleEn: string;
  titleAr: string;
}) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const v: Record<string, unknown> = {};
    for (const f of fields) v[f.key] = initial[f.key] ?? "";
    return v;
  });
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !values[f.key]) {
        toast.error((ar && f.labelAr ? f.labelAr : f.label) + (ar ? " مطلوب" : " is required"));
        return;
      }
    }
    setSaving(true);
    await onSave(values);
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0B1F3F]/95 p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-white">
            <span className="bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">{ar ? titleAr : titleEn}</span>
          </h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-white/60 hover:bg-white/10"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className={f.type === "select" || f.width === "full" ? "md:col-span-2" : ""}>
              <label className="mb-1 block text-[11px] uppercase tracking-widest text-white/50">
                {ar && f.labelAr ? f.labelAr : f.label}{f.required && <span className="text-[#D4AF37]"> *</span>}
              </label>
              {f.type === "select" ? (
                <select
                  value={String(values[f.key] ?? "")}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                >
                  <option value="" className="bg-[#0B1F3F]">—</option>
                  {f.options?.map((o) => <option key={o} value={o} className="bg-[#0B1F3F]">{o}</option>)}
                </select>
              ) : (
                <input
                  type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "email" ? "email" : "text"}
                  step={f.type === "number" ? "any" : undefined}
                  value={String(values[f.key] ?? "")}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                />
              )}
            </div>
          ))}
          <div className="md:col-span-2 mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.06]">
              {ar ? "إلغاء" : "Cancel"}
            </button>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-2 text-sm font-semibold text-[#081C3A] hover:bg-[#E8C866] disabled:opacity-60">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {ar ? "حفظ" : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
