"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { orders as allOrders, products as allProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

function ProfileInformation() {
    const { user } = useAuth();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p>{user?.name}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                    <p>{user?.email}</p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-muted-foreground">Shipping Address</p>
                    <p>{user?.addresses[0] || 'No address set'}</p>
                </div>
                <Button>Edit Profile</Button>
            </CardContent>
        </Card>
    );
}

function OrderHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Review your past purchases.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {allOrders.map(order => (
                    <div key={order.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                           <div>
                             <h3 className="font-semibold">Order #{order.id}</h3>
                             <p className="text-sm text-muted-foreground">Date: {new Date(order.date).toLocaleDateString()}</p>
                           </div>
                           <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="space-y-2">
                           {order.items.map(item => {
                               const product = allProducts.find(p => p.id === item.productId);
                               return product ? (
                                   <div key={item.productId} className="flex items-center justify-between text-sm">
                                       <p>{product.name} <span className="text-muted-foreground">x {item.quantity}</span></p>
                                       <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}</p>
                                   </div>
                               ) : null;
                           })}
                        </div>
                         <Separator className="my-3" />
                         <div className="flex justify-end font-bold">
                            <p>Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total)}</p>
                         </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function Wishlist() {
    const { user } = useAuth();
    const wishlistProducts = user ? allProducts.filter(p => user.wishlist.includes(p.id)) : [];
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
                <CardDescription>Items you are hoping to get.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {wishlistProducts.length > 0 ? (
                    wishlistProducts.map(product => (
                        <div key={product.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                            <Image src={product.imageUrl} alt={product.name} width={64} height={64} className="rounded-md border" />
                            <div className="flex-grow">
                                <Link href={`/products/${product.slug}`} className="font-semibold hover:underline">{product.name}</Link>
                                <p className="text-sm text-muted-foreground">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</p>
                            </div>
                            <Button size="sm">Add to Cart</Button>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-8">Your wishlist is empty.</p>
                )}
            </CardContent>
        </Card>
    );
}


export default function ProfilePageClient({ defaultTab }: { defaultTab: string }) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center py-20">
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div>
        <h1 className="text-3xl font-bold font-headline mb-2">My Account</h1>
        <p className="text-muted-foreground mb-8">Welcome back, {user.name}.</p>
        <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="profile"><ProfileInformation /></TabsContent>
        <TabsContent value="orders"><OrderHistory /></TabsContent>
        <TabsContent value="wishlist"><Wishlist /></TabsContent>
        </Tabs>
    </div>
  );
}
