import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import astronautImg from "@/assets/astronaut-portrait.jpg";
import planetImg from "@/assets/planet.jpg";
import moonImg from "@/assets/moon-scene.jpg";
import { Starfield } from "@/components/space/Starfield";

const astronautVideo = "/videos/astronaut-cinematic.mp4";
const astronautVideoWebm = "/videos/astronaut-cinematic.webm";
const reelSpacewalk = "/videos/reel-spacewalk.mp4";
const reelMoonwalk = "/videos/reel-moonwalk.mp4";
const reelNebula = "/videos/reel-nebula.mp4";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.4]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeVideo, setActiveVideo] = useState<null | 0 | 1 | 2>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="starfield relative min-h-screen text-white">
      {/* NAV */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <a href="#" className="flex items-center gap-2 font-mono text-sm tracking-[0.3em]">
          <span className="inline-block h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          AURELIA
        </a>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-[0.25em] text-white/70 md:flex">
          <a href="#mission" className="hover:text-white">Mission</a>
          <a href="#planets" className="hover:text-white">Planets</a>
          <a href="#journey" className="hover:text-white">Journey</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <button className="glass rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] transition hover:bg-white/10">
          Book a Flight
        </button>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Starfield count={200} />

        {/* Background astronaut video */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={planetImg}
          >
            <source src={astronautVideoWebm} type="video/webm" />
            <source src={astronautVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060d]/30 via-transparent to-[#05060d]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#05060d_92%)]" />
        </motion.div>

        {/* Rotating orbit ring */}
        <div
          className="spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[110vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
          style={{
            boxShadow: "inset 0 0 200px rgba(139, 92, 246, 0.15)",
          }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.9)]" />
          <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_20px_rgba(96,165,250,0.9)]" />
        </div>

        {/* Title */}
        <motion.div
          style={{ scale: titleScale, y: heroY }}
          className="relative z-10 px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-[0.5em] text-white/60"
          >
            [ Est. 2049 · Interstellar Program ]
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif mt-6 text-[16vw] font-light leading-[0.85] tracking-tight md:text-[11vw]"
          >
            <span className="text-gradient-cosmic">Beyond</span>
            <br />
            <em className="italic text-white/95">the Stars</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto mt-8 max-w-xl text-balance text-sm text-white/70 md:text-base"
          >
            An immersive cinematic voyage through nebulae, exoplanets and the infinite
            horizons of human curiosity — one orbit at a time.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <a
              href="#mission"
              className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              <span className="relative z-10">Begin Journey ↗</span>
            </a>
            <a
              href="#planets"
              className="glass rounded-full px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Explore Worlds
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
          <div className="flex flex-col items-center gap-2">
            <span>Scroll</span>
            <span className="h-8 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>

        {/* Corner meta */}
        <div className="absolute bottom-8 left-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:block">
          LAT 00°00'N · LON 00°00'E
          <br />
          Deep Field · Sector 7-G
        </div>
        <div className="absolute bottom-8 right-6 hidden text-right font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:block">
          Aurelia Blue-9
          <br />
          Flight #A-2049
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="relative overflow-hidden py-32 md:py-48">
        <Starfield count={80} />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="md:col-span-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              ( 001 ) — Our Mission
            </p>
            <h2 className="font-serif mt-6 text-5xl leading-[1] tracking-tight md:text-7xl">
              Explore the <em className="italic text-purple-300">wonder</em> of the universe.
            </h2>
            <p className="mt-8 max-w-md text-white/70">
              Travel through endless galaxies and uncover the worlds' hidden secrets
              across distant stars and unseen worlds. We craft cinematic journeys that
              bring space closer to every human soul.
            </p>
            <div className="mt-10 flex gap-8 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              <div>
                <div className="text-3xl text-white">128</div>
                <div>Missions</div>
              </div>
              <div>
                <div className="text-3xl text-white">42</div>
                <div>Galaxies</div>
              </div>
              <div>
                <div className="text-3xl text-white">∞</div>
                <div>Horizons</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={astronautImg}
                className="h-[600px] w-full object-cover"
              >
                <source src={astronautVideoWebm} type="video/webm" />
                <source src={astronautVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060d] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
                <span>Live Feed / Deep Field</span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
                  REC · LIVE
                </span>
              </div>
              {/* corner brackets */}
              {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((c, i) => (
                <span key={i} className={`absolute h-6 w-6 border-white/40 ${c}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PLANETS */}
      <section id="planets" className="relative overflow-hidden py-32 md:py-48">
        <Starfield count={120} />
        <div
          className="nebula pointer-events-none absolute -right-40 top-1/4 h-[800px] w-[800px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #6d28d9, transparent 70%)" }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                ( 002 ) — Featured Worlds
              </p>
              <h2 className="font-serif mt-6 text-5xl leading-[1] tracking-tight md:text-7xl">
                Distant <em className="italic text-blue-300">horizons</em>.
              </h2>
            </div>
            <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-white/50 md:block">
              03 / Catalogued
            </span>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { name: "Aurelia Blue-9", cat: "Gas Giant · Neptune-class", dist: "4.2 ly", img: planetImg, id: 0 as const },
              { name: "Selene Prime", cat: "Lunar · Iron-rich", dist: "0.03 ly", img: moonImg, id: 1 as const },
              { name: "Nyx Ember", cat: "Nebula Cluster", dist: "1,250 ly", img: astronautImg, id: 2 as const },
            ].map((p, i) => (
              <motion.button
                key={p.name}
                type="button"
                onClick={() => {
                  setVideoReady(false);
                  setActiveVideo(p.id);
                }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060d] via-[#05060d]/30 to-transparent" />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                    <span>0{i + 1}</span>
                    <span>{p.dist}</span>
                  </div>
                  <h3 className="font-serif mt-3 text-3xl">{p.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                    {p.cat}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY / PARALLAX */}
      <section id="journey" className="relative min-h-screen overflow-hidden py-32">
        <div className="absolute inset-0">
          <img
            src={moonImg}
            alt=""
            className="h-full w-full object-cover opacity-60"
            loading="lazy"
            style={{
              transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px) scale(1.1)`,
              transition: "transform 0.4s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060d] via-transparent to-[#05060d]" />
        </div>
        <Starfield count={100} />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-white/60"
          >
            ( 003 ) — The Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif mt-8 text-6xl leading-[0.95] tracking-tight md:text-8xl"
          >
            One <em className="italic text-purple-300">small step</em>,
            <br />
            one giant leap.
          </motion.h2>
        </div>

        <div className="relative z-10 mx-auto mt-24 grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-4">
          {[
            { step: "01", title: "Prepare", desc: "Training in zero-G facility." },
            { step: "02", title: "Launch", desc: "T-minus 10. Ignition." },
            { step: "03", title: "Orbit", desc: "Suborbital docking sequence." },
            { step: "04", title: "Discover", desc: "First contact with the void." },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#05060d]/80 p-8 backdrop-blur-sm"
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300">
                {s.step}
              </div>
              <h4 className="font-serif mt-4 text-2xl">{s.title}</h4>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden py-32 md:py-48">
        <Starfield count={80} />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl">
            Ready to <em className="italic text-blue-300">orbit</em>?
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-white/70">
            Reserve your seat aboard the next Aurelia flight. Limited manifest —
            crew of nine per launch window.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass mx-auto mt-12 flex max-w-lg items-center gap-2 rounded-full p-2"
          >
            <input
              type="email"
              placeholder="your@transmission.space"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition hover:bg-white/90">
              Reserve
            </button>
          </form>

          <div className="mt-10 flex flex-col items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
              — Direct Channel —
            </span>
            <a
              href="https://wa.me/201221996350?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B1%D8%AD%D9%84%D8%A9%20%D8%A3%D9%88%D8%B1%D9%8A%D9%84%D9%8A%D8%A7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#25D366] px-8 py-4 font-medium text-white shadow-[0_0_40px_rgba(37,211,102,0.4)] transition hover:scale-105 hover:shadow-[0_0_60px_rgba(37,211,102,0.8)]"
            >
              <svg viewBox="0 0 32 32" className="h-6 w-6 fill-white" aria-hidden>
                <path d="M19.11 17.28c-.28-.14-1.65-.81-1.9-.9-.26-.09-.44-.14-.63.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.83-.74-1.38-1.65-1.54-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.48-.63-.49l-.54-.01c-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.34s1 2.72 1.14 2.9c.14.19 1.97 3.01 4.78 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32zM16.02 4C9.4 4 4.03 9.37 4.03 15.99c0 2.11.55 4.17 1.6 5.99L4 28l6.19-1.62a11.94 11.94 0 0 0 5.83 1.5h.01c6.62 0 11.99-5.37 11.99-11.99S22.65 4 16.02 4z"/>
              </svg>
              <span className="text-sm uppercase tracking-[0.25em]">
                Chat on WhatsApp
              </span>
              <span className="font-mono text-xs opacity-80">+20 122 199 6350</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex-row md:px-12">
          <span>© 2049 Aurelia Interstellar</span>
          <span>Transmitting from the edge of the observable universe.</span>
          <span>v1.0 · Signal ok</span>
        </div>
      </footer>

      <AnimatePresence>
        {activeVideo !== null && (
          (() => {
            const scenes = [
              { src: reelSpacewalk, poster: planetImg, name: "Aurelia Blue-9", cat: "Gas Giant · Neptune-class", dist: "4.2 light years" },
              { src: reelMoonwalk, poster: moonImg, name: "Selene Prime", cat: "Lunar · Iron-rich", dist: "0.03 light years" },
              { src: reelNebula, poster: astronautImg, name: "Nyx Ember", cat: "Nebula Cluster", dist: "1,250 light years" },
            ];
            const v = scenes[activeVideo];
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
                onClick={() => setActiveVideo(null)}
              >
                <motion.div
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#05060d] shadow-[0_0_80px_rgba(139,92,246,0.25)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
                      Now Playing · {v.name}
                    </div>
                    <button
                      onClick={() => setActiveVideo(null)}
                      aria-label="Close"
                      className="glass rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white/10"
                    >
                      Close ✕
                    </button>
                  </div>
                  <div className="relative aspect-video w-full bg-black">
                    <video
                      key={v.src}
                      poster={v.poster}
                      autoPlay
                      loop
                      controls
                      playsInline
                      muted
                      preload="auto"
                      onLoadedData={() => setVideoReady(true)}
                      onPlaying={() => setVideoReady(true)}
                      onError={() => setVideoReady(true)}
                      className="h-full w-full object-cover"
                    >
                      <source src={v.src} type="video/mp4" />
                    </video>
                    {!videoReady && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm">
                        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                          Loading transmission
                        </div>
                      </div>
                    )}
                    {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((c, i) => (
                      <span key={i} className={`pointer-events-none absolute h-6 w-6 border-white/40 ${c}`} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                        Featured World
                      </div>
                      <div className="font-serif mt-2 text-3xl">{v.name}</div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                        {v.cat}
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Distance</div>
                      <div className="font-serif mt-1 text-lg text-white">{v.dist}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
}
