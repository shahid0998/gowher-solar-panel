import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import a from "@/assets/hero-kashmir-solar.jpg";
import b from "@/assets/installation-team.jpg";
import c from "@/assets/commercial-solar.jpg";
import d from "@/assets/offgrid-village.jpg";
import e from "@/assets/happy-family.jpg";
import f from "@/assets/panel-closeup.jpg";
import g from "@/assets/inverter-battery.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Solar Installations Across Kashmir | Kashmir Solar Power" },
      { name: "description", content: "A visual portfolio of residential, commercial and off-grid solar installations across Budgam, Srinagar, Anantnag and Pulwama." },
      { property: "og:title", content: "Solar Projects Across Kashmir" },
      { property: "og:description", content: "A portfolio of our installations across the valley." },
      { property: "og:image", content: a },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  { img: a, title: "Rooftop home, Chadoora", kw: "5 kW", year: "2024" },
  { img: c, title: "Commercial array, Srinagar", kw: "120 kW", year: "2024" },
  { img: d, title: "Off-grid cabin, Gulmarg", kw: "3 kW + battery", year: "2023" },
  { img: e, title: "Family home, Budgam", kw: "4 kW", year: "2025" },
  { img: b, title: "School installation, Anantnag", kw: "25 kW", year: "2024" },
  { img: g, title: "Battery backup, Pulwama", kw: "10 kWh", year: "2025" },
  { img: f, title: "Premium mono-PERC array", kw: "8 kW", year: "2025" },
];

function ProjectsPage() {
  return (
    <SiteLayout>
      <section className="pt-36 md:pt-44 pb-16 max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <span className="text-[var(--brand-green)] uppercase tracking-[0.2em] text-xs font-semibold">Portfolio</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold leading-[1.02] max-w-4xl">
            520+ installations.<br /><span className="text-gradient-brand">One valley.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            A walk through some of our favorite work — from small village homes
            to commercial rooftops powering entire schools.
          </p>
        </Reveal>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-5 md:px-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 6) * 0.05}>
              <figure className="group mb-5 break-inside-avoid relative rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-2xl transition-all">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="text-xs uppercase tracking-wider text-[var(--brand-green)] font-semibold">{p.year} · {p.kw}</div>
                  <div className="mt-1 font-display text-lg font-semibold">{p.title}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
