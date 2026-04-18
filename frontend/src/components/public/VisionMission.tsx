'use client';

import { useLang } from '@/components/providers/LangProvider';
import { Eye, Target, Sparkles } from 'lucide-react';
import { FadeUp, SlideIn } from '@/components/motion';

export default function VisionMission() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" id="vision" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#0C2340]" />
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #9B1B5E 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #B82D73 0%, transparent 70%)' }} />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Section Header */}
        <FadeUp className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent-light" />
            <span className="text-sm font-bold tracking-widest uppercase text-white/60">
              {locale === 'ar' ? 'رؤيتنا ورسالتنا' : 'Vision & Mission'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.2] tracking-tight max-w-3xl mx-auto" dir={isAr ? 'rtl' : 'ltr'}>
            {isAr
              ? 'نبني مستقبل العمل الطبي في العراق'
              : 'Building the future of medical work in Iraq'}
          </h2>
        </FadeUp>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-5">

          {/* Vision Card */}
          <SlideIn direction={isAr ? 'right' : 'left'} delay={0.1}>
            <div className="group relative rounded-2xl overflow-hidden">
              {/* Glass background */}
              <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl transition-all duration-500 group-hover:bg-white/[0.07] group-hover:border-white/[0.15]" />

              <div className={`relative p-8 lg:p-10 xl:p-12 ${isAr ? 'text-right' : 'text-left'}`}>
                {/* Top row: icon + label */}
                <div className="flex items-center gap-3.5 mb-8">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #9B1B5E 0%, #B82D73 100%)' }}>
                    <Eye className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide uppercase text-accent-light">
                    {t('vision.label')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-6">
                  {t('vision.title')}
                </h3>

                {/* Divider */}
                <div className="w-16 h-[2px] rounded-full mb-6"
                  style={{ background: 'linear-gradient(90deg, #9B1B5E, #B82D73)' }} />

                {/* Description */}
                <p className="text-[15px] text-white/60 leading-[1.8]" dir={isAr ? 'rtl' : 'ltr'}>
                  {t('vision.description')}
                </p>

                {/* Decorative corner accent */}
                <div className={`absolute ${locale === 'ar' ? 'left-0 top-0 rounded-bl-2xl' : 'right-0 top-0 rounded-br-2xl'} w-24 h-24 opacity-10`}
                  style={{ background: 'linear-gradient(135deg, transparent 50%, #9B1B5E 100%)' }} />
              </div>
            </div>
          </SlideIn>

          {/* Mission Card */}
          <SlideIn direction={isAr ? 'left' : 'right'} delay={0.25}>
            <div className="group relative rounded-2xl overflow-hidden">
              {/* Solid accent background */}
              <div className="absolute inset-0 rounded-2xl transition-all duration-500"
                style={{ background: 'linear-gradient(160deg, #9B1B5E 0%, #7A1548 60%, #5C1035 100%)' }} />
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }} />

              <div className={`relative p-8 lg:p-10 xl:p-12 flex flex-col h-full ${isAr ? 'text-right' : 'text-left'}`}>
                {/* Top row: icon + label */}
                <div className="flex items-center gap-3.5 mb-8">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                    <Target className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide uppercase text-white/85">
                    {t('mission.label')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-[1.65rem] font-bold text-white leading-snug mb-6">
                  {t('mission.title')}
                </h3>

                {/* Divider */}
                <div className="w-16 h-[2px] bg-white/20 rounded-full mb-6" />

                {/* Description */}
                <p className="text-[15px] text-white/70 leading-[1.8] flex-1" dir={isAr ? 'rtl' : 'ltr'}>
                  {t('mission.description')}
                </p>

                {/* Bottom decorative line */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <div className="w-2 h-2 rounded-full bg-white/25" />
                    <div className="w-2 h-2 rounded-full bg-white/15" />
                    <span className="text-xs text-white/30 font-medium ms-2">
                      {locale === 'ar' ? 'مدووركس – عاصمة الأعمال الطبية' : 'MedWorx – The Capital of Medical Businesses'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>

        </div>
      </div>
    </section>
  );
}
