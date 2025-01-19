export interface Product {
  id: string;
  translationKey: string;
  image: string;
  status?: 'available' | 'sold';
  soldDate?: string;
}

export const products: Product[] = [
  {
    id: '1',
    translationKey: '1', // corresponds to Products.watches.1
    image: '/images/watches/eduorologi1.svg',
    status: 'available'
  },
  {
    id: '2',
    translationKey: '2', // corresponds to Products.watches.2
    image: '/images/watches/eduorologi1.svg',
    status: 'available'
  },
  {
    id: '3',
    translationKey: '3', // corresponds to Products.watches.3
    image: '/images/watches/eduorologi1.svg',
    status: 'available'
  }
];

export const soldProducts: Product[] = [
  {
    id: '4',
    translationKey: '4', // corresponds to Products.watches.4
    image: '/images/watches/eduorologi1.svg',
    status: 'sold',
    soldDate: '2023-12-15'
  },
  {
    id: '5',
    translationKey: '5', // corresponds to Products.watches.5
    image: '/images/watches/eduorologi1.svg',
    status: 'sold',
    soldDate: '2023-11-30'
  }
];

export function getAvailableProducts(): Product[] {
  return products;
}

export function getSoldProducts(): Product[] {
  return soldProducts;
}
