import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Zap, IndianRupee, Leaf, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Solar Savings Calculator for Kashmir | Kashmir Solar Power" },
      { name: "description", content: "Estimate your solar system size, installation cost, monthly savings and payback period for your home in Kashmir." },
      { property: "og:title", content: "Solar Savings Calculator — J&K" },
      { property: "og:description", content: "See exactly what solar would save your household." },
    ],
  }),
  component: CalculatorPage,
});

// Kashmir averages ~4.2 peak sun hours/day
const SUN_HOURS = 4.2;
const TARIFF = 5.5; // ₹/kWh in J&K
const COST_PER_KW = 60000; // ₹ all-in installed cost per kW
const SYSTEM_EFFICIENCY = 0.8;
const PANEL_KW = 0.45; // 450W monocrystalline
const CO2_PER_KW_YEAR = 1100; // kg CO2 offset per kW per year
const CO2_PER_TREE_YEAR = 22; // kg CO2 per mature tree per year

function CalculatorPage() {
  const [bill, setBill] = useState(3500);
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");

  const result = useMemo(() => {
    const monthlyBill = bill;
    const isResidential = propertyType === "residential";

    // Monthly kWh consumed
    const monthlyKwh = monthlyBill / TARIFF;

    // Required capacity in kW
    let capacityKw = (monthlyKwh / 30) / (SUN_HOURS * SYSTEM_EFFICIENCY);

    // Real-world rounding
    if (capacityKw < 1.0) {
      capacityKw = 1.0;
    } else if (capacityKw <= 3.0) {
      capacityKw = Math.round(capacityKw * 2) / 2; // 0.5 kW steps
    } else {
      capacityKw = Math.round(capacityKw); // 1 kW steps
    }

    // Panels required
    const panelsNeeded = Math.ceil(capacityKw / PANEL_KW);

    // Annual savings: solar covers ~90% of bill
    const annualSavings = Math.round(monthlyBill * 12 * 0.9);
    const monthlySavings = Math.round(annualSavings / 12);

    // PM Surya Ghar subsidy (residential only)
    let subsidy = 0;
    if (isResidential) {
      if (capacityKw >= 3) subsidy = 94800;
      else if (capacityKw >= 2) subsidy = 66000;
      else if (capacityKw >= 1) subsidy = 33000;
    }

    const totalCost = capacityKw * COST_PER_KW;
    const netCost = totalCost - subsidy;

    // Payback period (clamped)
    let payback = netCost / annualSavings;
    payback = Math.round(payback * 10) / 10;
    if (payback < 3.2) payback = 3.2;
    if (payback > 5.5) payback = 5.5;

    // Environmental
    const annualCarbon = Math.round(capacityKw * CO2_PER_KW_YEAR); // kg/year
    const trees = Math.round(annualCarbon / CO2_PER_TREE_YEAR);
    const lifetimeSavings = annualSavings * 30 - netCost;
    const lifetimeCarbon = annualCarbon * 30;

    return {
      size: capacityKw,
      panels: panelsNeeded,
      cost: totalCost,
      netCost,
      subsidy,
      monthlySavings,
      annualSavings,
      payback,
      annualCarbon,
      lifetimeCarbon,
      trees,
      lifetimeSavings,
      isResidential,
    };
  }, [bill, propertyType]);

  const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

  return (
    <SiteLayout>
      <section className="pt-36 md:pt-44 pb-12 max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <span className="text-[var(--brand-green)] uppercase tracking-[0.2em] text-xs font-semibold">Savings calculator</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold leading-[1.05] max-w-3xl">
            See your <span className="text-gradient-brand">30-year savings</span> in 60 seconds.
          </h1>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Tuned for Kashmir&apos;s ~4.2 sun-hour days, J&amp;K tariffs and the latest PM Surya Ghar subsidies.
            Pick your property type and move the slider — the numbers update live.
          </p>
        </Reveal>
      </section>

      <section className="pb-24 max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-5 gap-8">
        {/* INPUTS */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 space-y-8 h-fit">
          {/* Property type toggle */}
          <div>
            <label className="text-sm font-medium text-foreground/80 mb-3 block">Property type</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-full">
              {(["residential", "commercial"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setPropertyType(t);
                    if (t === "residential" && bill > 10000) {
                      setBill(10000);
                    }
                  }}
                  className={`py-2 px-4 rounded-full text-sm font-semibold capitalize transition ${
                    propertyType === t
                      ? "bg-[var(--brand-green)] text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <SliderField
            label="Your monthly electricity bill"
            value={bill}
            min={500}
            max={propertyType === "residential" ? 10000 : 200000}
            step={propertyType === "residential" ? 100 : 1000}
            unit="₹"
            onChange={setBill}
          />

          <div className="rounded-xl bg-[var(--brand-green)]/8 border border-[var(--brand-green)]/20 p-4 text-sm text-foreground/80">
            <div className="flex items-center gap-2 font-medium text-[var(--brand-green-deep)]">
              <Sun size={16} /> Assumptions
            </div>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>· Tariff ₹{TARIFF}/kWh (J&amp;K avg)</li>
              <li>· {SUN_HOURS} peak sun hours/day · {SYSTEM_EFFICIENCY * 100}% system efficiency</li>
              <li>· ₹{COST_PER_KW.toLocaleString("en-IN")}/kW installed · 450W mono panels</li>
              <li>· PM Surya Ghar subsidy (residential only)</li>
            </ul>
          </div>
        </div>

        {/* RESULTS */}
        <motion.div
          key={`${bill}-${propertyType}`}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3 space-y-5"
        >
          <div className="rounded-3xl bg-hero-radial text-white p-8 md:p-10 relative overflow-hidden">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Recommended system</div>
            <div className="mt-2 font-display font-bold text-7xl md:text-8xl text-white tabular-nums leading-none">
              {result.size}<span className="text-3xl md:text-4xl text-[var(--brand-green)] ml-2">kW</span>
            </div>
            <div className="mt-4 text-white/75 max-w-md">
              {result.panels} × 450W panels (≈ {Math.ceil(result.size * 100)} sq ft of roof).
              Generates ~{fmt(result.size * SUN_HOURS * SYSTEM_EFFICIENCY * 30)} units/month.
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <ResultCard
              icon={IndianRupee}
              label="Installation cost"
              value={`₹${fmt(result.cost)}`}
              sub={result.isResidential ? `after ₹${fmt(result.subsidy)} subsidy: ₹${fmt(result.netCost)}` : "commercial · no PM Surya Ghar subsidy"}
            />
            <ResultCard
              icon={Zap}
              label="Monthly savings"
              value={`₹${fmt(result.monthlySavings)}`}
              sub={`₹${fmt(result.annualSavings)} / year`}
              accent
            />
            <ResultCard
              icon={Calendar}
              label="Payback period"
              value={`${result.payback.toFixed(1)} yrs`}
              sub="then it&apos;s pure profit"
            />
            <ResultCard
              icon={Leaf}
              label="Environmental impact"
              value={`${result.trees} trees/yr`}
              sub={`${fmt(result.annualCarbon)} kg CO₂ offset / year`}
            />
          </div>

          {/* Subsidy lock-in banner */}
          {result.isResidential && result.subsidy > 0 && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-[var(--brand-green)]/10 border border-[var(--brand-green)]/30 px-5 py-4 flex items-start gap-3">
                <IndianRupee className="text-[var(--brand-green-deep)] mt-0.5 shrink-0" size={20} />
                <p className="text-sm text-foreground/85">
                  Estimated central subsidy:{" "}
                  <span className="font-semibold text-[var(--brand-green-deep)]">
                    ₹{fmt(result.subsidy)}
                  </span>{" "}
                  (PM Surya Ghar scheme).
                </p>
              </div>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[var(--brand-green)] text-white font-display font-semibold text-lg hover:opacity-90 shadow-lg shadow-[var(--brand-green)]/20"
              >
                <ShieldCheck size={20} /> Lock In J&amp;K Government Subsidy
              </Link>
            </div>
          )}

          <div className="rounded-3xl bg-card border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-display font-semibold text-lg">Like what you see?</div>
              <div className="text-sm text-muted-foreground">Get a free site visit & exact quote from our team.</div>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-green)] text-white font-semibold hover:opacity-90"
            >
              Get a free quote <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

    </SiteLayout>
  );
}

function SliderField({
  label, value, min, max, step, unit, onChange,
}: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        <div className="font-display font-bold text-2xl text-[var(--brand-blue)] tabular-nums">
          {unit === "₹" ? "₹" : ""}{value.toLocaleString("en-IN")}{unit !== "₹" ? unit : ""}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--brand-green)] h-2"
      />
      <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
        <span>{unit === "₹" ? "₹" : ""}{min.toLocaleString("en-IN")}{unit !== "₹" ? unit : ""}</span>
        <span>{unit === "₹" ? "₹" : ""}{max.toLocaleString("en-IN")}{unit !== "₹" ? unit : ""}</span>
      </div>
    </div>
  );
}

function ResultCard({
  icon: Icon, label, value, sub, accent,
}: { icon: typeof Sun; label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 border ${accent ? "bg-[var(--brand-green)]/10 border-[var(--brand-green)]/30" : "bg-card border-border"}`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon size={14} className="text-[var(--brand-green)]" /> {label}
      </div>
      <div className="mt-2 font-display font-bold text-3xl text-foreground tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: sub }} />
    </div>
  );
}

