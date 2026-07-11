import { motion } from "framer-motion";

type Variant = "aurelia" | "selene" | "nyx";

const PALETTES: Record<Variant, { core: string; halo: string; ring: string; accent: string; bg: string }> = {
  aurelia: {
    core: "radial-gradient(circle at 30% 30%, #93c5fd 0%, #3b82f6 40%, #1e3a8a 75%, #0b1230 100%)",
    halo: "rgba(59,130,246,0.55)",
    ring: "rgba(147,197,253,0.9)",
    accent: "#60a5fa",
    bg: "radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.2), transparent 60%)",
  },
  selene: {
    core: "radial-gradient(circle at 35% 30%, #f5f5f4 0%, #a8a29e 45%, #57534e 80%, #1c1917 100%)",
    halo: "rgba(214,211,209,0.4)",
    ring: "rgba(231,229,228,0.85)",
    accent: "#e7e5e4",
    bg: "radial-gradient(ellipse at 60% 40%, rgba(168,162,158,0.2), transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.08), transparent 60%)",
  },
  nyx: {
    core: "radial-gradient(circle at 40% 35%, #fda4af 0%, #e11d48 35%, #7f1d1d 70%, #1a0505 100%)",
    halo: "rgba(225,29,72,0.55)",
    ring: "rgba(253,164,175,0.9)",
    accent: "#fb7185",
    bg: "radial-gradient(ellipse at 30% 30%, rgba(225,29,72,0.28), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(251,146,60,0.22), transparent 60%)",
  },
};

// deterministic pseudo-random stars per variant
function starsFor(seed: number, count: number) {
  const out: { x: number; y: number; s: number; d: number }[] = [];
  let x = seed * 9301 + 49297;
  const next = () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
  for (let i = 0; i < count; i++) {
    out.push({ x: next() * 100, y: next() * 100, s: 0.4 + next() * 1.6, d: 2 + next() * 5 });
  }
  return out;
}

export function AnimatedPlanet({ variant }: { variant: Variant }) {
  const p = PALETTES[variant];
  const seed = variant === "aurelia" ? 1 : variant === "selene" ? 2 : 3;
  const stars = starsFor(seed, 90);
  const orbiters = starsFor(seed + 10, 3);

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(180deg, #05060d, #0a0d1f), ${p.bg}` }}>
      {/* backdrop nebula */}
      <div className="absolute inset-0" style={{ background: p.bg, mixBlendMode: "screen" }} />

      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: 0.35 + (s.s / 2) * 0.5,
            animation: `twinkle ${s.d}s ease-in-out ${i * 0.07}s infinite`,
          }}
        />
      ))}

      {/* shooting star */}
      <span
        className="absolute h-px w-24"
        style={{
          top: "18%",
          left: "-10%",
          background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
          animation: "shooting 6s linear infinite",
          opacity: 0.8,
        }}
      />

      {/* orbit rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[1.4, 1.9, 2.5].map((k, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${k * 220}px`,
              height: `${k * 220}px`,
              left: `${-k * 110}px`,
              top: `${-k * 110}px`,
              borderColor: p.ring,
              opacity: 0.18 + i * 0.06,
              transform: `rotateX(72deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 24 + i * 8, ease: "linear", repeat: Infinity }}
          >
            <span
              className="absolute rounded-full"
              style={{
                width: 8 - i,
                height: 8 - i,
                left: "50%",
                top: -3,
                background: p.accent,
                boxShadow: `0 0 12px ${p.accent}`,
                transform: "translateX(-50%)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* planet halo */}
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: p.halo, opacity: 0.55 }}
      />

      {/* planet */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: p.core,
          boxShadow: `inset -30px -30px 80px rgba(0,0,0,0.75), 0 0 80px ${p.halo}`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {/* surface bands */}
        <div
          className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
          style={{
            background:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.15) 0 6px, transparent 6px 22px)",
          }}
        />
        {/* highlight */}
        <div
          className="absolute left-[18%] top-[15%] h-16 w-16 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)" }}
        />
      </motion.div>

      {/* planetary ring around planet */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          borderColor: p.ring,
          transform: "translate(-50%, -50%) rotate(-18deg)",
          boxShadow: `0 0 30px ${p.halo} inset`,
          opacity: 0.85,
        }}
        animate={{ rotate: [-18, 342] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      />

      {/* small moons orbiting */}
      {orbiters.map((o, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{ transformOrigin: "0 0" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 6, ease: "linear", repeat: Infinity }}
        >
          <span
            className="absolute block rounded-full"
            style={{
              width: 10 + i * 3,
              height: 10 + i * 3,
              left: 150 + i * 40,
              top: -6,
              background: p.accent,
              boxShadow: `0 0 18px ${p.halo}`,
            }}
          />
        </motion.div>
      ))}

      <style>{`
        @keyframes twinkle { 0%,100% { opacity: 0.2 } 50% { opacity: 1 } }
        @keyframes shooting {
          0% { transform: translate(0,0) rotate(20deg); opacity: 0 }
          10% { opacity: 1 }
          60% { opacity: 1 }
          100% { transform: translate(120vw, 40vh) rotate(20deg); opacity: 0 }
        }
      `}</style>
    </div>
  );
}