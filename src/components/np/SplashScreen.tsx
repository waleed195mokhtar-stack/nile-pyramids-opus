import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { company } from "@/config/company";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050F22]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_60%)]" />
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotateY: -30 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <motion.img
              src={company.logo}
              alt={company.name}
              className="h-32 w-32 object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="font-serif text-3xl tracking-[0.25em] text-[#D4AF37]">
                NILE PYRAMIDS
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.4em] text-white/50">
                Workspace
              </div>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
