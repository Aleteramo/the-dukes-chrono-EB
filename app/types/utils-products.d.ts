declare module '@/utils/products' {
  export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number | string;
    image?: string;
    type?: string;
    // Add other relevant fields
  }

  export function updateProduct(id: string, field: keyof Product, value: string | number): Promise<void>;
  export function deleteProduct(id: string): Promise<void>;
}