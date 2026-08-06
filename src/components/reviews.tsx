import { MaskLines, Reveal } from "@/lib/motion";

const REVIEWS = [
  { q: "Sodanya sopan, rasanya nggak. Pandannya beneran pandan, bukan perasa.", n: "Sari W.", r: "Barista — Bandung", rot: "md:-rotate-2" },
  { q: "Satu-satunya minuman botol yang nggak bikin aku merasa berhutang pada tubuhku.", n: "Dimas P.", r: "Pelari pagi — Jogja", rot: "md:rotate-1" },
  { q: "Level 3 itu pas. Sempat nyoba imajinasi level 5, tetep balik ke 3.", n: "Alya R.", r: "Desainer — Jakarta", rot: "md:rotate-2" },
  { q: "Kunyit Asam setelah futsal itu… spiritual.", n: "Bram H.", r: "Akuntan — Surabaya", rot: "md:-rotate-1" },
];

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-fern">Batch uji coba</p>
      <MaskLines
        className="mt-3 font-display text-5xl font-black uppercase tracking-tight md:text-6xl"
        lines={[<>Kata mereka yang</>, <>udah larut duluan.</>]}
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((rv, i) => (
          <Reveal key={rv.n} delay={i * 100} className={i % 2 ? "lg:translate-y-8" : ""}>
            <figure className={`relative h-full border-2 border-ink bg-cream p-6 shadow-[6px_6px_0_0_var(--color-ink)] transition duration-300 hover:rotate-0 hover:-translate-y-1 ${rv.rot}`}>
              <span aria-hidden className="absolute -top-3 left-8 h-6 w-24 rotate-2 bg-lime/70" />
              <p className="text-tang" aria-label="Rating 5 dari 5">★★★★★</p>
              <blockquote className="mt-3 font-medium leading-relaxed text-ink/85">“{rv.q}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <b>{rv.n}</b> <span className="text-ink/55">— {rv.r}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}