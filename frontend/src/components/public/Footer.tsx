'use client';

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

export default function Footer() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';

  const services = [
    { label: isAr ? 'الخدمات الإدارية والمكتبية' : 'Administrative & Office Services', href: '#services' },
    { label: isAr ? 'أكاديمية مدووركس' : 'MedWorx Academy', href: '#services' },
    { label: isAr ? 'تنظيم المعارض والمؤتمرات' : 'Events & Exhibitions', href: '#services' },
    { label: isAr ? 'إدارة المشاريع' : 'Project Management', href: '#services' },
  ];

  const company = [
    { label: t('nav.about'), href: '#about' },
    { label: isAr ? 'الرؤية والرسالة' : 'Vision & Mission', href: '#vision' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const spaces = [
    { label: isAr ? 'مكاتب خاصة' : 'Private Offices', href: '#spaces' },
    { label: isAr ? 'مكاتب مخصصة' : 'Dedicated Desks', href: '#spaces' },
    { label: isAr ? 'قاعات مؤتمرات' : 'Conference Rooms', href: '#spaces' },
    { label: isAr ? 'قاعات تدريب' : 'Training Halls', href: '#spaces' },
  ];

  return (
    <footer className="bg-[#0C2340] text-white" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-6 sm:gap-10 mb-10 sm:mb-12" staggerDelay={0.08}>

          {/* Brand */}
          <StaggerItem className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt="MedWorx"
                className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                {isAr ? 'مـدووركـس' : 'MedWorx'}
              </span>
            </div>
            <p className="text-sm leading-[1.6] max-w-xs mb-6" style={{ color: 'rgba(255,255,255,0.48)' }}>
              {t('footer.tagline')}
            </p>
            {/* Social */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/medworx?igsh=aXI2NWJkb2dxcjZ2', handle: '@medworx', label: isAr ? 'مدووركس' : 'MedWorx' },
                { icon: Instagram, href: 'https://www.instagram.com/medworx.academy?igsh=bmZ0emg3b2xvdDh3', handle: '@medworx.academy', label: isAr ? 'أكاديمية مدووركس' : 'MedWorx Academy' },
                { icon: Instagram, href: 'https://www.instagram.com/medworx.cs?igsh=MWI0b2piMnM5MThrbQ==', handle: '@medworx.cs', label: isAr ? 'الحلول الإبداعية' : 'Creative Solutions' },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 no-underline transition-all hover:text-white group"
                    style={{ color: 'rgba(255,255,255,0.56)' }}
                    aria-label={social.label}
                  >
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-white/[0.14]"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="flex flex-col leading-tight min-w-0">
                      <span className="text-sm font-medium truncate">{social.label}</span>
                      <span className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.40)' }} dir="ltr">
                        {social.handle}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </StaggerItem>

          {/* Services */}
          <StaggerItem>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ color: 'rgba(255,255,255,0.32)' }}>
              {t('footer.services')}
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm no-underline transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.56)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Company */}
          <StaggerItem>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ color: 'rgba(255,255,255,0.32)' }}>
              {t('footer.company')}
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm no-underline transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.56)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Spaces */}
          <StaggerItem>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ color: 'rgba(255,255,255,0.32)' }}>
              {t('spaces.label')}
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {spaces.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm no-underline transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.56)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ color: 'rgba(255,255,255,0.32)' }}>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              <li>
                <a href="tel:+9647760206080" className="text-sm no-underline transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.56)' }}>
                  <span dir="ltr">+964 776 020 6080</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@medworx.iq" className="text-sm no-underline transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.56)' }}>
                  info@medworx.iq
                </a>
              </li>
              <li className="text-sm" style={{ color: 'rgba(255,255,255,0.56)' }}>
                {isAr ? 'بغداد، العراق' : 'Baghdad, Iraq'}
              </li>
            </ul>
          </StaggerItem>

        </StaggerContainer>
      </div>

      {/* Bottom Bar */}
      <FadeIn delay={0.3}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.32)' }}>{t('footer.rights')}</span>
            <div className="flex gap-6">
              <a href="#" className="text-xs no-underline transition-colors hover:text-white/70"
                style={{ color: 'rgba(255,255,255,0.32)' }}>
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-xs no-underline transition-colors hover:text-white/70"
                style={{ color: 'rgba(255,255,255,0.32)' }}>
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
