"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { MaskLines } from "@/lib/motion";

const FAQS: [string, string][] = [
  ["Apakah LARUT bersoda kuat?", "Nggak. Kami menyebutnya 'sparkling sopan' — karbonasi level 3 dari 5. Cukup untuk angkat aroma botani tanpa bikin sendawa di meeting."],
  ["Benar-benar tanpa gula tambahan?", "Gula tambahan: 0 gram. Ada ±3 g gula alami dari aren sebagai penyeimbang asam — masih jauh di bawah satu sendok teh."],
  ["Ada endapan di botolku, normal?", "Normal banget. Itu serat pandan & sereh asli. Kocok pelan — malah lebih enak."],
  ["Berapa kafeinnya?", "±12 mg per botol, dari teh hijau seduh dingin — kira-kira sepertiga cangkir kopi. Aman buat sore."],
  ["Bagaimana pengirimannya?", "Dikirim dengan kemasan berinsulasi setiap Senin–Rabu biar nggak nginep di kurir. Jabodetabek next-day, kota besar 2–3 hari."],
  ["Bisa berhenti langganan?", "Kapan pun, lewat satu klik. Nggak ada biaya, nggak ada formulir, nggak ada chat 'yakin nih?'."],
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t-2 border-ink/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-fern">Masih ragu?</p>
        <MaskLines className="mt-3 font-display text-5xl font-black uppercase tracking-tight md:text-6xl" lines={[<>Tanya dulu,</>, <>larut kemudian.</>]} />

        <Accordion.Root type="single" collapsible className="mx-auto mt-12 max-w-3xl">
          {FAQS.map(([q, a], i) => (
            <Accordion.Item key={i} value={String(i)} className="border-b-2 border-ink/10">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-bold transition hover:text-fern data-[state=open]:text-fern md:text-xl">
                  {q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink text-lg transition-transform duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-lime">+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-ink/70 data-[state=closed]:animate-[acc-up_.28s_ease] data-[state=open]:animate-[acc-down_.28s_ease]">
                <p className="pb-6 pr-10 leading-relaxed">{a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}