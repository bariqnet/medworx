'use client';

import { useState } from 'react';
import { useLang } from '@/components/providers/LangProvider';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from '@/components/motion';

export default function Contact() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = isAr
      ? [
          'طلب تواصل جديد من الموقع',
          '',
          `الاسم: ${fd.get('name')}`,
          `الهاتف: ${fd.get('phone')}`,
          `البريد: ${fd.get('email')}`,
          `الخدمة: ${fd.get('service')}`,
          `الرسالة: ${fd.get('message')}`,
        ]
      : [
          'New contact request from website',
          '',
          `Name: ${fd.get('name')}`,
          `Phone: ${fd.get('phone')}`,
          `Email: ${fd.get('email')}`,
          `Service: ${fd.get('service')}`,
          `Message: ${fd.get('message')}`,
        ];
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/9647760206080?text=${text}`, '_blank');
    setSuccess(true);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: isAr ? 'موقعنا' : 'Our Location',
      desc: isAr ? 'بغداد الحارثية شارع الكندي (الطابق 5+6)' : 'Al Harthya-Kindi St. (5th+6th Floors), Baghdad',
    },
    {
      icon: Phone,
      title: isAr ? 'الهاتف' : 'Phone',
      desc: '\u202A+964 776 020 6080\u202C',
      href: 'tel:+9647760206080',
    },
    {
      icon: Mail,
      title: isAr ? 'البريد الإلكتروني' : 'Email',
      desc: 'info@medworx.iq',
      href: 'mailto:info@medworx.iq',
    },
    {
      icon: Clock,
      title: isAr ? 'ساعات العمل' : 'Working Hours',
      desc: isAr ? 'السبت - الخميس: 9 ص - 8 م' : 'Sat - Thu: 9 AM - 8 PM',
    },
  ];

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-sm bg-white outline-none transition-all border-none' +
    ' focus:ring-2 focus:ring-[#9B1B5E]/20' +
    (isAr ? ' text-right' : ' text-left');

  return (
    <section className="py-24 lg:py-32 bg-[#f5f5f7]" id="contact" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-sm font-bold tracking-widest uppercase mb-5"
            style={{ color: '#9B1B5E' }}>
            {t('contact.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.2] tracking-tight mb-6"
            style={{ color: '#1d1d1f' }}>
            {t('contact.title')}
          </h2>
          <p className="text-base leading-[1.5]" style={{ color: 'rgba(0,0,0,0.48)' }}>
            {t('contact.subtitle')}
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Contact Info */}
          <div className={`lg:col-span-2 ${isAr ? 'lg:order-2' : ''}`}>
            <StaggerContainer className="space-y-5" staggerDelay={0.1}>
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#ffffff' }}>
                      <Icon className="w-5 h-5" style={{ color: '#1d1d1f' }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-0.5" style={{ color: '#1d1d1f' }}>{item.title}</h4>
                      <p className="text-sm" style={{ color: 'rgba(0,0,0,0.48)' }}>{item.desc}</p>
                    </div>
                  </div>
                );
                if (item.href) {
                  return (
                    <StaggerItem key={i}>
                      <a href={item.href} className="block no-underline hover:opacity-80 transition-opacity">
                        {content}
                      </a>
                    </StaggerItem>
                  );
                }
                return <StaggerItem key={i}>{content}</StaggerItem>;
              })}
            </StaggerContainer>

            {/* Map */}
            <FadeUp delay={0.4} className="rounded-2xl overflow-hidden aspect-[4/3] mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.0!2d44.3668789!3d33.3062672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDE4JzIyLjYiTiA0NMKwMjInMDAuOCJF!5e0!3m2!1sen!2siq!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={isAr ? 'موقع مدووركس' : 'MedWorx Location'}
                className="w-full h-full"
              />
            </FadeUp>
          </div>

          {/* Form */}
          <SlideIn direction={isAr ? 'left' : 'right'} delay={0.15} className={`lg:col-span-3 ${isAr ? 'lg:order-1' : ''}`}>
            <div className="bg-white rounded-2xl p-8 lg:p-10">
              {success ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: 'rgba(34,197,94,0.1)' }}>
                    <CheckCircle className="w-8 h-8" style={{ color: '#22c55e' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#1d1d1f' }}>
                    {isAr ? 'تم الإرسال بنجاح!' : 'Message Sent!'}
                  </h3>
                  <p style={{ color: 'rgba(0,0,0,0.48)' }}>{t('contact.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>{t('contact.name')}</label>
                      <input name="name" required className={inputClass} style={{ backgroundColor: '#f5f5f7' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>{t('contact.phone')}</label>
                      <input name="phone" type="tel" required className={inputClass} style={{ backgroundColor: '#f5f5f7' }} dir="ltr" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>{t('contact.email')}</label>
                    <input name="email" type="email" required className={inputClass} style={{ backgroundColor: '#f5f5f7' }} dir="ltr" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>{t('contact.service')}</label>
                    <select name="service" required className={inputClass} style={{ backgroundColor: '#f5f5f7', color: '#1d1d1f' }}>
                      <option value="">{isAr ? 'اختر خدمة' : 'Select a service'}</option>
                      <option value="offices">{isAr ? 'خدمات إدارية ومكتبية' : 'Administrative & Office Services'}</option>
                      <option value="academy">{isAr ? 'أكاديمية مدووركس' : 'MedWorx Academy'}</option>
                      <option value="events">{isAr ? 'تنظيم معارض ومؤتمرات' : 'Events & Exhibitions'}</option>
                      <option value="projects">{isAr ? 'إدارة مشاريع' : 'Project Management'}</option>
                      <option value="other">{isAr ? 'أخرى' : 'Other'}</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>{t('contact.message')}</label>
                    <textarea name="message" required rows={4} className={`${inputClass} resize-y`} style={{ backgroundColor: '#f5f5f7' }} />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 text-white rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#9B1B5E' }}
                  >
                    {t('contact.send')}
                  </button>
                </form>
              )}
            </div>
          </SlideIn>

        </div>
      </div>
    </section>
  );
}
