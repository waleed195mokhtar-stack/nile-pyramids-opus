// Fake business data for demoing the workflow across sections.
// Purely presentational — no backend calls.

export type Customer = {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  countryAr: string;
  email: string;
  phone: string;
  tier: "VIP" | "Gold" | "Silver" | "New";
  totalSpend: number;
  bookings: number;
  lastTrip: string;
  status: "active" | "inactive";
};

export const customers: Customer[] = [
  { id: "C-1042", name: "Al Falah Travel Group", nameAr: "مجموعة الفلاح للسفر", country: "Saudi Arabia", countryAr: "السعودية", email: "ops@alfalah.sa", phone: "+966 55 210 4477", tier: "VIP", totalSpend: 184200, bookings: 42, lastTrip: "2026-06-18", status: "active" },
  { id: "C-1043", name: "Meridien Voyages", nameAr: "ميريديان فوياج", country: "France", countryAr: "فرنسا", email: "contact@meridien.fr", phone: "+33 1 45 22 87 90", tier: "Gold", totalSpend: 92800, bookings: 21, lastTrip: "2026-06-02", status: "active" },
  { id: "C-1044", name: "Nippon Nile Tours", nameAr: "نيبون نايل تورز", country: "Japan", countryAr: "اليابان", email: "book@nipponnile.jp", phone: "+81 3 5412 6688", tier: "Gold", totalSpend: 76400, bookings: 18, lastTrip: "2026-05-24", status: "active" },
  { id: "C-1045", name: "Sunrise Holidays UK", nameAr: "صن رايز هوليدايز", country: "United Kingdom", countryAr: "بريطانيا", email: "hello@sunrise.co.uk", phone: "+44 20 7946 0123", tier: "Silver", totalSpend: 41200, bookings: 12, lastTrip: "2026-06-11", status: "active" },
  { id: "C-1046", name: "Andalus Trips", nameAr: "الأندلس تريبس", country: "Spain", countryAr: "إسبانيا", email: "ventas@andalus.es", phone: "+34 91 555 0187", tier: "Silver", totalSpend: 36900, bookings: 10, lastTrip: "2026-04-30", status: "active" },
  { id: "C-1047", name: "Dr. Mahmoud Family", nameAr: "عائلة د. محمود", country: "Egypt", countryAr: "مصر", email: "m.mahmoud@gmail.com", phone: "+20 100 224 6611", tier: "New", totalSpend: 4800, bookings: 1, lastTrip: "2026-06-19", status: "active" },
  { id: "C-1048", name: "Nord Reisen GmbH", nameAr: "نورد رايزن", country: "Germany", countryAr: "ألمانيا", email: "info@nord-reisen.de", phone: "+49 30 8827 4411", tier: "Gold", totalSpend: 68300, bookings: 16, lastTrip: "2026-05-08", status: "active" },
  { id: "C-1049", name: "Aurora Explorers", nameAr: "أورورا إكسبلورز", country: "USA", countryAr: "الولايات المتحدة", email: "trips@aurora-x.com", phone: "+1 415 224 8890", tier: "VIP", totalSpend: 148900, bookings: 34, lastTrip: "2026-06-14", status: "active" },
  { id: "C-1050", name: "Cairo Corporate Retreats", nameAr: "كايرو كوربوريت", country: "Egypt", countryAr: "مصر", email: "events@ccr.eg", phone: "+20 122 908 3345", tier: "Silver", totalSpend: 28400, bookings: 7, lastTrip: "2026-03-22", status: "inactive" },
];

export type Supplier = {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  contact: string;
  phone: string;
  rating: number;
  outstanding: number;
  status: "active" | "review" | "paused";
};

