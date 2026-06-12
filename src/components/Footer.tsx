import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Sun } from "lucide-react";
import logo from "@/assets/kashmir-solar-logo.png";

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white/85 mt-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white rounded-xl p-1.5">
              <img src={logo} alt="Kashmir Solar Power" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg">Kashmir Solar Power</div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/50">Clean energy. Crafted in J&amp;K.</div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/65">
            Designing, installing and maintaining premium rooftop & off-grid solar systems
            across the Kashmir valley. Lower bills. Energy independence. A cleaner valley.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/55">
            <Sun size={14} className="text-[var(--sun)]" />
            <span>~5.2 sun hours/day across J&amp;K — among India&apos;s best.</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/services", "Services"],
              ["/projects", "Projects"],
              ["/calculator", "Savings Calculator"],
              ["/about", "About Gowher"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to as "/"} className="text-white/65 hover:text-[var(--brand-green)] transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[var(--brand-green)] mt-0.5 shrink-0" />
              <span className="text-white/75">4, Doyan, Chadoora<br />Srinagar, J&amp;K 191113</span>
            </li>
            <li>
              <a href="tel:+917006919297" className="flex items-center gap-3 text-white/75 hover:text-white">
                <Phone size={16} className="text-[var(--brand-green)]" /> +91 70069 19297
              </a>
            </li>
            <li>
              <a href="mailto:kashmirsolarpower71@gmail.com" className="flex items-center gap-3 text-white/75 hover:text-white">
                <Mail size={16} className="text-[var(--brand-green)]" />
                <span>kashmirsolarpower71@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Kashmir Solar Power · Proprietor: Gowher Mushtaq</p>
          <p>Built with care in the Kashmir valley.</p>
        </div>
      </div>
    </footer>
  );
}
