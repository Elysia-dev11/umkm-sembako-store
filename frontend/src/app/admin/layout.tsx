'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Produk', href: '/admin/products', icon: Package },
  { name: 'Pesanan', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Pelanggan', href: '/admin/customers', icon: Users },
  { name: 'Pengiriman', href: '/admin/delivery', icon: Truck },
  { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in and is admin
    const checkAuth = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
          // Check if user is admin
          if (userData.role !== 'ADMIN') {
            router.push('/login?redirect=/admin');
          }
        } catch {
          router.push('/login?redirect=/admin');
        }
      } else {
        router.push('/login?redirect=/admin');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} />
        </button>
        <h1 className="font-bold text-lg">Admin Panel</h1>
        <div className="w-6" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gray-900 text-white
          transform transition-transform duration-200
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Sembako Admin</h1>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors w-full"
            >
              <LogOut size={20} />
              Keluar
            </button>
          </div>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}