export const suppliers: Supplier[] = [
  { id: "S-201", name: "Movenpick Nile Cruises", nameAr: "موفنبيك للنيل", category: "Cruises", categoryAr: "رحلات نيلية", contact: "Karim H.", phone: "+20 100 442 1120", rating: 4.9, outstanding: 18400, status: "active" },
  { id: "S-202", name: "Steigenberger Hotels", nameAr: "شتيجنبرجر", category: "Hotels", categoryAr: "فنادق", contact: "Nadia F.", phone: "+20 122 887 6641", rating: 4.8, outstanding: 42200, status: "active" },
  { id: "S-203", name: "Sonesta Nile Fleet", nameAr: "سونستا نيل", category: "Cruises", categoryAr: "رحلات نيلية", contact: "Tarek A.", phone: "+20 111 220 4478", rating: 4.6, outstanding: 9600, status: "active" },
  { id: "S-204", name: "Ramses Coaches", nameAr: "رمسيس للنقل", category: "Transport", categoryAr: "نقل", contact: "Hossam M.", phone: "+20 101 554 6690", rating: 4.4, outstanding: 3200, status: "active" },
  { id: "S-205", name: "Guides Union Cairo", nameAr: "اتحاد المرشدين", category: "Tour guides", categoryAr: "مرشدين سياحيين", contact: "Amira S.", phone: "+20 100 998 2210", rating: 4.7, outstanding: 5100, status: "review" },
  { id: "S-206", name: "Falcon Domestic Air", nameAr: "فالكون للطيران", category: "Airlines", categoryAr: "طيران", contact: "Sales Desk", phone: "+20 2 2456 7788", rating: 4.5, outstanding: 21800, status: "active" },
  { id: "S-207", name: "Aswan Felucca Co.", nameAr: "فلوكة أسوان", category: "Local activities", categoryAr: "أنشطة محلية", contact: "Mostafa E.", phone: "+20 122 331 0087", rating: 4.3, outstanding: 0, status: "paused" },
  { id: "S-208", name: "Kempinski Nile", nameAr: "كمبينسكي النيل", category: "Hotels", categoryAr: "فنادق", contact: "Rania L.", phone: "+20 122 118 9900", rating: 4.9, outstanding: 15600, status: "active" },
];

export type Operation = {
  id: string;
  titleEn: string;
  titleAr: string;
  destinationEn: string;
  destinationAr: string;
  guide: string;
  pax: number;
  start: string;
  end: string;
  status: "in-progress" | "scheduled" | "completed" | "delayed";
};

export const operations: Operation[] = [
  { id: "OP-3311", titleEn: "Luxor & Aswan 5D", titleAr: "الأقصر وأسوان ٥ أيام", destinationEn: "Upper Egypt", destinationAr: "الصعيد", guide: "Omar S.", pax: 24, start: "2026-07-14", end: "2026-07-19", status: "in-progress" },
  { id: "OP-3312", titleEn: "Giza Pyramids Half-Day", titleAr: "أهرامات الجيزة نصف يوم", destinationEn: "Giza", destinationAr: "الجيزة", guide: "Layla K.", pax: 12, start: "2026-07-15", end: "2026-07-15", status: "scheduled" },
  { id: "OP-3313", titleEn: "Alexandria City Break", titleAr: "الإسكندرية", destinationEn: "Alexandria", destinationAr: "الإسكندرية", guide: "Hassan G.", pax: 18, start: "2026-07-16", end: "2026-07-18", status: "scheduled" },
  { id: "OP-3314", titleEn: "Nile Dinner Cruise", titleAr: "عشاء نيلي", destinationEn: "Cairo", destinationAr: "القاهرة", guide: "Mona A.", pax: 40, start: "2026-07-14", end: "2026-07-14", status: "in-progress" },
  { id: "OP-3315", titleEn: "White Desert Safari", titleAr: "سفاري الصحراء البيضاء", destinationEn: "Farafra", destinationAr: "الفرافرة", guide: "Ahmed R.", pax: 8, start: "2026-07-11", end: "2026-07-13", status: "delayed" },
  { id: "OP-3316", titleEn: "Red Sea Diving Retreat", titleAr: "غوص البحر الأحمر", destinationEn: "Hurghada", destinationAr: "الغردقة", guide: "Sara M.", pax: 14, start: "2026-07-05", end: "2026-07-10", status: "completed" },
  { id: "OP-3317", titleEn: "Islamic Cairo Walking Tour", titleAr: "جولة القاهرة الإسلامية", destinationEn: "Cairo", destinationAr: "القاهرة", guide: "Youssef H.", pax: 16, start: "2026-07-20", end: "2026-07-20", status: "scheduled" },
];

export type Booking = {
  id: string;
  customerEn: string;
  customerAr: string;
  packageEn: string;
  packageAr: string;
  pax: number;
  amount: number;
  date: string;
  status: "confirmed" | "pending" | "paid" | "cancelled";
};

