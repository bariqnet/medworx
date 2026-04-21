'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import type { MeetingRoom } from '@/types';
import { Users, MapPin, Check, CheckCircle } from 'lucide-react';

export default function BookingPage() {
  const { locale, t } = useLang();
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/rooms').then(r => r.json()).then(setRooms).catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const room = rooms.find((r) => r._id === fd.get('roomId'));
    const roomName = room ? (locale === 'ar' ? room.nameAr : room.nameEn) : '';

    const lines = locale === 'ar'
      ? [
          'طلب حجز قاعة جديد',
          '',
          `القاعة: ${roomName}`,
          `الاسم: ${fd.get('customerName')}`,
          `البريد: ${fd.get('customerEmail')}`,
          `الهاتف: ${fd.get('customerPhone')}`,
          `الشركة: ${fd.get('company') || '-'}`,
          `التاريخ: ${fd.get('date')}`,
          `الوقت: ${fd.get('startTime')} - ${fd.get('endTime')}`,
          `الغرض: ${fd.get('purpose') || '-'}`,
        ]
      : [
          'New room booking request',
          '',
          `Room: ${roomName}`,
          `Name: ${fd.get('customerName')}`,
          `Email: ${fd.get('customerEmail')}`,
          `Phone: ${fd.get('customerPhone')}`,
          `Company: ${fd.get('company') || '-'}`,
          `Date: ${fd.get('date')}`,
          `Time: ${fd.get('startTime')} - ${fd.get('endTime')}`,
          `Purpose: ${fd.get('purpose') || '-'}`,
        ];

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/9647760206080?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const inputClass =
    'w-full px-4 py-3 border border-neutral-300 rounded-lg text-neutral-900 text-base sm:text-sm bg-white placeholder:text-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all';

  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <section className="bg-primary-900 pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/40 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors no-underline text-white/40">
              {t('nav.home')}
            </Link>
            <span>/</span>
            <span className="text-white/70">{t('nav.booking')}</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">{t('booking.title')}</h1>
          <p className="text-white/60 mt-2 sm:mt-3 text-sm sm:text-base max-w-xl">{t('booking.subtitle')}</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-10 sm:py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
          {submitted ? (
            <div className="bg-white rounded-xl p-8 sm:p-16 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-primary-900 mb-3">
                {locale === 'ar' ? 'تم استلام طلبك!' : 'Booking Request Received!'}
              </h2>
              <p className="text-neutral-600 mb-6">{t('booking.pending')}</p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-2.5 bg-primary-900 text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors no-underline"
              >
                {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 sm:p-8 lg:p-10 shadow-sm">
              {/* Room Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-primary-900 mb-3">
                  {t('booking.selectRoom')}
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {rooms.map((room) => (
                    <label
                      key={room._id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedRoom === room._id
                          ? 'border-accent bg-accent-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="roomId"
                        value={room._id}
                        required
                        className="hidden"
                        onChange={() => setSelectedRoom(room._id!)}
                      />
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-primary-900">
                          {locale === 'ar' ? room.nameAr : room.nameEn}
                        </span>
                        {selectedRoom === room._id && (
                          <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {room.capacity}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Floor {room.floor}
                        </span>
                        <span>
                          {room.pricePerHour?.toLocaleString()} IQD/{room.priceType === 'daily' ? (locale === 'ar' ? 'يوم' : 'day') : (locale === 'ar' ? 'ساعة' : 'hr')}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                {rooms.length === 0 && (
                  <div className="text-center py-8 text-neutral-400 text-sm">
                    {locale === 'ar' ? 'جاري تحميل القاعات...' : 'Loading rooms...'}
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-primary-900 mb-4">
                  {locale === 'ar' ? 'معلوماتك' : 'Your Information'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      {t('contact.name')}
                    </label>
                    <input name="customerName" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      {t('contact.email')}
                    </label>
                    <input name="customerEmail" type="email" required className={inputClass} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      {t('contact.phone')}
                    </label>
                    <input name="customerPhone" type="tel" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      {locale === 'ar' ? 'الشركة (اختياري)' : 'Company (optional)'}
                    </label>
                    <input name="company" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-primary-900 mb-4">
                  {locale === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      {t('booking.selectDate')}
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      {t('booking.startTime')}
                    </label>
                    <input
                      name="startTime"
                      type="time"
                      required
                      min="09:00"
                      max="20:00"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      {t('booking.endTime')}
                    </label>
                    <input
                      name="endTime"
                      type="time"
                      required
                      min="09:00"
                      max="20:00"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  {t('booking.purpose')}
                </label>
                <textarea name="purpose" rows={3} className={`${inputClass} resize-y`} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-primary-900 text-white rounded-lg font-semibold text-sm hover:bg-primary-light transition-colors"
              >
                {t('booking.submit')}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
