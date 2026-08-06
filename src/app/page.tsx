"use client";
import { useState } from "react";
import { ToastProvider } from "@/lib/toast";
import { ScrollProgress } from "@/components/scroll-progress";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Ingredients } from "@/components/ingredients";
import { FlavorTabs } from "@/components/flavor-tabs";
import { FizzMeter } from "@/components/fizz-meter";
import { BuyPanel } from "@/components/buy-panel";
import { Reviews } from "@/components/reviews";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

type CartItem = { id: string; label: string; bottles: number; price: number };

// Harga default per paket (fallback jika price NaN)
const DEFAULT_PRICES: Record<string, number> = {
  "pack-1": 18000,
  "pack-6": 99000,
  "pack-12": 179000,
};

export default function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAdd = (bottles: number, label: string, price: number) => {
    // Validasi: jika price NaN atau 0, gunakan harga default
    const validPrice =
      price && !isNaN(price) && price > 0
        ? price
        : DEFAULT_PRICES[`pack-${bottles}`] || bottles * 18000;

    const id = `pack-${bottles}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id
            ? {
                ...i,
                bottles: i.bottles + bottles,
                price: i.price + validPrice,
              }
            : i
        );
      }
      return [...prev, { id, label, bottles, price: validPrice }];
    });
  };

  const handleUpdate = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.id !== id) return i;

          const newBottles = i.bottles + delta;

          // Jika dikurangi sampai 0 atau minus, hapus item
          if (newBottles <= 0) return null;

          // Hitung harga per botol dengan validasi
          let pricePerBottle = i.price / i.bottles;

          // Jika NaN atau 0, gunakan harga default
          if (!pricePerBottle || isNaN(pricePerBottle)) {
            pricePerBottle =
              DEFAULT_PRICES[i.id] / parseInt(i.id.replace("pack-", "")) || 18000;
          }

          return {
            ...i,
            bottles: newBottles,
            price: Math.round(pricePerBottle * newBottles),
          };
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.bottles, 0);

  return (
    <ToastProvider>
      <div className="noise relative min-h-screen bg-cream text-ink">
        <ScrollProgress />
        <Nav
          cartCount={cartCount}
          cartItems={cartItems}
          onUpdate={handleUpdate}
        />
        <main>
          <Hero />
          <Story />
          <Ingredients />
          <FlavorTabs />
          <FizzMeter />
          <BuyPanel onAdd={handleAdd} />
          <Reviews />
          <Faq />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}