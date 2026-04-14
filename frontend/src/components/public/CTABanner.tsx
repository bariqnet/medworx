'use client';

import { useLang } from '@/components/providers/LangProvider';
import { ArrowRight, ArrowLeft, Phone } from 'lucide-react';

export default function CTABanner() {
  const { locale, t } = useLang();
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-24 bg-neutral-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-dark to-primary-900 z-10" />
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=60"
              alt=""
              className="w-full h-full object-cover opacity-30"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 px-8 sm:px-12 lg:px-16 py-14 lg:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                {t('cta.title')}
              </h2>
              <p className="text-white/60 text-base leading-relaxed">
                {t('cta.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-900 rounded-lg font-semibold text-sm hover:bg-neutral-100 transition-all no-underline"
              >
                {t('cta.button')}
                <Arrow className="w-4 h-4" />
              </a>
              <a
                href="tel:+9647760206080"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors no-underline"
              >
                <Phone className="w-4 h-4" />
                +964 776 020 6080
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
