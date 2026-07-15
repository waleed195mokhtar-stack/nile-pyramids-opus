import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  ShieldCheck,
  Check,
  X,
  Trash2,
  ArrowLeft,
  Loader2,
  Clock,
  UserCheck,
  UserX,
  Search,
} from "lucide-react";
import {
  listAllUsers,
  approveUser,
  rejectUser,
  deleteUser,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Nile Pyramids" }] }),
  beforeLoad: ({ context }) => {
    if (!context.isAdmin) throw redirect({ to: "/" });
  },
  component: AdminPage,
});

type UserRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  roles: string[];
};

function AdminPage() {
  const qc = useQueryClient();
  const fetchList = useServerFn(listAllUsers);
  const doApprove = useServerFn(approveUser);
  const doReject = useServerFn(rejectUser);
  const doDelete = useServerFn(deleteUser);

  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [query, setQuery] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchList() as Promise<UserRow[]>,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-users"] });

  const approveMut = useMutation({
    mutationFn: (userId: string) => doApprove({ data: { userId } }),
    onSuccess: () => {
      toast.success("تمت الموافقة على المستخدم");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rejectMut = useMutation({
    mutationFn: (userId: string) => doReject({ data: { userId } }),
    onSuccess: () => {
      toast.success("تم رفض المستخدم");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (userId: string) => doDelete({ data: { userId } }),
    onSuccess: () => {
      toast.success("تم حذف المستخدم");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = users.filter((u) => {
    if (filter !== "all" && u.status !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        u.email?.toLowerCase().includes(q) ||
        u.full_name?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    all: users.length,
    pending: users.filter((u) => u.status === "pending").length,
    approved: users.filter((u) => u.status === "approved").length,
    rejected: users.filter((u) => u.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081C3A] via-[#0A2547] to-[#050f22] text-white">
      <div className="pointer-events-none fixed -top-40 -left-40 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={16} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#a8862a] text-[#081C3A]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h1
                  className="text-2xl tracking-wide text-white"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }}
                >
                  Admin — إدارة المستخدمين
                </h1>
                <p className="text-xs text-white/50">قبول، رفض، أو حذف حسابات الورك سبيس</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatPill label="الإجمالي" value={counts.all} tone="neutral" />
          <StatPill label="في الانتظار" value={counts.pending} tone="gold" icon={<Clock size={14} />} />
          <StatPill label="مفعّل" value={counts.approved} tone="green" icon={<UserCheck size={14} />} />
          <StatPill label="مرفوض" value={counts.rejected} tone="red" icon={<UserX size={14} />} />
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث بالاسم أو البريد..."
              className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 p-1">
            {(["all", "pending", "approved", "rejected"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  filter === f
                    ? "bg-[#D4AF37] text-[#081C3A]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {f === "all" ? "الكل" : f === "pending" ? "معلّق" : f === "approved" ? "مفعّل" : "مرفوض"}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-white/50 text-sm">لا يوجد مستخدمون</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.03] border-b border-white/10">
                  <tr className="text-left text-xs uppercase tracking-wider text-white/50">
                    <th className="px-4 py-3">المستخدم</th>
                    <th className="px-4 py-3">الحالة</th>
                    <th className="px-4 py-3">الدور</th>
                    <th className="px-4 py-3">تاريخ التسجيل</th>
                    <th className="px-4 py-3 text-right">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-white/5 hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#a8862a] flex items-center justify-center text-[#081C3A] font-bold text-xs">
                            {u.avatar_url ? (
                              <img src={u.avatar_url} alt="" className="h-9 w-9 rounded-full object-cover" />
                            ) : (
                              (u.full_name || u.email || "?").slice(0, 1).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {u.full_name || <span className="text-white/40">بدون اسم</span>}
                            </div>
                            <div className="text-xs text-white/50">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                      <td className="px-4 py-3">
                        {u.roles.includes("admin") ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#D4AF37]/15 px-2 py-0.5 text-xs text-[#D4AF37] font-medium">
                            <ShieldCheck size={12} /> Admin
                          </span>
                        ) : (
                          <span className="text-xs text-white/50">Member</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-white/50">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          {u.status !== "approved" && (
                            <button
                              onClick={() => approveMut.mutate(u.id)}
                              disabled={approveMut.isPending}
                              className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 px-2.5 py-1.5 text-xs font-medium transition"
                              title="قبول"
                            >
                              <Check size={12} /> قبول
                            </button>
                          )}
                          {u.status !== "rejected" && !u.roles.includes("admin") && (
                            <button
                              onClick={() => rejectMut.mutate(u.id)}
                              disabled={rejectMut.isPending}
                              className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 px-2.5 py-1.5 text-xs font-medium transition"
                              title="رفض"
                            >
                              <X size={12} /> رفض
                            </button>
                          )}
                          {!u.roles.includes("admin") && (
                            <button
                              onClick={() => {
                                if (confirm(`حذف ${u.email} نهائياً؟`)) deleteMut.mutate(u.id);
                              }}
                              disabled={deleteMut.isPending}
                              className="inline-flex items-center gap-1 rounded-md bg-red-500/15 hover:bg-red-500/25 text-red-400 px-2.5 py-1.5 text-xs font-medium transition"
                              title="حذف"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: number;
  tone: "neutral" | "gold" | "green" | "red";
  icon?: React.ReactNode;
}) {
  const toneCls = {
    neutral: "text-white/70",
    gold: "text-[#D4AF37]",
    green: "text-emerald-400",
    red: "text-red-400",
  }[tone];
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 py-3">
      <div className="flex items-center gap-1.5 text-xs text-white/50">
        {icon}
        {label}
      </div>
      <div className={`mt-1 text-2xl font-semibold ${toneCls}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  const cfg = {
    pending: { label: "معلّق", cls: "bg-[#D4AF37]/15 text-[#D4AF37]" },
    approved: { label: "مفعّل", cls: "bg-emerald-500/15 text-emerald-400" },
    rejected: { label: "مرفوض", cls: "bg-red-500/15 text-red-400" },
  }[status];
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}
