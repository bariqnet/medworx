'use client';

import { useLang } from '@/components/providers/LangProvider';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const spaces = [
  {
    titleEn: 'Private Office',
    titleAr: 'مكتب خاص',
    descEn: 'Your own lockable office, fully furnished and ready from day one.',
    descAr: 'مكتبك الخاص المؤمن، مفروش بالكامل وجاهز من اليوم الأول.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    tagEn: 'From $250/mo',
    tagAr: 'من 250$/شهر',
  },
  {
    titleEn: 'Dedicated Desk',
    titleAr: 'مكتب مخصص',
    descEn: 'A permanent desk in a shared workspace with 24/7 access.',
    descAr: 'مكتب دائم في مساحة عمل مشتركة مع وصول على مدار الساعة.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    tagEn: 'From $120/mo',
    tagAr: 'من 120$/شهر',
  },
  {
    titleEn: 'Conference Room',
    titleAr: 'قاعة مؤتمرات',
    descEn: 'Professional meeting space with A/V equipment for up to 40 guests.',
    descAr: 'مساحة اجتماعات مهنية مع معدات سمعية وبصرية تسع حتى 40 ضيفاً.',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    tagEn: 'From $25/hr',
    tagAr: 'من 25$/ساعة',
  },
  {
    titleEn: 'Training Hall',
    titleAr: 'قاعة تدريب',
    descEn: 'Fully equipped hall for workshops, courses, and seminars up to 60 attendees.',
    descAr: 'قاعة مجهزة بالكامل للورش والدورات والندوات تسع حتى 60 حاضراً.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    tagEn: 'From $40/hr',
    tagAr: 'من 40$/ساعة',
  },
];

export default function Spaces() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-white" id="spaces">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 ${isAr ? 'text-right' : ''}`}>
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              {t('spaces.label')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 leading-tight mb-4">
              {t('spaces.title')}
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              {t('spaces.subtitle')}
            </p>
          </div>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors no-underline whitespace-nowrap"
          >
            {t('nav.booking')}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        {/* Spaces Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {spaces.map((space, i) => (
            <div
              key={i}
              className="group rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`flex flex-col sm:flex-row ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                  <img
                    src={space.image}
                    alt={isAr ? space.titleAr : space.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className={`sm:w-3/5 p-6 flex flex-col justify-between ${isAr ? 'text-right' : ''}`}>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {isAr ? space.titleAr : space.titleEn}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      {isAr ? space.descAr : space.descEn}
                    </p>
                  </div>
                  <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-semibold text-accent">
                      {isAr ? space.tagAr : space.tagEn}
                    </span>
                    <Link
                      href="/booking"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-900 hover:text-accent transition-colors no-underline"
                    >
                      {t('nav.booking')}
                      <Arrow className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
