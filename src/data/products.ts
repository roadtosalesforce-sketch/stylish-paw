import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    slug: "cozy-knit-dog-sweater",
    name: "Cozy Knit Dog Sweater",
    description:
      "Soft merino-blend knit sweater with a ribbed turtleneck. Perfect for chilly morning walks. Machine washable and designed for comfort without restricting movement.",
    price: 139,
    category: "sweaters",
    petType: "dog",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Sage", "Rust"],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    featured: true,
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "rainy-day-pup-parka",
    name: "Rainy Day Pup Parka",
    description:
      "Waterproof shell with sealed seams and a cozy fleece lining. Reflective trim keeps your pup visible on gloomy days. Adjustable hood and velcro belly closure.",
    price: 179,
    category: "raincoats",
    petType: "dog",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Yellow", "Navy", "Red"],
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    slug: "classic-plaid-cat-bandana",
    name: "Classic Plaid Cat Bandana",
    description:
      "Lightweight cotton bandana with a snap closure that sits comfortably without tugging fur. Reversible design gives you two looks in one.",
    price: 59,
    category: "accessories",
    petType: "cat",
    sizes: ["One Size"],
    colors: ["Plaid Red", "Plaid Green", "Plaid Blue"],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    featured: true,
  },
  {
    id: "4",
    slug: "halloween-bat-wings-costume",
    name: "Halloween Bat Wings Costume",
    description:
      "Lightweight felt wings attach with an elastic chest strap. No fuss, no zippers — just slip on and watch your pet steal the show at every party.",
    price: 119,
    category: "costumes",
    petType: "both",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Purple"],
    image: "https://images.unsplash.com/photo-1530281700549-e82e7ebb37da?w=800&q=80",
    badge: "Seasonal",
  },
  {
    id: "5",
    slug: "summer-mesh-cooling-vest",
    name: "Summer Mesh Cooling Vest",
    description:
      "Breathable mesh fabric with UPF 30 sun protection. Soak in water, wring out, and put on for hours of cooling relief during hot summer adventures.",
    price: 109,
    category: "outerwear",
    petType: "dog",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sky Blue", "Mint", "Coral"],
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a07a54?w=800&q=80",
  },
  {
    id: "6",
    slug: "luxury-fleece-hoodie",
    name: "Luxury Fleece Hoodie",
    description:
      "Ultra-soft microfleece hoodie with a drawstring hood and kangaroo pocket. Because your pet deserves streetwear-level comfort.",
    price: 159,
    category: "sweaters",
    petType: "dog",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Heather Grey", "Blush Pink", "Charcoal"],
    image: "https://images.unsplash.com/photo-1558788353-f76d92427fc4?w=800&q=80",
    featured: true,
  },
  {
    id: "7",
    slug: "reflective-safety-jacket",
    name: "Reflective Safety Jacket",
    description:
      "360° reflective piping and a lightweight windbreaker shell. Essential gear for evening walks and early-morning jogs.",
    price: 149,
    category: "outerwear",
    petType: "dog",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Neon Orange", "Neon Green"],
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80",
  },
  {
    id: "8",
    slug: "holiday-reindeer-sweater",
    name: "Holiday Reindeer Sweater",
    description:
      "Festive jacquard knit with embroidered reindeer and a jingle bell collar. The ultimate holiday photo-op sweater for dogs and cats alike.",
    price: 139,
    category: "sweaters",
    petType: "both",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Red/Green", "Navy/Gold"],
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    badge: "Holiday",
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "sweaters", label: "Sweaters" },
  { id: "raincoats", label: "Raincoats" },
  { id: "costumes", label: "Costumes" },
  { id: "accessories", label: "Accessories" },
  { id: "outerwear", label: "Outerwear" },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