export const bookings: Booking[] = [
  { id: "BK-9021", customerEn: "Al Falah Travel Group", customerAr: "مجموعة الفلاح", packageEn: "Luxor & Aswan 5D", packageAr: "الأقصر وأسوان ٥ أيام", pax: 24, amount: 42800, date: "2026-07-14", status: "confirmed" },
  { id: "BK-9022", customerEn: "Meridien Voyages", customerAr: "ميريديان فوياج", packageEn: "Cairo Classics 3D", packageAr: "كلاسيكيات القاهرة", pax: 12, amount: 14400, date: "2026-07-15", status: "paid" },
  { id: "BK-9023", customerEn: "Nippon Nile Tours", customerAr: "نيبون نايل", packageEn: "Nile Dinner Cruise", packageAr: "عشاء نيلي", pax: 18, amount: 3240, date: "2026-07-14", status: "confirmed" },
  { id: "BK-9024", customerEn: "Aurora Explorers", customerAr: "أورورا", packageEn: "Red Sea Diving 6D", packageAr: "غوص البحر الأحمر", pax: 14, amount: 22400, date: "2026-07-05", status: "paid" },
  { id: "BK-9025", customerEn: "Sunrise Holidays UK", customerAr: "صن رايز", packageEn: "Alexandria City Break", packageAr: "الإسكندرية", pax: 18, amount: 8100, date: "2026-07-16", status: "pending" },
  { id: "BK-9026", customerEn: "Dr. Mahmoud Family", customerAr: "عائلة محمود", packageEn: "Giza Half-Day", packageAr: "الجيزة نصف يوم", pax: 5, amount: 480, date: "2026-07-15", status: "pending" },
  { id: "BK-9027", customerEn: "Nord Reisen GmbH", customerAr: "نورد رايزن", packageEn: "White Desert Safari", packageAr: "الصحراء البيضاء", pax: 8, amount: 6400, date: "2026-07-11", status: "confirmed" },
  { id: "BK-9028", customerEn: "Andalus Trips", customerAr: "الأندلس", packageEn: "Islamic Cairo Walking", packageAr: "القاهرة الإسلامية", pax: 16, amount: 1920, date: "2026-07-20", status: "confirmed" },
  { id: "BK-9029", customerEn: "Cairo Corporate Retreats", customerAr: "كايرو كوربوريت", packageEn: "Team Retreat 2D", packageAr: "ريتريت مؤسسي", pax: 30, amount: 12600, date: "2026-06-30", status: "cancelled" },
];

export type Invoice = {
  id: string;
  clientEn: string;
  clientAr: string;
  amount: number;
  issued: string;
  due: string;
  status: "paid" | "sent" | "overdue" | "draft";
};

export const invoices: Invoice[] = [
  { id: "INV-2091", clientEn: "Al Falah Travel Group", clientAr: "الفلاح", amount: 42800, issued: "2026-07-01", due: "2026-07-30", status: "paid" },
  { id: "INV-2092", clientEn: "Meridien Voyages", clientAr: "ميريديان", amount: 14400, issued: "2026-07-03", due: "2026-08-02", status: "paid" },
  { id: "INV-2093", clientEn: "Sunrise Holidays UK", clientAr: "صن رايز", amount: 8100, issued: "2026-07-05", due: "2026-08-04", status: "sent" },
  { id: "INV-2094", clientEn: "Aurora Explorers", clientAr: "أورورا", amount: 22400, issued: "2026-06-24", due: "2026-07-24", status: "paid" },
  { id: "INV-2095", clientEn: "Nord Reisen GmbH", clientAr: "نورد رايزن", amount: 6400, issued: "2026-06-28", due: "2026-07-08", status: "overdue" },
  { id: "INV-2096", clientEn: "Andalus Trips", clientAr: "الأندلس", amount: 1920, issued: "2026-07-08", due: "2026-08-07", status: "sent" },
  { id: "INV-2097", clientEn: "Nippon Nile Tours", clientAr: "نيبون نايل", amount: 3240, issued: "2026-07-09", due: "2026-08-08", status: "draft" },
];

export type Deal = {
  id: string;
  clientEn: string;
  clientAr: string;
  value: number;
  stage: "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Won";
  owner: string;
  probability: number;
};

