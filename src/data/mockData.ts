export const stats = [
  { key: "totalBookings", value: "1,284", delta: "+12.4%", positive: true, icon: "calendar" },
  { key: "todaysSales", value: "$18,420", delta: "+3.2%", positive: true, icon: "trending" },
  { key: "activeCustomers", value: "342", delta: "+7", positive: true, icon: "users" },
  { key: "pendingRequests", value: "27", delta: "-4", positive: false, icon: "clock" },
  { key: "monthlyRevenue", value: "$284k", delta: "+18.6%", positive: true, icon: "wallet" },
  { key: "staffOnline", value: "42 / 68", delta: "live", positive: true, icon: "activity" },
] as const;

export const revenueSeries = [
  { m: "Jan", revenue: 42000, bookings: 180 },
  { m: "Feb", revenue: 51000, bookings: 210 },
  { m: "Mar", revenue: 48000, bookings: 195 },
  { m: "Apr", revenue: 61000, bookings: 240 },
  { m: "May", revenue: 72000, bookings: 285 },
  { m: "Jun", revenue: 68000, bookings: 270 },
  { m: "Jul", revenue: 84000, bookings: 320 },
  { m: "Aug", revenue: 92000, bookings: 355 },
  { m: "Sep", revenue: 78000, bookings: 300 },
  { m: "Oct", revenue: 88000, bookings: 340 },
  { m: "Nov", revenue: 95000, bookings: 375 },
  { m: "Dec", revenue: 108000, bookings: 410 },
];

export const activities = [
  { id: 1, whoEn: "Mona A.", whoAr: "منى ع.", actionEn: "closed booking #4021 — Luxor 5D", actionAr: "أغلقت الحجز #4021 — الأقصر ٥ أيام", timeEn: "2 min ago", timeAr: "منذ دقيقتين", type: "success" },
  { id: 2, whoEn: "Youssef H.", whoAr: "يوسف ح.", actionEn: "uploaded November finance report", actionAr: "رفع تقرير مالية نوفمبر", timeEn: "18 min ago", timeAr: "منذ ١٨ دقيقة", type: "info" },
  { id: 3, whoEn: "Sara M.", whoAr: "سارة م.", actionEn: "added 3 new hotels to inventory", actionAr: "أضافت ٣ فنادق للمخزون", timeEn: "1 h ago", timeAr: "منذ ساعة", type: "info" },
  { id: 4, whoEn: "System", whoAr: "النظام", actionEn: "payroll batch approved for October", actionAr: "اعتماد رواتب أكتوبر", timeEn: "3 h ago", timeAr: "منذ ٣ ساعات", type: "success" },
  { id: 5, whoEn: "Ahmed R.", whoAr: "أحمد ر.", actionEn: "flagged inventory item as low stock", actionAr: "أشار لعنصر مخزون منخفض", timeEn: "yesterday", timeAr: "أمس", type: "warning" },
];

export const announcements = [
  { id: 1, titleEn: "Ramadan working hours", titleAr: "مواعيد رمضان", bodyEn: "New shift schedule starts March 10.", bodyAr: "تبدأ جداول المناوبات الجديدة ١٠ مارس.", tagEn: "HR", tagAr: "الموارد" },
  { id: 2, titleEn: "New partner: Steigenberger", titleAr: "شراكة جديدة: شتيجنبرجر", bodyEn: "Group rates unlocked for Q1 2026 packages.", bodyAr: "أسعار مجموعات لباقات الربع الأول ٢٠٢٦.", tagEn: "Ops", tagAr: "العمليات" },
  { id: 3, titleEn: "Q4 targets exceeded", titleAr: "تحقيق أهداف الربع الأخير", bodyEn: "Congrats team — 118% of target achieved.", bodyAr: "تهانينا للفريق — تحقق ١١٨٪ من الهدف.", tagEn: "Sales", tagAr: "المبيعات" },
];

export const schedule = [
  { time: "09:00", titleEn: "Team stand-up", titleAr: "اجتماع الفريق اليومي" },
  { time: "10:30", titleEn: "Giza half-day tour departs", titleAr: "انطلاق جولة الجيزة" },
  { time: "13:00", titleEn: "Vendor call — Movenpick", titleAr: "مكالمة مع موفنبيك" },
  { time: "16:00", titleEn: "Weekly finance review", titleAr: "مراجعة مالية أسبوعية" },
];

export const employees = [
  { name: "Mona A.", role: "Sales", online: true },
  { name: "Youssef H.", role: "Finance", online: true },
  { name: "Sara M.", role: "Ops", online: true },
  { name: "Ahmed R.", role: "Inventory", online: true },
  { name: "Layla K.", role: "HR", online: false },
  { name: "Omar S.", role: "Guides", online: true },
];

export const initialTasks = [
  { id: 1, textEn: "Confirm Aswan cruise manifest", textAr: "تأكيد قائمة كروز أسوان", done: false },
  { id: 2, textEn: "Send invoice to Al Falah group", textAr: "إرسال فاتورة مجموعة الفلاح", done: false },
  { id: 3, textEn: "Approve October payroll", textAr: "اعتماد رواتب أكتوبر", done: true },
  { id: 4, textEn: "Review Q1 marketing plan", textAr: "مراجعة خطة تسويق Q1", done: false },
];

export const notifications = [
  { id: 1, titleEn: "New booking from Cairo office", titleAr: "حجز جديد من مكتب القاهرة", timeEn: "just now", timeAr: "الآن" },
  { id: 2, titleEn: "Invoice #INV-2091 paid", titleAr: "تم دفع فاتورة #INV-2091", timeEn: "12 min", timeAr: "١٢ د" },
  { id: 3, titleEn: "Payroll approval needed", titleAr: "بحاجة اعتماد الرواتب", timeEn: "1 h", timeAr: "ساعة" },
];
