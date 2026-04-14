'use client';

import { useLang } from '@/components/providers/LangProvider';
import { Monitor, Building2, BookOpen, FileText, Rocket, Globe, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    titleEn: 'Coworking Spaces',
    titleAr: 'مساحات عمل مشتركة',
    descEn: 'Modern, fully-equipped workspaces designed for medical professionals with high-speed internet and ergonomic furniture.',
    descAr: 'مساحات عمل حديثة ومجهزة بالكامل مصممة للمهنيين الطبيين مع إنترنت عالي السرعة وأثاث مريح.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Building2,
    titleEn: 'Meeting & Conference Halls',
    titleAr: 'قاعات اجتماعات ومؤتمرات',
    descEn: 'State-of-the-art meeting rooms with presentation equipment, video conferencing, and flexible seating.',
    descAr: 'قاعات اجتماعات مجهزة بأحدث التقنيات مع معدات العرض والمؤتمرات المرئية.',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: BookOpen,
    titleEn: 'Training & Courses',
    titleAr: 'تدريب ودورات',
    descEn: 'Professional development courses, selling skills workshops, and specialized medical business training.',
    descAr: 'دورات تطوير مهني وورش عمل مهارات البيع وتدريب متخصص في الأعمال الطبية.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: FileText,
    titleEn: 'Administrative Services',
    titleAr: 'خدمات إدارية',
    descEn: 'Comprehensive support including reception, mail handling, printing, and virtual office solutions.',
    descAr: 'دعم شامل يشمل الاستقبال ومعالجة البريد والطباعة وحلول المكاتب الافتراضية.',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Rocket,
    titleEn: 'Business Consulting',
    titleAr: 'استشارات أعمال',
    descEn: 'Expert guidance for medical startups and established practices with business planning and marketing.',
    descAr: 'إرشاد خبير للشركات الطبية الناشئة والممارسات القائمة مع تخطيط الأعمال والتسويق.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Globe,
    titleEn: 'Networking Events',
    titleAr: 'فعاليات التواصل',
    descEn: 'Regular events connecting medical professionals, suppliers, and investors in Iraq.',
    descAr: 'فعاليات منتظمة تربط المهنيين الطبيين والموردين والمستثمرين في العراق.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Services() {
  const { locale, t } = useLang();

  return (
    <section className="py-20 lg:py-28 bg-neutral-50" id="services">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className={`max-w-2xl mb-14 ${locale === 'ar' ? 'text-right' : ''}`}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            {t('services.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 leading-tight mb-4">
            {t('services.title')}
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                {/* Card Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={locale === 'ar' ? service.titleAr : service.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-900" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-900">
                      {locale === 'ar' ? service.titleAr : service.titleEn}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {locale === 'ar' ? service.descAr : service.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
