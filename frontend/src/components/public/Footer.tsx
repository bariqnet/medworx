'use client';

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  const { locale, t } = useLang();

  const solutions = [
    { label: locale === 'ar' ? 'مساحات عمل مشتركة' : 'Coworking Spaces', href: '#services' },
    { label: locale === 'ar' ? 'مكاتب خاصة' : 'Private Offices', href: '#spaces' },
    { label: locale === 'ar' ? 'قاعات اجتماعات' : 'Meeting Rooms', href: '/booking' },
    { label: locale === 'ar' ? 'قاعات تدريب' : 'Training Halls', href: '#spaces' },
    { label: locale === 'ar' ? 'استشارات أعمال' : 'Business Consulting', href: '#services' },
    { label: locale === 'ar' ? 'فعاليات التواصل' : 'Networking Events', href: '#services' },
  ];

  const company = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.blog'), href: '/blog' },
    { label: locale === 'ar' ? 'الوظائف' : 'Careers', href: '#' },
    { label: locale === 'ar' ? 'الأخبار' : 'Newsroom', href: '/blog' },
  ];

  const support = [
    { label: locale === 'ar' ? 'مركز المساعدة' : 'Help Center', href: '#contact' },
    { label: t('nav.contact'), href: '#contact' },
    { label: t('footer.privacy'), href: '#' },
    { label: t('footer.terms'), href: '#' },
  ];

  return (
    <footer className="bg-[#0C2340] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt="MedWorx"
                className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                {locale === 'ar' ? 'مـدووركـس' : 'MedWorx'}
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              {t('footer.tagline')}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/medworx/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/medworx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/medworx-iq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              {t('footer.services')}
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {solutions.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors no-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors no-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              {locale === 'ar' ? 'الدعم' : 'Support'}
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {support.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors no-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Quick */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              <li>
                <a href="tel:+9647760206080" className="text-sm text-white/60 hover:text-white transition-colors no-underline">
                  +964 776 020 6080
                </a>
              </li>
              <li>
                <a href="mailto:info@medworx.iq" className="text-sm text-white/60 hover:text-white transition-colors no-underline">
                  info@medworx.iq
                </a>
              </li>
              <li className="text-sm text-white/60">
                {locale === 'ar' ? 'بغداد، العراق' : 'Baghdad, Iraq'}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-white/40">{t('footer.rights')}</span>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors no-underline">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors no-underline">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