export const deals: Deal[] = [
  { id: "D-501", clientEn: "Al Falah Travel Group", clientAr: "الفلاح", value: 58000, stage: "Negotiation", owner: "Mona A.", probability: 75 },
  { id: "D-502", clientEn: "Aurora Explorers", clientAr: "أورورا", value: 84000, stage: "Won", owner: "Youssef H.", probability: 100 },
  { id: "D-503", clientEn: "Nord Reisen GmbH", clientAr: "نورد رايزن", value: 32000, stage: "Proposal", owner: "Sara M.", probability: 55 },
  { id: "D-504", clientEn: "Meridien Voyages", clientAr: "ميريديان", value: 21000, stage: "Qualified", owner: "Mona A.", probability: 40 },
  { id: "D-505", clientEn: "Sunrise Holidays UK", clientAr: "صن رايز", value: 14500, stage: "Lead", owner: "Ahmed R.", probability: 20 },
  { id: "D-506", clientEn: "Nippon Nile Tours", clientAr: "نيبون نايل", value: 42000, stage: "Proposal", owner: "Layla K.", probability: 60 },
];

export type Employee = {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  department: string;
  departmentAr: string;
  status: "online" | "offline" | "leave";
};

export const employeesFull: Employee[] = [
  { id: "E-01", name: "Mona A.", nameAr: "منى ع.", role: "Sales Lead", roleAr: "قائدة المبيعات", department: "Sales", departmentAr: "المبيعات", status: "online" },
  { id: "E-02", name: "Youssef H.", nameAr: "يوسف ح.", role: "Finance Manager", roleAr: "مدير المالية", department: "Finance", departmentAr: "المالية", status: "online" },
  { id: "E-03", name: "Sara M.", nameAr: "سارة م.", role: "Ops Coordinator", roleAr: "منسقة تشغيل", department: "Operations", departmentAr: "التشغيل", status: "online" },
  { id: "E-04", name: "Ahmed R.", nameAr: "أحمد ر.", role: "Procurement", roleAr: "مشتريات", department: "Operations", departmentAr: "التشغيل", status: "online" },
  { id: "E-05", name: "Layla K.", nameAr: "ليلى ك.", role: "HR Specialist", roleAr: "أخصائية موارد", department: "HR", departmentAr: "الموارد", status: "leave" },
  { id: "E-06", name: "Omar S.", nameAr: "عمر س.", role: "Senior Guide", roleAr: "مرشد أول", department: "Guides", departmentAr: "المرشدين", status: "online" },
  { id: "E-07", name: "Hassan G.", nameAr: "حسن ج.", role: "Guide", roleAr: "مرشد", department: "Guides", departmentAr: "المرشدين", status: "offline" },
  { id: "E-08", name: "Nour B.", nameAr: "نور ب.", role: "Marketing", roleAr: "تسويق", department: "Marketing", departmentAr: "التسويق", status: "online" },
];

export type FileItem = {
  id: string;
  nameEn: string;
  nameAr: string;
  owner: string;
  size: string;
  updated: string;
  type: "xlsx" | "pdf" | "docx" | "img";
};

export const files: FileItem[] = [
  { id: "F-1", nameEn: "Sales Pipeline Q3.xlsx", nameAr: "خط مبيعات Q3.xlsx", owner: "Mona A.", size: "1.2 MB", updated: "2h ago", type: "xlsx" },
  { id: "F-2", nameEn: "Supplier Contracts 2026.pdf", nameAr: "عقود موردين 2026.pdf", owner: "Ahmed R.", size: "4.8 MB", updated: "yesterday", type: "pdf" },
  { id: "F-3", nameEn: "Ops Manual v3.docx", nameAr: "دليل التشغيل v3.docx", owner: "Sara M.", size: "820 KB", updated: "3d ago", type: "docx" },
  { id: "F-4", nameEn: "Nile Cruise Photos.zip", nameAr: "صور رحلات النيل.zip", owner: "Nour B.", size: "128 MB", updated: "5d ago", type: "img" },
  { id: "F-5", nameEn: "Finance Report June.xlsx", nameAr: "تقرير مالية يونيو.xlsx", owner: "Youssef H.", size: "2.1 MB", updated: "1w ago", type: "xlsx" },
  { id: "F-6", nameEn: "Payroll Template.xlsx", nameAr: "قالب رواتب.xlsx", owner: "Layla K.", size: "340 KB", updated: "2w ago", type: "xlsx" },
];
