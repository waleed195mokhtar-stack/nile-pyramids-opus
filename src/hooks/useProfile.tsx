import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  status: "pending" | "approved" | "rejected";
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        if (mounted) {
          setProfile(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, email, full_name, avatar_url, status")
          .eq("id", user.id)
          .maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", user.id),
      ]);
      if (!mounted) return;
      setProfile((p as Profile) ?? null);
      setIsAdmin(!!r?.some((x) => x.role === "admin"));
      setLoading(false);
    }
    load();
    const { data } = supabase.auth.onAuthStateChange(() => load());
    const onRefresh = () => load();
    window.addEventListener("profile:refresh", onRefresh);
    return () => {
      mounted = false;
      data.subscription.unsubscribe();
      window.removeEventListener("profile:refresh", onRefresh);
    };
  }, []);

  return { profile, isAdmin, loading };
}
