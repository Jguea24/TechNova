// model/Product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  image_url?: string | null;
  description?: string | null;
  category_name?: string | null;
  category?: number | { id: number; name: string } | null;
  stock: number;
}
