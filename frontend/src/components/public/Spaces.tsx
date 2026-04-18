'use client';

import { useLang } from '@/components/providers/LangProvider';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';

type Space = {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
  tagEn: string;
  tagAr: string;
  tagNoteEn?: string;
  tagNoteAr?: string;
  ctaEn: string;
  ctaAr: string;
};

const spaces: Space[] = [
  {
    titleEn: 'Private Office',
    titleAr: 'مكتب خاص',
    descEn: 'Your own lockable office with dynamic furniture that reconfigures to fit your workflow.',
    descAr: 'مكتبك الخاص المؤمن مع أثاث ديناميكي قابل لإعادة التشكيل حسب طبيعة عملك.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    tagEn: '800,000 – 2,000,000 IQD/mo',
    tagAr: 'من 800,000 إلى 2,000,000 د.ع/شهر',
    tagNoteEn: 'Varies by office size',
    tagNoteAr: 'حسب مساحة المكتب',
    ctaEn: 'Book Your Office',
    ctaAr: 'احجز مكتبك',
  },
  {
    titleEn: 'Dedicated Desk',
    titleAr: 'مكتب مخصص',
    descEn: 'A dedicated desk in an adaptable shared workspace with flexible seating arrangements.',
    descAr: 'مكتب مخصص في مساحة عمل مشتركة قابلة للتكيّف مع ترتيبات جلوس مرنة.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    tagEn: 'From 180,000 IQD/mo',
    tagAr: 'من 180,000 د.ع/شهر',
    ctaEn: 'Book Your Desk',
    ctaAr: 'احجز مقعدك',
  },
  {
    titleEn: 'Conference Room',
    titleAr: 'قاعة مؤتمرات',
    descEn: 'Modular conference space with reconfigurable furniture and A/V equipment for up to 40 guests.',
    descAr: 'قاعة مؤتمرات مرنة بأثاث قابل لإعادة التشكيل ومعدات سمعية وبصرية تسع حتى 40 ضيفاً.',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    tagEn: 'From 37,500 IQD/hr',
    tagAr: 'من 37,500 د.ع/ساعة',
    ctaEn: 'Book a Room',
    ctaAr: 'احجز قاعة',
  },
  {
    titleEn: 'Training Hall',
    titleAr: 'قاعة تدريب',
    descEn: 'Transformable training hall with dynamic layouts — classroom, theater, or workshop setup for up to 60 attendees.',
    descAr: 'قاعة تدريب قابلة للتحويل بتخطيطات ديناميكية — صفي أو مسرحي أو ورشة عمل تسع حتى 60 حاضراً.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    tagEn: 'From 60,000 IQD/hr',
    tagAr: 'من 60,000 د.ع/ساعة',
    ctaEn: 'Book a Hall',
    ctaAr: 'احجز قاعة',
  },
];

export default function Spaces() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 lg:py-32 bg-[#f5f5f7]" id="spaces" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header — centered */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-sm font-bold tracking-widest uppercase mb-5"
            style={{ color: '#9B1B5E' }}>
            {t('spaces.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.2] tracking-tight mb-6"
            style={{ color: '#1d1d1f' }}>
            {t('spaces.title')}
          </h2>
          <p className="text-base leading-[1.5]" style={{ color: 'rgba(0,0,0,0.48)' }}>
            {t('spaces.subtitle')}
          </p>
        </FadeUp>

        {/* Spaces Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
          {spaces.map((space, i) => (
            <StaggerItem key={i}>
              <div className="bg-white rounded-2xl overflow-hidden group">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={space.image}
                    alt={isAr ? space.titleAr : space.titleEn}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-semibold mb-2" style={{ color: '#1d1d1f' }}>
                    {isAr ? space.titleAr : space.titleEn}
                  </h3>
                  <p className="text-sm leading-[1.5] mb-4" style={{ color: 'rgba(0,0,0,0.48)' }}>
                    {isAr ? space.descAr : space.descEn}
                  </p>
                  <div className="flex flex-col gap-3 pt-3" style={{ borderTop: '1px solid #f5f5f7' }}>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold whitespace-nowrap" style={{ color: '#9B1B5E' }}>
                        {isAr ? space.tagAr : space.tagEn}
                      </span>
                      {space.tagNoteEn && (
                        <span className="text-xs mt-0.5" style={{ color: 'rgba(0,0,0,0.48)' }}>
                          {isAr ? space.tagNoteAr : space.tagNoteEn}
                        </span>
                      )}
                    </div>
                    <Link
                      href="/booking"
                      className={`inline-flex items-center gap-1 text-sm font-medium no-underline transition-colors ${isAr ? 'self-end' : 'self-start'}`}
                      style={{ color: '#9B1B5E' }}
                    >
                      {isAr ? space.ctaAr : space.ctaEn}
                      <Arrow className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
