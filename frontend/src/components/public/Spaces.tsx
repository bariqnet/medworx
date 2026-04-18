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
    titleEn: 'Conference Hall',
    titleAr: 'قاعة المؤتمرات',
    descEn: 'Professional environment fully equipped for medical conferences and events — stage, podium, projector, sound system, and 2 smart screens.',
    descAr: 'بيئة احترافية مجهزة بالكامل للمؤتمرات والفعاليات الطبية — ستيج، بوديوم، داتا شو، نظام صوت، وشاشتان ذكيتان.',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    tagEn: '1,000,000 IQD/day',
    tagAr: '1,000,000 د.ع/اليوم',
    tagNoteEn: 'Capacity: 120 attendees',
    tagNoteAr: 'السعة: 120 شخص',
    ctaEn: 'Book the Hall',
    ctaAr: 'احجز القاعة',
  },
  {
    titleEn: 'Training Halls (ق1 / ق2)',
    titleAr: 'قاعات التدريب (ق1 / ق2)',
    descEn: 'Two professional halls ideal for training and meetings. Each features a stage, professional smart screen, and flip chart.',
    descAr: 'قاعتان احترافيتان مثاليتان للتدريب والاجتماعات. تحتوي كل قاعة على ستيج (منصة تقديم)، شاشة ذكية احترافية، وفليب تشارت.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    tagEn: '45,000 IQD/hr',
    tagAr: '45,000 د.ع/الساعة',
    tagNoteEn: 'Capacity: 40 per hall · 2 halls available',
    tagNoteAr: 'السعة: 40 شخص لكل قاعة · قاعتان متاحتان',
    ctaEn: 'Book a Hall',
    ctaAr: 'احجز قاعة',
  },
  {
    titleEn: 'Small Meeting Rooms (ق3 / ق4)',
    titleAr: 'غرف الاجتماعات الصغيرة (ق3 / ق4)',
    descEn: 'Quiet rooms suited for small meetings and private sessions. A focused environment that supports productivity, equipped with a smart screen.',
    descAr: 'غرف هادئة مناسبة للاجتماعات الصغيرة والجلسات الخاصة. بيئة هادئة تضمن التركيز والإنتاجية، ومزوّدة بشاشة ذكية.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    tagEn: '25,000 IQD/hr',
    tagAr: '25,000 د.ع/الساعة',
    tagNoteEn: 'Capacity: 15 – 20 attendees · 2 rooms available',
    tagNoteAr: 'السعة: 15 – 20 شخص · غرفتان متاحتان',
    ctaEn: 'Book a Room',
    ctaAr: 'احجز غرفة',
  },
  {
    titleEn: 'Podcast Room',
    titleAr: 'غرفة البودكاست',
    descEn: 'A high-privacy room dedicated to professional recording and private meetings — built to capture content at studio quality.',
    descAr: 'غرفة بخصوصية عالية مخصصة للتصوير الاحترافي أو الاجتماعات الخاصة — بيئة مناسبة لتسجيل محتوى بجودة احترافية.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    tagEn: '30,000 IQD/hr',
    tagAr: '30,000 د.ع/الساعة',
    tagNoteEn: 'Capacity: 5 attendees',
    tagNoteAr: 'السعة: 5 أشخاص',
    ctaEn: 'Book the Room',
    ctaAr: 'احجز الغرفة',
  },
  {
    titleEn: 'Interview Room',
    titleAr: 'غرفة المقابلات',
    descEn: 'A dedicated room for interviews and structured meetings — professional environment with a smart screen and reception system to coordinate appointments.',
    descAr: 'غرفة مخصصة للمقابلات والاجتماعات المنظمة — بيئة احترافية تضمن الخصوصية والتنظيم، مع شاشة ذكية ونظام رسبشن لتنظيم مواعيد المقابلات.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    tagEn: '30,000 IQD/hr',
    tagAr: '30,000 د.ع/الساعة',
    ctaEn: 'Book the Room',
    ctaAr: 'احجز الغرفة',
  },
  {
    titleEn: 'VIP Room',
    titleAr: 'غرفة كبار الشخصيات (VIP)',
    descEn: 'A dedicated room for high-level executive meetings with elevated privacy for sensitive decisions, a distinctive view that enhances the meeting experience, and the latest equipment fit for important gatherings.',
    descAr: 'غرفة مخصصة للاجتماعات التنفيذية رفيعة المستوى — مستوى عالٍ من الخصوصية لقرارات واجتماعات حساسة، إطلالة (View) مميزة تعزز تجربة الاجتماع، ومجهزة بأحدث الأجهزة والتقنيات المناسبة للأحداث والاجتماعات المهمة.',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
    tagEn: '50,000 IQD/hr',
    tagAr: '50,000 د.ع/الساعة',
    tagNoteEn: 'Capacity: up to 20 attendees · Premium view',
    tagNoteAr: 'السعة: حتى 20 شخص · إطلالة مميزة',
    ctaEn: 'Book the VIP Room',
    ctaAr: 'احجز غرفة الـ VIP',
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
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {spaces.map((space, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="bg-white rounded-2xl overflow-hidden group h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
                  <img
                    src={space.image}
                    alt={isAr ? space.titleAr : space.titleEn}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-semibold mb-2" style={{ color: '#1d1d1f' }}>
                    {isAr ? space.titleAr : space.titleEn}
                  </h3>
                  <p className="text-sm leading-[1.5] mb-4" style={{ color: 'rgba(0,0,0,0.48)' }}>
                    {isAr ? space.descAr : space.descEn}
                  </p>
                  <div className="mt-auto flex flex-col gap-3 pt-3" style={{ borderTop: '1px solid #f5f5f7' }}>
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
