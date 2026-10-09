import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { applyCoupon, isValidCoupon, COUPON_PERCENT } from "@/lib/coupon";
import { DeliveryBagPicker } from "@/components/DeliveryBagPicker";
import { getDeliveryBag } from "@/lib/delivery-bags";

type ContactSearch = { inquiry?: string | undefined };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    inquiry: typeof search["inquiry"] === "string" ? (search["inquiry"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact — Maya" },
      { name: "description", content: "Place an order inquiry or get in touch with the Maya team — we confirm every order personally." },
      { property: "og:title", content: "Contact — Maya" },
      { property: "og:description", content: "Place an order inquiry or get in touch with the Maya team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { inquiry } = Route.useSearch();
  const { items, clear, deliveryBag } = useCart();
  const selectedBag = getDeliveryBag(deliveryBag);
  const isOrder = inquiry === "order" && items.length > 0;

  const orderSummary = items
    .map((i) => {
      const p = getProduct(i.slug);
      return p ? `${p.name} (size ${i.size}) × ${i.qty}` : "";
    })
    .filter(Boolean)
    .join("\n");

  const total = items.reduce((sum, i) => {
    const p = getProduct(i.slug);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    isOrder ? `Hi! I'd like to order:\n\n${orderSummary}\n\nTotal: ${formatPrice(total)}` : "",
  );
  const [sent, setSent] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState("");
  const finalTotal = applyCoupon(total, coupon);

  const handleApply = () => {
    if (isValidCoupon(couponInput)) {
      setCoupon(couponInput);
      toast.success(`Coupon applied — ${COUPON_PERCENT}% off!`);
    } else {
      setCoupon("");
      toast.error("Invalid coupon code.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (isOrder && (!address.trim() || !city.trim() || !/^\d{6}$/.test(pincode.trim()) || !/^\d{10}$/.test(phone.trim()))) {
      toast.error("Please enter a full delivery address, 6-digit pincode and 10-digit phone.");
      return;
    }
    if (isOrder && !selectedBag) {
      toast.error("Please choose a delivery bag.");
      return;
    }
    // Showcase store: inquiry is confirmed locally; hook up email/CRM later.
    setSent(true);
    if (isOrder) clear();
    toast.success("Inquiry sent! We'll reply within 24 hours.");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        {isOrder ? "Order inquiry" : "Contact"}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
        {isOrder ? "Almost yours" : "Say hello"}
      </h1>
      <p className="mt-4 text-muted-foreground">
        {isOrder
          ? "Send this inquiry and we'll confirm availability, sizing and payment details personally — usually within a day."
          : "Questions about sizing, fabric, custom orders or wholesale? Write to us."}
      </p>

      {sent ? (
        <div className="mt-10 rounded-3xl bg-linen p-10 text-center">
          <h2 className="font-display text-2xl font-semibold">Thank you, {name.split(" ")[0]}!</h2>
          <p className="mt-3 text-muted-foreground">
            Your {isOrder ? "order inquiry" : "message"} is in. We'll get back to you at{" "}
            <span className="font-medium text-foreground">{email}</span> within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{isOrder ? "Your order" : "Message"}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={isOrder ? 8 : 5}
              placeholder="How can we help?"
            />
          </div>
          {isOrder && (
            <>
              <DeliveryBagPicker />
              <div className="space-y-2">
                <Label htmlFor="address">Delivery address</Label>
                <Textarea id="address" rows={3} maxLength={300} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no., street, area" />
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" maxLength={60} value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" inputMode="numeric" maxLength={6} value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" inputMode="numeric" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coupon">Coupon code</Label>
                <div className="flex gap-2">
                  <Input id="coupon" maxLength={20} value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Enter code" />
                  <Button type="button" variant="outline" onClick={handleApply}>Apply</Button>
                </div>
              </div>
              <div className="rounded-2xl bg-linen p-5 text-sm space-y-1">
                {selectedBag && <div className="flex justify-between gap-4"><span>Delivery bag</span><span className="text-right">{selectedBag.name}</span></div>}
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
                {coupon && (
                  <div className="flex justify-between text-primary"><span>Discount ({COUPON_PERCENT}%)</span><span>−{formatPrice(total - finalTotal)}</span></div>
                )}
                <div className="flex justify-between font-semibold text-base pt-1"><span>Total</span><span>{formatPrice(finalTotal)}</span></div>
              </div>
            </>
          )}
          <Button type="submit" size="lg" className="rounded-full">
            {isOrder ? "Send order inquiry" : "Send message"}
          </Button>
        </form>
      )}
    </div>
  );
}
