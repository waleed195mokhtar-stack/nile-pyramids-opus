import { motion } from "framer-motion";
import { X } from "lucide-react";
import { sidebarItems } from "@/config/navigation";
import { company } from "@/config/company";
import { useI18n } from "@/hooks/useI18n";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";

type Props = {
  active: string;
  onSelect: (key: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ active, onSelect, mobileOpen, onClose }: Props) {
  const { lang, t } = useI18n();
  const { profile } = useProfile();
  const welcomeName =
    (profile?.full_name && profile.full_name.trim()) ||
    profile?.email ||
    (lang === "ar" ? company.currentUser.nameAr : company.currentUser.name);

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}
      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className={cn(
          "fixed lg:sticky top-0 z-50 h-screen w-72 shrink-0 flex-col",
          "border-e border-white/10 bg-[#050F22]/80 backdrop-blur-2xl",
          "transition-transform duration-300 flex",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          lang === "ar" && !mobileOpen && "translate-x-full lg:translate-x-0",
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <img src={company.logo} alt="" className="h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]" />
            <div>
              <div className="font-serif text-lg leading-tight tracking-wide text-white">
                {lang === "ar" ? company.nameAr : company.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                Workspace
              </div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Welcome pill */}
        <div className="px-6 pt-5">
          <div className="rounded-xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/10 to-transparent px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-[#D4AF37]/80">
              {t("welcome")}
            </div>
            <div className="mt-1 truncate font-medium text-white">
              {lang === "ar" ? company.currentUser.nameAr : company.currentUser.name}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="space-y-1">
            {sidebarItems.map((item, i) => {
              const isActive = active === item.key;
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                >
                  <button
                    onClick={() => {
                      onSelect(item.key);
                      onClose();
                    }}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all",
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute inset-y-1.5 start-0 w-[3px] rounded-full bg-[#D4AF37]"
                      />
                    )}
                    <Icon size={18} className={isActive ? "text-[#D4AF37]" : ""} />
                    <span className="flex-1 text-start">
                      {lang === "ar" ? item.labelAr : item.labelEn}
                    </span>
                    {item.badge && (
                      <span className="rounded-full bg-[#D4AF37]/20 px-2 py-0.5 text-[10px] font-semibold text-[#D4AF37]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4 text-[11px] text-white/40">
          © {company.year} {lang === "ar" ? company.nameAr : company.name}
        </div>
      </motion.aside>
    </>
  );
}
