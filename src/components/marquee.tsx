import type { CSSProperties } from "react";

export function Marquee({ items, className = "", speed = "26s" }: { items: string[]; className?: string; speed?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap" style={{ "--speed": speed } as CSSProperties}>
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{it}</span>
            <span aria-hidden className="text-tang">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}