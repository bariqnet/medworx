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
    { href: isHomepage ? '#contact' : '/#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: showSolid ? '#ffffff' : 'transparent',
          boxShadow: showSolid ? '0 1px 0 0 #e5e5e5' : 'none',
        }}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between gap-2 transition-all duration-300 ${
            showSolid ? 'py-2.5 sm:py-3' : 'py-3 sm:py-4 lg:py-5'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-shrink" style={{ textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="MedWorx"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover flex-shrink-0"
            />
            <span
              className="text-base sm:text-lg font-bold tracking-tight transition-colors truncate"
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
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Language Toggle */}
            <div
              className="flex items-center rounded-full p-0.5 transition-colors"
              style={{ backgroundColor: showSolid ? '#f5f5f5' : 'rgba(255,255,255,0.1)' }}
            >
              <button
                onClick={() => setLocale('en')}
                className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: locale === 'en' ? '#0C2340' : 'transparent',
                  color: locale === 'en' ? '#ffffff' : showSolid ? '#737373' : 'rgba(255,255,255,0.6)',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLocale('ar')}
                className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all font-ar"
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
              className="hidden md:inline-flex items-center px-4 lg:px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap"
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
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors -mr-1"
              style={{ color: showSolid ? '#404040' : '#ffffff' }}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-white flex flex-col animate-fade-in lg:hidden">
          {/* Mobile Header */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 flex-shrink-0"
            style={{ borderBottom: '1px solid #e5e5e5', minHeight: '64px' }}
          >
            <Link href="/" className="flex items-center gap-2.5 min-w-0" style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
              <img
                src="/logo.png"
                alt="MedWorx"
                className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
              />
              <span className="text-lg font-bold tracking-tight truncate" style={{ color: '#171717' }}>
                {locale === 'ar' ? 'مـدووركـس' : 'MedWorx'}
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg -mr-2"
              style={{ color: '#525252' }}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-3.5 text-base font-medium rounded-lg transition-colors active:bg-neutral-100"
                  style={{ color: '#171717', textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Language Toggle */}
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid #e5e5e5' }}>
              <p className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#737373' }}>
                {locale === 'ar' ? 'اللغة' : 'Language'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLocale('en')}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: locale === 'en' ? '#0C2340' : '#f5f5f5',
                    color: locale === 'en' ? '#ffffff' : '#525252',
                  }}
                >
                  English
                </button>
                <button
                  onClick={() => setLocale('ar')}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all font-ar"
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
          <div
            className="px-4 sm:px-6 py-4 flex-shrink-0"
            style={{ borderTop: '1px solid #e5e5e5', paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-3.5 text-center text-base font-semibold rounded-lg transition-colors"
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
