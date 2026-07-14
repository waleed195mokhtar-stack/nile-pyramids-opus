import { AnimatePresence, motion } from "framer-motion";
import { Bell, Command, Menu, Moon, Search, Sun, LogOut, User, Settings, Globe } from "lucide-react";
import { useState } from "react";
import { company } from "@/config/company";
import { useI18n } from "@/hooks/useI18n";
import { useThemeMode } from "@/hooks/useThemeMode";
import { notifications } from "@/data/mockData";

type Props = {
  onOpenSidebar: () => void;
  onOpenCommand: () => void;
  currentSection: string;
};

export function Header({ onOpenSidebar, onOpenCommand, currentSection }: Props) {
  const { lang, toggleLang, t } = useI18n();
  const { mode, toggle: toggleTheme } = useThemeMode();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050F22]/70 backdrop-blur-2xl">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <button
          onClick={onOpenSidebar}
          className="rounded-lg p-2 text-white/70 hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-white/40">Workspace</span>
          <span className="text-white/30">/</span>
          <span className="capitalize text-white">{currentSection}</span>
        </div>

        {/* Search */}
        <button
          onClick={onOpenCommand}
          className="group ms-auto flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/50 hover:border-[#D4AF37]/40 hover:bg-white/[0.06] hover:text-white/80 min-w-[180px] md:min-w-[300px] transition-all"
        >
          <Search size={16} />
          <span className="flex-1 text-start">{t("search")}</span>
          <kbd className="hidden md:inline-flex items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white/40">
            <Command size={10} /> K
          </kbd>
        </button>

        {/* Language */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/70 hover:border-[#D4AF37]/40 hover:text-white"
        >
          <Globe size={14} />
          {lang === "en" ? "AR" : "EN"}
        </button>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-white/70 hover:border-[#D4AF37]/40 hover:text-white"
          aria-label="Toggle theme"
        >
          {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-lg border border-white/10 bg-white/[0.03] p-2 text-white/70 hover:border-[#D4AF37]/40 hover:text-white"
          >
            <Bell size={16} />
            <span className="absolute top-1 end-1 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute end-0 mt-2 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0A1B3A]/95 backdrop-blur-2xl shadow-2xl"
              >
                <div className="border-b border-white/10 px-4 py-3">
                  <div className="text-sm font-semibold text-white">{t("notifications")}</div>
                </div>
                <ul>
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="border-b border-white/5 px-4 py-3 hover:bg-white/[0.03]"
                    >
                      <div className="text-sm text-white">
                        {lang === "ar" ? n.titleAr : n.titleEn}
                      </div>
                      <div className="mt-0.5 text-xs text-white/40">
                        {lang === "ar" ? n.timeAr : n.timeEn}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => setUserOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-1 pe-3 hover:border-[#D4AF37]/40"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#D4AF37] to-[#B8912A] text-xs font-bold text-[#081C3A]">
              {(lang === "ar" ? company.currentUser.nameAr : company.currentUser.name).slice(0, 1)}
            </div>
            <span className="hidden md:inline text-xs font-medium text-white/80">
              {lang === "ar" ? company.currentUser.nameAr : company.currentUser.name}
            </span>
          </button>
          <AnimatePresence>
            {userOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute end-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0A1B3A]/95 backdrop-blur-2xl shadow-2xl"
              >
                <div className="border-b border-white/10 px-4 py-3">
                  <div className="text-sm font-semibold text-white">
                    {lang === "ar" ? company.currentUser.nameAr : company.currentUser.name}
                  </div>
                  <div className="mt-0.5 text-xs text-white/50">
                    {lang === "ar" ? company.currentUser.roleAr : company.currentUser.role}
                  </div>
                </div>
                <ul className="py-1 text-sm">
                  {[
                    { icon: User, label: t("profile"), action: () => setUserOpen(false) },
                    { icon: Settings, label: "Settings", action: () => setUserOpen(false) },
                    {
                      icon: LogOut,
                      label: t("signOut"),
                      action: async () => {
                        const { supabase } = await import("@/integrations/supabase/client");
                        await supabase.auth.signOut();
                        window.location.href = "/auth";
                      },
                    },
                  ].map((it) => (
                    <li key={it.label}>
                      <button
                        onClick={it.action}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-white/70 hover:bg-white/[0.05] hover:text-white"
                      >
                        <it.icon size={14} />
                        {it.label}
                      </button>
                    </li>
                  ))}
                </ul>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
