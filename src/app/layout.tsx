import type { Metadata, Viewport } from "next"; // <-- Tambahkan Viewport di sini
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const briko = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-briko" });
const instr = Instrument_Sans({ subsets: ["latin"], variable: "--font-instr" });

// 1. Metadata hanya berisi title & description
export const metadata: Metadata = {
  title: "LARUT No.01 — Teh Botani Bersoda",
  description: "Sereh, pandan & jeruk nipis diseduh dingin 12 jam, dikarbonasi lembut. 0% gula tambahan.",
};

// 2. Viewport DIPISAH menjadi export sendiri (Next.js 15+ standard)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${briko.variable} ${instr.variable}`}>
      <head>
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
      </head>
      <body className="bg-cream font-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}