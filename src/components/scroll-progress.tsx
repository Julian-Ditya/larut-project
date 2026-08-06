"use client";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      setP(h.scrollTop / (h.scrollHeight - h.clientHeight));
    };
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return <div aria-hidden className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-tang" style={{ transform: `scaleX(${p})` }} />;
}