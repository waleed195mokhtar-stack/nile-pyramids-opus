import { useMemo } from "react";
import { motion } from "framer-motion";

export function ParticleBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: 10 + Math.random() * 18,
        delay: Math.random() * 6,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,42,85,0.9),rgba(5,15,34,1))]" />
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(212,175,55,0.08), transparent 25%, rgba(15,42,85,0.4) 50%, transparent 75%, rgba(212,175,55,0.08))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(15,42,85,0.6),transparent_60%)] blur-3xl" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37]/60"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            x: [0, 12, 0],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
