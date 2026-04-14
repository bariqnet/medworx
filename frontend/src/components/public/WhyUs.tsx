'use client';

import { useLang } from '@/components/providers/LangProvider';
import { Clock, Stethoscope, Users, CheckCircle } from 'lucide-react';

const stats = [
  { value: '25K+', key: 'whyUs.stat1' },
  { value: '450+', key: 'whyUs.stat2' },
  { value: '100+', key: 'whyUs.stat3' },
  { value: '5+', key: 'whyUs.stat4' },
];

const benefits = [
  { icon: Clock, titleKey: 'whyUs.benefit1', descKey: 'whyUs.benefit1Desc' },
  { icon: Stethoscope, titleKey: 'whyUs.benefit2', descKey: 'whyUs.benefit2Desc' },
  { icon: Users, titleKey: 'whyUs.benefit3', descKey: 'whyUs.benefit3Desc' },
];

export default function WhyUs() {
  const { t } = useLang();

  return (
    <section className="py-20 lg:py-28 bg-primary-900" id="whyus">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-light mb-4">
            {t('whyUs.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {t('whyUs.title')}
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            {t('whyUs.subtitle')}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/50">{t(stat.key)}</div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t(benefit.titleKey)}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{t(benefit.descKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
