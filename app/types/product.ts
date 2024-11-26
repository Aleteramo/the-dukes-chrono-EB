export interface Product {
  id: string;
  brand: string;
  model: string;
  year?: number;
  price?: number;
  description?: string | { [key: string]: string };
  images?: { url: string }[];
  isAvailable: boolean;
  reserved?: boolean;
}
