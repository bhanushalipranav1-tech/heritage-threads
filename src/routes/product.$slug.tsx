import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Maya` : "Product — Maya" },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: loaderData ? `${loaderData.name} — Maya` : "Product — Maya" },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? (product.sizes[0] ?? null) : null,
  );
  const [error, setError] = useState(false);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const handleAdd = () => {
    if (!size) {
      setError(true);
      return;
    }
    add(product.slug, size);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          {product.badge && (
            <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 font-display text-4xl font-semibold">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.craft}</p>
          <p className="mt-4 font-display text-2xl font-semibold text-primary">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Size</p>
              {error && <p className="text-sm text-destructive">Please pick a size</p>}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setError(false);
                  }}
                  className={cn(
                    "min-w-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleAdd} size="lg" className="mt-8 rounded-full">
            Add to bag — {formatPrice(product.price)}
          </Button>

          <ul className="mt-8 space-y-2 border-t border-border pt-6">
            {product.details.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-olive" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold">You might also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
