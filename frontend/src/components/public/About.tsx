'use client';

import { useLang } from '@/components/providers/LangProvider';
import { MapPin, Stethoscope, Handshake, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export default function About() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFA]" id="about" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">

        {/* Top: Label */}
        <div className={`mb-16 lg:mb-20 ${isAr ? 'text-right' : 'text-left'}`}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ color: '#9B1B5E' }}>
            {t('about.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.25] max-w-4xl"
            style={{ color: '#0C2340' }}>
            {t('about.title')}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">

          {/* Large Image — 7 cols */}
          <div className="md:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[420px] relative group">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80"
              alt="MedWorx workspace"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              loading="lazy"
              width={900}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Floating label on image */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-4 py-2 rounded-lg text-xs font-semibold text-white backdrop-blur-md"
                style={{ backgroundColor: 'rgba(155,27,94,0.85)' }}>
                {isAr ? 'شارع الحارثية-الكندي، بغداد' : 'Al Harthya-Kindi St., Baghdad'}
              </span>
            </div>
          </div>

          {/* Description Card — 5 cols */}
          <div className="md:col-span-5 bg-white rounded-2xl p-7 lg:p-9 flex flex-col justify-between shadow-sm">
            <div>
              <p className="text-[15px] sm:text-base leading-[1.9] mb-6" style={{ color: '#525252' }}>
                {t('about.description')}
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors self-start"
              style={{ color: '#9B1B5E' }}
            >
              {t('about.learnMore')}
              <Arrow className="w-4 h-4" />
            </a>
          </div>

          {/* Ecosystem Statement — full width */}
          <div className="md:col-span-12 rounded-2xl px-7 lg:px-10 py-8 lg:py-10 flex items-center gap-6"
            style={{ backgroundColor: '#0C2340' }}>
            <div className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #9B1B5E, #B82D73)' }}>
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <p className="text-base sm:text-lg font-medium leading-[1.7] text-white/90">
              {isAr
                ? 'نحن لسنا مجرد مساحة عمل — نحن المنظومة المتكاملة التي يحتاجها كل متخصص في القطاع الطبي للنمو والنجاح والانطلاق.'
                : "We're not just a workspace — we're the complete ecosystem every medical professional needs to grow, succeed, and launch."}
            </p>
          </div>

          {/* 4 Pillar Cards — 3 cols each */}
          {[
            { icon: MapPin, titleKey: 'about.location', descKey: 'about.locationDesc', bg: '#ffffff' },
            { icon: Stethoscope, titleKey: 'about.focus', descKey: 'about.focusDesc', bg: 'rgba(155,27,94,0.05)' },
            { icon: Handshake, titleKey: 'about.floors', descKey: 'about.floorsDesc', bg: '#ffffff' },
            { icon: Sparkles, titleKey: 'about.network', descKey: 'about.networkDesc', bg: 'rgba(155,27,94,0.05)' },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="md:col-span-3 rounded-2xl p-6 lg:p-7 group transition-shadow duration-300 hover:shadow-md shadow-sm"
                style={{ backgroundColor: p.bg }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: i % 2 === 0 ? '#0C2340' : '#9B1B5E' }}>
                  <Icon className="w-[18px] h-[18px] text-white" />
                </div>
                <h4 className="text-[15px] font-bold mb-1.5" style={{ color: '#0C2340' }}>
                  {t(p.titleKey)}
                </h4>
                <p className="text-sm leading-[1.6]" style={{ color: '#737373' }}>
                  {t(p.descKey)}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
