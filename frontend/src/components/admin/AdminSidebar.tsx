'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  Image,
  FileText,
  Calendar,
  MessageSquare,
  LogOut,
  Home,
  X,
} from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/sliders', label: 'Sliders', icon: Image },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
  { href: '/admin/calendar', label: 'Meeting Rooms', icon: Calendar },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={`lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-[#141043] border-r border-white/[0.08] flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-5 lg:p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
              <circle cx="20" cy="20" r="19" stroke="url(#sideGrad)" strokeWidth="2"/>
              <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="url(#sideGrad)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="3" fill="url(#sideGrad)"/>
              <defs><linearGradient id="sideGrad" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#c4197d"/><stop offset="1" stopColor="#3a1d8e"/></linearGradient></defs>
            </svg>
            <div>
              <div className="font-bold text-sm">MedWorx</div>
              <div className="text-[10px] text-[#7a779a]">Admin Panel</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#7a779a] hover:text-white hover:bg-white/[0.06] transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'btn-gradient text-white shadow-lg shadow-[#c4197d]/20'
                    : 'text-[#7a779a] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#7a779a] hover:text-white hover:bg-white/[0.04] transition-all"
          >
            <Home className="w-5 h-5" />
            View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
