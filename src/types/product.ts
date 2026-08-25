export type PetType = "dog" | "cat" | "both";
export type Category = "sweaters" | "raincoats" | "costumes" | "accessories" | "outerwear";

export interface ProductSizeRow {
  size: string;
  neck?: string;
  chest?: string;
  back?: string;
  weight?: string;
}

export interface ProductSizeGuide {
  title?: string;
  instructions?: string;
  rows: ProductSizeRow[];
}

export interface ProductReview {
  customerName: string;
  petName?: string;
  rating: number;
  quote: string;
  photo?: string;
}

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
  sizeGuide?: ProductSizeGuide;
  reviews?: ProductReview[];
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
