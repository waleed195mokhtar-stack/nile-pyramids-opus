import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/hooks/useI18n";
import { ThemeModeProvider } from "@/hooks/useThemeMode";
import { Workspace } from "@/components/np/Workspace";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [{ title: "Nile Pyramids Workspace" }],
  }),
  component: () => (
    <ThemeModeProvider>
      <I18nProvider>
        <Workspace />
      </I18nProvider>
    </ThemeModeProvider>
  ),
});
