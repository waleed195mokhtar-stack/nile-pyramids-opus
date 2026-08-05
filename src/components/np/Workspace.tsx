import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ParticleBackground } from "./ParticleBackground";
import { SplashScreen } from "./SplashScreen";
import { CommandPalette } from "./CommandPalette";
import { FloatingActionButton } from "./FloatingActionButton";
import { Dashboard, GenericSection } from "./Dashboard";
import {
  CustomersSection,
  SuppliersSection,
  OperationsSection,
  BookingsSection,
  FinanceSection,
  SalesSection,
  HRSection,
  ReportsSection,
  FilesSection,
  SettingsSection,
} from "./Sections";
import { company } from "@/config/company";
import { useI18n } from "@/hooks/useI18n";
import { useAccess } from "@/hooks/useAccess";
import { GlassCard } from "./GlassCard";
import { Lock } from "lucide-react";
import { sidebarItems } from "@/config/navigation";

export function Workspace() {
  const { lang } = useI18n();
  const { canView, loading: accessLoading } = useAccess();
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeItem = sidebarItems.find((s) => s.key === active);
  const sectionLabel = activeItem ? (lang === "ar" ? activeItem.labelAr : activeItem.labelEn) : "";

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen text-white antialiased">
      <SplashScreen />
      <ParticleBackground />
      <Toaster theme="dark" position="bottom-center" />

      <div className="flex min-h-screen">
        <Sidebar
          active={active}
          onSelect={setActive}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <Header
            onOpenSidebar={() => setMobileOpen(true)}
            onOpenCommand={() => setCmdOpen(true)}
            currentSection={sectionLabel}
          />
          <main className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {!accessLoading && active !== "dashboard" && !canView(active) ? (
                  <NoAccess label={sectionLabel} />
                ) : active === "dashboard" ? (
                  <Dashboard />

                ) : active === "customers" ? (
                  <CustomersSection />
                ) : active === "suppliers" ? (
                  <SuppliersSection />
                ) : active === "operations" ? (
                  <OperationsSection />
                ) : active === "bookings" ? (
                  <BookingsSection />
                ) : active === "finance" ? (
                  <FinanceSection />
                ) : active === "sales" ? (
                  <SalesSection />
                ) : active === "hr" ? (
                  <HRSection />
                ) : active === "reports" ? (
                  <ReportsSection />
                ) : active === "files" ? (
                  <FilesSection />
                ) : active === "settings" ? (
                  <SettingsSection />
                ) : (
                  <GenericSection title={sectionLabel} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="border-t border-white/10 bg-[#050F22]/70 py-6 text-center text-xs text-white/40 backdrop-blur">
            <span className="font-serif tracking-wider text-[#D4AF37]">
              {lang === "ar" ? company.nameAr : company.name}
            </span>{" "}
            © {company.year} · Workspace
          </footer>
        </div>
      </div>

      <FloatingActionButton />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={setActive} />
    </div>
  );
}

function NoAccess({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <GlassCard className="p-12 text-center">
        <Lock size={38} className="mx-auto text-[#D4AF37]" />
        <h2 className="mt-4 font-serif text-2xl font-semibold text-white">{label}</h2>
        <p className="mt-2 text-sm text-white/55">
          ليس لديك صلاحية للوصول إلى هذا القسم — تواصل مع مدير النظام.
        </p>
      </GlassCard>
    </div>
  );
}
