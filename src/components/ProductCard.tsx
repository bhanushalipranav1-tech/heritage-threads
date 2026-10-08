import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="aspect-[4/5] w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg leading-snug">{product.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.craft}</p>
        </div>
        <p className="shrink-0 font-semibold text-primary">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
