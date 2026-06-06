import { createFileRoute } from "@tanstack/react-router";
import { Snowflake, BadgeIndianRupee, Mountain, Sun, ShieldCheck, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/why-solar")({
  head: () => ({
    meta: [
      { title: "Why Go Solar in Kashmir | Kashmir Solar Power" },
      { name: "description", content: "Discover why Kashmir homes and businesses are switching to solar power — from winter outage resilience to 90% bill savings and heavy snow-load racks." },
      { property: "og:title", content: "Why Go Solar in Kashmir — J&K" },
      { property: "og:description", content: "Winter backup, massive savings, and engineered for the valley." },
    ],
  }),
  component: WhySolarPage,
});

function WhySolarPage() {
  return (
    <SiteLayout>
      <section className="pt-36 md:pt-44 pb-12 max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <span className="text-[var(--brand-green)] uppercase tracking-[0.2em] text-xs font-semibold">Engineered for J&amp;K</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold leading-[1.05] max-w-3xl">
            Why Kashmir Homes are Going <span className="text-gradient-brand">Solar</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            From harsh winters to rising electricity bills, Kashmir faces unique energy challenges.
            Here&apos;s why solar is the smartest investment for homes and businesses across the valley.
          </p>
        </Reveal>
      </section>

      <section className="pb-28 max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          <WhyCard
            icon={Snowflake}
            tint="bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]"
            title="Winter Outage Resilience"
            body="Our specialized hybrid battery backup systems seamlessly activate during winter power outages. Stay cozy, keep lights on, and power essential appliances even during heavy snowfalls."
          />
          <WhyCard
            icon={BadgeIndianRupee}
            tint="bg-[var(--brand-green)]/10 text-[var(--brand-green-deep)]"
            title="Cut Bills Up to 90%"
            body="Harness the sun's energy to slash your monthly JKPDD electricity bill. Combined with government net-metering, your system pays for itself in just 4 to 5 years, delivering free energy for decades."
          />
          <WhyCard
            icon={Mountain}
            tint="bg-amber-500/10 text-amber-600"
            title="Heavy Snow-Load Racks"
            body="We install custom high-grade aluminum mounting structures with highly-optimized tilts. These encourage snow to slide right off, preserving winter generation and withstanding harsh valley winds."
          />
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <WhyCard
            icon={Sun}
            tint="bg-orange-500/10 text-orange-600"
            title="25-Year Performance Warranty"
            body="Every system we install comes with tier-1 monocrystalline panels backed by a 25-year linear performance guarantee. We also provide 5-year workmanship warranty and dedicated J&K support."
          />
          <WhyCard
            icon={ShieldCheck}
            tint="bg-emerald-500/10 text-emerald-600"
            title="Up to ₹94,800 Subsidy"
            body="Take advantage of the PM Surya Ghar Muft Bijli Yojana. Residential installations can receive subsidies up to ₹94,800, significantly reducing your upfront investment. We handle all paperwork."
          />
          <WhyCard
            icon={ArrowRight}
            tint="bg-[var(--brand-green)]/10 text-[var(--brand-green-deep)]"
            title="Free Site Assessment"
            body="Not sure if your roof is suitable? Our engineers visit your property, assess sun exposure, roof condition, and electrical setup — then deliver a detailed feasibility report at no cost."
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function WhyCard({
  icon: Icon, tint, title, body,
}: { icon: typeof Sun; tint: string; title: string; body: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-7 hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tint}`}>
        <Icon size={22} />
      </div>
      <h3 className="mt-5 font-display font-semibold text-xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
