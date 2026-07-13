import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Hotel,
  Bus,
  CalendarDays,
  Wallet,
  Package,
  Briefcase,
  BarChart3,
  FolderOpen,
  Settings,
} from "lucide-react";

export type NavItem = {
  key: string;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
};

export const sidebarItems: NavItem[] = [
  { key: "dashboard", labelEn: "Dashboard", labelAr: "الرئيسية", icon: LayoutDashboard },
  { key: "sales", labelEn: "Sales", labelAr: "المبيعات", icon: TrendingUp, badge: "12" },
  { key: "customers", labelEn: "Customers", labelAr: "العملاء", icon: Users },
  { key: "hotels", labelEn: "Hotels", labelAr: "الفنادق", icon: Hotel },
  { key: "transportation", labelEn: "Transportation", labelAr: "المواصلات", icon: Bus },
  { key: "bookings", labelEn: "Bookings", labelAr: "الحجوزات", icon: CalendarDays, badge: "5" },
  { key: "finance", labelEn: "Finance", labelAr: "المالية", icon: Wallet },
  { key: "inventory", labelEn: "Inventory", labelAr: "المخزون", icon: Package },
  { key: "hr", labelEn: "HR", labelAr: "الموارد البشرية", icon: Briefcase },
  { key: "reports", labelEn: "Reports", labelAr: "التقارير", icon: BarChart3 },
  { key: "files", labelEn: "Shared Files", labelAr: "الملفات", icon: FolderOpen },
  { key: "settings", labelEn: "Settings", labelAr: "الإعدادات", icon: Settings },
];
