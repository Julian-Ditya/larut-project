"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import { MaskLines, Reveal } from "@/lib/motion";

const ITEMS = [
  {
    name: "Sereh Wangi",
    latin: "Cymbopogon nardus",
    role: "Pembuka — aroma sitrus-hangat yang langsung nyapa.",
    pct: 42,
    seed: "larut-sereh-wangi",
    tip: "Dipetik pagi dari Cianjur biar minyak atsirinya masih penuh.",
  },
  {
    name: "Pandan Muda",
    latin: "Pandanus amaryllifolius",
    role: "Jantung — manis daun yang lembut, bukan vanili-vanian.",
    pct: 31,
    seed: "larut-pandan-muda",
    tip: "Diambil daun ke-3 sampai ke-5. Nggak terlalu muda, nggak terlalu tua.",
  },
  {
    name: "Jeruk Nipis",
    latin: "Citrus aurantiifolia",
    role: "Penutup — asam bersih yang bikin nagih teguk kedua.",
    pct: 19,
    seed: "larut-jeruk-nipis",
    tip: "Diperas maksimal 4 jam sebelum dikarbonasi.",
  },
  {
    name: "Gula Aren",
    latin: "Arenga pinnata",
    role: "Bayangan — cuma 3 gram, buat nyeimbangin asam.",
    pct: 8,
    seed: "larut-gula-aren",
    tip: "Dari Sleman. Lebih sedikit dari satu sendok teh per botol.",
  },
];

function IngredientCard({
  item,
  delay = 0,
}: {
  item: (typeof ITEMS)[number];
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink bg-cream shadow-[6px_6px_0_0_var(--color-mist)] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-lime)]">
        {/* Gambar - tinggi seragam */}
        <div className="h-48 shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${item.seed}/700/500`}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Konten - stretch penuh */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-extrabold">{item.name}</h3>
              <p className="text-xs italic text-ink/50">{item.latin}</p>
            </div>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  aria-label={`Fakta tentang ${item.name}`}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink text-xs font-bold transition hover:bg-lime"
                >
                  i
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  sideOffset={8}
                  className="z-[80] max-w-[220px] rounded-xl bg-ink px-4 py-3 text-xs leading-relaxed text-cream shadow-xl"
                >
                  {item.tip}
                  <Tooltip.Arrow className="fill-ink" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>

          <p className="mt-3 text-sm text-ink/70">{item.role}</p>

          {/* Bar persentase - dorong ke bawah */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3">
              <div className="h-2 grow overflow-hidden rounded-full bg-ink/10">
                <div
                  className="bar h-full rounded-full bg-fern"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <span className="font-display text-xs font-bold text-fern">
                {item.pct}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Ingredients() {
  return (
    <section id="komposisi" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-fern">
            Isi botolnya
          </p>
          <MaskLines
            className="mt-3 font-display text-5xl font-black uppercase tracking-tight md:text-6xl"
            lines={[<>Empat bahan.</>, <>Nggak lebih.</>]}
          />
        </div>
        <p className="max-w-xs text-sm text-ink/60">
          Kalau kami nggak berani menulis namanya di botol, kami nggak berani
          memasukkannya ke botol. Arahkan kursor ke ⓘ buat cerita tiap bahan.
        </p>
      </div>

      <Tooltip.Provider delayDuration={120}>
        {/* Grid 2x2 - semua card ukuran sama */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {ITEMS.map((item, i) => (
            <IngredientCard key={item.name} item={item} delay={i * 100} />
          ))}
        </div>
      </Tooltip.Provider>
    </section>
  );
}