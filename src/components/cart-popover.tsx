"use client";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

const PACKS = [
  { id: "1", bottles: 1, label: "Si Penasaran", price: 18000 },
  { id: "6", bottles: 6, label: "Si Rutin", price: 99000 },
  { id: "12", bottles: 12, label: "Si Sekeluarga", price: 179000 },
];

export function CartPopover({ cartCount, onUpdate }: { cartCount: number; onUpdate: (n: number) => void }) {
  const [selectedPack, setSelectedPack] = useState("6");
  const pack = PACKS.find((p) => p.id === selectedPack)!;

  const decrease = () => {
    const newCount = Math.max(0, cartCount - pack.bottles);
    onUpdate(newCount);
  };

  const increase = () => {
    onUpdate(cartCount + pack.bottles);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:bg-moss">
          Beli No.01
          <span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-xs font-bold text-ink transition hover:rotate-12">
            {cartCount}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-[80] w-72 rounded-2xl border-2 border-ink bg-cream p-4 shadow-[6px_6px_0_0_var(--color-ink)] data-[state=open]:animate-[pop-in_.3s_cubic-bezier(.22,1,.36,1)]"
        >
          <div className="mb-3 font-display text-lg font-bold text-ink">Keranjang</div>

          <div className="mb-4 space-y-2">
            {PACKS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPack(p.id)}
                className={`w-full rounded-xl border-2 p-3 text-left transition ${
                  selectedPack === p.id
                    ? "border-lime bg-lime/20"
                    : "border-ink/15 hover:border-ink/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">{p.label}</span>
                  <span className="font-display font-bold text-fern">Rp{p.price.toLocaleString("id-ID")}</span>
                </div>
                <p className="text-xs text-ink/60">{p.bottles} botol</p>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-xl bg-mist p-3">
            <button
              onClick={decrease}
              disabled={cartCount === 0}
              className="grid h-8 w-8 place-items-center rounded-full bg-ink text-cream transition hover:bg-moss disabled:opacity-30"
            >
              −
            </button>
            <span className="font-display text-2xl font-black text-ink">{cartCount}</span>
            <button
              onClick={increase}
              className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink transition hover:bg-fern hover:text-cream"
            >
              +
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-ink/60">
            Total: <b className="text-fern">Rp{(cartCount * (pack.price / pack.bottles)).toLocaleString("id-ID")}</b>
          </p>

          <Popover.Arrow className="fill-cream" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}