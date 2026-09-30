"use client";
import * as Slider from "@radix-ui/react-slider";
import { useState, type CSSProperties } from "react";

const LEVELS = ["", "Kalem", "Lembut", "Pas banget", "Rame", "PECAH!"];

export function FizzMeter() {
  const [fizz, setFizz] = useState([3]);
  const bubbles = Array.from({ length: fizz[0] * 7 }, (_, i) => ({
    left: `${((i * 37) % 92) + 4}%`,
    size: 4 + ((i * 13) % 10),
    bottom: `${8 + ((i * 29) % 190)}px`,
    dur: `${3 + ((i * 7) % 5)}s`,
    delay: `${(i * 0.45) % 3}s`,
  }));

  return (
    <section id="fizz" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-fern">Laboratorium gelembung</p>
          <h2 className="mt-3 font-display text-5xl font-black uppercase tracking-tight md:text-6xl">Seberapa rame sodamu?</h2>
          <p className="mt-5 max-w-md text-ink/70">
            dikarbonasi di <b>level 3</b> — cukup buat angkat aroma botani tanpa bikin sendawa di meeting.
            Geser slidernya, lihat versi imajinernya.
          </p>

          <div className="mt-10">
            <Slider.Root value={fizz} onValueChange={setFizz} min={1} max={5} step={1} aria-label="Tingkat soda"
              className="relative flex h-6 w-full max-w-md touch-none select-none items-center">
              <Slider.Track className="relative h-2 grow rounded-full bg-ink/15">
                <Slider.Range className="absolute h-full rounded-full bg-tang" />
              </Slider.Track>
              <Slider.Thumb aria-label="Level gelembung"
                className="block h-6 w-6 rounded-full border-[3px] border-ink bg-lime shadow-[3px_3px_0_0_var(--color-ink)] transition hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-tang/40" />
            </Slider.Root>
            <div className="mt-3 flex max-w-md justify-between font-display text-xs font-bold text-ink/50">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setFizz([n])} className={`transition hover:text-ink ${fizz[0] === n ? "text-tang" : ""}`}>{n}</button>
              ))}
            </div>
            <p aria-live="polite" className="mt-6 font-display text-3xl font-black uppercase">
              Level {fizz[0]} — <span className="text-fern">{LEVELS[fizz[0]]}</span>
            </p>
            <p className="mt-2 text-sm text-ink/60">(Kami nggak akan nge-judge kalau kamu tim level 5.)</p>
          </div>
        </div>

        <div className="relative mx-auto">
          <div className="relative h-[300px] w-56 overflow-hidden rounded-b-[110px] rounded-t-2xl border-2 border-ink bg-gradient-to-b from-mist via-lime/35 to-fern/60 shadow-[10px_10px_0_0_var(--color-ink)]">
            <div className="absolute inset-x-0 top-6 h-2 rounded-full bg-cream/60 blur-[1px]" />
            {bubbles.map((b, i) => (
              <span key={`${fizz[0]}-${i}`} className="bubble-sm"
                style={{ left: b.left, width: b.size, height: b.size, bottom: b.bottom, "--dur": b.dur, "--delay": b.delay } as CSSProperties} />
            ))}
          </div>
          <p className="mt-6 text-center font-display text-xs font-bold uppercase tracking-[0.25em] text-ink/50">Gelas simulasi — bukan ukuran saji</p>
        </div>
      </div>
    </section>
  );
}