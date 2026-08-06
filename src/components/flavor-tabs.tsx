"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { MaskLines, Reveal } from "@/lib/motion";

const FLAVORS = [
  { id: "no01", code: "No.01", name: "Sereh Pandan", accent: "var(--color-lime)", seed: "larut-rasa-sereh-pandan", desc: "Varian pembuka. Wangi sereh naik duluan, pandan nemenin di tengah, nipis nutup rapi. Paling enak dingin, jam 3 sore.", notes: [["Sereh wangi", 88], ["Pandan", 74], ["Nipis", 52], ["Teh hijau", 40]], pairing: "Gorengan sore & obrolan panjang" },
  { id: "no02", code: "No.02", name: "Kunyit Asam", accent: "#ffb35c", seed: "larut-rasa-kunyit-asam", desc: "Jamu, tapi diajak jalan-jalan. Kunyit dibakar dulu biar smoky, asam jawa jaga keseimbangan, lada hitam ngasih kejutan kecil.", notes: [["Kunyit bakar", 82], ["Asam jawa", 66], ["Madu hutan", 44], ["Lada hitam", 22]], pairing: "Habis olahraga, sebelum rebah" },
  { id: "no03", code: "No.03", name: "Rosella Nipis", accent: "#ff7d9c", seed: "larut-rasa-rosella", desc: "Merah, asam, terang. Rosella dan markisa bikin varian ini paling 'teriak' — sejumput garam laut bikin semuanya duduk manis.", notes: [["Rosella", 85], ["Nipis peras", 60], ["Markisa", 48], ["Garam laut", 18]], pairing: "Makan siang pedas" },
];

export function FlavorTabs() {
  return (
    <section id="rasa" className="scroll-mt-24 border-y-2 border-ink bg-mist/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-fern">Pilih karakter</p>
        <MaskLines
          className="mt-3 font-display text-5xl font-black uppercase tracking-tight md:text-6xl"
          lines={[<>Tiga rasa,</>, <>satu gelembung.</>]}
        />

        <Tabs.Root defaultValue="no01" className="mt-12">
          <Tabs.List
            aria-label="Pilihan rasa"
            className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {FLAVORS.map((f) => (
              <Tabs.Trigger
                key={f.id}
                value={f.id}
                className="w-full rounded-full border-2 border-ink px-5 py-3 font-display text-sm font-bold uppercase tracking-wide transition hover:-translate-y-0.5 data-[state=active]:bg-ink data-[state=active]:text-cream data-[state=active]:shadow-[4px_4px_0_0_var(--color-lime)]"
              >
                {f.code} — {f.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {FLAVORS.map((f) => (
            <Tabs.Content key={f.id} value={f.id} className="mt-10 animate-[tab-in_.45s_ease] outline-none">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <Reveal className="relative overflow-hidden rounded-3xl border-2 border-ink shadow-[10px_10px_0_0_var(--color-ink)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${f.seed}/900/640`}
                      alt={`LARUT ${f.code} ${f.name}`}
                      loading="lazy"
                      className="kenburns h-72 w-full object-cover md:h-96"
                    />                  
                  <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 font-display text-sm font-black">{f.code}</span>
                </Reveal>
                <div>
                  <p className="max-w-md text-lg leading-relaxed text-ink/75">{f.desc}</p>
                  <ul className="mt-8 space-y-4">
                    {f.notes.map(([n, v]) => (
                      <li key={n} className="flex items-center gap-4">
                        <span className="w-28 shrink-0 text-sm font-semibold">{n}</span>
                        <div className="h-2.5 grow overflow-hidden rounded-full bg-ink/10">
                          <div className="bar h-full rounded-full" style={{ width: `${v}%`, background: f.accent }} />
                        </div>
                        <span className="w-9 text-right font-display text-xs font-bold">{v}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-4 py-2 text-sm font-semibold">
                    🍽️ Pasangan pas: {f.pairing}
                  </p>
                </div>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}