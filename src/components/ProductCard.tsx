"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group relative flex flex-col bg-card rounded-lg border overflow-hidden shadow-sm transition-all hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
           <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            data-ai-hint={product.imageHint}
            className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-foreground">
          <Link href={`/products/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground mt-1 flex-grow">{product.description.substring(0, 50)}...</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold text-foreground">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
          </p>
        </div>
      </div>
      <div className="p-4 pt-0 flex gap-2">
         <Button onClick={handleAddToCart} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
          </Button>
          <Button variant="outline" size="icon" aria-label="Add to wishlist">
            <Heart className="h-4 w-4" />
          </Button>
      </div>
    </div>
  );
}
