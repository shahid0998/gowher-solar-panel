## Kashmir Solar Power — Cinematic Frontend Website

A premium, multi-page marketing site for Gowher Mushtaq's solar business in J&K. Pure frontend, no backend.

### Brand
- **Logo**: uploaded Kashmir Solar Power logo (uploaded as a Lovable Asset)
- **Colors**: deep blue `#1F4E6B` + leaf green `#5BAE3F` (from logo) on warm off-white, with a dark cinematic hero section
- **Typography**: Sora (display headings) + Inter (body) — modern, trustworthy
- **Vibe**: cinematic, premium, sunrise-over-Kashmir warmth

### Pages / Routes
1. `/` — Home: full-bleed looping hero video (solar farm at sunrise / Kashmir landscape), tagline, CTA, stats counter, "why solar in Kashmir" section
2. `/services` — Residential, Commercial, Off-grid, Maintenance (cards with imagery)
3. `/projects` — Cinematic photo gallery (masonry) of installations
4. `/calculator` — Solar Savings Calculator (interactive)
5. `/about` — About Gowher Mushtaq + company story
6. `/contact` — Contact details + demo contact form (frontend-only, shows toast on submit)

Shared sticky nav with logo + footer with full contact info on every page.

### Cinematic media
- Hero background: looping muted autoplay video (royalty-free solar/Kashmir footage via Pexels/Coverr CDN URL)
- Secondary video section on Home: "See our work" reel
- High-quality photos: AI-generated (premium tier) for service cards, project gallery, about section — solar panels on Kashmiri rooftops, snow-capped mountains backdrop, technicians at work

### Solar Savings Calculator
Inputs:
- Monthly electricity bill (₹)
- Roof area available (sq ft) OR system size (kW)
- Location: fixed to J&K (sunlight hours preset ~5.2 kWh/m²/day)

Outputs (computed live):
- Recommended system size (kW)
- Estimated installation cost (₹)
- Monthly savings (₹)
- Annual savings (₹)
- Payback period (years)
- 25-year savings + CO₂ offset (kg)

Animated number reveals, results card with "Get a free quote" CTA linking to contact.

### Contact info (used in footer + contact page)
- **Owner**: Gowher Mushtaq
- **Address**: Chadoora, Budgam, J&K
- **Phone**: +91 7006919297 (click-to-call)
- **Email**: demo@kashmirsolarpower.com (click-to-mail, demo placeholder)
- Embedded Google Maps iframe for Chadoora location

### Animations & polish
- Framer Motion: fade/slide on scroll, stat counters, hero text reveal
- Smooth scroll, hover lifts on cards, gradient overlays on video
- Fully responsive (mobile-first), SEO meta per route, semantic HTML, alt text

### Technical
- TanStack Start routes under `src/routes/`
- Design tokens in `src/styles.css` (oklch)
- Components in `src/components/` (Navbar, Footer, Hero, VideoSection, Calculator, ServiceCard, ProjectGallery, StatCounter)
- Logo uploaded via `lovable-assets`
- Hero/section videos referenced via public CDN URLs (Coverr/Pexels)
- Form submit = toast notification only (no backend)
- All metadata (title/description/og) set per route
