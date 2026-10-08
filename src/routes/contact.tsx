import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

type ContactSearch = { inquiry?: string | undefined };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    inquiry: typeof search["inquiry"] === "string" ? (search["inquiry"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact — Mrida" },
      { name: "description", content: "Place an order inquiry or get in touch with the Mrida team — we confirm every order personally." },
      { property: "og:title", content: "Contact — Mrida" },
      { property: "og:description", content: "Place an order inquiry or get in touch with the Mrida team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { inquiry } = Route.useSearch();
  const { items, clear } = useCart();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
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
          <Button type="submit" size="lg" className="rounded-full">
            {isOrder ? "Send order inquiry" : "Send message"}
          </Button>
        </form>
      )}
    </div>
  );
}
