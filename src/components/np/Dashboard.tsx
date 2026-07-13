import { motion } from "framer-motion";
import { BarChart3, Briefcase, FileSpreadsheet, Package, TrendingUp, Wallet, CalendarPlus, Upload, Receipt, MapPin } from "lucide-react";
import { StatCard } from "./StatCard";
import { QuickAccessCard } from "./QuickAccessCard";
import { RevenueChart } from "./RevenueChart";
import {
  AnnouncementsWidget,
  NotesWidget,
  OnlineEmployeesWidget,
  RecentActivityWidget,
  ScheduleWidget,
  TasksWidget,
  WeatherWidget,
} from "./SideWidgets";
import { GlassCard } from "./GlassCard";
import { stats } from "@/data/mockData";
import { excelLinks } from "@/config/links";
import { useI18n } from "@/hooks/useI18n";
import { company } from "@/config/company";

const quickAccess = [
  { icon: TrendingUp, titleKey: "salesExcel", descKey: "salesExcelDesc", href: excelLinks.sales },
  { icon: Package, titleKey: "inventoryExcel", descKey: "inventoryExcelDesc", href: excelLinks.inventory },
  { icon: Briefcase, titleKey: "employeesExcel", descKey: "employeesExcelDesc", href: excelLinks.employees },
  { icon: Wallet, titleKey: "financeExcel", descKey: "financeExcelDesc", href: excelLinks.finance },
  { icon: BarChart3, titleKey: "reportsExcel", descKey: "reportsExcelDesc", href: excelLinks.reports },
] as const;

const quickActions = [
  { icon: CalendarPlus, key: "newBooking" },
  { icon: Receipt, key: "createInvoice" },
  { icon: MapPin, key: "todaysTours" },
  { icon: Upload, key: "uploadFile" },
] as const;

export function Dashboard() {
  const { lang, t } = useI18n();
  const userName = lang === "ar" ? company.currentUser.nameAr : company.currentUser.name;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F2A55] via-[#081C3A] to-[#050F22] p-8 md:p-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_60%)]" />
        <motion.div
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              {t("dashboardTitle")}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-white"
            >
              {t("welcome")},{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E8C866] bg-clip-text text-transparent">
                {userName}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 max-w-xl text-sm md:text-base text-white/60"
            >
              {t("dashboardSubtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:block"
          >
            <img
              src={company.logo}
              alt=""
              className="h-32 w-32 object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Stat cards */}
      <section className="mt-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {stats.map((s, i) => (
            <StatCard
              key={s.key}
              labelKey={s.key as any}
              value={s.value}
              delta={s.delta}
              positive={s.positive}
              icon={s.icon as any}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-8">
        <SectionTitle title={t("quickActions")} />
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {quickActions.map((qa, i) => (
            <motion.button
              key={qa.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -3 }}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-start backdrop-blur-xl hover:border-[#D4AF37]/40 hover:bg-white/[0.05]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#081C3A] transition-colors">
                <qa.icon size={18} />
              </div>
              <div className="text-sm font-medium text-white">{t(qa.key as any)}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Quick Access Excel */}
      <section className="mt-10">
        <SectionTitle title={t("quickAccess")} subtitle={t("quickAccessDesc")} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {quickAccess.map((c, i) => (
            <QuickAccessCard
              key={c.titleKey}
              icon={c.icon}
              titleKey={c.titleKey as any}
              descKey={c.descKey as any}
              href={c.href}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Chart + widgets grid */}
      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <RevenueChart />
          <div className="grid gap-5 md:grid-cols-2">
            <RecentActivityWidget />
            <AnnouncementsWidget />
          </div>
        </div>
        <div className="space-y-5">
          <WeatherWidget />
          <ScheduleWidget />
          <TasksWidget />
        </div>
      </section>

      <section className="mt-5 grid gap-5 md:grid-cols-2">
        <OnlineEmployeesWidget />
        <NotesWidget />
      </section>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/40 via-white/10 to-transparent" />
    </div>
  );
}

export function GenericSection({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <GlassCard className="p-12 text-center">
        <FileSpreadsheet size={40} className="mx-auto text-[#D4AF37]" />
        <h2 className="mt-4 font-serif text-2xl font-semibold text-white capitalize">{title}</h2>
        <p className="mt-2 text-sm text-white/50">
          This section is ready to be extended. Add your components here.
        </p>
      </GlassCard>
    </div>
  );
}
