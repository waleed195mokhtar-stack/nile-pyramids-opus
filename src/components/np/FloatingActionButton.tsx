import { motion, AnimatePresence } from "framer-motion";
import { Plus, FileText, Upload, Calendar, Receipt } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const actions = [
  { icon: Calendar, label: "New Booking" },
  { icon: Receipt, label: "Create Invoice" },
  { icon: Upload, label: "Upload File" },
  { icon: FileText, label: "New Note" },
];

export function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 end-6 z-40">
      <AnimatePresence>
        {open &&
          actions.map((a, i) => (
            <motion.button
              key={a.label}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -(i + 1) * 56, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => {
                toast.success(a.label + " opened");
                setOpen(false);
              }}
              className="absolute bottom-0 end-0 flex items-center gap-2 rounded-full border border-white/10 bg-[#0A1B3A]/95 backdrop-blur-xl px-4 py-2.5 text-xs text-white shadow-xl hover:border-[#D4AF37]/40"
            >
              <a.icon size={14} className="text-[#D4AF37]" />
              {a.label}
            </motion.button>
          ))}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: open ? 45 : 0 }}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8912A] text-[#081C3A] shadow-[0_10px_40px_-8px_rgba(212,175,55,0.7)]"
      >
        <Plus size={22} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
