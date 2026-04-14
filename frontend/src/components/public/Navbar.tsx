'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/components/providers/LangProvider';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { locale, setLocale, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Only homepage gets transparent navbar — all other pages get solid
  const isHomepage = pathname === '/';
  const showSolid = scrolled || !isHomepage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll(); // check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: isHomepage ? '#about' : '/#about', label: t('nav.about') },
    { href: isHomepage ? '#services' : '/#services', label: t('nav.services') },
    { href: isHomepage ? '#spaces' : '/#spaces', label: t('nav.spaces') },
    { href: isHomepage ? '#whyus' : '/#whyus', label: t('nav.whyUs') },
    { href: '/blog', label: t('nav.blog') },
    { href: isHomepage ? '#contact' : '/#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: showSolid ? '#ffffff' : 'transparent',
          boxShadow: showSolid ? '0 1px 0 0 #e5e5e5' : 'none',
          padding: showSolid ? '12px 0' : '20px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="MedWorx"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span
              className="text-lg font-bold tracking-tight transition-colors"
              style={{ color: showSolid ? '#171717' : '#ffffff' }}
            >
              {locale === 'ar' ? 'مـدووركـس' : 'MedWorx'}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color: showSolid ? '#525252' : 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div
              className="hidden sm:flex items-center rounded-full p-0.5 transition-colors"
              style={{ backgroundColor: showSolid ? '#f5f5f5' : 'rgba(255,255,255,0.1)' }}
            >
              <button
                onClick={() => setLocale('en')}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: locale === 'en' ? '#0C2340' : 'transparent',
                  color: locale === 'en' ? '#ffffff' : showSolid ? '#737373' : 'rgba(255,255,255,0.6)',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLocale('ar')}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all font-ar"
                style={{
                  backgroundColor: locale === 'ar' ? '#0C2340' : 'transparent',
                  color: locale === 'ar' ? '#ffffff' : showSolid ? '#737373' : 'rgba(255,255,255,0.6)',
                }}
              >
                عربي
              </button>
            </div>

            {/* Book a Room CTA */}
            <Link
              href="/booking"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: showSolid ? '#0C2340' : '#ffffff',
                color: showSolid ? '#ffffff' : '#0C2340',
                textDecoration: 'none',
              }}
            >
              {t('nav.booking')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: showSolid ? '#404040' : '#ffffff' }}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-white flex flex-col">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: '1px solid #e5e5e5' }}>
            <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
              <img
                src="/logo.png"
                alt="MedWorx"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="text-lg font-bold tracking-tight" style={{ color: '#171717' }}>
                {locale === 'ar' ? 'مـدووركـس' : 'MedWorx'}
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg"
              style={{ color: '#525252' }}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-medium rounded-lg transition-colors"
                  style={{ color: '#404040', textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Language Toggle */}
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid #e5e5e5' }}>
              <div className="flex items-center gap-2 px-4 mb-4">
                <button
                  onClick={() => setLocale('en')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: locale === 'en' ? '#0C2340' : '#f5f5f5',
                    color: locale === 'en' ? '#ffffff' : '#525252',
                  }}
                >
                  English
                </button>
                <button
                  onClick={() => setLocale('ar')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all font-ar"
                  style={{
                    backgroundColor: locale === 'ar' ? '#0C2340' : '#f5f5f5',
                    color: locale === 'ar' ? '#ffffff' : '#525252',
                  }}
                >
                  العربية
                </button>
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="px-4 py-4" style={{ borderTop: '1px solid #e5e5e5' }}>
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="block w-full py-3 text-center font-semibold rounded-lg transition-colors"
              style={{ backgroundColor: '#0C2340', color: '#ffffff', textDecoration: 'none' }}
            >
              {t('nav.booking')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
