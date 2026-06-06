import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Building2, MountainSnow, Wrench, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import residential from "@/assets/happy-family.jpg";
import commercial from "@/assets/commercial-solar.jpg";
import offgrid from "@/assets/offgrid-village.jpg";
import inverter from "@/assets/inverter-battery.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Residential, Commercial & Off-Grid Solar | Kashmir Solar Power" },
      { name: "description", content: "End-to-end solar services across J&K: residential rooftop, commercial arrays, off-grid systems, maintenance and battery storage." },
      { property: "og:title", content: "Solar Services in Kashmir" },
      { property: "og:description", content: "Residential, commercial, off-grid solar — installed by experts in Budgam." },
      { property: "og:image", content: commercial },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Home,
    title: "Residential rooftop",
    img: residential,
    desc: "Premium 1–10 kW grid-tied systems for homes across the valley. Engineered for snow loads. We handle subsidy paperwork end-to-end.",
    bullets: ["1–10 kW capacity", "Net-metering setup", "MNRE subsidy support", "25-year panel warranty"],
  },
  {
    icon: Building2,
    title: "Commercial & institutional",
    img: commercial,
    desc: "Large-scale arrays for hotels, schools, hospitals, factories and government buildings. Custom engineered to your load profile.",
    bullets: ["10 kW–1 MW systems", "Custom load analysis", "OpEx & CapEx models", "Remote monitoring"],
  },
  {
    icon: MountainSnow,
    title: "Off-grid & remote",
    img: offgrid,
    desc: "Self-contained battery systems for high-altitude homes, farmhouses and villages without reliable grid power. Truly independent.",
    bullets: ["Battery + inverter combos", "Diesel generator hybrid", "Days of autonomy", "Designed for harsh winters"],
  },
  {
    icon: Wrench,
    title: "Service & maintenance",
    img: inverter,
    desc: "Annual maintenance contracts, panel cleaning, inverter servicing, and 24/7 emergency support for any system we install.",
    bullets: ["Quarterly cleaning", "Inverter health checks", "Battery diagnostics", "AMC contracts"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-36 md:pt-44 pb-16 max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <span className="text-[var(--brand-green)] uppercase tracking-[0.2em] text-xs font-semibold">What we do</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold leading-[1.02] max-w-4xl">
            Four ways we put the <span className="text-gradient-brand">sun to work</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            From a single rooftop in Chadoora to a 500 kW commercial array in Srinagar —
            every system we build is engineered for the Kashmir valley.
          </p>
        </Reveal>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-8">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <article className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-[var(--brand-green)]/12 text-[var(--brand-green)] grid place-items-center">
                    <s.icon size={20} />
                  </div>
                  <h2 className="text-2xl font-display font-bold">{s.title}</h2>
                </div>
                <p className="mt-4 text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="my-24 max-w-5xl mx-auto px-5 md:px-8">
        <div className="rounded-3xl bg-hero-radial text-white p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            Not sure which fits your roof?
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Tell us your bill and roof size — we&apos;ll size the perfect system for you.
          </p>
          <Link
            to="/calculator"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--brand-green)] text-white font-semibold shadow-xl hover:shadow-2xl"
          >
            Try the calculator <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
