export type Produkt = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  subcategory: string;
  slug: string;
  stock: number;
  sale: boolean;
  salePrice: number;
  saleText: string;
  featured: 'new' | 'best-seller' | 'none';
};

export const products: Produkt[] = [
  {
    id: 1111,
    name: 'Test1',
    price: 25,
    description:
      'Bønnespirer er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Bønnespirer er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Bønnespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Bønnespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-1.png',
    category: 'krydderier',
    subcategory: 'Bønnespirer',
    slug: 'boennespirer',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 2222,
    name: 'Test2',
    price: 25,
    description:
      'Rødbedespirer er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rødbedespirer er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rødbedespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rødbedespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-2.png',
    category: 'oekologi',
    subcategory: 'Rødbedespirer',
    slug: 'roedbespirer',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 3333,
    name: 'Test3',
    price: 25,
    description:
      'Karse er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Karse er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Karse er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Karse er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-3.png',
    category: 'krydderier',
    subcategory: 'Karse',
    slug: 'karse',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 4444,
    name: 'Test4',
    price: 25,
    description:
      'Rug er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rug er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/pyaslil.png',
    category: 'krydderier',
    subcategory: 'Rug',
    slug: 'rug',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 5555,
    name: 'Test5',
    price: 25,
    description:
      'Rug er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rug er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/pyaslil.png',
    category: 'krydderier',
    subcategory: 'Rug',
    slug: 'rug',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 6666,
    name: 'Test6',
    price: 25,
    description:
      'Bønnespirer er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Bønnespirer er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Bønnespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Bønnespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-1.png',
    category: 'oekologi',
    subcategory: 'Bønnespirer',
    slug: 'boennespirer',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 7777,
    name: 'Test7',
    price: 25,
    description:
      'Rødbedespirer er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rødbedespirer er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rødbedespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rødbedespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-2.png',
    category: 'krydderier',
    subcategory: 'Rødbedespirer',
    slug: 'roedbespirer',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 8888,
    name: 'Test8',
    price: 25,
    description:
      'Karse er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Karse er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Karse er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Karse er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-3.png',
    category: 'oekologi',
    subcategory: 'Karse',
    slug: 'karse',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 9999,
    name: 'Test9',
    price: 25,
    description:
      'Rug er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rug er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/pyaslil.png',
    category: 'krydderier',
    subcategory: 'Rug',
    slug: 'rug',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1000,
    name: 'Test10',
    price: 25,
    description:
      'Rug er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rug er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/pyaslil.png',
    category: 'krydderier',
    subcategory: 'Rug',
    slug: 'rug',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1011,
    name: 'Test11',
    price: 25,
    description:
      'Bønnespirer er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Bønnespirer er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Bønnespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Bønnespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-1.png',
    category: 'krydderier',
    subcategory: 'Bønnespirer',
    slug: 'boennespirer',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1222,
    name: 'Test12',
    price: 25,
    description:
      'Rødbedespirer er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rødbedespirer er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rødbedespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rødbedespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-2.png',
    category: 'oekologi',
    subcategory: 'Rødbedespirer',
    slug: 'roedbespirer',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1333,
    name: 'Test13',
    price: 25,
    description:
      'Karse er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Karse er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Karse er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Karse er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-3.png',
    category: 'oekologi',
    subcategory: 'Karse',
    slug: 'karse',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1444,
    name: 'Test14',
    price: 25,
    description:
      'Rug er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rug er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/pyaslil.png',
    category: 'krydderier',
    subcategory: 'Rug',
    slug: 'rug',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1555,
    name: 'Test15',
    price: 25,
    description:
      'Rug er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rug er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/pyaslil.png',
    category: 'oekologi',
    subcategory: 'Rug',
    slug: 'rug',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1666,
    name: 'Test16',
    price: 25,
    description:
      'Bønnespirer er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Bønnespirer er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Bønnespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Bønnespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-1.png',
    category: 'krydderier',
    subcategory: 'Bønnespirer',
    slug: 'boennespirer',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1777,
    name: 'Test17',
    price: 25,
    description:
      'Rødbedespirer er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rødbedespirer er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rødbedespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rødbedespirer er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-2.png',
    category: 'oekologi',
    subcategory: 'Rødbedespirer',
    slug: 'roedbespirer',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1888,
    name: 'Test18',
    price: 25,
    description:
      'Karse er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Karse er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Karse er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Karse er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/Chislalk-3.png',
    category: 'krydderier',
    subcategory: 'Karse',
    slug: 'karse',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 1999,
    name: 'Test19',
    price: 25,
    description:
      'Rug er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rug er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/pyaslil.png',
    category: 'oekologi',
    subcategory: 'Rug',
    slug: 'rug',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  },
  {
    id: 2020,
    name: 'Test20',
    price: 25,
    description:
      'Rug er en af de mest populære spirer. De er nemme at dyrke og har en mild smag. Rug er rig på proteiner, vitaminer og mineraler. De er også en god kilde til jern, calcium og kalium. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler. Rug er en god kilde til protein, jern, calcium og kalium. De er også en god kilde til vitaminer og mineraler.',
    image: '/assets/products/pyaslil.png',
    category: 'krydderier',
    subcategory: 'Rug',
    slug: 'rug',
    stock: 10,
    sale: true,
    salePrice: 20,
    saleText: 'Tilbud',
    featured: 'new'
  }
];
