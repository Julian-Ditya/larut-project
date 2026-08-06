"use client";
import * as Toast from "@radix-ui/react-toast";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ToastInput = { title: string; desc?: string };
type ToastItem = ToastInput & { id: string };

const Ctx = createContext<(t: ToastInput) => void>(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((t: ToastInput) => {
    const id = Math.random().toString(36).slice(2, 9);
    setItems((s) => [...s, { ...t, id }]);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <Ctx.Provider value={push}>{children}</Ctx.Provider>
      {items.map((t) => (
        <Toast.Root
          key={t.id}
          onOpenChange={(o) => { if (!o) setItems((s) => s.filter((x) => x.id !== t.id)); }}
          className="z-[90] w-[92vw] max-w-sm rounded-2xl border-2 border-ink bg-cream p-4 shadow-[6px_6px_0_0_var(--color-ink)] data-[state=open]:animate-[toast-in_.3s_cubic-bezier(.22,1,.36,1)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=end]:animate-[swipe-out_.25s_ease-out]"
        >
          <div className="flex gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime font-bold text-ink">✓</span>
            <div>
              <Toast.Title className="font-display font-bold text-ink">{t.title}</Toast.Title>
              {t.desc && <Toast.Description className="mt-1 text-sm text-ink/65">{t.desc}</Toast.Description>}
            </div>
          </div>
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed bottom-5 right-5 z-[90] flex flex-col gap-3 outline-none" />
    </Toast.Provider>
  );
}