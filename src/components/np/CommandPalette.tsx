import { AnimatePresence, motion } from "framer-motion";
import { Command, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { sidebarItems } from "@/config/navigation";
import { excelLinks } from "@/config/links";
import { useI18n } from "@/hooks/useI18n";

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (key: string) => void;
};

type Item = { id: string; label: string; hint: string; action: () => void };

export function CommandPalette({ open, onClose, onNavigate }: Props) {
  const { lang, t } = useI18n();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const navs = sidebarItems.map((s) => ({
      id: `nav-${s.key}`,
      label: lang === "ar" ? s.labelAr : s.labelEn,
      hint: "Navigate",
      action: () => {
        onNavigate(s.key);
        onClose();
      },
    }));
    const excels = Object.entries(excelLinks).map(([k, v]) => ({
      id: `xl-${k}`,
      label: `Open ${k} Excel`,
      hint: "External",
      action: () => window.open(v, "_blank"),
    }));
    return [...navs, ...excels];
  }, [lang, onClose, onNavigate]);

  const filtered = q
    ? items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()))
    : items;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 backdrop-blur-md p-4 pt-24"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: -12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0A1B3A]/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={18} className="text-[#D4AF37]" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("typeCommand")}
                className="flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/40">
                ESC
              </kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-white/40">No results</li>
              )}
              {filtered.map((it) => (
                <li key={it.id}>
                  <button
                    onClick={it.action}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-start hover:bg-[#D4AF37]/10"
                  >
                    <span className="text-sm text-white">{it.label}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">
                      {it.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] text-white/40">
              <span className="flex items-center gap-1.5">
                <Command size={11} /> K to toggle
              </span>
              <span>↵ to select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
