import shirtImg from "@/assets/product-shirt.jpg";
import jacketImg from "@/assets/product-jacket.jpg";
import trousersImg from "@/assets/product-trousers.jpg";
import hoodieImg from "@/assets/product-hoodie.jpg";
import skirtImg from "@/assets/product-skirt.jpg";
import toteImg from "@/assets/product-tote.jpg";
import guitarAsset from "@/assets/divine-guitar-shirt.asset.json";
import paisleyAsset from "@/assets/paisley-tee.asset.json";
import kaliAsset from "@/assets/kali-tee.asset.json";

export interface Product {
  slug: string;
  name: string;
  price: number; // INR
  category: string;
  craft: string;
  description: string;
  details: string[];
  image: string;
  sizes: string[];
  badge?: string;
}

export const products: Product[] = [
  {
    slug: "divine-guitar-shirt",
    name: "Divine Guitar Shirt",
    price: 899,
    category: "Shirts",
    craft: "Divine art, streetwear spirit",
    description: "A beige short-sleeve shirt with a clean front and a statement back print combining divine-inspired artwork, sunglasses and an electric guitar.",
    details: ["Beige colour", "Short sleeves", "Button-front silhouette", "Statement back print"],
    image: guitarAsset.url,
    sizes: ["S", "M", "L", "XL"],
    badge: "New design",
  },
  {
    slug: "heritage-paisley-tee",
    name: "Heritage Paisley Tee",
    price: 699,
    category: "T-Shirts",
    craft: "Traditional paisley, modern silhouette",
    description: "A washed-charcoal tee with a plain front and an ornate gold-and-teal paisley back design, bringing heritage motifs into everyday style.",
    details: ["Washed-charcoal look", "Round neckline", "Short sleeves", "Gold-and-teal back artwork"],
    image: paisleyAsset.url,
    sizes: ["S", "M", "L", "XL"],
    badge: "New design",
  },
  {
    slug: "kali-art-tee",
    name: "Kali Art Tee",
    price: 799,
    category: "T-Shirts",
    craft: "Divine strength, bold expression",
    description: "A black graphic tee featuring Kali-inspired artwork, intricate ornamentation and striking red accents. A bold meeting of heritage and contemporary expression.",
    details: ["Black colour", "Round neckline", "Short sleeves", "Kali-inspired front artwork"],
    image: kaliAsset.url,
    sizes: ["S", "M", "L", "XL"],
    badge: "New design",
  },
  {
    slug: "madder-block-shirt",
    name: "Madder Block-Print Shirt",
    price: 749,
    category: "Shirts",
    craft: "Hand block-printed in Bagru",
    description:
      "An oversized drop-shoulder shirt cut from breathable handloom cotton, printed by hand with madder-root dye and carved teak blocks. Streetwear fit, centuries-old craft.",
    details: ["100% handloom cotton", "Natural madder dye", "Oversized unisex fit", "Corozo nut buttons"],
    image: shirtImg,
    sizes: ["S", "M", "L", "XL"],
    badge: "Bestseller",
  },
  {
    slug: "deccan-embroidered-jacket",
    name: "Deccan Embroidered Jacket",
    price: 999,
    category: "Jackets",
    craft: "Hand-embroidered collar",
    description:
      "A cropped boxy jacket in olive handwoven twill, finished with a hand-embroidered border along the collar and placket. Layer it over anything — it carries the outfit.",
    details: ["Handwoven cotton twill", "Hand-embroidered trim", "Cropped boxy fit", "Corozo nut buttons"],
    image: jacketImg,
    sizes: ["S", "M", "L", "XL"],
    badge: "New drop",
  },
  {
    slug: "charcoal-border-trousers",
    name: "Charcoal Border Trousers",
    price: 799,
    category: "Trousers",
    craft: "Handloom woven border",
    description:
      "Wide-leg drawstring trousers in charcoal handloom cotton with a woven temple-border hem. Elasticated waist, deep pockets, all-day comfort.",
    details: ["100% handloom cotton", "Woven border hem", "Relaxed wide leg", "Drawstring waist"],
    image: trousersImg,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "phool-embroidered-hoodie",
    name: "Phool Embroidered Hoodie",
    price: 949,
    category: "Hoodies",
    craft: "Hand-embroidered motif",
    description:
      "A heavyweight cream hoodie with a traditional phool (flower) motif hand-embroidered in terracotta and olive thread. Your everyday staple, made by hand.",
    details: ["400 GSM brushed cotton", "Hand embroidery", "Oversized fit", "Kangaroo pocket"],
    image: hoodieImg,
    sizes: ["S", "M", "L", "XL"],
    badge: "Bestseller",
  },
  {
    slug: "saffron-block-skirt",
    name: "Saffron Block-Print Skirt",
    price: 699,
    category: "Skirts",
    craft: "Hand block-printed",
    description:
      "A flowing midi skirt block-printed in terracotta and saffron with a contrasting border hem and tassel drawstring. Twirls beautifully.",
    details: ["100% handloom cotton", "Natural dyes", "Midi length", "Tassel drawstring"],
    image: skirtImg,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    slug: "heera-woven-tote",
    name: "Heera Woven Tote",
    price: 500,
    category: "Accessories",
    craft: "Hand-crocheted weave",
    description:
      "A structured hand-crocheted tote in natural ecru with a geometric diamond pattern in olive and terracotta. Fits a laptop, a market run, or both.",
    details: ["Hand-crocheted cotton", "Geometric diamond weave", "Fits 14\" laptop", "Reinforced handles"],
    image: toteImg,
    sizes: ["One size"],
  },
];

export const formatPrice = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
