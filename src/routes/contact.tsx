import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import emailjs from "@emailjs/browser";

// ── EmailJS config ─────────────────────────────────────────────────────────
// Sign up free at https://www.emailjs.com, create a Gmail service,
// create a template, then paste your IDs in .env
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? "";
// ──────────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(5, "Phone is required").max(30),
  email: z.string().trim().email("Invalid email").max(255).or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kashmir Solar Power | Chadoora, Srinagar" },
      { name: "description", content: "Get in touch with Kashmir Solar Power. Call +91 70069 19297 or book a free site visit. Office at 4, Doyan, Chadoora, Srinagar, J&K." },
      { property: "og:title", content: "Contact Kashmir Solar Power" },
      { property: "og:description", content: "Free site visits across the Kashmir valley." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);

    // 1️⃣ Save to Supabase (keeps a record in your database)
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || `${parsed.data.phone}@no-email.local`,
      message: parsed.data.message,
    });

    // 2️⃣ Send email to kashmirsolarpower71@gmail.com via EmailJS
    let emailSent = false;
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:    parsed.data.name,
            from_phone:   parsed.data.phone,
            from_email:   parsed.data.email || "not provided",
            message:      parsed.data.message,
            to_email:     "kashmirsolarpower71@gmail.com",
            reply_to:     parsed.data.email || "kashmirsolarpower71@gmail.com",
          },
          EMAILJS_PUBLIC_KEY
        );
        emailSent = true;
      } catch (emailErr) {
        console.error("EmailJS error:", emailErr);
      }
    }

    setLoading(false);

    if (dbError && !emailSent) {
      toast.error("Could not send message", { description: dbError.message });
      return;
    }

    toast.success("Message sent!", {
      description: "We'll call you back within 24 hours.",
    });
    setForm({ name: "", phone: "", email: "", message: "" });
  };


  return (
    <SiteLayout>
      <section className="pt-36 md:pt-44 pb-12 max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <span className="text-[var(--brand-green)] uppercase tracking-[0.2em] text-xs font-semibold">Get in touch</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold leading-[1.02] max-w-3xl">
            Let&apos;s power your <span className="text-gradient-brand">rooftop</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Call us, drop a message, or visit our office in Chadoora. Site visits are free anywhere
            in the Kashmir valley.
          </p>
        </Reveal>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-5 gap-8">
        {/* CONTACT CARDS */}
        <div className="lg:col-span-2 space-y-4">
          <ContactCard
            icon={Phone}
            label="Call us"
            value="+91 70069 19297"
            href="tel:+917006919297"
            sub="Mon–Sat · 9am to 7pm"
          />
          <ContactCard
            icon={Mail}
            label="Email us"
            value="kashmirsolarpower71@gmail.com"
            href="mailto:kashmirsolarpower71@gmail.com"
            sub="Replies within 24 hours"
          />
          <ContactCard
            icon={MapPin}
            label="Visit the office"
            value="4, Doyan, Chadoora"
            sub="Srinagar, Jammu & Kashmir — 191113"
          />
          <ContactCard
            icon={Clock}
            label="Working hours"
            value="Mon – Sat"
            sub="9:00 AM – 7:00 PM"
          />

          <div className="rounded-2xl overflow-hidden border border-border h-64">
            <iframe
              title="Kashmir Solar Power, Chadoora map"
              src="https://www.google.com/maps?q=Kashmir+Solar+Power,+Chadoora,+Jammu+and+Kashmir&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="lg:col-span-3 bg-card border border-border rounded-3xl p-8 md:p-10 space-y-5"
        >
          <h2 className="text-2xl font-display font-bold">Book a free site visit</h2>
          <p className="text-sm text-muted-foreground -mt-3">
            Fill this out — we&apos;ll get back to you within a day.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your name" required>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Gowher Mushtaq"
                className="input"
              />
            </Field>
            <Field label="Phone" required>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 70069 19297"
                className="input"
              />
            </Field>
          </div>

          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="input"
            />
          </Field>

          <Field label="Tell us about your roof" required>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Roof type, location, monthly bill, anything we should know..."
              className="input resize-none"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--brand-green)] text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60"
          >
            {loading ? "Sending..." : <>Send message <Send size={16} /></>}
          </button>
          <p className="text-xs text-muted-foreground">
            Your message goes straight to our inbox. For urgent requests, call +91 70069 19297.
          </p>
        </form>
      </section>

      <style>{`
        .input {
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          background: var(--background);
          border: 1px solid var(--border);
          font-size: 0.95rem;
          color: var(--foreground);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: var(--brand-green);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--brand-green) 20%, transparent);
        }
      `}</style>
    </SiteLayout>
  );
}

function ContactCard({
  icon: Icon, label, value, sub, href,
}: { icon: typeof Phone; label: string; value: string; sub?: string; href?: string }) {
  const Content = (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4 hover:border-[var(--brand-green)]/50 hover:shadow-md transition-all">
      <div className="h-11 w-11 rounded-xl bg-[var(--brand-green)]/12 text-[var(--brand-green)] grid place-items-center shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-display font-semibold text-foreground">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
      </div>
    </div>
  );
  return href ? <a href={href}>{Content}</a> : Content;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        {label}{required && <span className="text-[var(--brand-green)] ml-1">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
