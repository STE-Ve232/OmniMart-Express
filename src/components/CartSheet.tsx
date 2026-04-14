'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartSheet() {
  const { cartCount, getCartDetails, cartTotal, updateQuantity, removeFromCart } = useCart();
  const cartDetails = getCartDetails();
  const hasRefrigeratedItems = cartDetails.some(item => item.product?.requiresRefrigeration);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5_ text-xs p-0 flex items-center justify-center"
            >
              {cartCount}
            </Badge>
          )}
          <span className="sr-only">Open shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-6">
              <div className="flex flex-col gap-4 py-4">
                {cartDetails.map((item) => item.product && (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                       <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        data-ai-hint={item.product.imageHint}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                         <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
             <SheetFooter className="mt-auto">
              {hasRefrigeratedItems && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-md mb-4 border border-blue-200">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <span>Your cart includes items that require special refrigerated delivery.</span>
                  </div>
              )}
              <div className="w-full space-y-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cartTotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full font-bold">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
                 <SheetClose asChild>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                 </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="font-semibold text-lg">Your cart is empty</p>
            <p className="text-muted-foreground">Add some products to get started.</p>
             <SheetClose asChild>
                <Button asChild><Link href="/products">Browse Products</Link></Button>
             </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
