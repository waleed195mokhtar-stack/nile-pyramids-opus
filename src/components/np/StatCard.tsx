import { motion } from "framer-motion";
import { Activity, CalendarDays, Clock, TrendingUp, Users, Wallet } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { useI18n } from "@/hooks/useI18n";
import type { TKey } from "@/data/translations";

const iconMap = {
  calendar: CalendarDays,
  trending: TrendingUp,
  users: Users,
  clock: Clock,
  wallet: Wallet,
  activity: Activity,
} as const;

type Props = {
  labelKey: TKey;
  value: string;
  delta: string;
  positive: boolean;
  icon: keyof typeof iconMap;
  index?: number;
};

export function StatCard({ labelKey, value, delta, positive, icon, index = 0 }: Props) {
  const { t } = useI18n();
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <GlassCard className="p-5 transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.35)]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wider text-white/50">{t(labelKey)}</div>
            <div className="mt-2 font-serif text-3xl font-semibold text-white">{value}</div>
            <div
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                positive
                  ? "bg-emerald-500/10 text-emerald-300"
                  : "bg-rose-500/10 text-rose-300"
              }`}
            >
              {delta}
            </div>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/5 text-[#D4AF37] ring-1 ring-[#D4AF37]/20">
            <Icon size={20} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
