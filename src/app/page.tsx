import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-card p-8 md:p-12 rounded-lg overflow-hidden text-center md:text-left">
        <div className="relative z-10 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground tracking-tight">
            Everything you need, delivered fast.
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            From fresh groceries to the latest tech, OmniMart Express is your one-stop shop for quality and convenience.
          </p>
          <Button size="lg" asChild className="mt-6 font-bold">
            <Link href="/products">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
         <Image
          src="https://picsum.photos/seed/1/1200/800"
          alt="Bright and modern supermarket aisle"
          data-ai-hint="supermarket aisle"
          fill
          priority
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50"></div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <Link key={category.id} href={`/products?category=${category.slug}`} className="group relative block bg-card rounded-lg overflow-hidden border shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative aspect-w-4 aspect-h-3">
                 <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  data-ai-hint={category.imageHint}
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-semibold text-white font-headline">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
