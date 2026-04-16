'use client';

import { useLang } from '@/components/providers/LangProvider';
import { ArrowRight, ArrowLeft, Phone } from 'lucide-react';
import { motion } from '@/components/motion';

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
              ? 'linear-gradient(to left, rgba(12,35,64,0.80) 0%, rgba(12,35,64,0.65) 45%, rgba(12,35,64,0.50) 100%)'
              : 'linear-gradient(to right, rgba(12,35,64,0.80) 0%, rgba(12,35,64,0.65) 45%, rgba(12,35,64,0.50) 100%)',
          }}
        />
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/h1.jpeg')`,
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      <div
        className={`relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 w-full pt-36 pb-32 lg:pt-44 lg:pb-36 ${isAr ? 'text-right' : 'text-left'}`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="max-w-2xl">
          {/* Brand Name */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-3"
            style={{ color: '#B82D73' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t('hero.title1')}
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-[1.4] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t('hero.titleHighlight')}{' '}{t('hero.title2')}
          </motion.h2>

          {/* Separator */}
          <motion.div
            className="w-12 h-[3px] rounded-full mb-8"
            style={{ background: 'linear-gradient(90deg, #9B1B5E, #B82D73)' }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />

          {/* Description */}
          <motion.p
            className="text-base text-white/55 mb-10 leading-[1.8] max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
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
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="bg-white rounded-t-2xl shadow-2xl shadow-black/10 px-6 sm:px-10 py-7 grid grid-cols-3"
            dir={isAr ? 'rtl' : 'ltr'}>
            {[
              { value: '25K+', label: t('hero.community') },
              { value: '450+', label: t('hero.partners') },
              { value: '1000+', label: t('hero.courses') },
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
      </motion.div>
    </section>
  );
}
