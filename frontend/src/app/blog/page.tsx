'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import type { Blog } from '@/types';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BlogPage() {
  const { locale, t } = useLang();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('/api/blogs?published=true').then(r => r.json()).then(setBlogs).catch(console.error);
  }, []);

  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <section className="bg-primary-900 pt-32 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors no-underline text-white/40">
              {t('nav.home')}
            </Link>
            <span>/</span>
            <span className="text-white/70">{t('nav.blog')}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {locale === 'ar' ? 'أحدث المقالات والأخبار' : 'Latest Articles & Insights'}
          </h1>
          <p className="text-white/60 mt-3 text-base max-w-xl">
            {locale === 'ar'
              ? 'اكتشف أحدث الأخبار والمقالات حول الأعمال الطبية ومساحات العمل المشتركة.'
              : 'Discover the latest news and articles about medical business and coworking spaces.'}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="bg-white rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300 no-underline"
              >
                <div className="aspect-[16/10] bg-neutral-200 relative overflow-hidden">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {blog.publishedAt && new Date(blog.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-IQ' : 'en-US')}
                    <span className="mx-1">&middot;</span>
                    <span>{blog.author}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {locale === 'ar' ? blog.titleAr : blog.titleEn}
                  </h2>
                  <p className="text-sm text-neutral-500 line-clamp-3 mb-4 leading-relaxed">
                    {locale === 'ar' ? blog.excerptAr : blog.excerptEn}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                    {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                    {locale === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center mx-auto mb-5">
                <Calendar className="w-7 h-7 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                {locale === 'ar' ? 'لا توجد مقالات بعد' : 'No articles yet'}
              </h3>
              <p className="text-neutral-500 text-sm">
                {locale === 'ar' ? 'تحقق مرة أخرى قريباً!' : 'Check back soon for new content!'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
