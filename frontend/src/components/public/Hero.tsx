'use client';

import { useLang } from '@/components/providers/LangProvider';
import { ArrowRight, ArrowLeft, Phone } from 'lucide-react';

export default function Hero() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center" id="home">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 z-10"
          style={{
            background: isAr
              ? 'linear-gradient(to left, rgba(12,35,64,0.97) 0%, rgba(12,35,64,0.90) 45%, rgba(12,35,64,0.70) 100%)'
              : 'linear-gradient(to right, rgba(12,35,64,0.97) 0%, rgba(12,35,64,0.90) 45%, rgba(12,35,64,0.70) 100%)',
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
      </div>

      <div
        className={`relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 w-full pt-36 pb-32 lg:pt-44 lg:pb-36 ${isAr ? 'text-right' : 'text-left'}`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="max-w-2xl">
          {/* Brand Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-3"
            style={{ color: '#B82D73' }}>
            {t('hero.title1')}
          </h1>

          {/* Tagline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-[1.4] mb-8">
            {t('hero.titleHighlight')}{' '}{t('hero.title2')}
          </h2>

          {/* Separator */}
          <div className="w-12 h-[3px] rounded-full mb-8"
            style={{ background: 'linear-gradient(90deg, #9B1B5E, #B82D73)' }} />

          {/* Description */}
          <p className="text-base text-white/55 mb-10 leading-[1.8] max-w-lg">
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Primary CTA */}
            <a
              href="#services"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold text-sm text-white transition-all no-underline hover:opacity-90"
              style={{ backgroundColor: '#9B1B5E' }}
            >
              {t('hero.explore')}
              <Arrow className="w-4 h-4 opacity-70" />
            </a>

            {/* Secondary CTA */}
            <a
              href="tel:+9647760206080"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-primary-900 rounded-lg font-semibold text-sm hover:bg-neutral-100 transition-all no-underline"
            >
              <Phone className="w-4 h-4" />
              {isAr ? 'اتصل بنا' : 'Call Us'}
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="bg-white rounded-t-2xl shadow-2xl shadow-black/10 px-6 sm:px-10 py-7 grid grid-cols-3"
            dir={isAr ? 'rtl' : 'ltr'}>
            {[
              { value: '25K+', label: t('hero.community') },
              { value: '450+', label: t('hero.partners') },
              { value: '100+', label: t('hero.courses') },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center px-4 ${i > 0 ? 'border-s border-neutral-200' : ''}`}
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary-900 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
