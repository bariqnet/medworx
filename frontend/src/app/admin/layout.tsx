'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [status, router, isLoginPage]);

  // Close the mobile drawer whenever the route changes
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  // Allow login page to render without auth
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0d0b2e] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#c4197d] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#0d0b2e]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#0d0b2e]/95 backdrop-blur border-b border-white/[0.06] flex items-center gap-3 px-4 h-14">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 -ml-2 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.06] transition-all"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
            <circle cx="20" cy="20" r="19" stroke="url(#topGrad)" strokeWidth="2"/>
            <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="url(#topGrad)" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="20" cy="20" r="3" fill="url(#topGrad)"/>
            <defs><linearGradient id="topGrad" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#c4197d"/><stop offset="1" stopColor="#3a1d8e"/></linearGradient></defs>
          </svg>
          <span className="font-bold text-sm text-white">MedWorx</span>
        </div>
      </div>

      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
