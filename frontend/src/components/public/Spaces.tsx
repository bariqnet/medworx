'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/components/providers/LangProvider';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
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
  fullWidth?: boolean;
};

const spaces: Space[] = [
  {
    titleEn: 'Private Office',
    titleAr: 'مكتب اداري',
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
    fullWidth: true,
  },
];

export default function Spaces() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [selected, setSelected] = useState<Space | null>(null);

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
            <StaggerItem key={i} className={`h-full ${space.fullWidth ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
              <div className={`bg-white rounded-2xl overflow-hidden group h-full flex ${space.fullWidth ? 'flex-col md:flex-row' : 'flex-col'}`}>
                {/* Image */}
                <div className={`overflow-hidden flex-shrink-0 ${space.fullWidth ? 'aspect-[4/3] md:aspect-auto md:w-1/2' : 'aspect-[4/3]'}`}>
                  <img
                    src={space.image}
                    alt={isAr ? space.titleAr : space.titleEn}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className={`p-6 flex flex-col flex-1 ${space.fullWidth ? 'md:p-10 lg:p-12 md:justify-center' : ''}`}>
                  <h3
                    className={`font-semibold mb-2 ${space.fullWidth ? 'text-xl md:text-2xl mb-3' : 'text-base'}`}
                    style={{ color: '#1d1d1f' }}
                  >
                    {isAr ? space.titleAr : space.titleEn}
                  </h3>
                  <p
                    className={`leading-[1.5] mb-4 ${space.fullWidth ? 'text-[15px] md:text-base leading-[1.7] mb-6' : 'text-sm'}`}
                    style={{ color: 'rgba(0,0,0,0.56)' }}
                  >
                    {isAr ? space.descAr : space.descEn}
                  </p>
                  <div className="mt-auto flex flex-col gap-3 pt-3" style={{ borderTop: '1px solid #f5f5f7' }}>
                    <div className="flex flex-col">
                      <span
                        className={`font-semibold whitespace-nowrap ${space.fullWidth ? 'text-base' : 'text-sm'}`}
                        style={{ color: '#9B1B5E' }}
                      >
                        {isAr ? space.tagAr : space.tagEn}
                      </span>
                      {space.tagNoteEn && (
                        <span className="text-xs mt-0.5" style={{ color: 'rgba(0,0,0,0.48)' }}>
                          {isAr ? space.tagNoteAr : space.tagNoteEn}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected(space)}
                      className={`inline-flex items-center gap-1 font-medium transition-colors hover:opacity-80 ${space.fullWidth ? 'text-[15px]' : 'text-sm'} ${isAr ? 'self-end' : 'self-start'}`}
                      style={{ color: '#9B1B5E', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      {isAr ? space.ctaAr : space.ctaEn}
                      <Arrow className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {selected && (
        <BookingModal
          space={selected}
          isAr={isAr}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

const WHATSAPP_NUMBER = '9647760206080';

function BookingModal({
  space,
  isAr,
  onClose,
}: {
  space: Space;
  isAr: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const spaceName = isAr ? space.titleAr : space.titleEn;
    const price = isAr ? space.tagAr : space.tagEn;

    const lines = isAr
      ? [
          'طلب حجز جديد',
          '',
          `المساحة: ${spaceName}`,
          `السعر المعلن: ${price}`,
          '',
          `الاسم: ${fd.get('name')}`,
          `الشركة: ${fd.get('company') || '-'}`,
          `الهاتف: ${fd.get('phone')}`,
          `البريد: ${fd.get('email') || '-'}`,
          `التاريخ: ${fd.get('date')}`,
          `الوقت: ${fd.get('startTime')} - ${fd.get('endTime')}`,
          `عدد الحضور: ${fd.get('attendees') || '-'}`,
          `ملاحظات: ${fd.get('notes') || '-'}`,
        ]
      : [
          'New booking request',
          '',
          `Space: ${spaceName}`,
          `Listed price: ${price}`,
          '',
          `Name: ${fd.get('name')}`,
          `Company: ${fd.get('company') || '-'}`,
          `Phone: ${fd.get('phone')}`,
          `Email: ${fd.get('email') || '-'}`,
          `Date: ${fd.get('date')}`,
          `Time: ${fd.get('startTime')} - ${fd.get('endTime')}`,
          `Attendees: ${fd.get('attendees') || '-'}`,
          `Notes: ${fd.get('notes') || '-'}`,
        ];

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    onClose();
  };

  const today = new Date().toISOString().split('T')[0];
  const inputClass =
    'w-full px-3.5 py-2.5 border border-neutral-200 rounded-lg text-neutral-900 text-sm bg-white placeholder:text-neutral-400 focus:border-[#9B1B5E] focus:ring-2 focus:ring-[#9B1B5E]/15 outline-none transition-all';

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: 'rgba(12,35,64,0.55)' }}
      onClick={onClose}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4" style={{ borderBottom: '1px solid #f5f5f7' }}>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#9B1B5E' }}>
              {isAr ? 'طلب حجز' : 'Booking Request'}
            </p>
            <h3 className="text-lg font-bold truncate" style={{ color: '#1d1d1f' }}>
              {isAr ? space.titleAr : space.titleEn}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: '#9B1B5E' }}>
              {isAr ? space.tagAr : space.tagEn}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 hover:bg-neutral-100 transition-colors"
            aria-label={isAr ? 'إغلاق' : 'Close'}
            style={{ color: '#737373', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-5 flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
                {isAr ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input name="name" required className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
                {isAr ? 'رقم الهاتف' : 'Phone'}
              </label>
              <input name="phone" type="tel" required className={inputClass} dir="ltr" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
                {isAr ? 'اسم الشركة (اختياري)' : 'Company (optional)'}
              </label>
              <input name="company" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
                {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'}
              </label>
              <input name="email" type="email" className={inputClass} dir="ltr" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 sm:col-span-1">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
                {isAr ? 'التاريخ' : 'Date'}
              </label>
              <input name="date" type="date" required min={today} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
                {isAr ? 'من' : 'From'}
              </label>
              <input name="startTime" type="time" required className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
                {isAr ? 'إلى' : 'To'}
              </label>
              <input name="endTime" type="time" required className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
              {isAr ? 'عدد الحضور (اختياري)' : 'Number of attendees (optional)'}
            </label>
            <input name="attendees" type="number" min="1" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#404040' }}>
              {isAr ? 'ملاحظات (اختياري)' : 'Notes (optional)'}
            </label>
            <textarea name="notes" rows={3} className={`${inputClass} resize-y`} />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg text-sm font-semibold transition-colors"
              style={{ backgroundColor: '#f5f5f7', color: '#404040', border: 'none', cursor: 'pointer' }}
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center py-3 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-95"
              style={{ backgroundColor: '#0C2340', border: 'none', cursor: 'pointer' }}
            >
              {isAr ? 'إرسال الطلب' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
