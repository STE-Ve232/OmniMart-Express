"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  phone: z.string().min(10, "A valid phone number is required"),
  deliveryMethod: z.string({ required_error: "Please select a delivery method." }),
  paymentMethod: z.string({ required_error: "Please select a payment method." }),
});

export default function CheckoutPage() {
  const router = useRouter();
  const { getCartDetails, cartTotal, cartCount, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const cartDetails = getCartDetails();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      address: user?.addresses[0] || '',
      city: 'Nairobi',
      phone: '',
      deliveryMethod: 'standard',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Order submitted:", values);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push('/profile?tab=orders');
  };

  if (cartCount === 0) {
    return (
        <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground mt-2">Add items to your cart before proceeding to checkout.</p>
            <Button asChild className="mt-4"><a href="/products">Continue Shopping</a></Button>
        </div>
    )
  }

  const shippingCost = form.watch('deliveryMethod') === 'express' ? 10 : 5;
  const taxes = cartTotal * 0.16; // 16% VAT
  const total = cartTotal + shippingCost + taxes;

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-6">Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader><CardTitle>1. Shipping Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                 <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <div className="grid grid-cols-2 gap-4">
                   <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                   <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} placeholder="+254 7..."/></FormControl><FormMessage /></FormItem>
                  )}/>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>2. Delivery Method</CardTitle></CardHeader>
              <CardContent>
                <FormField
                  control={form.control} name="deliveryMethod"
                  render={({ field }) => (
                  <FormItem>
                    <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                            <Label className="flex items-center gap-4 border p-4 rounded-md has-[input:checked]:border-primary">
                                <RadioGroupItem value="standard" />
                                <div><p className="font-semibold">Standard Delivery ($5.00)</p><p className="text-sm text-muted-foreground">2-3 business days</p></div>
                            </Label>
                             <Label className="flex items-center gap-4 border p-4 rounded-md has-[input:checked]:border-primary">
                                <RadioGroupItem value="express" />
                                <div><p className="font-semibold">Express Delivery ($10.00)</p><p className="text-sm text-muted-foreground">Same or next business day</p></div>
                            </Label>
                        </RadioGroup>
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                 )}/>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>3. Payment Method</CardTitle></CardHeader>
              <CardContent>
                 <FormField
                  control={form.control} name="paymentMethod"
                  render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                            <Label className="flex items-center gap-4 border p-4 rounded-md has-[input:checked]:border-primary"><RadioGroupItem value="mpesa" /><span>M-Pesa</span></Label>
                            <Label className="flex items-center gap-4 border p-4 rounded-md has-[input:checked]:border-primary"><RadioGroupItem value="card" /><span>Credit/Debit Card</span></Label>
                            <Label className="flex items-center gap-4 border p-4 rounded-md has-[input:checked]:border-primary"><RadioGroupItem value="cod" /><span>Cash on Delivery</span></Label>
                        </RadioGroup>
                     </FormControl>
                      <FormMessage />
                  </FormItem>
                 )}/>
              </CardContent>
            </Card>
             <Button type="submit" size="lg" className="w-full font-bold">Place Order - {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}</Button>
          </form>
        </Form>
      </div>

      <div className="bg-muted/30 p-8 rounded-lg border h-fit sticky top-24">
        <h2 className="text-xl font-bold font-headline mb-4">Order Summary</h2>
        <div className="space-y-4">
            {cartDetails.map(item => item.product && (
                 <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                       <Image src={item.product.imageUrl} alt={item.product.name} fill sizes="64px" className="object-cover" />
                       <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">{item.quantity}</Badge>
                    </div>
                    <p className="flex-grow font-semibold text-sm">{item.product.name}</p>
                    <p className="text-sm">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.product.price * item.quantity)}</p>
                </div>
            ))}
        </div>
        <Separator className="my-6" />
        <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between"><span>Subtotal</span><span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cartTotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(shippingCost)}</span></div>
            <div className="flex justify-between"><span>Taxes (16%)</span><span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(taxes)}</span></div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}</span>
        </div>
      </div>
    </div>
  );
}
