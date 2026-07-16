import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, Mail, Save, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/np/GlassCard";
import { useProfile } from "@/hooks/useProfile";
import { useI18n } from "@/hooks/useI18n";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

async function signedUrlFor(path: string) {
  const { data } = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60 * 24 * 365);
  return data?.signedUrl ?? null;
}

function ProfilePage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const { profile, loading } = useProfile();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name ?? "");
    setEmail(profile.email ?? "");
    setAvatarUrl(profile.avatar_url ?? null);
    // If avatar_url is a storage path (no http), sign it
    if (profile.avatar_url && !profile.avatar_url.startsWith("http")) {
      signedUrlFor(profile.avatar_url).then((u) => setAvatarPreview(u));
    } else {
      setAvatarPreview(profile.avatar_url ?? null);
    }
  }, [profile]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error(isAr ? "الحجم الأقصى 5MB" : "Max size is 5MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${profile.id}/avatar-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("avatars").upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (error) throw error;
      setAvatarUrl(path);
      const signed = await signedUrlFor(path);
      setAvatarPreview(signed);
      toast.success(isAr ? "تم رفع الصورة" : "Avatar uploaded");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    try {
      const { error: pErr } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim(), avatar_url: avatarUrl })
        .eq("id", profile.id);
      if (pErr) throw pErr;

      if (email && email !== profile.email) {
        const { error: eErr } = await supabase.auth.updateUser({ email });
        if (eErr) throw eErr;
        toast.success(
          isAr
            ? "تم إرسال رابط التأكيد إلى البريد الجديد"
            : "Confirmation link sent to the new email",
        );
      } else {
        toast.success(isAr ? "تم حفظ التغييرات" : "Changes saved");
      }
      window.dispatchEvent(new Event("profile:refresh"));
      router.invalidate();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  const initial = (fullName || email || "?").slice(0, 1).toUpperCase();

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-serif text-3xl text-white md:text-4xl">
          {isAr ? "الملف الشخصي" : "Your Profile"}
        </h1>
        <p className="mt-1 text-sm text-white/50">
          {isAr ? "قم بتحديث بياناتك وصورتك الشخصية" : "Update your details and profile picture"}
        </p>

        <GlassCard className="mt-8 p-6 md:p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:gap-6">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt=""
                  className="h-24 w-24 rounded-2xl object-cover ring-2 ring-[#D4AF37]/40"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8912A] text-3xl font-bold text-[#081C3A]">
                  {initial}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-2 -end-2 rounded-full border border-white/10 bg-[#0A1B3A] p-2 text-[#D4AF37] shadow-lg hover:bg-[#0F2547] disabled:opacity-50"
                aria-label="Change avatar"
              >
                {uploading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Camera size={14} />
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{fullName || email}</div>
              <div className="text-xs text-white/50">
                {isAr ? "JPG أو PNG · بحد أقصى 5MB" : "JPG or PNG · up to 5MB"}
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white/60">
                <UserIcon size={12} /> {isAr ? "الاسم الكامل" : "Full name"}
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={100}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/60"
                placeholder={isAr ? "أدخل اسمك" : "Enter your name"}
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white/60">
                <Mail size={12} /> {isAr ? "البريد الإلكتروني" : "Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/60"
                placeholder="you@example.com"
              />
              <p className="mt-1.5 text-[11px] text-white/40">
                {isAr
                  ? "عند التغيير سيتم إرسال رابط تأكيد إلى البريد الجديد."
                  : "Changing your email will send a confirmation link to the new address."}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8912A] px-5 py-2.5 text-sm font-semibold text-[#081C3A] shadow-lg hover:brightness-110 disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {isAr ? "حفظ التغييرات" : "Save changes"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
