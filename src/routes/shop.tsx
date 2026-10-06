import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Kavya" },
      { name: "description", content: "Browse handloom shirts, embroidered jackets, hoodies, skirts and accessories — traditional craft in modern silhouettes." },
      { property: "og:title", content: "Shop — Kavya" },
      { property: "og:description", content: "Browse handloom shirts, embroidered jackets, hoodies, skirts and accessories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

function Shop() {
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">The collection</p>
      <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Shop all pieces</h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        Small batches, natural dyes, handmade throughout. When a piece sells out,
        it comes back only when the artisans make more.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors",
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
