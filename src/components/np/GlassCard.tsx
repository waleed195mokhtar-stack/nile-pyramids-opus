import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export function GlassCard({ className, children, ...rest }: Props) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_60%)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
