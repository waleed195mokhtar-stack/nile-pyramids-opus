import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { PendingApproval } from "@/components/np/PendingApproval";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });

    const { data: profile } = await supabase
      .from("profiles")
      .select("status")
      .eq("id", data.user.id)
      .maybeSingle();

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id);

    const isAdmin = !!roles?.some((r) => r.role === "admin");
    const status = (profile?.status ?? "pending") as "pending" | "approved" | "rejected";

    return { user: data.user, status, isAdmin };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { status, user } = Route.useRouteContext();
  if (status !== "approved") {
    return <PendingApproval status={status} email={user.email ?? ""} />;
  }
  return <Outlet />;
}
