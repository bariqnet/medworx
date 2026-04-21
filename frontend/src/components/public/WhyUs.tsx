'use client';

import { useLang } from '@/components/providers/LangProvider';
import { Handshake, Network, Lightbulb, ShieldCheck, Eye } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';

const pillars = [
  {
    icon: Handshake,
    titleEn: 'Trusted Partnerships',
    titleAr: 'شراكات موثوقة',
    descEn: 'Strong, reliable partnerships across the healthcare sector built on mutual trust and shared goals.',
    descAr: 'شراكات قوية وموثوقة في القطاع الصحي مبنية على الثقة المتبادلة والأهداف المشتركة.',
  },
  {
    icon: Network,
    titleEn: 'Strategic Network',
    titleAr: 'شبكة علاقات استراتيجية',
    descEn: 'A vast strategic network in the medical field connecting professionals, organizations, and opportunities.',
    descAr: 'شبكة علاقات استراتيجية واسعة في المجال الطبي تربط المتخصصين والمؤسسات والفرص.',
  },
  {
    icon: Lightbulb,
    titleEn: 'Creative Execution',
    titleAr: 'التنفيذ الإبداعي',
    descEn: 'Innovative and creative approaches to every project, ensuring impactful and distinctive outcomes.',
    descAr: 'أساليب مبتكرة وإبداعية في كل مشروع، لضمان نتائج مؤثرة ومتميزة.',
  },
  {
    icon: ShieldCheck,
    titleEn: 'Professional Commitment',
    titleAr: 'الالتزام المهني',
    descEn: 'Unwavering professional dedication with measurable results and accountability at every stage.',
    descAr: 'التزام مهني راسخ مع نتائج قابلة للقياس ومسؤولية في كل مرحلة.',
  },
  {
    icon: Eye,
    titleEn: 'Full Transparency',
    titleAr: 'شفافية ووضوح كاملين',
    descEn: 'Complete transparency and clarity in all operations to ensure strong, measurable results.',
    descAr: 'شفافية ووضوح كاملين في جميع العمليات لضمان نتائج قوية وقابلة للقياس.',
  },
];

export default function WhyUs() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#0C2340]" id="whyus" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-5"
            style={{ color: '#B82D73' }}>
            {t('whyUs.label')}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold leading-[1.2] tracking-tight text-white mb-5 sm:mb-6">
            {t('whyUs.title')}
          </h2>
          <p className="text-sm sm:text-base leading-[1.7]" style={{ color: 'rgba(255,255,255,0.56)' }}>
            {t('whyUs.subtitle')}
          </p>
        </FadeUp>

        {/* Top row: 3 pillars */}
        <StaggerContainer className="grid md:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5" staggerDelay={0.12}>
          {pillars.slice(0, 3).map((p, i) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={i}>
                <div className="rounded-2xl p-6 md:p-8 flex items-start gap-5 md:block md:text-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 md:mx-auto md:mb-5"
                    style={{ backgroundColor: 'rgba(155,27,94,0.2)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#B82D73' }} />
                  </div>
                  <div className={`min-w-0 flex-1 md:flex-none ${isAr ? 'text-right md:text-center' : 'text-left md:text-center'}`}>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {isAr ? p.titleAr : p.titleEn}
                    </h3>
                    <p className="text-sm leading-[1.6]" style={{ color: 'rgba(255,255,255,0.48)' }}>
                      {isAr ? p.descAr : p.descEn}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom row: 2 pillars */}
        <StaggerContainer className="grid md:grid-cols-2 gap-4 sm:gap-5" staggerDelay={0.12}>
          {pillars.slice(3).map((p, i) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={i}>
                <div className="rounded-2xl p-6 sm:p-8 flex items-start gap-4 sm:gap-5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(155,27,94,0.2)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#B82D73' }} />
                  </div>
                  <div className={isAr ? 'text-right' : ''}>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {isAr ? p.titleAr : p.titleEn}
                    </h3>
                    <p className="text-sm leading-[1.6]" style={{ color: 'rgba(255,255,255,0.48)' }}>
                      {isAr ? p.descAr : p.descEn}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
