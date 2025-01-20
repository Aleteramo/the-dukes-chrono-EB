// Product interface definition
export interface Product {
  id: string;
  name: string;
  image?: string; // Optional image URL
  description?: string; // Optional description
  price?: number | string; // Optional price
  status: 'available' | 'sold'; // Product availability status
  soldDate?: string; // Optional ISO date string (e.g., '2023-11-15')
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

// Utility function to format dates consistently
export const formatDate = (dateString?: string): string | undefined => {
  if (!dateString) return undefined;

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return undefined;
  }
};

// Array of products
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
    },
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
    },
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
    },
  },
  {
    id: '4',
    name: 'IWC Portuguese Perpetual Calendar',
    description: 'Limited Edition in platinum',
    price: '€85,000',
    image: '/images/watches/iwc-portuguese.jpg',
    status: 'sold',
    soldDate: '2023-10-20',
    details: {
      brand: 'IWC',
      model: 'Portuguese',
      year: '2019',
      condition: 'Excellent',
      movement: 'Automatic',
      case: 'Platinum',
      bracelet: 'Alligator Leather',
    },
  },
  {
    id: '5',
    name: 'Omega Speedmaster Moonwatch',
    description: 'Professional Chronograph in stainless steel',
    price: '€65,000',
    image: '/images/watches/omega-speedmaster.jpg',
    status: 'available',
    details: {
      brand: 'Omega',
      model: 'Speedmaster',
      year: '2022',
      condition: 'Like New',
      movement: 'Manual',
      case: 'Stainless Steel',
      bracelet: 'Steel Bracelet',
    },
  },
];

// Function to get all available products
export const getAvailableProducts = (): Product[] =>
  products.filter((product) => product.status === 'available');

// Function to get all sold products with formatted soldDate
export const getSoldProducts = (): (Product & { formattedSoldDate?: string })[] => {
  return products
    .filter((product) => product.status === 'sold')
    .map((product) => ({
      ...product,
      formattedSoldDate: formatDate(product.soldDate),
    }));
};