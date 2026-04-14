"use client";

import Link from 'next/link';
import { Search, User as UserIcon, LogOut, LayoutGrid } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartSheet } from '@/components/CartSheet';
import { categories } from '@/lib/data';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 ml-10 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="transition-colors hover:text-primary">
            All Products
          </Link>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto hover:text-primary focus-visible:ring-0">Categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                   <Link href={`/products?category=${category.slug}`}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xs ml-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="search"
                placeholder="Search products..."
                className="pl-9"
                defaultValue={searchParams.get('search') || ''}
              />
            </div>
          </form>
          <CartSheet />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserIcon className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hi, {user?.name.split(' ')[0]}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile"><UserIcon/>Profile</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/profile?tab=orders"><LayoutGrid/>My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut/> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
