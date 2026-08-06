import { CountUp, MaskLines, Reveal } from "@/lib/motion";

const STATS = [
  { n: 12, s: " jam", label: "seduh dingin, bukan direbus — aroma botani nggak ikut 'matang'." },
  { n: 3, s: "", label: "botani utama, dari kebun mitra di Cianjur & Sleman." },
  { n: 0, s: "", label: "gula tambahan — manis tipis cuma dari aren & buah." },
  { n: 2, s: "×", label: "karbonasi ringan: cukup buat angkat aroma, nggak bikin begah." },
];

export function Story() {
  return (
    <section id="cerita" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-fern">Kenapa Larut?</p>
          <MaskLines
            className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl"
            lines={[<>Teh manis itu</>, <>biasa. Teh</>, <><span className="text-fern">bercerita</span> itu</>, <>jarang.*</>]}
          />
          <p className="mt-6 max-w-sm text-ink/70">
            *cerita = sereh yang dipetik pagi, diseduh waktu kamu tidur, dan sampai di gelas masih sempat bikin kaget.
          </p>
          <Reveal delay={200} className="mt-10 overflow-hidden rounded-3xl border-2 border-ink shadow-[8px_8px_0_0_var(--color-moss)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/larut-seduh-dingin/800/600"
                  alt="Proses seduh dingin LARUT"
                  loading="lazy"
                  className="kenburns h-64 w-full object-cover md:h-80"
                />          
          </Reveal>
        </div>

        <div className="space-y-10">
          {STATS.map((st, i) => (
            <Reveal key={i} delay={i * 90} className="border-b-2 border-ink/10 pb-8">
              <p className="font-display text-7xl font-black tracking-tight md:text-8xl">
                <CountUp to={st.n} suffix={st.s} />
              </p>
              <p className="mt-2 max-w-sm text-ink/70">{st.label}</p>
            </Reveal>
          ))}
          <Reveal delay={200} className="rounded-2xl bg-mist p-6 text-sm leading-relaxed text-ink/80">
            Kami menyebutnya <b>“slow steep, fast pop”</b>: semua kesabaran ada di seduhan, semua keseruan ada di gelembungnya.
          </Reveal>
        </div>
      </div>
    </section>
  );
}