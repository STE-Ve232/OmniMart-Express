import type { Product, Category, User, Order } from './types';

export const categories: Category[] = [
  { id: 'cat1', name: 'Fresh Produce', slug: 'fresh-produce', imageUrl: 'https://picsum.photos/seed/2/400/300', imageHint: 'fresh produce' },
  { id: 'cat2', name: 'Electronics', slug: 'electronics', imageUrl: 'https://picsum.photos/seed/3/400/300', imageHint: 'electronic gadgets' },
  { id: 'cat3', name: 'Apparel', slug: 'apparel', imageUrl: 'https://picsum.photos/seed/4/400/300', imageHint: 'clothing rack' },
  { id: 'cat4', name: 'Office Supplies', slug: 'office-supplies', imageUrl: 'https://picsum.photos/seed/5/400/300', imageHint: 'office supplies' },
  { id: 'cat5', name: 'Household Items', slug: 'household-items', imageUrl: 'https://picsum.photos/seed/6/400/300', imageHint: 'household items' },
];

export const products: Product[] = [
  {
    id: 'prod1',
    slug: 'fresh-mangoes',
    name: 'Fresh Mangoes (Each)',
    description: 'Sweet, juicy, and packed with tropical flavor. Perfect for smoothies, salads, or a healthy snack.',
    price: 1.50,
    category: 'fresh-produce',
    imageUrl: 'https://picsum.photos/seed/101/600/400',
    imageHint: 'fresh mangoes',
    stock: 150,
    requiresRefrigeration: true,
    safetyWarnings: 'Wash before eating.'
  },
  {
    id: 'prod2',
    slug: 'organic-spinach',
    name: 'Organic Spinach (250g)',
    description: 'Freshly harvested organic spinach, rich in iron and vitamins. Ideal for salads, sautés, and green smoothies.',
    price: 3.00,
    category: 'fresh-produce',
    imageUrl: 'https://picsum.photos/seed/102/600/400',
    imageHint: 'fresh spinach',
    stock: 80,
    requiresRefrigeration: true,
    careGuidelines: 'Keep refrigerated in a crisper drawer. Use within 3-5 days for optimal freshness.',
  },
  {
    id: 'prod3',
    slug: 'hass-avocados',
    name: 'Hass Avocados (Each)',
    description: 'Creamy and delicious Hass avocados. Perfect for toast, guacamole, or adding to salads.',
    price: 2.00,
    category: 'fresh-produce',
    imageUrl: 'https://picsum.photos/seed/103/600/400',
    imageHint: 'fresh avocados',
    stock: 200,
  },
  {
    id: 'prod4',
    slug: 'aero-pods-pro',
    name: 'AeroPods Pro',
    description: 'Immersive sound, active noise cancellation, and a customizable fit. Your everyday audio companion.',
    price: 249.99,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/seed/104/600/400',
    imageHint: 'wireless earphones',
    stock: 50,
    usageInstructions: 'Open the case near your phone and tap Connect. Place in your ears to play audio.',
    warrantyInformation: '1-Year Limited Warranty.'
  },
  {
    id: 'prod5',
    slug: 'nexus-10-smartphone',
    name: 'Nexus 10 Smartphone',
    description: 'A powerful smartphone with a stunning 6.7-inch display, pro-grade camera system, and all-day battery life.',
    price: 999.00,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/seed/105/600/400',
    imageHint: 'modern smartphone',
    stock: 35,
    warrantyInformation: '1-Year Manufacturer Warranty.'
  },
  {
    id: 'prod6',
    slug: 'ultra-slim-laptop',
    name: 'UltraSlim Laptop 14"',
    description: 'Experience incredible performance in a sleek, lightweight design. Perfect for work, study, and entertainment on the go.',
    price: 1299.00,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/seed/106/600/400',
    imageHint: 'silver laptop',
    stock: 20,
  },
  {
    id: 'prod7',
    slug: 'classic-cotton-t-shirt',
    name: 'Classic Cotton T-Shirt',
    description: 'A comfortable and versatile t-shirt made from 100% premium cotton. Available in various colors.',
    price: 19.99,
    category: 'apparel',
    imageUrl: 'https://picsum.photos/seed/107/600/400',
    imageHint: 'cotton t-shirt',
    stock: 300,
    careGuidelines: 'Machine wash cold, tumble dry low. Do not bleach.'
  },
  {
    id: 'prod8',
    slug: 'denim-jeans',
    name: 'Slim Fit Denim Jeans',
    description: 'Modern slim fit jeans crafted from durable stretch denim for all-day comfort and style.',
    price: 59.99,
    category: 'apparel',
    imageUrl: 'https://picsum.photos/seed/108/600/400',
    imageHint: 'blue jeans',
    stock: 120,
  },
  {
    id: 'prod9',
    slug: 'trail-runner-shoes',
    name: 'TrailRunner X1 Shoes',
    description: 'Lightweight and durable running shoes designed for maximum comfort and support on any terrain.',
    price: 89.99,
    category: 'apparel',
    imageUrl: 'https://picsum.photos/seed/109/600/400',
    imageHint: 'running shoes',
    stock: 90,
  },
  {
    id: 'prod10',
    slug: 'ergonomic-office-chair',
    name: 'Ergonomic Office Chair',
    description: 'Stay comfortable and productive with this ergonomic office chair featuring lumbar support and adjustable armrests.',
    price: 179.99,
    category: 'office-supplies',
    imageUrl: 'https://picsum.photos/seed/110/600/400',
    imageHint: 'office chair',
    stock: 40,
    assemblyInstructions: 'Simple 5-step assembly with included tools. Estimated time: 15 minutes.'
  },
  {
    id: 'prod11',
    slug: 'a4-printer-paper',
    name: 'A4 Printer Paper (500 Sheets)',
    description: 'High-quality 80gsm printer paper for crisp, clear printing. Perfect for office and home use.',
    price: 7.99,
    category: 'office-supplies',
    imageUrl: 'https://picsum.photos/seed/111/600/400',
    imageHint: 'printer paper',
    stock: 500,
  },
  {
    id: 'prod12',
    slug: 'lemon-dish-soap',
    name: 'Lemon Fresh Dish Soap (750ml)',
    description: 'Tough on grease, gentle on hands. Leaves your dishes sparkling clean with a fresh lemon scent.',
    price: 4.50,
    category: 'household-items',
    imageUrl: 'https://picsum.photos/seed/112/600/400',
    imageHint: 'dish soap',
    stock: 250,
  },
  {
    id: 'prod13',
    slug: 'multi-surface-cleaner',
    name: 'Multi-Surface Cleaner',
    description: 'A powerful all-purpose cleaner that cuts through dirt and grime on a variety of surfaces.',
    price: 5.99,
    category: 'household-items',
    imageUrl: 'https://picsum.photos/seed/113/600/400',
    imageHint: 'cleaning spray',
    stock: 180,
    safetyWarnings: 'Keep out of reach of children. Avoid contact with eyes.'
  }
];

export const users: User[] = [
  {
    id: 'user1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    addresses: ['123 Savanna Close, Nairobi, Kenya'],
    wishlist: ['prod4', 'prod9']
  }
];

export const orders: Order[] = [
    {
        id: 'ord1',
        date: '2024-07-28',
        items: [
            { productId: 'prod1', quantity: 4, price: 1.50 },
            { productId: 'prod2', quantity: 2, price: 3.00 }
        ],
        total: 12.00,
        status: 'Delivered'
    },
    {
        id: 'ord2',
        date: '2024-08-10',
        items: [
            { productId: 'prod7', quantity: 2, price: 19.99 },
            { productId: 'prod8', quantity: 1, price: 59.99 }
        ],
        total: 99.97,
        status: 'Shipped'
    },
    {
        id: 'ord3',
        date: '2024-08-15',
        items: [
            { productId: 'prod5', quantity: 1, price: 999.00 }
        ],
        total: 999.00,
        status: 'Processing'
    }
];
