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

/* ---------- Customers (Supabase-backed) ---------- */
export function CustomersSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  return (
    <CrudSection
      table="customers"
      ar={ar}
      titleEn="Customers"
      titleAr="العملاء"
      subtitleEn="Client directory, contacts and booking history"
      subtitleAr="دليل العملاء والاتصالات وسجل الحجوزات"
      searchKeys={["name", "name_ar", "country", "email", "phone"]}
      fields={[
        { key: "name", label: "Name", labelAr: "الاسم", required: true },
        { key: "name_ar", label: "Name (Arabic)", labelAr: "الاسم بالعربي" },
        { key: "country", label: "Country", labelAr: "الدولة" },
        { key: "country_ar", label: "Country (Arabic)", labelAr: "الدولة بالعربي" },
        { key: "email", label: "Email", labelAr: "البريد", type: "email" },
        { key: "phone", label: "Phone", labelAr: "الهاتف" },
        { key: "tier", label: "Tier", labelAr: "الفئة", type: "select", options: ["VIP", "Gold", "Silver", "New"], required: true,
          render: (v) => <Badge color={v === "VIP" || v === "Gold" ? "gold" : v === "New" ? "blue" : "gray"}>{String(v)}</Badge> },
        { key: "bookings", label: "Bookings", labelAr: "الحجوزات", type: "number" },
        { key: "total_spend", label: "Total Spend", labelAr: "الإنفاق", type: "number",
          render: (v) => <span className="font-semibold text-[#E8C866]">{fmt(Number(v) || 0)}</span> },
        { key: "last_trip", label: "Last Trip", labelAr: "آخر رحلة", type: "date" },
        { key: "status", label: "Status", labelAr: "الحالة", type: "select", options: ["active", "inactive"], required: true,
          render: (v) => <Badge color={v === "active" ? "green" : "gray"}>{String(v)}</Badge> },
      ]}
    />
  );
}

/* ---------- Suppliers (Supabase-backed) ---------- */
export function SuppliersSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  return (
    <CrudSection
      table="suppliers"
      ar={ar}
      titleEn="Suppliers"
      titleAr="الموردين"
      subtitleEn="Vendors, contracts and payables"
      subtitleAr="الموردون والعقود والمستحقات"
      searchKeys={["name", "name_ar", "category", "contact", "phone"]}
      fields={[
        { key: "name", label: "Name", labelAr: "الاسم", required: true },
        { key: "name_ar", label: "Name (Arabic)", labelAr: "الاسم بالعربي" },
        { key: "category", label: "Category", labelAr: "الفئة" },
        { key: "category_ar", label: "Category (Arabic)", labelAr: "الفئة بالعربي" },
        { key: "contact", label: "Contact", labelAr: "جهة الاتصال" },
        { key: "phone", label: "Phone", labelAr: "الهاتف" },
        { key: "rating", label: "Rating", labelAr: "التقييم", type: "number",
          render: (v) => <span className="text-[#E8C866]">{Number(v) || 0} ★</span> },
        { key: "outstanding", label: "Outstanding", labelAr: "المستحقات", type: "number",
          render: (v) => <span className="font-semibold">{fmt(Number(v) || 0)}</span> },
        { key: "status", label: "Status", labelAr: "الحالة", type: "select", options: ["active", "review", "paused"], required: true,
          render: (v) => <Badge color={v === "active" ? "green" : v === "review" ? "gold" : "gray"}>{String(v)}</Badge> },
      ]}
    />
  );
}

/* ---------- Operations (Supabase-backed) ---------- */
export function OperationsSection() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  return (
    <CrudSection
      table="operations"
      ar={ar}
      titleEn="Operations"
      titleAr="التشغيل"
      subtitleEn="Tours, logistics and daily execution"
      subtitleAr="الجولات والرحلات والتنفيذ اليومي"
      searchKeys={["title_en", "title_ar", "destination_en", "guide"]}
      fields={[
        { key: "title_en", label: "Tour", labelAr: "الجولة", required: true },
        { key: "title_ar", label: "Tour (Arabic)", labelAr: "الجولة بالعربي" },
        { key: "destination_en", label: "Destination", labelAr: "الوجهة" },
        { key: "destination_ar", label: "Destination (Arabic)", labelAr: "الوجهة بالعربي" },
        { key: "guide", label: "Guide", labelAr: "المرشد" },
        { key: "pax", label: "Pax", labelAr: "الركاب", type: "number" },
        { key: "start_date", label: "Start", labelAr: "البداية", type: "date" },
        { key: "end_date", label: "End", labelAr: "النهاية", type: "date" },
        { key: "status", label: "Status", labelAr: "الحالة", type: "select", options: ["scheduled", "in-progress", "completed", "delayed"], required: true,
          render: (v) => <Badge color={v === "in-progress" ? "gold" : v === "scheduled" ? "blue" : v === "completed" ? "green" : "red"}>{String(v)}</Badge> },
      ]}
    />
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
