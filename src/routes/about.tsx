import { createFileRoute } from "@tanstack/react-router";
import { Landmark, Flower2, Shirt, Sprout } from "lucide-react";
import heritageAsset from "@/assets/about-heritage.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Mrida | Tradition Meets Today’s Style" },
      { name: "description", content: "Discover Mrida: modern traditional clothing inspired by Indian architecture, divine themes and the richness of our heritage." },
      { property: "og:title", content: "About Us — Mrida | Tradition Meets Today’s Style" },
      { property: "og:description", content: "Timeless designs. Modern vibes. Rooted in our heritage. Discover the story behind Mrida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  { icon: Landmark, title: "Traditional architecture inspired", description: "From majestic temples to intricate carvings, our designs reflect India’s architectural legacy." },
  { icon: Flower2, title: "Divine themes", description: "Inspired by the grace and strength of Hindu gods, our designs carry deep cultural and spiritual meaning." },
  { icon: Shirt, title: "Trendy & modern", description: "Designed for today’s generation with modern fits, styles and comfort." },
  { icon: Sprout, title: "Rooted in heritage", description: "We honor our past while creating for a brighter tomorrow." },
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-2 md:px-8 md:pt-12">
      <section className="grid items-start gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
        <div className="py-2 md:py-4">
          <div className="mb-5 flex items-center gap-4 text-sm font-medium text-primary uppercase">
            <p>About us</p><span className="h-px w-10 bg-primary/60" aria-hidden="true" />
          </div>
          <h1 className="font-display text-4xl leading-[1.12] font-medium md:text-5xl">
            Mrida<span className="text-primary">.</span><br />
            Where Tradition<br className="hidden lg:block" /> Meets Today’s Style
          </h1>
          <p className="mt-5 text-lg text-foreground">Timeless designs. Modern vibes. Rooted in our heritage.</p>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>At Mrida, we believe clothing is more than just what you wear — it’s a story, a culture, and a connection to something greater. Our mission is to bring together the richness of India’s timeless traditions with the energy and individuality of today’s generation.</p>
            <p>We design trendy clothing for the modern generation, infused with traditional touches. From the grandeur of ancient architectural marvels to the divine elegance of Hindu gods, our collections are inspired by India’s rich heritage, reimagined for contemporary living.</p>
            <p>Each piece is a blend of culture, comfort and style — crafted for those who appreciate tradition but love to express themselves in today’s world. Our designs feature intricate motifs, temple architecture elements, and divine symbolism, bringing a sense of history, spirituality and uniqueness to your wardrobe.</p>
            <p>We are not just a clothing brand; we are a celebration of India’s past, present and future — stitched together for you.</p>
          </div>
        </div>
        <img src={heritageAsset.url} alt="Mrida heritage inspiration: a temple-print kurta and burgundy sari, with Indian temple architecture and divine artwork" width={411} height={561} className="w-full object-contain" fetchPriority="high" />
      </section>
      <section aria-label="Our inspirations" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 md:mt-9 md:grid-cols-4 md:gap-0">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center px-3 text-center md:border-r md:border-border md:px-6 md:last:border-r-0">
            <Icon className="mb-4 h-10 w-10 text-primary" strokeWidth={1.2} aria-hidden="true" />
            <h2 className="max-w-52 font-display text-xs leading-relaxed font-medium uppercase">{title}</h2>
            <p className="mt-2 max-w-52 text-sm leading-snug text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>
      <div className="mt-10 flex items-center justify-center gap-4 text-center text-primary">
        <span className="h-px w-10 bg-primary/50" aria-hidden="true" />
        <p className="font-display text-sm uppercase">Wear your heritage</p>
        <span className="h-px w-10 bg-primary/50" aria-hidden="true" />
      </div>
    </div>
  );
}
