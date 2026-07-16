import { createFileRoute } from "@tanstack/react-router";
import { Workspace } from "@/components/np/Workspace";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [{ title: "Nile Pyramids Workspace" }],
  }),
  component: () => <Workspace />,
});
