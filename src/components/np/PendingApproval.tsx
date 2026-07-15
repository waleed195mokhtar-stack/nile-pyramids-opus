import { Clock, XCircle, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  status: "pending" | "rejected";
  email: string;
};

export function PendingApproval({ status, email }: Props) {
  const isRejected = status === "rejected";

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#081C3A] via-[#0A2547] to-[#050f22]">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-2xl p-8 text-center">
        <div
          className={`mx-auto mb-5 h-16 w-16 rounded-full flex items-center justify-center ${
            isRejected
              ? "bg-red-500/15 text-red-400 shadow-lg shadow-red-500/20"
              : "bg-[#D4AF37]/15 text-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
          }`}
        >
          {isRejected ? <XCircle size={32} /> : <Clock size={32} />}
        </div>

        <h1
          className="text-2xl text-white tracking-wide"
          style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }}
        >
          {isRejected ? "تم رفض الطلب" : "في انتظار الموافقة"}
        </h1>
        <p className="text-white/60 text-sm mt-3 leading-relaxed">
          {isRejected
            ? "عذراً، تم رفض طلب انضمامك للورك سبيس. للاستفسار تواصل مع الإدارة."
            : "شكراً لتسجيلك. حسابك قيد المراجعة من قبل الإدارة. ستتلقى إشعاراً بمجرد تفعيل الوصول."}
        </p>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/50">
          <span className="text-white/40">الحساب: </span>
          <span className="text-white/80">{email}</span>
        </div>

        <button
          onClick={signOut}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm text-white transition"
        >
          <LogOut size={14} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
