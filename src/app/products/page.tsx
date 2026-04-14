import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = typeof searchParams.search === 'string' ? searchParams.search : '';
  const categorySlug = typeof searchParams.category === 'string' ? searchParams.category : '';

  let filteredProducts: Product[] = products;

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (categorySlug) {
    filteredProducts = filteredProducts.filter(product => product.category === categorySlug);
  }

  const currentCategory = categories.find(c => c.slug === categorySlug);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">
          {currentCategory ? currentCategory.name : 'All Products'}
        </h1>
        <div className="flex items-center gap-4">
           {/* Mobile search - simple for now */}
          <form className="relative w-full sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input name="search" placeholder="Search..." defaultValue={searchTerm} className="pl-9" />
          </form>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h2 className="text-2xl font-semibold">No products found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            <Button asChild className="mt-4">
              <Link href="/products">Clear Filters</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
