"use client";

import type { ReactNode } from 'react';
import { createContext, useState, useCallback, useMemo } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { products as allProducts } from '@/lib/data';

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId:string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  getCartDetails: () => (CartItem & { product: Product | undefined })[];
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((productId: string, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { id: productId, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const getCartDetails = useCallback(() => {
    return cart.map(item => ({
      ...item,
      product: allProducts.find(p => p.id === item.id),
    }));
  }, [cart]);

  const cartTotal = useMemo(() => {
    return getCartDetails().reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  }, [getCartDetails]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        getCartDetails
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
