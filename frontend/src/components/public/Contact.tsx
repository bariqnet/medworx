'use client';

import { useState } from 'react';
import { useLang } from '@/components/providers/LangProvider';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: isAr ? 'موقعنا' : 'Our Location',
      desc: isAr ? 'شارع الحارثية-الكندي (الطابق 5+6)، بغداد' : 'Al Harthya-Kindi St. (5th+6th Floors), Baghdad',
    },
    {
      icon: Phone,
      title: isAr ? 'الهاتف' : 'Phone',
      desc: '+964 776 020 6080',
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
    `w-full px-4 py-3 border border-neutral-300 rounded-lg text-neutral-900 text-sm bg-white placeholder:text-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all ${isAr ? 'text-right' : 'text-left'}`;

  return (
    <section className="py-20 lg:py-28 bg-white" id="contact">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            {t('contact.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 leading-tight mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-12 lg:gap-16 ${isAr ? 'direction-rtl' : ''}`}>
          {/* Contact Info */}
          <div className={`lg:col-span-2 space-y-6 ${isAr ? 'lg:order-2' : ''}`}>
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <div className={`flex gap-4 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-900" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary-900 mb-0.5">{item.title}</h4>
                    <p className="text-sm text-neutral-600">{item.desc}</p>
                  </div>
                </div>
              );
              if (item.href) {
                return (
                  <a key={i} href={item.href} className="block no-underline hover:opacity-80 transition-opacity">
                    {content}
                  </a>
                );
              }
              return <div key={i}>{content}</div>;
            })}

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100 mt-6">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                alt="Baghdad location"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 ${isAr ? 'lg:order-1' : ''}`}>
            <div className="bg-neutral-50 rounded-xl p-8 lg:p-10">
              {success ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">
                    {isAr ? 'تم الإرسال بنجاح!' : 'Message Sent!'}
                  </h3>
                  <p className="text-neutral-600">{t('contact.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={`block text-sm font-medium text-primary-900 mb-2 ${isAr ? 'text-right' : ''}`}>{t('contact.name')}</label>
                      <input name="name" required className={inputClass} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-primary-900 mb-2 ${isAr ? 'text-right' : ''}`}>{t('contact.phone')}</label>
                      <input name="phone" type="tel" required className={inputClass} dir="ltr" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className={`block text-sm font-medium text-primary-900 mb-2 ${isAr ? 'text-right' : ''}`}>{t('contact.email')}</label>
                    <input name="email" type="email" required className={inputClass} dir="ltr" />
                  </div>
                  <div className="mb-5">
                    <label className={`block text-sm font-medium text-primary-900 mb-2 ${isAr ? 'text-right' : ''}`}>{t('contact.service')}</label>
                    <select name="service" required className={inputClass}>
                      <option value="">{isAr ? 'اختر خدمة' : 'Select a service'}</option>
                      <option value="coworking">{isAr ? 'مساحة عمل مشتركة' : 'Coworking Space'}</option>
                      <option value="private-office">{isAr ? 'مكتب خاص' : 'Private Office'}</option>
                      <option value="meeting">{isAr ? 'قاعة اجتماعات' : 'Meeting Room'}</option>
                      <option value="training">{isAr ? 'قاعة تدريب' : 'Training Hall'}</option>
                      <option value="academy">{isAr ? 'أكاديمية / تدريب' : 'Academy / Training'}</option>
                      <option value="consulting">{isAr ? 'استشارات' : 'Consulting'}</option>
                      <option value="other">{isAr ? 'أخرى' : 'Other'}</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className={`block text-sm font-medium text-primary-900 mb-2 ${isAr ? 'text-right' : ''}`}>{t('contact.message')}</label>
                    <textarea name="message" required rows={4} className={`${inputClass} resize-y`} />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-primary-900 text-white rounded-lg font-semibold text-sm hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                        </svg>
                        {isAr ? 'جاري الإرسال...' : 'Sending...'}
                      </span>
                    ) : (
                      t('contact.send')
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
