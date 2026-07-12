import { useMemo } from "react";

const rand = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Animated spiral galaxy built with pure CSS/SVG — no assets, GPU-friendly.
export function Galaxy({ stars = 260 }: { stars?: number }) {
  const particles = useMemo(() => {
    // Distribute stars along a logarithmic spiral with 2 arms.
    return Array.from({ length: stars }).map((_, i) => {
      const arm = i % 2 === 0 ? 0 : Math.PI; // two arms offset by π
      const t = rand(i * 13.37) * 6 + 0.4; // radius factor
      const jitter = (rand(i * 91.7) - 0.5) * 0.9;
      const angle = t * 1.15 + arm + jitter;
      const radius = t * 34; // px from center
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.45; // squash → disk
      const size = 0.6 + rand(i * 3.3) * 2.2;
      const hue = 220 + rand(i * 5.1) * 90; // blue → violet → pink
      const alpha = 0.35 + rand(i * 7.7) * 0.6;
      const delay = rand(i * 2.9) * 4;
      return { x, y, size, hue, alpha, delay };
    });
  }, [stars]);

  const orbits = [
    { r: 120, dur: 18, size: 10, color: "#60a5fa", glow: "#3b82f6" },
    { r: 175, dur: 28, size: 7, color: "#f0abfc", glow: "#c026d3" },
    { r: 235, dur: 42, size: 14, color: "#fde68a", glow: "#f59e0b" },
  ];

  return (
    <div className="galaxy-wrap relative mx-auto flex aspect-square w-full max-w-[640px] items-center justify-center">
      {/* Outer glow halo */}
      <div
        className="absolute inset-0 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)",
        }}
      />

      {/* Rotating disk */}
      <div className="galaxy-spin relative h-full w-full">
        {/* Core */}
        <div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #fff 0%, #fef3c7 20%, #f59e0b 45%, rgba(217,70,239,0.5) 70%, transparent 100%)",
            boxShadow:
              "0 0 60px 20px rgba(251,191,36,0.55), 0 0 120px 40px rgba(139,92,246,0.35)",
          }}
        />
        {/* Stars along the arms */}
        {particles.map((p, i) => (
          <span
            key={i}
            className="galaxy-star absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`,
              background: `hsla(${p.hue}, 95%, 78%, ${p.alpha})`,
              boxShadow:
                p.size > 1.6
                  ? `0 0 ${p.size * 4}px hsla(${p.hue}, 95%, 75%, 0.9)`
                  : undefined,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Orbiting planets (counter-rotate wrapper so planets don't spin visually) */}
      {orbits.map((o, i) => (
        <div
          key={i}
          className="galaxy-orbit absolute left-1/2 top-1/2"
          style={{
            width: `${o.r * 2}px`,
            height: `${o.r * 2}px`,
            marginLeft: `-${o.r}px`,
            marginTop: `-${o.r}px`,
            animationDuration: `${o.dur}s`,
            animationDirection: i % 2 ? "reverse" : "normal",
          }}
        >
          <span
            className="absolute rounded-full"
            style={{
              width: `${o.size}px`,
              height: `${o.size}px`,
              top: `-${o.size / 2}px`,
              left: `calc(50% - ${o.size / 2}px)`,
              background: `radial-gradient(circle at 30% 30%, #fff, ${o.color} 55%, ${o.glow})`,
              boxShadow: `0 0 ${o.size * 2}px ${o.glow}`,
            }}
          />
          {/* faint orbit ring */}
          <div
            className="absolute inset-0 rounded-full border border-white/5"
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}