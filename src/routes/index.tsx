import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Scissors, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kavya — Traditional Craft, New Generation" },
      { name: "description", content: "Handloom clothing and hand-embroidered streetwear made by artisan hands in small batches. Traditional artwork, modern silhouettes." },
      { property: "og:title", content: "Kavya — Traditional Craft, New Generation" },
      { property: "og:description", content: "Handloom clothing and hand-embroidered streetwear made by artisan hands in small batches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.badge).concat(products.filter((p) => !p.badge)).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Handloom · Hand-embroidered · Small batch
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] font-semibold md:text-6xl">
              Old craft, <span className="text-primary italic">new silhouette.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Traditional block prints, weaves and embroidery — re-cut into the
              oversized, easy shapes your generation actually wears.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/shop">
                  Shop the collection <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/about">Our craft</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={heroImg}
                alt="Model wearing a terracotta block-print shirt with baggy jeans"
                width={1536}
                height={1024}
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-olive px-5 py-4 text-olive-foreground shadow-lg md:block">
              <p className="font-display text-2xl font-semibold">100%</p>
              <p className="text-xs opacity-80">handmade, always</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-y border-border bg-linen">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          {[
            { icon: Leaf, title: "Natural dyes", text: "Madder, indigo and pomegranate — colour from the earth, not a lab." },
            { icon: Scissors, title: "Artisan made", text: "Every piece passes through the hands of a skilled craftsperson." },
            { icon: HandHeart, title: "Fair & small batch", text: "We produce little, pay fairly, and waste almost nothing." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">The drop</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">Featured pieces</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/shop">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/shop">View all pieces</Link>
          </Button>
        </div>
      </section>

      {/* Story banner */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Why we exist</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-snug font-semibold md:text-4xl">
            Craft shouldn't live in a museum. It should live in your wardrobe.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-ink-foreground/70">
            We work directly with block printers, weavers and embroiderers to turn
            heritage techniques into pieces you'll reach for every day.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full">
            <Link to="/about">Read our story</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
