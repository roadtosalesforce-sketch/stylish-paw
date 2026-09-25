export type PetType = "dog" | "cat" | "both";
export type Category = "clothing" | "collars-leashes" | "essentials";
export type FitProfile = "regular" | "dachshund" | "sighthound" | "bulldog" | "small-dog" | "large-dog" | "puppy";

export interface ProductVariant {
  key: string;
  size: string;
  color: string;
  sku?: string;
  stock: number;
}

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
  gallery?: Array<{url: string; alt?: string}>;
  fitProfiles?: FitProfile[];
  material?: string;
  careInstructions?: string;
  fitNotes?: string;
  relatedProductIds?: string[];
  sizeGuide?: ProductSizeGuide;
  reviews?: ProductReview[];
  trackInventory?: boolean;
  variants?: ProductVariant[];
  featured?: boolean;
  badge?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
