"use client";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { useToast } from "@/lib/toast";
import { NutritionDialog } from "./nutrition-dialog";   // ← path ini yang penting

const PACKS = [
  { id: "1", bottles: 1, label: "Si Penasaran", price: 18000, note: "1 botol • coba dulu" },
  { id: "6", bottles: 6, label: "Si Rutin", price: 99000, note: "6 botol • paling laku" },
  { id: "12", bottles: 12, label: "Si Sekeluarga", price: 179000, note: "12 botol • paling hemat" },
];

export function BuyPanel({
  onAdd,
}: {
  onAdd: (bottles: number, label: string, price: number) => void;
}) {
  const [packId, setPackId] = useState("6");
  const [subs, setSubs] = useState(false);
  const toast = useToast();
  const pack = PACKS.find((p) => p.id === packId)!;
  const total = Math.round(pack.price * (subs ? 0.85 : 1));

const add = () => {
  // Hitung harga dengan diskon langganan jika aktif
  const finalPrice = subs ? Math.round(pack.price * 0.85) : pack.price;
  
  // Kirim harga yang sudah didiskon ke keranjang
  onAdd(pack.bottles, pack.label, finalPrice);
  
  toast({
    title: `${pack.bottles} botol No.01 masuk keranjang`,
    desc: subs
      ? `Langganan aktif — hemat 15% (Rp${finalPrice.toLocaleString("id-ID")})`
      : `Total Rp${finalPrice.toLocaleString("id-ID")} — belum termasuk ongkir`,
  });
};

  return (
    <section id="beli" className="scroll-mt-24 bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border-2 border-cream/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/larut-pack-agustus/700/900"
                alt="Paket LARUT No.01"
                loading="lazy"
                className="kenburns h-[420px] w-full object-cover"
              />
            <span className="absolute left-4 top-6 rounded-full bg-tang px-3 py-1 font-display text-xs font-black uppercase">
              Batch 07 • Agustus
            </span>
          </div>
          <div className="absolute -bottom-6 right-2 rounded-2xl bg-lime p-4 text-ink shadow-[6px_6px_0_0_var(--color-tang)]">
            <p className="font-display text-2xl font-black">
              Rp{Math.round(pack.price / pack.bottles).toLocaleString("id-ID")}
            </p>
            <p className="text-xs font-semibold">per botol</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime">
            Rilis 12 Agustus — stok 412 botol
          </p>
          <h2 className="mt-3 font-display text-5xl font-black uppercase tracking-tight md:text-6xl">
            Bawa pulang No.01
          </h2>

          <RadioGroup.Root
            value={packId}
            onValueChange={setPackId}
            aria-label="Pilih ukuran paket"
            className="mt-9 grid gap-3 sm:grid-cols-3"
          >
            {PACKS.map((p) => (
              <RadioGroup.Item
                key={p.id}
                value={p.id}
                className="group rounded-2xl border-2 border-cream/25 p-4 text-left transition hover:border-cream/60 data-[state=checked]:border-lime data-[state=checked]:bg-lime/10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold">{p.label}</span>
                  <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-cream/40 group-data-[state=checked]:border-lime">
                    <RadioGroup.Indicator className="flex items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-lime" />
                    </RadioGroup.Indicator>
                  </span>
                </div>
                <p className="mt-1 text-sm text-cream/60">{p.note}</p>
                <p className="mt-3 font-display text-xl font-extrabold text-lime">
                  Rp{p.price.toLocaleString("id-ID")}
                </p>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>

          <label
            htmlFor="subs"
            className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-cream/20 p-4 transition hover:border-cream/50"
          >
            <Checkbox.Root
              id="subs"
              checked={subs}
              onCheckedChange={(v) => setSubs(v === true)}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-cream/50 transition data-[state=checked]:border-lime data-[state=checked]:bg-lime"
            >
              <Checkbox.Indicator className="flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6.5L4.8 9 10 3"
                    stroke="var(--color-ink)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-sm">
              Langganan bulanan <b className="text-lime">hemat 15%</b> — berhenti kapan aja, nggak pakai drama.
            </span>
          </label>

          <div className="mt-6 flex items-end justify-between border-t border-cream/15 pt-5">
            <div>
              <p className="text-sm text-cream/60">
                Total {subs && <s className="mr-2 opacity-60">Rp{pack.price.toLocaleString("id-ID")}</s>}
              </p>
              <p className="font-display text-4xl font-black text-lime">
                Rp{total.toLocaleString("id-ID")}
              </p>
            </div>
            <NutritionDialog />
          </div>

          <button
            onClick={add}
            className="mt-6 w-full rounded-full bg-lime px-8 py-4 font-display text-lg font-black uppercase text-ink shadow-[6px_6px_0_0_var(--color-tang)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Masukkan ke keranjang →
          </button>
          <p className="mt-4 text-center text-xs text-cream/50">
            Dikirim dengan kemasan berinsulasi • Retur gampang • Sertifikasi halal dalam proses
          </p>
        </div>
      </div>
    </section>
  );
}