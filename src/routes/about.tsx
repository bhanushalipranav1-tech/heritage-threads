import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Craft — Kavya" },
      { name: "description", content: "How Kavya works with block printers, weavers and embroiderers to bring heritage craft into modern wardrobes." },
      { property: "og:title", content: "Our Craft — Kavya" },
      { property: "og:description", content: "How Kavya works with block printers, weavers and embroiderers to bring heritage craft into modern wardrobes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Our craft</p>
      <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
        Heritage techniques, everyday clothes
      </h1>

      <div className="mt-10 overflow-hidden rounded-3xl">
        <img
          src={heroImg}
          alt="Model wearing a hand block-printed shirt"
          loading="lazy"
          width={1536}
          height={1024}
          className="aspect-[3/2] w-full object-cover"
        />
      </div>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          Kavya started with a simple frustration: the most beautiful textiles in
          the world were being made for occasions, not for life. We wanted to wear
          block prints and hand embroidery on a Tuesday, not just at weddings.
        </p>
        <p>
          So we partnered directly with artisan clusters — block printers in Bagru,
          handloom weavers, and embroiderers who learned their stitches from their
          grandmothers — and asked them to do what they do best on silhouettes our
          generation actually reaches for: oversized shirts, boxy jackets, heavy
          hoodies, wide trousers.
        </p>
        <p>
          Every piece is made in a small batch with natural dyes and handloom
          fabric. No two are perfectly identical — that's not a flaw, that's the
          signature of a human hand.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { n: "12+", label: "Artisan partners" },
          { n: "100%", label: "Natural dyes" },
          { n: "0", label: "Machine printing" },
        ].map(({ n, label }) => (
          <div key={label} className="rounded-2xl bg-linen p-6 text-center">
            <p className="font-display text-3xl font-semibold text-primary">{n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="rounded-full">
          <Link to="/shop">Shop the collection</Link>
        </Button>
      </div>
    </div>
  );
}
