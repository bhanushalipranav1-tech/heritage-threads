import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { deliveryBags } from "@/lib/delivery-bags";
import { cn } from "@/lib/utils";

export function DeliveryBagPicker() {
  const { deliveryBag, setDeliveryBag } = useCart();

  return (
    <fieldset className="space-y-3">
      <legend className="font-display text-base font-semibold">Choose your delivery bag</legend>
      <div className="grid grid-cols-2 gap-3">
        {deliveryBags.map((bag) => (
          <Button
            key={bag.id}
            type="button"
            variant="outline"
            aria-pressed={deliveryBag === bag.id}
            onClick={() => setDeliveryBag(bag.id)}
            className={cn(
              "relative h-auto min-w-0 flex-col items-stretch gap-2 overflow-hidden whitespace-normal rounded-lg p-2 text-left",
              deliveryBag === bag.id && "border-primary bg-primary/5 ring-1 ring-primary",
            )}
          >
            <img src={bag.image} alt={bag.name} width={768} height={768} className="aspect-square w-full rounded-md object-contain" />
            <span className="flex min-h-10 items-center justify-between gap-1 text-xs leading-snug">
              {bag.name}
              {deliveryBag === bag.id && <Check className="shrink-0 text-primary" aria-hidden="true" />}
            </span>
          </Button>
        ))}
      </div>
    </fieldset>
  );
}