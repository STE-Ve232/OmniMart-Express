"use client";

import Image from 'next/image';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Info, Package, Shield, ShoppingCart, Wrench } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return <div className="text-center py-12">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added.`,
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="bg-card p-4 border rounded-lg">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.imageHint}
            className="object-contain rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
        <div className="flex items-center gap-2">
            <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Badge>
            {product.requiresRefrigeration && <Badge variant="outline">Requires Refrigeration</Badge>}
        </div>
        <p className="text-muted-foreground text-base">{product.description}</p>
        <p className="text-4xl font-bold text-primary">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
        </p>
        
        <div className="flex items-center gap-4">
          <Button onClick={handleAddToCart} size="lg" disabled={product.stock === 0} className="flex-grow">
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <Button variant="outline" size="icon" className="w-12 h-12" aria-label="Add to wishlist">
            <Heart className="h-6 w-6" />
          </Button>
        </div>

        <div className="border-t pt-4 mt-4 space-y-4 text-sm">
          {product.usageInstructions && (
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Usage Instructions</h4>
                <p className="text-muted-foreground">{product.usageInstructions}</p>
              </div>
            </div>
          )}
          {product.careGuidelines && (
            <div className="flex gap-3">
              <Package className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Care & Storage</h4>
                <p className="text-muted-foreground">{product.careGuidelines}</p>
              </div>
            </div>
          )}
           {product.assemblyInstructions && (
            <div className="flex gap-3">
              <Wrench className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Assembly</h4>
                <p className="text-muted-foreground">{product.assemblyInstructions}</p>
              </div>
            </div>
          )}
          {product.warrantyInformation && (
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Warranty</h4>
                <p className="text-muted-foreground">{product.warrantyInformation}</p>
              </div>
            </div>
          )}
          {product.safetyWarnings && (
            <div className="flex gap-3 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-200 dark:border-amber-500/30">
              <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Safety Information</h4>
                <p>{product.safetyWarnings}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
