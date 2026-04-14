import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { Github, Twitter, Facebook } from 'lucide-react';
import { categories } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your one-stop supermarket for everything from fresh produce to electronics.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="GitHub"><Github className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Shop by Category</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.slug}`} className="text-sm text-muted-foreground hover:text-primary">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-primary">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OmniMart Express. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
