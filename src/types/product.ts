export type PetType = "dog" | "cat" | "both";
export type Category = "sweaters" | "raincoats" | "costumes" | "accessories" | "outerwear";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  namePl?: string;
  description: string;
  descriptionEn?: string;
  descriptionPl?: string;
  price: number;
  category: Category;
  petType: PetType;
  sizes: string[];
  colors: string[];
  sizeLabelsPl?: Record<string, string>;
  colorLabelsPl?: Record<string, string>;
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
