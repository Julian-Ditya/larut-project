"use client";
import { useState } from "react";
import { useToast } from "@/lib/toast";

export function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "Kamu masuk daftar batch berikutnya", desc: `Undangan rilis dikirim ke ${email}` });
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-cream">
      <div aria-hidden className="text-outline-cream pointer-events-none absolute -top-4 left-1/2 w-full -translate-x-1/2 select-none text-center font-display text-[19vw] font-black leading-none tracking-tighter">
        LARUT*
      </div>
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-28 md:px-8 md:pt-40">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-extrabold">LARUT<span className="align-super text-tang">*</span></p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/65">
              Teh botani bersoda dari kebun lokal. Diseduh pelan 12 jam, dibuka cepat 3 detik.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime">Kabar batch</p>
            <form onSubmit={submit} className="mt-4 flex max-w-sm gap-2">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@kamu.id"
                className="w-full rounded-full border border-cream/25 bg-cream/10 px-5 py-3 text-sm placeholder:text-cream/40 focus:border-lime focus:outline-none" />
              <button className="shrink-0 rounded-full bg-lime px-5 py-3 font-display text-sm font-black text-ink transition hover:-translate-y-0.5">Ikut</button>
            </form>
            <p className="mt-2 text-xs text-cream/45">Satu email per batch. Sisanya kami pakai buat nyeduh.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime">Produk</p>
              {[["No.01 Sereh Pandan", "#beli"], ["No.02 Kunyit Asam", "#rasa"], ["No.03 Rosella Nipis", "#rasa"], ["Langganan", "#beli"]].map(([l, h]) => (
                <a key={l} href={h} className="block text-cream/70 transition hover:text-lime">{l}</a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime">Ikuti</p>
              {["Instagram", "TikTok", "Spotify playlist"].map((l) => (
                <a key={l} href="#" className="block text-cream/70 transition hover:text-lime">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/45">
          <p>© 2026 LARUT Botanika. Konsep desain orisinal — tidak berafiliasi dengan merek mana pun.</p>
          <p>Dibuat dengan Next.js • Tailwind CSS • Radix UI</p>
        </div>
      </div>
    </footer>
  );
}