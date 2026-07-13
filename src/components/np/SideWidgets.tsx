import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cloud, Sun, CheckCircle2, Circle, Plus, Megaphone, Calendar, StickyNote, Users, Activity } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { useI18n } from "@/hooks/useI18n";
import { activities, announcements, employees, initialTasks, schedule } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function AnnouncementsWidget() {
  const { lang, t } = useI18n();
  return (
    <GlassCard className="p-5">
      <WidgetHeader icon={Megaphone} title={t("announcements")} />
      <ul className="mt-4 space-y-3">
        {announcements.map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:border-[#D4AF37]/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                {lang === "ar" ? a.tagAr : a.tagEn}
              </span>
              <span className="font-medium text-sm text-white">
                {lang === "ar" ? a.titleAr : a.titleEn}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-white/55">{lang === "ar" ? a.bodyAr : a.bodyEn}</p>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function RecentActivityWidget() {
  const { lang, t } = useI18n();
  return (
    <GlassCard className="p-5">
      <WidgetHeader icon={Activity} title={t("recentActivity")} />
      <ol className="relative mt-4 space-y-4 ps-4">
        <span className="absolute inset-y-1 start-[7px] w-px bg-gradient-to-b from-[#D4AF37]/50 via-white/10 to-transparent" />
        {activities.map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            className="relative"
          >
            <span
              className={cn(
                "absolute -start-[13px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-[#050F22]",
                a.type === "success" && "bg-emerald-400",
                a.type === "warning" && "bg-amber-400",
                a.type === "info" && "bg-[#D4AF37]",
              )}
            />
            <div className="text-sm text-white">
              <span className="font-semibold">{lang === "ar" ? a.whoAr : a.whoEn}</span>{" "}
              <span className="text-white/60">{lang === "ar" ? a.actionAr : a.actionEn}</span>
            </div>
            <div className="mt-0.5 text-[11px] text-white/40">
              {lang === "ar" ? a.timeAr : a.timeEn}
            </div>
          </motion.li>
        ))}
      </ol>
    </GlassCard>
  );
}

export function ScheduleWidget() {
  const { lang, t } = useI18n();
  return (
    <GlassCard className="p-5">
      <WidgetHeader icon={Calendar} title={t("calendar")} />
      <ul className="mt-4 space-y-2">
        {schedule.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2.5"
          >
            <div className="rounded-md bg-[#D4AF37]/15 px-2 py-1 font-mono text-xs text-[#D4AF37]">
              {s.time}
            </div>
            <div className="text-sm text-white/85">{lang === "ar" ? s.titleAr : s.titleEn}</div>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function WeatherWidget() {
  const { t } = useI18n();
  return (
    <GlassCard className="p-5">
      <WidgetHeader icon={Cloud} title={t("weather")} />
      <div className="mt-4 flex items-center gap-4">
        <div className="relative">
          <Sun size={56} className="text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
        </div>
        <div>
          <div className="font-serif text-4xl font-semibold text-white">28°C</div>
          <div className="text-xs text-white/50">Cairo · Sunny · H 32° L 20°</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        {["Tue", "Wed", "Thu", "Fri"].map((d, i) => (
          <div key={d} className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
            <div className="text-[10px] text-white/50">{d}</div>
            <Sun size={16} className="mx-auto my-1 text-[#D4AF37]" />
            <div className="text-xs font-medium text-white">{28 + i}°</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function OnlineEmployeesWidget() {
  const { t } = useI18n();
  return (
    <GlassCard className="p-5">
      <WidgetHeader icon={Users} title={t("onlineEmployees")} />
      <ul className="mt-4 space-y-2.5">
        {employees.map((e, i) => (
          <motion.li
            key={e.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.04 * i }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#0F2A55] text-xs font-bold text-white">
                {e.name.slice(0, 1)}
              </div>
              <span
                className={cn(
                  "absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-[#050F22]",
                  e.online ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" : "bg-white/20",
                )}
              />
            </div>
            <div className="flex-1">
              <div className="text-sm text-white">{e.name}</div>
              <div className="text-[11px] text-white/40">{e.role}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function TasksWidget() {
  const { lang, t } = useI18n();
  const [tasks, setTasks] = useState(initialTasks);
  const toggle = (id: number) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <GlassCard className="p-5">
      <WidgetHeader icon={CheckCircle2} title={t("tasks")} />
      <ul className="mt-4 space-y-1.5">
        {tasks.map((task, i) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
          >
            <button
              onClick={() => toggle(task.id)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-start hover:bg-white/[0.04]"
            >
              {task.done ? (
                <CheckCircle2 size={16} className="text-emerald-400" />
              ) : (
                <Circle size={16} className="text-white/40" />
              )}
              <span
                className={cn(
                  "text-sm",
                  task.done ? "text-white/40 line-through" : "text-white/85",
                )}
              >
                {lang === "ar" ? task.textAr : task.textEn}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function NotesWidget() {
  const { t } = useI18n();
  const [notes, setNotes] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("np_notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("np_notes", JSON.stringify(notes));
  }, [notes]);

  const add = () => {
    if (!draft.trim()) return;
    setNotes((n) => [draft.trim(), ...n]);
    setDraft("");
  };

  return (
    <GlassCard className="p-5">
      <WidgetHeader icon={StickyNote} title={t("notes")} />
      <div className="mt-4 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={t("notesPlaceholder")}
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/50"
        />
        <button
          onClick={add}
          className="flex items-center justify-center rounded-lg bg-[#D4AF37] px-3 text-[#081C3A] hover:brightness-110"
        >
          <Plus size={16} />
        </button>
      </div>
      <ul className="mt-3 max-h-40 space-y-1.5 overflow-y-auto">
        {notes.length === 0 && (
          <li className="text-center text-xs text-white/30 py-3">{t("empty")}</li>
        )}
        {notes.map((n, i) => (
          <li
            key={i}
            className="rounded-lg border border-white/5 bg-[#D4AF37]/[0.04] px-3 py-2 text-xs text-white/80"
          >
            {n}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

function WidgetHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/15 text-[#D4AF37]">
        <Icon size={16} />
      </div>
      <div className="font-serif text-base font-semibold text-white">{title}</div>
    </div>
  );
}
