export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  status: 'available' | 'sold';
  soldDate?: string; 
  details: {
    brand: string;
    model: string;
    year: string;
    condition: string;
    movement: string;
    case: string;
    bracelet: string;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Rolex Daytona',
    description: 'Cosmograph in platinum with meteorite dial',
    price: '€75,000',
    image: '/images/watches/daytona.jpg',
    status: 'available',
    details: {
      brand: 'Rolex',
      model: 'Daytona',
      year: '2021',
      condition: 'Excellent',
      movement: 'Automatic',
      case: 'Platinum',
      bracelet: 'Oysterflex',
    }
  },
  {
    id: '2',
    name: 'Patek Philippe Nautilus',
    description: 'Ref. 5711 in stainless steel with blue dial',
    price: '€120,000',
    image: '/images/watches/nautilus.jpg',
    status: 'sold',
    soldDate: '2023-11-15',
    details: {
      brand: 'Patek Philippe',
      model: 'Nautilus',
      year: '2020',
      condition: 'Like New',
      movement: 'Automatic',
      case: 'Stainless Steel',
      bracelet: 'Integrated Steel',
    }
  },
  {
    id: '3',
    name: 'Audemars Piguet Royal Oak',
    description: 'Jumbo Extra-Thin in 18k rose gold',
    price: '€95,000',
    image: '/images/watches/royal-oak.jpg',
    status: 'sold',
    soldDate: '2023-12-01',
    details: {
      brand: 'Audemars Piguet',
      model: 'Royal Oak',
      year: '2022',
      condition: 'Mint',
      movement: 'Automatic',
      case: 'Rose Gold',
      bracelet: 'Rose Gold',
    }
  },
  // Aggiungi altri orologi qui...
];

export const getAvailableProducts = () => products.filter(p => p.status === 'available');
export const getSoldProducts = () => products.filter(p => p.status === 'sold');
