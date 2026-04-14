export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageHint: string;
  stock: number;
  requiresRefrigeration?: boolean;
  // AI-generated fields
  usageInstructions?: string;
  careGuidelines?: string;
  warrantyInformation?: string;
  safetyWarnings?: string;
  assemblyInstructions?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  imageHint: string;
};

export type CartItem = {
  id: string;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
};

export type User = {
  id: string;
  name: string;
  email: string;
  addresses: string[];
  wishlist: string[]; // array of product ids
};
