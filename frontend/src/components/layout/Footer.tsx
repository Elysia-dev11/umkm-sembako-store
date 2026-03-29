import Link from 'next/link';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl">Sembako Store</span>
            </div>
            <p className="text-gray-400 mb-4">
              Platform e-commerce untuk UMKM toko sembako. Belanja kebutuhan pokok dengan mudah dan terpercaya.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-primary transition-colors">Produk</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=beras" className="text-gray-400 hover:text-primary transition-colors">Beras</Link></li>
              <li><Link href="/products?category=minyak" className="text-gray-400 hover:text-primary transition-colors">Minyak Goreng</Link></li>
              <li><Link href="/products?category=gula" className="text-gray-400 hover:text-primary transition-colors">Gula</Link></li>
              <li><Link href="/products?category=telor" className="text-gray-400 hover:text-primary transition-colors">Telur</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                <span>Jl. Pasar Baru No. 123, Jakarta</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={18} />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={18} />
                <span>info@sembakostore.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>2026 Sembako Store. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
