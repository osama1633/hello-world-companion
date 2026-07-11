import { useMemo } from "react";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function Starfield({ count = 180 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        top: seededRandom(count * 31 + i * 7) * 100,
        left: seededRandom(count * 47 + i * 11) * 100,
        size: seededRandom(count * 59 + i * 13) * 2 + 0.4,
        delay: seededRandom(count * 67 + i * 17) * 4,
        duration: 2 + seededRandom(count * 71 + i * 19) * 4,
        opacity: 0.4 + seededRandom(count * 73 + i * 23) * 0.6,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: s.size > 1.5 ? "0 0 6px rgba(255,255,255,0.9)" : undefined,
          }}
        />
      ))}
      {/* Shooting stars */}
      <span className="shooting-star" style={{ top: "10%", left: "80%", animationDelay: "1s" }} />
      <span className="shooting-star" style={{ top: "30%", left: "95%", animationDelay: "4s" }} />
      <span className="shooting-star" style={{ top: "60%", left: "70%", animationDelay: "7s" }} />
    </div>
  );
}