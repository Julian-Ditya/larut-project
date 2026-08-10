"use client";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

// ✅ Fix: pakai useSyncExternalStore — cara resmi React 18 untuk subscribe ke external store
const subscribeToMediaQuery = (query: string, cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => subscribeToMediaQuery("(prefers-reduced-motion: reduce)", cb),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false // server snapshot
  );
}

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  step = 110,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  step?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`mask-lines ${inView ? "is-in" : ""} ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className={`mask-line ${lineClassName}`}>
          <span style={{ "--d": `${i * step}ms` } as CSSProperties}>{l}</span>
        </span>
      ))}
    </div>
  );
}

const GLYPHS = "#%&@$≠*+=?";

export function Scramble({
  text,
  className = "",
  speed = 26,
  startDelay = 150,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(text);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (reduced) {
      const id = setTimeout(() => {
        if (mountedRef.current) setOut(text);
      }, 0);
      return () => {
        mountedRef.current = false;
        clearTimeout(id);
      };
    }

    let frame = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const solved = Math.floor(frame / 2);
        if (solved >= text.length) {
          if (mountedRef.current) setOut(text);
          clearInterval(interval);
          return;
        }
        if (mountedRef.current) {
          setOut(
            text
              .split("")
              .map((c, i) =>
                c === " "
                  ? " "
                  : i < solved
                  ? c
                  : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              )
              .join("")
          );
        }
      }, speed);
    }, startDelay);

    return () => {
      mountedRef.current = false;
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, reduced, speed, startDelay]);

  return <span className={className}>{out}</span>;
}

export function CountUp({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      const id = setTimeout(() => {
        if (mountedRef.current) setVal(to);
      }, 0);
      return () => {
        mountedRef.current = false;
        clearTimeout(id);
      };
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          if (!mountedRef.current) return;
          const p = Math.min(1, (t - t0) / duration);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      mountedRef.current = false;
      io.disconnect();
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}