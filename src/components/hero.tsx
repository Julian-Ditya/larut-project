import type { CSSProperties } from "react";
import { MaskLines, Reveal, Scramble } from "@/lib/motion";
import { Marquee } from "./marquee";
import Image from "next/image";

const BUBBLES = [
  { left: "6%", size: 14, dur: "11s", delay: "0s" },
  { left: "14%", size: 8, dur: "9s", delay: "2.2s" },
  { left: "24%", size: 18, dur: "13s", delay: "1s" },
  { left: "38%", size: 10, dur: "10s", delay: "3.4s" },
  { left: "52%", size: 22, dur: "14s", delay: ".6s" },
  { left: "64%", size: 12, dur: "9.5s", delay: "2.8s" },
  { left: "76%", size: 16, dur: "12s", delay: "1.6s" },
  { left: "88%", size: 9, dur: "10.5s", delay: "4s" },
];

export function Hero() {
  return (
    <section id="atas" className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-lime/40 blur-[130px]" />
      <div aria-hidden className="pointer-events-none absolute -left-44 top-1/2 h-[420px] w-[420px] rounded-full bg-tang/15 blur-[120px]" />
      <div aria-hidden className="text-outline pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none text-center font-display text-[22vw] font-black leading-none tracking-tighter opacity-70">
        LARUT
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-24 md:px-8 lg:grid-cols-12 lg:gap-8">
        {/* kiri */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-mist px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tang opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tang" />
              </span>
              Teh botani bersoda — Seri No.01
            </p>
          </Reveal>

          <MaskLines
            className="font-display text-[13vw] font-black uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-[6.2rem]"
            lines={[
              <>Seduh <span className="text-fern">12 jam</span></>,
              <>pelan-pelan.</>,
              <>Buka, <span className="relative inline-block">3 detik.<span aria-hidden className="absolute -bottom-1 left-0 h-3 w-full -rotate-1 bg-lime/80" /></span></>,
            ]}
          />

          <Reveal delay={350} className="mt-7 max-w-md text-lg leading-relaxed text-ink/70">
            Sereh, pandan, dan perasan nipis diseduh dingin semalaman — lalu dikarbonasi lembut.{" "}
            <Scramble text="LARUT No.01" className="font-semibold text-ink" />: rasa kebun, gelembung kota.
          </Reveal>

          <Reveal delay={480} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#beli" className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-bold text-cream shadow-[6px_6px_0_0_var(--color-lime)] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--color-lime)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-lime)]">
              Pesan batch Agustus <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#komposisi" className="text-sm font-semibold underline decoration-tang decoration-2 underline-offset-4 hover:text-fern">
              Bongkar komposisinya ↓
            </a>
          </Reveal>

          <Reveal delay={600} className="mt-12 grid max-w-md grid-cols-3 divide-x divide-ink/10 border-y border-ink/10 py-4 text-center">
            {[["0", "gula tambahan"], ["38", "kkal / botol"], ["12", "jam seduh dingin"]].map(([n, l]) => (
              <div key={l} className="px-2">
                <p className="font-display text-2xl font-extrabold">{n}</p>
                <p className="text-xs text-ink/60">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* kanan */}
        <div className="relative lg:col-span-5">
          <Reveal delay={200} className="relative mx-auto w-full max-w-sm">
            <div className="bob relative overflow-hidden rounded-t-[999px] rounded-b-[28px] border-2 border-ink bg-mist shadow-[10px_10px_0_0_var(--color-ink)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                  src="https://picsum.photos/seed/larut-botani-bottle/720/960"
                  alt="Botol LARUT No.01"
                  width={720}
                  height={960}
                  priority
                  className="kenburns h-[460px] w-full object-cover md:h-[540px]"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // optional, bisa di-generate
                />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 text-cream">
                <span className="font-display text-sm font-bold tracking-wide">No.01 — SEREH PANDAN</span>
                <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-bold text-ink">250 ml</span>
              </div>
            </div>

            <div aria-hidden className="pointer-events-none absolute -inset-x-6 bottom-0 top-10 z-10">
              {BUBBLES.map((b, i) => (
                <span key={i} className="bubble" style={{ left: b.left, width: b.size, height: b.size, "--dur": b.dur, "--delay": b.delay } as CSSProperties} />
              ))}
            </div>

            <div className="absolute -left-10 -top-8 hidden h-32 w-32 place-items-center md:grid">
              <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0">
                <defs><path id="heroCircle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
                <text fill="var(--color-ink)" fontSize="9.5" fontWeight="700" letterSpacing="2.4">
                  <textPath href="#heroCircle">TANPA GULA TAMBAHAN • BOTANI LOKAL •</textPath>
                </text>
              </svg>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-tang font-display text-2xl font-black text-cream">*</span>
            </div>

            <Reveal delay={500} className="absolute -right-6 top-24 rotate-3 rounded-xl border border-ink/15 bg-cream px-3 py-2 text-xs font-bold shadow-md">🌿 sereh wangi</Reveal>
            <Reveal delay={620} className="absolute -left-8 bottom-32 -rotate-2 rounded-xl border border-ink/15 bg-cream px-3 py-2 text-xs font-bold shadow-md">🍃 pandan muda</Reveal>
          </Reveal>
        </div>
      </div>

      <Marquee
        items={["KIRIM SELURUH INDONESIA", "BATCH 07 — AGUSTUS 2026", "0% GULA TAMBAHAN", "SEDUH DINGIN 12 JAM", "3 BOTANI LOKAL"]}
        className="relative border-y-2 border-ink bg-lime py-3 font-display text-sm font-bold uppercase tracking-[0.22em] text-ink"
      />
    </section>
  );
}