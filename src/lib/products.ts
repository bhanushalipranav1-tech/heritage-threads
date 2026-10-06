import shirtImg from "@/assets/product-shirt.jpg";
import jacketImg from "@/assets/product-jacket.jpg";
import trousersImg from "@/assets/product-trousers.jpg";
import hoodieImg from "@/assets/product-hoodie.jpg";
import skirtImg from "@/assets/product-skirt.jpg";
import toteImg from "@/assets/product-tote.jpg";

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
    slug: "madder-block-shirt",
    name: "Madder Block-Print Shirt",
    price: 2499,
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
    price: 4999,
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
    price: 2899,
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
    price: 3299,
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
    price: 2799,
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
    price: 1499,
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
