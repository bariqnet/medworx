'use client';

import { useLang } from '@/components/providers/LangProvider';
import { MapPin, Stethoscope, Handshake, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { FadeUp, ScaleUp, StaggerContainer, StaggerItem } from '@/components/motion';

const pillars = [
  { icon: MapPin, titleKey: 'about.location', descKey: 'about.locationDesc' },
  { icon: Stethoscope, titleKey: 'about.focus', descKey: 'about.focusDesc' },
  { icon: Handshake, titleKey: 'about.floors', descKey: 'about.floorsDesc' },
  { icon: Sparkles, titleKey: 'about.network', descKey: 'about.networkDesc' },
];

export default function About() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-[#f5f5f7]" id="about" dir={isAr ? 'rtl' : 'ltr'}>

      {/* Top: Hero-style centered heading */}
      <FadeUp className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 text-center px-4 sm:px-6 lg:px-16">
        <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-5"
          style={{ color: '#9B1B5E' }}>
          {t('about.label')}
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold leading-[1.2] tracking-tight max-w-4xl mx-auto"
          style={{ color: '#1d1d1f' }}>
          {t('about.title')}
        </h2>
      </FadeUp>

      {/* Full-width image */}
      <ScaleUp className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
          <img
            src="/about1.JPG"
            alt="MedWorx workspace"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1400}
            height={600}
          />
        </div>
      </ScaleUp>

      {/* Description + CTA */}
      <FadeUp delay={0.15} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 text-center">
        <p className="text-base sm:text-xl leading-[1.6] mb-8 sm:mb-10"
          style={{ color: 'rgba(0,0,0,0.8)' }}>
          {t('about.description')}
        </p>

        {/* Ecosystem statement */}
        <p className="text-sm sm:text-base font-semibold leading-[1.4] mb-8 sm:mb-10"
          style={{ color: '#1d1d1f' }}>
          {isAr
            ? 'نحن لسنا مجرد مساحة عمل — نحن المنظومة المتكاملة للقطاع الطبي.'
            : "We're not just a workspace — we're the complete ecosystem for the medical field."}
        </p>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium no-underline transition-all"
          style={{
            backgroundColor: '#9B1B5E',
            color: '#ffffff',
            borderRadius: '980px',
          }}
        >
          {t('about.learnMore')}
          <Arrow className="w-4 h-4 opacity-70" />
        </a>
      </FadeUp>

      {/* Pillars — 4 columns */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 sm:pt-12 pb-16 sm:pb-24 lg:pb-32">
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" staggerDelay={0.12}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={i}>
                <div className="bg-white rounded-2xl p-6 sm:p-7 lg:p-8 text-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: i % 2 === 0 ? '#0C2340' : '#9B1B5E' }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-base font-semibold mb-2" style={{ color: '#1d1d1f' }}>
                    {t(p.titleKey)}
                  </h4>
                  <p className="text-sm leading-[1.5]" style={{ color: 'rgba(0,0,0,0.48)' }}>
                    {t(p.descKey)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

    </section>
  );
}
