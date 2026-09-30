"use client";
import Link from "next/link";
import { useState } from "react";

type CartItem = { id: string; label: string; bottles: number; price: number };

export function Nav({
  cartCount,
  cartItems,
  onUpdate,
}: {
  cartCount: number;
  cartItems: CartItem[];
  onUpdate: (id: string, delta: number) => void;
}) {
  const [open, setOpen] = useState(false);

  const grandTotal = cartItems.reduce((sum, item) => {
    const validPrice = item.price && !isNaN(item.price) ? item.price : 0;
    return sum + validPrice;
  }, 0);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="#" className="font-display text-xl font-extrabold tracking-tight">
          LARUT<span className="align-super text-tang">*</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {[
            ["Cerita", "#cerita"],
            ["Komposisi", "#komposisi"],
            ["Rasa", "#rasa"],
            ["FAQ", "#faq"],
          ].map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-tang after:transition-all hover:text-fern hover:after:w-full"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="group flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:bg-moss"
          >
            Keranjang
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold transition ${
                cartCount > 0 ? "bg-lime text-ink" : "bg-cream/20 text-cream/60"
              }`}
            >
              {cartCount}
            </span>
          </button>

          {open && cartCount > 0 && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
                aria-hidden
              />
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border-2 border-ink bg-cream p-4 shadow-[6px_6px_0_0_var(--color-ink)] md:w-96">
                <div className="mb-3 flex items-center justify-between border-b border-ink/15 pb-3">
                  <p className="font-display text-lg font-bold">Keranjang</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-sm text-ink/60 hover:text-ink"
                  >
                    Tutup ✕
                  </button>
                </div>

                <ul className="max-h-80 space-y-3 overflow-y-auto">
                  {cartItems.map((item) => {
                    // Hitung unit price dengan fallback
                    const validPrice = item.price && !isNaN(item.price) ? item.price : 0;
                    const unitPrice =
                      item.bottles > 0 ? Math.round(validPrice / item.bottles) : 0;

                    return (
                      <li
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-ink/10 bg-mist/50 p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-sm font-bold">
                            {item.label}
                          </p>
                          <p className="text-xs text-ink/60">
                            {item.bottles} botol × Rp{unitPrice.toLocaleString("id-ID")}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdate(item.id, -1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-ink/20 text-sm font-bold transition hover:bg-tang hover:text-cream"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-display text-sm font-bold">
                            {item.bottles}
                          </span>
                          <button
                            onClick={() => onUpdate(item.id, 1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-ink/20 text-sm font-bold transition hover:bg-lime"
                          >
                            +
                          </button>
                          <button
                            onClick={() => onUpdate(item.id, -item.bottles)}
                            className="ml-1 text-xs text-ink/50 underline hover:text-tang"
                          >
                            Hapus
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3">
                  <p className="text-sm text-ink/60">Total</p>
                  <p className="font-display text-lg font-black">
                    Rp{grandTotal.toLocaleString("id-ID")}
                  </p>
                </div>
                <a
                  href="#beli"
                  onClick={() => setOpen(false)}
                  className="mt-3 block rounded-full bg-ink py-3 text-center text-sm font-bold text-cream transition hover:bg-moss"
                >
                  Lanjutkan belanja →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}