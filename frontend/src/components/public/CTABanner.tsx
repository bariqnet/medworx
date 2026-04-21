'use client';

import { useLang } from '@/components/providers/LangProvider';
import { ArrowRight, ArrowLeft, Phone } from 'lucide-react';
import { FadeUp } from '@/components/motion';

export default function CTABanner() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 z-10"
          style={{ background: 'rgba(12,35,64,0.80)' }} />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/b45.JPG')` }}
        />
      </div>

      {/* Content */}
      <FadeUp className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 w-full py-14 sm:py-20 lg:py-24 text-center">
        <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.2] tracking-tight mb-4 sm:mb-5">
          {t('cta.title')}
        </h2>
        <p className="text-sm sm:text-base leading-[1.6] max-w-xl mx-auto mb-8 sm:mb-10"
          style={{ color: 'rgba(255,255,255,0.60)' }}>
          {t('cta.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-white font-medium text-sm no-underline hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#9B1B5E', borderRadius: '980px' }}
          >
            {t('cta.button')}
            <Arrow className="w-4 h-4 opacity-70" />
          </a>
          <a
            href="tel:+9647760206080"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-medium no-underline transition-colors bg-white/10 backdrop-blur-sm rounded-full"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            <span dir="ltr" className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +964 776 020 6080
            </span>
          </a>
        </div>
      </FadeUp>
    </section>
  );
}
