'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Package, 
  Wrench, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Phone,
  Tags
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const navigation = [
    { name: 'لوحة التحكم', href: '/admin/dashboard', icon: Home },
    { name: 'المنتجات', href: '/admin/products', icon: Package },
    { name: 'الخدمات', href: '/admin/services', icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-black" dir="rtl">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-75" onClick={() => setIsSidebarOpen(false)} />
        <div className="relative flex flex-col w-full max-w-xs bg-black">
          <div className="absolute top-0 left-0 -ml-12 pt-2">
            <button
              className="mr-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* Mobile Sidebar Content */}
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center ml-2">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">لوحة التحكم</span>
            </div>
            <nav className="mt-8 px-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:right-0 lg:border-l lg:border-gray-700 lg:bg-black">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-6 bg-black border-b border-gray-700">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center ml-2">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">لوحة التحكم</span>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-6 py-6 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 border-t border-gray-700 p-6">
            <button
              onClick={handleLogout}
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white w-full"
            >
              <LogOut className="mr-3 h-5 w-5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:mr-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 bg-black border-b border-gray-700 px-4">
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center ml-2">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">لوحة التحكم</span>
          </div>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}