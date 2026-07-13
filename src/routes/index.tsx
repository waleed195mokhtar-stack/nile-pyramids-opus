import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/hooks/useI18n";
import { ThemeModeProvider } from "@/hooks/useThemeMode";
import { Workspace } from "@/components/np/Workspace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nile Pyramids Workspace" },
      {
        name: "description",
        content:
          "Nile Pyramids internal workspace — bookings, sales, finance, HR and reports in one premium dashboard.",
      },
      { property: "og:title", content: "Nile Pyramids Workspace" },
      {
        property: "og:description",
        content: "The internal workspace of Nile Pyramids travel company.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeModeProvider>
      <I18nProvider>
        <Workspace />
      </I18nProvider>
    </ThemeModeProvider>
  );
}
