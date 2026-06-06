import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/kashmir-solar-logo.png.asset.json";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/why-solar" as const, label: "Why Solar" },
  { to: "/services" as const, label: "Services" },
  { to: "/projects" as const, label: "Projects" },
  { to: "/calculator" as const, label: "Calculator" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-18 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo.url}
            alt="Kashmir Solar Power"
            width={44}
            height={44}
            className="h-11 w-11 object-contain transition-transform group-hover:rotate-3"
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-bold text-base text-foreground">
              Kashmir Solar Power
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              J&amp;K · Since 2015
            </div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="px-4 py-2 text-sm font-medium text-foreground/75 hover:text-foreground rounded-full transition-colors relative data-[status=active]:text-foreground data-[status=active]:bg-accent"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/calculator"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:opacity-90 transition shadow-md shadow-secondary/20"
          >
            Free Estimate
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <ul className="px-5 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-foreground/80 hover:bg-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
