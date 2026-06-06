import { useEffect, useRef, useState } from "react";

export function StatCounter({ value, suffix = "", label, duration = 1800 }: { value: number; suffix?: string; label: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-4xl md:text-5xl text-gradient-brand tabular-nums">
        {n.toLocaleString("en-IN")}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
