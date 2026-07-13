import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { useI18n } from "@/hooks/useI18n";
import type { TKey } from "@/data/translations";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  titleKey: TKey;
  descKey: TKey;
  href: string;
  index?: number;
};

export function QuickAccessCard({ icon: Icon, titleKey, descKey, href, index = 0 }: Props) {
  const { t } = useI18n();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="group block"
    >
      <GlassCard className="relative h-full overflow-hidden p-6 transition-all hover:border-[#D4AF37]/40 hover:shadow-[0_30px_60px_-20px_rgba(212,175,55,0.4)]">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />
        <div className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8912A] text-[#081C3A] shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)]">
            <Icon size={22} />
          </div>
          <div className="font-serif text-xl font-semibold text-white">{t(titleKey)}</div>
          <div className="mt-1.5 line-clamp-2 text-sm text-white/55">{t(descKey)}</div>

          <div className="mt-5 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-semibold text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#081C3A]">
              {t("open")}
              <ArrowUpRight size={14} />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/30">Excel Online</span>
          </div>
        </div>
      </GlassCard>
    </motion.a>
  );
}
