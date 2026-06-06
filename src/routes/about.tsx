import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Award, Heart, Users, Mountain } from "lucide-react";
import portrait from "@/assets/installation-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Gowher Mushtaq — Founder, Kashmir Solar Power" },
      { name: "description", content: "Meet Gowher Mushtaq — engineer, entrepreneur and founder of Kashmir Solar Power, on a mission to electrify J&K with the sun." },
      { property: "og:title", content: "About — Kashmir Solar Power" },
      { property: "og:description", content: "Our story, our team and our mission for the Kashmir valley." },
      { property: "og:image", content: portrait },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-36 md:pt-44 pb-16 max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-[var(--brand-green)] uppercase tracking-[0.2em] text-xs font-semibold">Our story</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold leading-[1.02]">
            Built by Kashmir.<br /><span className="text-gradient-brand">For Kashmir.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Kashmir Solar Power was founded in 2015 by <strong className="text-foreground">Gowher Mushtaq</strong>,
            an electrical engineer from Chadoora who watched too many valley homes lose power
            in winter — and decided to do something about it.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            What started as a single 3 kW install on his own rooftop has grown into the valley&apos;s
            most trusted solar company, with 520+ installations across Budgam, Srinagar, Anantnag
            and Pulwama. Every system we build is engineered for our specific climate: snow loads,
            sub-zero winters, and the longest sun-hours in northern India.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-[var(--brand-green)]/30 to-[var(--sun)]/25 blur-3xl rounded-full" />
            <img
              src={portrait}
              alt="Kashmir Solar Power team at work"
              loading="lazy"
              className="relative rounded-3xl shadow-2xl object-cover aspect-[4/5] w-full"
            />
          </div>
        </Reveal>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">What we stand for</h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Mountain, t: "Built for the valley", d: "Every system rated for snow & winter winds." },
            { icon: Heart, t: "Honest pricing", d: "No commissions, no inflated quotes. Ever." },
            { icon: Award, t: "Premium components", d: "Only Tier-1 panels and inverters. No grey market." },
            { icon: Users, t: "Lifetime support", d: "We answer the phone — even years later." },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 0.06}>
              <div className="bg-card border border-border rounded-2xl p-6 h-full">
                <div className="h-12 w-12 rounded-xl bg-[var(--brand-green)]/12 text-[var(--brand-green)] grid place-items-center">
                  <v.icon size={22} />
                </div>
                <div className="mt-4 font-display font-semibold text-lg">{v.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{v.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="my-20 max-w-5xl mx-auto px-5 md:px-8">
        <div className="rounded-3xl bg-hero-radial text-white p-12 md:p-16 text-center">
          <blockquote className="text-2xl md:text-3xl font-display font-medium leading-snug">
            “We don&apos;t sell panels. We sell decades of clean, dependable power for the place we call home.”
          </blockquote>
          <div className="mt-6 text-sm uppercase tracking-[0.2em] text-white/70">— Gowher Mushtaq, Founder</div>
          <Link
            to="/contact"
            className="mt-8 inline-flex px-7 py-3.5 rounded-full bg-[var(--brand-green)] text-white font-semibold"
          >
            Talk to our team
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
