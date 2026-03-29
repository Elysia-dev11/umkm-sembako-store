'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const itemCount = useCart((state) => state.getItemCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Sembako Store</span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari produk sembako..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
              Beranda
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-primary transition-colors">
              Produk
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              Tentang
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={24} />
              {mounted && itemCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  suppressHydrationWarning
                >
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* User */}
            <Link href="/login" className="p-2 text-gray-600 hover:text-primary transition-colors">
              <User size={24} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slideIn">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-gray-600 hover:text-primary py-2">Beranda</Link>
              <Link href="/products" className="text-gray-600 hover:text-primary py-2">Produk</Link>
              <Link href="/about" className="text-gray-600 hover:text-primary py-2">Tentang</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
