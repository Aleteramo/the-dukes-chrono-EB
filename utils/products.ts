export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  sold?: boolean;
  soldDate?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Rolex Daytona',
    description: 'Cronografo automatico in acciaio, quadrante nero con contatori argento',
    price: 'Su richiesta',
    image: '/images/watches/eduorologi1.svg',
  },
  {
    id: '2',
    name: 'Patek Philippe Calatrava',
    description: 'Cassa in oro rosa, quadrante opalino, movimento automatico',
    price: 'Su richiesta',
    image: '/images/watches/eduorologi1.svg',
  },
  {
    id: '3',
    name: 'Audemars Piguet Royal Oak',
    description: 'Cassa e bracciale in acciaio, quadrante blu "Grande Tapisserie"',
    price: 'Su richiesta',
    image: '/images/watches/eduorologi1.svg',
  },
];

export const soldProducts: Product[] = [
  {
    id: '4',
    name: 'Cartier Santos',
    description: 'Cassa in acciaio e oro giallo, quadrante bianco, movimento automatico',
    price: 'Venduto',
    image: '/images/watches/eduorologi1.svg',
    sold: true,
    soldDate: '2023-12-15',
  },
  {
    id: '5',
    name: 'Vacheron Constantin Overseas',
    description: 'Cronografo in acciaio, quadrante blu, bracciale integrato',
    price: 'Venduto',
    image: '/images/watches/eduorologi1.svg',
    sold: true,
    soldDate: '2023-11-30',
  },
];

export function getAvailableProducts(): Product[] {
  return products;
}

export function getSoldProducts(): Product[] {
  return soldProducts;
}
