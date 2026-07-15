import { AnimatePresence, motion } from "framer-motion";
import { Bell, Command, Menu, Moon, Search, Sun, LogOut, User, Settings, Globe, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { company } from "@/config/company";
import { useI18n } from "@/hooks/useI18n";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useProfile } from "@/hooks/useProfile";
import { notifications } from "@/data/mockData";

type Props = {
  onOpenSidebar: () => void;
  onOpenCommand: () => void;
  currentSection: string;
};

export function Header({ onOpenSidebar, onOpenCommand, currentSection }: Props) {
  const { lang, toggleLang, t } = useI18n();
  const { mode, toggle: toggleTheme } = useThemeMode();
  const { profile, isAdmin } = useProfile();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const displayName =
    (profile?.full_name && profile.full_name.trim()) ||
    profile?.email ||
    (lang === "ar" ? company.currentUser.nameAr : company.currentUser.name);
  const displayEmail = profile?.email ?? company.currentUser.email;
  const initial = (displayName || "?").slice(0, 1).toUpperCase();

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
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-7 w-7 rounded-md object-cover" />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#D4AF37] to-[#B8912A] text-xs font-bold text-[#081C3A]">
                {initial}
              </div>
            )}
            <span className="hidden md:inline text-xs font-medium text-white/80 max-w-[140px] truncate">
              {displayName}
            </span>
            {isAdmin && (
              <span className="hidden md:inline rounded bg-[#D4AF37]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#D4AF37]">
                ADMIN
              </span>
            )}
          </button>
          <AnimatePresence>
            {userOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute end-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0A1B3A]/95 backdrop-blur-2xl shadow-2xl"
              >
                <div className="border-b border-white/10 px-4 py-3">
                  <div className="text-sm font-semibold text-white truncate">{displayName}</div>
                  <div className="mt-0.5 text-xs text-white/50 truncate">{displayEmail}</div>
                  {isAdmin && (
                    <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-[#D4AF37]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#D4AF37]">
                      <ShieldCheck size={10} /> Administrator
                    </div>
                  )}
                </div>
                <ul className="py-1 text-sm">
                  {isAdmin && (
                    <li>
                      <Link
                        to="/admin"
                        onClick={() => setUserOpen(false)}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-[#D4AF37] hover:bg-white/[0.05]"
                      >
                        <ShieldCheck size={14} />
                        إدارة المستخدمين
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => setUserOpen(false)}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-white/70 hover:bg-white/[0.05] hover:text-white"
                    >
                      <User size={14} />
                      {t("profile")}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setUserOpen(false)}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-white/70 hover:bg-white/[0.05] hover:text-white"
                    >
                      <Settings size={14} />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={async () => {
                        const { supabase } = await import("@/integrations/supabase/client");
                        await supabase.auth.signOut();
                        window.location.href = "/auth";
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-white/70 hover:bg-white/[0.05] hover:text-white"
                    >
                      <LogOut size={14} />
                      {t("signOut")}
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
