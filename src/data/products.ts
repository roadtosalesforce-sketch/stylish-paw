import type { Product } from "@/types/product";
import type {Locale} from "@/i18n/dictionaries";

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

const polishProducts: Record<string, {name: string; description: string; colors: Record<string, string>; sizes?: Record<string, string>}> = {
  "cozy-knit-dog-sweater": {name: "Przytulny dzianinowy sweter dla psa", description: "Miękki sweter z mieszanki wełny merino z prążkowanym golfem. Idealny na chłodne poranne spacery, wygodny i nieograniczający ruchów.", colors: {Cream: "Kremowy", Sage: "Szałwiowy", Rust: "Rdzawy"}},
  "rainy-day-pup-parka": {name: "Parka dla psa na deszczowe dni", description: "Wodoodporna warstwa zewnętrzna, uszczelnione szwy i przytulna polarowa podszewka. Odblaskowe elementy poprawiają widoczność w pochmurne dni.", colors: {Yellow: "Żółty", Navy: "Granatowy", Red: "Czerwony"}},
  "classic-plaid-cat-bandana": {name: "Klasyczna bandana w kratę dla kota", description: "Lekka bawełniana bandana z wygodnym zapięciem na napy. Dwustronny wzór daje dwa różne wyglądy.", colors: {"Plaid Red": "Czerwona krata", "Plaid Green": "Zielona krata", "Plaid Blue": "Niebieska krata"}, sizes: {"One Size": "Jeden rozmiar"}},
  "halloween-bat-wings-costume": {name: "Kostium z nietoperzymi skrzydłami na Halloween", description: "Lekkie filcowe skrzydła mocowane elastycznym paskiem na klatce piersiowej. Bez zamków i zbędnego zamieszania — gotowe na każdą imprezę.", colors: {Black: "Czarny", Purple: "Fioletowy"}},
  "summer-mesh-cooling-vest": {name: "Letnia kamizelka chłodząca z siateczki", description: "Oddychająca siateczka z ochroną przeciwsłoneczną UPF 30. Namocz, wyciśnij i załóż, aby zapewnić pupilowi ulgę w upalne dni.", colors: {"Sky Blue": "Błękitny", Mint: "Miętowy", Coral: "Koralowy"}},
  "luxury-fleece-hoodie": {name: "Luksusowa bluza polarowa", description: "Wyjątkowo miękka bluza z mikropolaru z kapturem i kieszenią kangurką. Komfort w prawdziwie miejskim stylu.", colors: {"Heather Grey": "Szary melanż", "Blush Pink": "Pudrowy róż", Charcoal: "Antracytowy"}},
  "reflective-safety-jacket": {name: "Odblaskowa kurtka bezpieczeństwa", description: "Odblaskowa lamówka 360° i lekka, wiatroodporna warstwa. Niezbędna na wieczorne spacery i poranne bieganie.", colors: {"Neon Orange": "Neonowy pomarańczowy", "Neon Green": "Neonowy zielony"}},
  "holiday-reindeer-sweater": {name: "Świąteczny sweter z reniferem", description: "Świąteczna dzianina żakardowa z haftowanym reniferem. Idealny sweter do zimowych zdjęć zarówno dla psów, jak i kotów.", colors: {"Red/Green": "Czerwony/zielony", "Navy/Gold": "Granatowy/złoty"}},
};

export function getFallbackProducts(locale: Locale): Product[] {
  return products.map((product) => {
    const polish = polishProducts[product.slug];
    return {
      ...product,
      nameEn: product.name,
      namePl: polish?.name,
      descriptionEn: product.description,
      descriptionPl: polish?.description,
      colorLabelsPl: polish?.colors,
      sizeLabelsPl: polish?.sizes,
      name: locale === "pl" ? polish?.name || product.name : product.name,
      description: locale === "pl" ? polish?.description || product.description : product.description,
    };
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
