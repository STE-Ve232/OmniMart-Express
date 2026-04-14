import Link from 'next/link';
import { ShoppingBasket } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="OmniMart Express Home">
      <ShoppingBasket className="h-8 w-8 text-primary transition-transform group-hover:rotate-[-12deg]" />
      <span className="text-xl font-bold font-headline text-foreground whitespace-nowrap">
        OmniMart Express
      </span>
    </Link>
  );
}
