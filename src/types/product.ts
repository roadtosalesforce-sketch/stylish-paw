export type PetType = "dog" | "cat" | "both";
export type Category = "sweaters" | "raincoats" | "costumes" | "accessories" | "outerwear";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  petType: PetType;
  sizes: string[];
  colors: string[];
  image: string;
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
