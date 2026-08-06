"use client";
import * as Dialog from "@radix-ui/react-dialog";

const ROWS: [string, string][] = [
  ["Energi total", "38 kkal"],
  ["Lemak total", "0 g"],
  ["Gula total", "3 g"],
  ["— gula tambahan", "0 g"],
  ["Protein", "0 g"],
  ["Natrium", "5 mg"],
  ["Kafein (teh hijau)", "±12 mg"],
];

export function NutritionDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-full border-2 border-cream/40 px-5 py-3.5 font-semibold text-cream transition hover:border-lime hover:text-lime">
          Info gizi lengkap
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay — fade in */}
        <Dialog.Overlay className="fixed inset-0 z-[75] bg-ink/70 backdrop-blur-sm data-[state=closed]:animate-[fade-out_.2s_ease] data-[state=open]:animate-[fade-in_.25s_ease]" />

        {/* Content — scale + fade, centered via inset-0 m-auto */}
        <Dialog.Content
          aria-label="Informasi nilai gizi"
          className="fixed inset-0 z-[76] m-auto h-fit w-[92vw] max-w-md rounded-3xl bg-cream p-7 text-ink shadow-2xl focus:outline-none data-[state=closed]:animate-[dialog-out_.2s_cubic-bezier(.4,0,1,1)] data-[state=open]:animate-[dialog-in_.3s_cubic-bezier(.22,1,.36,1)]"
        >
          <div className="border-b-4 border-ink pb-2 font-display text-2xl font-black uppercase">
            Tabel Gizi
          </div>
          <p className="mt-1 text-xs text-ink/60">
            Takaran saji 1 botol (250 ml) • Sajian per kemasan: 1
          </p>

          <ul className="mt-4 divide-y divide-ink/15 text-sm">
            {ROWS.map(([k, v]) => (
              <li key={k} className="flex justify-between py-2.5">
                <span>{k}</span>
                <b>{v}</b>
              </li>
            ))}
          </ul>

          <p className="mt-4 rounded-xl bg-mist p-3 text-xs leading-relaxed">
            Diseduh dari teh hijau asli — kafeinnya sekitar sepertiga cangkir kopi seduh.
          </p>

          <Dialog.Close
            aria-label="Tutup"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-ink/20 font-bold transition hover:bg-ink hover:text-cream"
          >
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}