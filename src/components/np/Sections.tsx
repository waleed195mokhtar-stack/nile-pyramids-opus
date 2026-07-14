import { motion } from "framer-motion";
import { Search, Plus, Download, Filter, Star, Phone, Mail, TrendingUp, DollarSign, Users as UsersIcon, ClipboardList, Calendar, FileSpreadsheet, FileText, Image as ImageIcon, File as FileIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { useI18n } from "@/hooks/useI18n";
import {
  customers,
  suppliers,
  operations,
  bookings,
  invoices,
  deals,
  employeesFull,
  files,
} from "@/data/businessData";

const fmt = (n: number) => "$" + n.toLocaleString();

function PageShell({ title, subtitle, children, actions }: { title: string; subtitle?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white">
            <span className="bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">{title}</span>
          </h1>
          {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      </motion.div>
      {children}
    </div>
  );
}

function Toolbar({ placeholder }: { placeholder: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-xl">
        <Search size={15} className="text-white/40" />
        <input placeholder={placeholder} className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none" />
      </div>
      <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 hover:bg-white/[0.06]">
        <Filter size={13} /> Filter
      </button>
      <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 hover:bg-white/[0.06]">
        <Download size={13} /> Export
      </button>
      <button className="flex items-center gap-1.5 rounded-xl bg-[#D4AF37] px-3 py-2 text-xs font-semibold text-[#081C3A] hover:bg-[#E8C866]">
        <Plus size={13} /> New
      </button>
    </div>
  );
}

function Badge({ color, children }: { color: "green" | "gold" | "red" | "blue" | "gray"; children: React.ReactNode }) {
  const map = {
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    gold: "bg-[#D4AF37]/15 text-[#E8C866] border-[#D4AF37]/30",
    red: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    blue: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    gray: "bg-white/10 text-white/60 border-white/20",
  };
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${map[color]}`}>{children}</span>;
}

function KpiRow({ items }: { items: { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }>; delta?: string }[] }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((it, i) => (
        <motion.div key={it.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-widest text-white/50">{it.label}</div>
              <it.icon size={14} className="text-[#D4AF37]" />
            </div>
            <div className="mt-2 font-serif text-2xl font-semibold text-white">{it.value}</div>
            {it.delta && <div className="mt-0.5 text-[11px] text-emerald-300/80">{it.delta}</div>}
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-left text-[11px] uppercase tracking-widest text-white/50">
              {head.map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">{children}</tbody>
        </table>
      </div>
    </GlassCard>
  );
}

/* ---------- Customers ---------- */
export function CustomersSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const tierColor = { VIP: "gold", Gold: "gold", Silver: "gray", New: "blue" } as const;

  return (
    <PageShell title={ar ? "العملاء" : "Customers"} subtitle={ar ? "دليل العملاء والاتصالات وسجل الحجوزات" : "Client directory, contacts and booking history"}>
      <KpiRow items={[
        { label: ar ? "إجمالي العملاء" : "Total Customers", value: "342", icon: UsersIcon, delta: "+18 this month" },
        { label: "VIP", value: "24", icon: Star, delta: "+2" },
        { label: ar ? "الإيرادات YTD" : "Revenue YTD", value: "$1.24M", icon: DollarSign, delta: "+22.4%" },
        { label: ar ? "متوسط الحجز" : "Avg. Booking", value: "$4,180", icon: TrendingUp, delta: "+6%" },
      ]} />
      <Toolbar placeholder={ar ? "ابحث عن عميل…" : "Search customers…"} />
      <Table head={ar ? ["الكود", "العميل", "الدولة", "الفئة", "الحجوزات", "الإنفاق", "آخر رحلة", "الحالة"] : ["ID", "Customer", "Country", "Tier", "Bookings", "Spend", "Last Trip", "Status"]}>
        {customers.map((c, i) => (
          <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.03]">
            <td className="px-4 py-3 text-white/50 font-mono text-xs">{c.id}</td>
            <td className="px-4 py-3">
              <div className="font-medium text-white">{ar ? c.nameAr : c.name}</div>
              <div className="flex items-center gap-3 text-[11px] text-white/40">
                <span className="inline-flex items-center gap-1"><Mail size={10} />{c.email}</span>
                <span className="inline-flex items-center gap-1"><Phone size={10} />{c.phone}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-white/70">{ar ? c.countryAr : c.country}</td>
            <td className="px-4 py-3"><Badge color={tierColor[c.tier]}>{c.tier}</Badge></td>
            <td className="px-4 py-3 text-white/70">{c.bookings}</td>
            <td className="px-4 py-3 font-semibold text-[#E8C866]">{fmt(c.totalSpend)}</td>
            <td className="px-4 py-3 text-white/60">{c.lastTrip}</td>
            <td className="px-4 py-3">
              <Badge color={c.status === "active" ? "green" : "gray"}>{c.status}</Badge>
            </td>
          </motion.tr>
        ))}
      </Table>
    </PageShell>
  );
}

/* ---------- Suppliers ---------- */
export function SuppliersSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  return (
    <PageShell title={ar ? "الموردين" : "Suppliers"} subtitle={ar ? "الموردون والعقود والمستحقات" : "Vendors, contracts and payables"}>
      <KpiRow items={[
        { label: ar ? "الموردون النشطون" : "Active Suppliers", value: "68", icon: UsersIcon },
        { label: ar ? "المستحقات" : "Outstanding", value: "$115,900", icon: DollarSign, delta: "-8% MoM" },
        { label: ar ? "متوسط التقييم" : "Avg Rating", value: "4.6 ★", icon: Star },
        { label: ar ? "عقود تنتهي" : "Contracts Ending", value: "4", icon: Calendar },
      ]} />
      <Toolbar placeholder={ar ? "ابحث عن مورد…" : "Search suppliers…"} />
      <Table head={ar ? ["الكود", "المورد", "الفئة", "جهة الاتصال", "التقييم", "المستحقات", "الحالة"] : ["ID", "Supplier", "Category", "Contact", "Rating", "Outstanding", "Status"]}>
        {suppliers.map((s, i) => (
          <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.03]">
            <td className="px-4 py-3 text-white/50 font-mono text-xs">{s.id}</td>
            <td className="px-4 py-3 font-medium text-white">{ar ? s.nameAr : s.name}</td>
            <td className="px-4 py-3 text-white/70">{ar ? s.categoryAr : s.category}</td>
            <td className="px-4 py-3">
              <div className="text-white/80">{s.contact}</div>
              <div className="text-[11px] text-white/40">{s.phone}</div>
            </td>
            <td className="px-4 py-3 text-[#E8C866]">{s.rating} ★</td>
            <td className="px-4 py-3 font-semibold text-white">{fmt(s.outstanding)}</td>
            <td className="px-4 py-3">
              <Badge color={s.status === "active" ? "green" : s.status === "review" ? "gold" : "gray"}>{s.status}</Badge>
            </td>
          </motion.tr>
        ))}
      </Table>
    </PageShell>
  );
}

/* ---------- Operations ---------- */
export function OperationsSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const statusColor = { "in-progress": "gold", scheduled: "blue", completed: "green", delayed: "red" } as const;

  return (
    <PageShell title={ar ? "التشغيل" : "Operations"} subtitle={ar ? "الجولات والرحلات والتنفيذ اليومي" : "Tours, logistics and daily execution"}>
      <KpiRow items={[
        { label: ar ? "جاري تنفيذها" : "In Progress", value: "8", icon: ClipboardList },
        { label: ar ? "مجدولة اليوم" : "Scheduled Today", value: "14", icon: Calendar },
        { label: ar ? "متأخرة" : "Delayed", value: "1", icon: TrendingUp },
        { label: ar ? "إجمالي الركاب" : "Total Pax", value: "312", icon: UsersIcon, delta: "+42" },
      ]} />
      <Toolbar placeholder={ar ? "ابحث عن جولة…" : "Search operations…"} />
      <Table head={ar ? ["الكود", "الجولة", "الوجهة", "المرشد", "الركاب", "البداية", "النهاية", "الحالة"] : ["ID", "Tour", "Destination", "Guide", "Pax", "Start", "End", "Status"]}>
        {operations.map((o, i) => (
          <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.03]">
            <td className="px-4 py-3 text-white/50 font-mono text-xs">{o.id}</td>
            <td className="px-4 py-3 font-medium text-white">{ar ? o.titleAr : o.titleEn}</td>
            <td className="px-4 py-3 text-white/70">{ar ? o.destinationAr : o.destinationEn}</td>
            <td className="px-4 py-3 text-white/70">{o.guide}</td>
            <td className="px-4 py-3 text-white/70">{o.pax}</td>
            <td className="px-4 py-3 text-white/60">{o.start}</td>
            <td className="px-4 py-3 text-white/60">{o.end}</td>
            <td className="px-4 py-3"><Badge color={statusColor[o.status]}>{o.status}</Badge></td>
          </motion.tr>
        ))}
      </Table>
    </PageShell>
  );
}

/* ---------- Bookings ---------- */
export function BookingsSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const statusColor = { confirmed: "blue", paid: "green", pending: "gold", cancelled: "red" } as const;

  return (
    <PageShell title={ar ? "الحجوزات" : "Bookings"} subtitle={ar ? "جميع الحجوزات النشطة والمعلقة" : "All active and pending reservations"}>
      <KpiRow items={[
        { label: ar ? "هذا الشهر" : "This Month", value: "128", icon: Calendar, delta: "+12%" },
        { label: ar ? "قيد التأكيد" : "Pending", value: "5", icon: ClipboardList },
        { label: ar ? "الإيرادات" : "Revenue", value: "$284k", icon: DollarSign, delta: "+18%" },
        { label: ar ? "الركاب" : "Passengers", value: "612", icon: UsersIcon },
      ]} />
      <Toolbar placeholder={ar ? "ابحث بالحجز أو العميل…" : "Search by booking or client…"} />
      <Table head={ar ? ["الحجز", "العميل", "الباقة", "الركاب", "المبلغ", "التاريخ", "الحالة"] : ["Booking", "Client", "Package", "Pax", "Amount", "Date", "Status"]}>
        {bookings.map((b, i) => (
          <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.03]">
            <td className="px-4 py-3 text-white/50 font-mono text-xs">{b.id}</td>
            <td className="px-4 py-3 font-medium text-white">{ar ? b.customerAr : b.customerEn}</td>
            <td className="px-4 py-3 text-white/70">{ar ? b.packageAr : b.packageEn}</td>
            <td className="px-4 py-3 text-white/70">{b.pax}</td>
            <td className="px-4 py-3 font-semibold text-[#E8C866]">{fmt(b.amount)}</td>
            <td className="px-4 py-3 text-white/60">{b.date}</td>
            <td className="px-4 py-3"><Badge color={statusColor[b.status]}>{b.status}</Badge></td>
          </motion.tr>
        ))}
      </Table>
    </PageShell>
  );
}

/* ---------- Finance ---------- */
export function FinanceSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const statusColor = { paid: "green", sent: "blue", overdue: "red", draft: "gray" } as const;

  return (
    <PageShell title={ar ? "المالية" : "Finance"} subtitle={ar ? "الفواتير والتدفق النقدي والمصروفات" : "Invoices, cashflow and expenses"}>
      <KpiRow items={[
        { label: ar ? "إيرادات الشهر" : "Monthly Revenue", value: "$284k", icon: DollarSign, delta: "+18.6%" },
        { label: ar ? "مقبوضات" : "Received", value: "$212k", icon: TrendingUp, delta: "+8%" },
        { label: ar ? "متأخرات" : "Overdue", value: "$6.4k", icon: FileText },
        { label: ar ? "المصروفات" : "Expenses", value: "$142k", icon: DollarSign, delta: "-4%" },
      ]} />
      <Toolbar placeholder={ar ? "ابحث في الفواتير…" : "Search invoices…"} />
      <Table head={ar ? ["الفاتورة", "العميل", "المبلغ", "الإصدار", "الاستحقاق", "الحالة"] : ["Invoice", "Client", "Amount", "Issued", "Due", "Status"]}>
        {invoices.map((v, i) => (
          <motion.tr key={v.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.03]">
            <td className="px-4 py-3 text-white/80 font-mono text-xs">{v.id}</td>
            <td className="px-4 py-3 font-medium text-white">{ar ? v.clientAr : v.clientEn}</td>
            <td className="px-4 py-3 font-semibold text-[#E8C866]">{fmt(v.amount)}</td>
            <td className="px-4 py-3 text-white/60">{v.issued}</td>
            <td className="px-4 py-3 text-white/60">{v.due}</td>
            <td className="px-4 py-3"><Badge color={statusColor[v.status]}>{v.status}</Badge></td>
          </motion.tr>
        ))}
      </Table>
    </PageShell>
  );
}

/* ---------- Sales (Pipeline) ---------- */
export function SalesSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Won"] as const;
  const stageAr: Record<string, string> = { Lead: "مبدئي", Qualified: "مؤهل", Proposal: "عرض", Negotiation: "تفاوض", Won: "مغلق" };

  return (
    <PageShell title={ar ? "المبيعات" : "Sales"} subtitle={ar ? "خط المبيعات والصفقات" : "Pipeline and deals"}>
      <KpiRow items={[
        { label: ar ? "قيمة الخط" : "Pipeline Value", value: "$251k", icon: DollarSign, delta: "+12%" },
        { label: ar ? "صفقات مفتوحة" : "Open Deals", value: "24", icon: TrendingUp },
        { label: ar ? "معدل الإغلاق" : "Win Rate", value: "38%", icon: Star, delta: "+4pt" },
        { label: ar ? "متوسط الصفقة" : "Avg Deal", value: "$10.4k", icon: DollarSign },
      ]} />
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        {stages.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const total = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <GlassCard key={stage} className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">{ar ? stageAr[stage] : stage}</div>
                <div className="text-[10px] text-white/50">{stageDeals.length}</div>
              </div>
              <div className="mt-2 font-serif text-lg font-semibold text-white">{fmt(total)}</div>
              <div className="mt-3 space-y-2">
                {stageDeals.map((d) => (
                  <div key={d.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                    <div className="text-xs font-medium text-white">{ar ? d.clientAr : d.clientEn}</div>
                    <div className="mt-0.5 flex items-center justify-between text-[10px] text-white/50">
                      <span>{d.owner}</span>
                      <span className="font-semibold text-[#E8C866]">{fmt(d.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageShell>
  );
}

/* ---------- HR ---------- */
export function HRSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  return (
    <PageShell title={ar ? "الموارد البشرية" : "Human Resources"} subtitle={ar ? "الموظفون والمناوبات والحضور" : "Staff, shifts and attendance"}>
      <KpiRow items={[
        { label: ar ? "إجمالي الموظفين" : "Headcount", value: "68", icon: UsersIcon },
        { label: ar ? "متصل الآن" : "Online Now", value: "42", icon: TrendingUp, delta: "+3" },
        { label: ar ? "في إجازة" : "On Leave", value: "6", icon: Calendar },
        { label: ar ? "توظيف مفتوح" : "Open Roles", value: "4", icon: ClipboardList },
      ]} />
      <Toolbar placeholder={ar ? "ابحث عن موظف…" : "Search employees…"} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {employeesFull.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <GlassCard className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C866] font-serif font-bold text-[#081C3A]">
                  {e.name.charAt(0)}
                  <span className={`absolute bottom-0 end-0 h-2.5 w-2.5 rounded-full border-2 border-[#081C3A] ${e.status === "online" ? "bg-emerald-400" : e.status === "leave" ? "bg-amber-400" : "bg-white/30"}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-white">{ar ? e.nameAr : e.name}</div>
                  <div className="truncate text-[11px] text-white/50">{ar ? e.roleAr : e.role}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">{ar ? e.departmentAr : e.department}</div>
                <Badge color={e.status === "online" ? "green" : e.status === "leave" ? "gold" : "gray"}>{e.status}</Badge>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}

/* ---------- Reports ---------- */
export function ReportsSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const reports = [
    { name: ar ? "أداء المبيعات — يوليو" : "Sales Performance — July", kpi: "$284k", change: "+18.6%", owner: "Mona A." },
    { name: ar ? "تحليل العملاء VIP" : "VIP Customer Analysis", kpi: "24 clients", change: "+12%", owner: "Youssef H." },
    { name: ar ? "مصاريف التشغيل" : "Operational Expenses", kpi: "$142k", change: "-4%", owner: "Sara M." },
    { name: ar ? "أداء الموردين Q2" : "Supplier Performance Q2", kpi: "4.6 ★", change: "+0.2", owner: "Ahmed R." },
    { name: ar ? "متوسط الرضا" : "Customer Satisfaction", kpi: "94%", change: "+3pt", owner: "Nour B." },
    { name: ar ? "تقرير الرواتب" : "Payroll Report", kpi: "$88k", change: "+2%", owner: "Layla K." },
  ];
  return (
    <PageShell title={ar ? "التقارير" : "Reports"} subtitle={ar ? "لوحات الأداء والمؤشرات الشهرية" : "Dashboards and monthly KPIs"}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r, i) => (
          <motion.div key={r.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-5 hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                  <FileSpreadsheet size={18} />
                </div>
                <span className="text-[11px] font-semibold text-emerald-300">{r.change}</span>
              </div>
              <div className="mt-4 font-medium text-white">{r.name}</div>
              <div className="mt-1 font-serif text-2xl font-semibold text-[#E8C866]">{r.kpi}</div>
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-white/50">
                <span>{ar ? "بواسطة" : "Owner"}: {r.owner}</span>
                <button className="text-[#D4AF37] hover:underline">{ar ? "فتح" : "Open"} →</button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}

/* ---------- Files ---------- */
export function FilesSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const iconFor = (t: string) => {
    if (t === "xlsx") return FileSpreadsheet;
    if (t === "pdf") return FileText;
    if (t === "img") return ImageIcon;
    return FileIcon;
  };
  return (
    <PageShell title={ar ? "الملفات المشتركة" : "Shared Files"} subtitle={ar ? "مستندات الفريق ومرفقات العمل" : "Team documents and work attachments"}>
      <Toolbar placeholder={ar ? "ابحث في الملفات…" : "Search files…"} />
      <Table head={ar ? ["الاسم", "المالك", "الحجم", "آخر تحديث"] : ["Name", "Owner", "Size", "Updated"]}>
        {files.map((f, i) => {
          const Icon = iconFor(f.type);
          return (
            <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.03] cursor-pointer">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon size={16} />
                  </div>
                  <span className="font-medium text-white">{ar ? f.nameAr : f.nameEn}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-white/70">{f.owner}</td>
              <td className="px-4 py-3 text-white/60">{f.size}</td>
              <td className="px-4 py-3 text-white/60">{f.updated}</td>
            </motion.tr>
          );
        })}
      </Table>
    </PageShell>
  );
}

/* ---------- Settings ---------- */
export function SettingsSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  return (
    <PageShell title={ar ? "الإعدادات" : "Settings"} subtitle={ar ? "تفضيلات الحساب والفريق" : "Account and team preferences"}>
      <div className="grid gap-5 md:grid-cols-2">
        {[
          { t: ar ? "الملف الشخصي" : "Profile", d: ar ? "الاسم والصورة وبيانات الاتصال" : "Name, avatar and contact details" },
          { t: ar ? "الشركة" : "Company", d: ar ? "الهوية والعنوان والعملة" : "Identity, address and currency" },
          { t: ar ? "التنبيهات" : "Notifications", d: ar ? "البريد والدفع والتنبيهات داخل التطبيق" : "Email, push and in-app alerts" },
          { t: ar ? "الفريق" : "Team", d: ar ? "المستخدمون والأدوار والصلاحيات" : "Users, roles and permissions" },
          { t: ar ? "التكاملات" : "Integrations", d: ar ? "OneDrive و Excel Online و Google" : "OneDrive, Excel Online and Google" },
          { t: ar ? "الأمان" : "Security", d: ar ? "كلمة المرور والمصادقة الثنائية" : "Password and 2FA" },
        ].map((s, i) => (
          <motion.div key={s.t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-6 hover:border-[#D4AF37]/40 transition-colors cursor-pointer">
              <div className="font-serif text-lg font-semibold text-white">{s.t}</div>
              <div className="mt-1 text-sm text-white/50">{s.d}</div>
              <div className="mt-4 text-xs text-[#D4AF37]">{ar ? "فتح ←" : "Open →"}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
