import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface CartItem {
  slug: string;
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (slug: string, size: string) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "mrida-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = (slug: string, size: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug && i.size === size ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { slug, size, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (slug: string, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));

  const setQty = (slug: string, size: string, qty: number) => {
    if (qty <= 0) return remove(slug, size);
    setItems((prev) =>
      prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i)),
    );
  };

  const clear = () => setItems([]);
  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
