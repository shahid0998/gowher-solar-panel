import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, Sun, Zap, Shield, Sparkles, Phone, PlayCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import heroImg from "@/assets/hero-kashmir-solar.jpg";
import installImg from "@/assets/installation-team.jpg";
import commercialImg from "@/assets/commercial-solar.jpg";
import familyImg from "@/assets/happy-family.jpg";
import houseDayImg from "@/assets/house-day.jpg"; // user-uploaded daytime photo
import houseNightImg from "@/assets/house-night.jpg"; // user-uploaded nighttime photo

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kashmir Solar Power — Cinematic Solar for J&K Homes & Businesses" },
      { name: "description", content: "Premium rooftop, commercial and off-grid solar installations across the Kashmir valley. Free site visits, lifetime support, real savings from day one." },
      { property: "og:title", content: "Kashmir Solar Power — Clean Energy for J&K" },
      { property: "og:description", content: "Cinematic solar systems engineered for the Kashmir valley." },
    ],
    links: [
      { rel: "preload", href: "https://xqkaivdsuuzznwbleshc.supabase.co/storage/v1/object/public/videos/lv_0_20260605180225.mp4", as: "video", type: "video/mp4" },
    ],
  }),
  component: HomePage,
});

// Showcase video from public directory, serving as hero and showcase reel
const HERO_VIDEO = "https://xqkaivdsuuzznwbleshc.supabase.co/storage/v1/object/public/videos/lv_0_20260605180225.mp4";

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--ink)]/85 via-[var(--brand-blue-deep)]/70 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,200,100,0.18),transparent_55%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-white/90 text-xs uppercase tracking-[0.18em] font-medium">
              <Sun size={14} className="text-[var(--sun)]" /> Powering the Kashmir Valley
            </span>
            <h1 className="mt-6 font-display font-extrabold text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Sunlight,<br />
              <span className="text-gradient-brand">engineered</span> for<br />
              the valley.
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              Premium rooftop & off-grid solar systems built for Kashmir&apos;s climate.
              Cut your bills, gain energy independence — guided by Gowher Mushtaq&apos;s team.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/calculator"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[var(--brand-green)] text-white font-semibold shadow-2xl shadow-[var(--brand-green)]/30 hover:shadow-[var(--brand-green)]/50 transition-all"
              >
                Calculate your savings
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+917006919297"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-card text-white font-semibold hover:bg-white/15 transition"
              >
                <Phone size={18} /> +91 70069 19297
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 text-xs uppercase tracking-[0.3em]"
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              <StatCounter value={520} suffix="+" label="Installations" />
              <StatCounter value={3200} suffix=" kW" label="Capacity deployed" />
              <StatCounter value={9} suffix=" yrs" label="In the valley" />
              <StatCounter value={4800} suffix="t" label="CO₂ offset" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ZERO BILLS DAY/NIGHT */}
      <ZeroBillsSection />



      {/* WHY KASHMIR */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <span className="text-[var(--brand-green)] uppercase tracking-[0.2em] text-xs font-semibold">Why solar in J&amp;K</span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05]">
                The valley gets more sun than most of India.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Kashmir averages 300+ clear-sky days a year and ~5.2 peak sun-hours daily.
                With the right system — built for snow loads and sub-zero winters — your roof
                pays back faster here than in most metros.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  { icon: Zap, t: "Up to 90% lower bills", d: "Most homes break even in 4–6 years." },
                  { icon: Shield, t: "Snow & wind rated", d: "Mounting engineered for valley winters." },
                  { icon: Sparkles, t: "Govt. subsidies", d: "We handle the entire MNRE paperwork." },
                ].map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-4">
                    <div className="shrink-0 h-11 w-11 rounded-xl bg-[var(--brand-green)]/12 text-[var(--brand-green)] grid place-items-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{t}</div>
                      <div className="text-sm text-muted-foreground">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-tr from-[var(--brand-green)]/30 to-[var(--sun)]/20 blur-3xl rounded-3xl" />
              <img
                src={installImg}
                alt="Installation team working on solar panels in Kashmir"
                loading="lazy"
                width={1600}
                height={1024}
                className="relative rounded-3xl shadow-2xl object-cover aspect-[4/3] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-xl max-w-[220px] hidden md:block">
                <div className="text-3xl font-display font-bold text-gradient-brand">9 yrs</div>
                <div className="text-xs text-muted-foreground mt-1">Serving the Kashmir valley with zero compromises.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CINEMATIC VIDEO REEL */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[var(--brand-green)] uppercase tracking-[0.2em] text-xs font-semibold">See our work</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold">A reel from the rooftops.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ShowcaseVideo />
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIAL / CTA */}
      <section className="py-20 md:py-32 bg-hero-radial text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img src={familyImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <Sparkles className="mx-auto text-[var(--sun)]" size={32} />
            <h2 className="mt-6 text-4xl md:text-6xl font-display font-bold leading-tight">
              Your roof is the most underused asset you own.
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Spend 60 seconds with our calculator and see exactly what solar would save
              your household — no email, no signup.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/calculator"
                className="px-8 py-4 rounded-full bg-[var(--brand-green)] text-white font-semibold shadow-xl hover:shadow-2xl transition"
              >
                Open the calculator
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full glass-card text-white font-semibold hover:bg-white/15 transition"
              >
                Book a free site visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function ZeroBillsSection() {
  const [mode, setMode] = useState<"morning" | "night">("morning");
  const isNight = mode === "night";

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[640px] md:min-h-[760px] w-full">
        <AnimatePresence mode="sync">
          <motion.img
            key={mode}
            src={isNight ? houseNightImg : houseDayImg}
            alt={isNight ? "Home with solar panels at night" : "Home with solar panels in daylight"}
            loading="lazy"
            width={1920}
            height={1088}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            isNight ? "bg-black/40" : "bg-white/10"
          }`}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-12 text-center">
          <h2
            className={`font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight transition-colors duration-700 ${
              isNight ? "text-white" : "text-[var(--ink)]"
            }`}
          >
            <span className={isNight ? "text-white/90" : "text-[var(--brand-blue-deep)]"}>
              ₹0 Electricity Bills
            </span>
            <br />
            <span className={isNight ? "text-white" : "text-[var(--ink)]"}>
              for the next <span className="text-[var(--brand-green)]">30 years</span>
            </span>
          </h2>
        </div>

        <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-10 flex gap-3 p-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
          {(["morning", "night"] as const).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 md:px-10 py-3 md:py-4 rounded-xl text-center transition-all ${
                  active
                    ? "bg-white text-[var(--ink)] shadow-lg"
                    : "bg-transparent text-white/90 hover:bg-white/10"
                }`}
              >
                <div className="font-display font-semibold text-base md:text-lg capitalize">
                  {m}
                </div>
                <div className="text-[11px] md:text-xs opacity-70 mt-0.5">
                  ₹0 for Electricity
                </div>
              </button>
            );
          })}
        </div>

        <p
          className={`absolute bottom-8 left-0 right-0 z-10 text-center text-sm md:text-base px-6 max-w-3xl mx-auto transition-colors duration-700 ${
            isNight ? "text-white/80" : "text-[var(--ink)]/80"
          }`}
        >
          Forget the energy market, weather conditions and seasons — our Smart Controller
          guarantees you get no electricity bill for thirty years.
        </p>
      </div>
    </section>
  );
}

function ShowcaseVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div 
      className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl group cursor-pointer" 
      onClick={handlePlay}
    >
      <video
        ref={videoRef}
        controls={isPlaying}
        preload="none"
        playsInline
        poster={commercialImg}
        className="w-full h-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      {!isPlaying && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors duration-300">
            <PlayCircle size={64} className="text-[var(--brand-green)] scale-100 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white pointer-events-none">
            <div>
              <div className="font-semibold text-lg">Kashmir Solar — Showcase Reel</div>
              <div className="text-xs text-white/70">Click to play with sound · A walkthrough of our solar installations</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

