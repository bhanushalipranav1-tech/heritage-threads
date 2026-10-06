import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove } = useCart();

  const total = items.reduce((sum, item) => {
    const p = getProduct(item.slug);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Your bag</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Button asChild variant="outline" onClick={() => setOpen(false)}>
              <Link to="/shop">Browse the collection</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {items.map((item) => {
                const p = getProduct(item.slug);
                if (!p) return null;
                return (
                  <div key={`${item.slug}-${item.size}`} className="flex gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={1024}
                      height={1280}
                      className="h-24 w-20 rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-sm font-semibold">{p.name}</p>
                          <p className="text-xs text-muted-foreground">Size {item.size}</p>
                        </div>
                        <button
                          onClick={() => remove(item.slug, item.size)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                          <button onClick={() => setQty(item.slug, item.size, item.qty - 1)} aria-label="Decrease quantity">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-4 text-center text-sm">{item.qty}</span>
                          <button onClick={() => setQty(item.slug, item.size, item.qty + 1)} aria-label="Increase quantity">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold">{formatPrice(p.price * item.qty)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="font-display text-lg font-semibold">{formatPrice(total)}</p>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link to="/contact" search={{ inquiry: "order" }} onClick={() => setOpen(false)}>
                  Place order inquiry
                </Link>
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We confirm every order personally before payment — no card needed yet.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
