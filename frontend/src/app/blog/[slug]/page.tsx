'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import type { Blog } from '@/types';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { locale } = useLang();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`).then(r => r.json()).then(setBlog).catch(console.error);
  }, [slug]);

  if (!blog) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="bg-primary-900 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors no-underline mb-8"
          >
            {locale === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {locale === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>

          <h1
            className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6"
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            {locale === 'ar' ? blog.titleAr : blog.titleEn}
          </h1>

          <div className="flex items-center gap-5 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {blog.author}
            </span>
            {blog.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(blog.publishedAt).toLocaleDateString(
                  locale === 'ar' ? 'ar-IQ' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {blog.coverImage && (
            <div className="rounded-xl overflow-hidden mb-10 aspect-video -mt-20 relative shadow-xl">
              <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-accent-50 text-accent text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className="prose prose-lg max-w-none text-neutral-700 leading-relaxed prose-headings:text-primary-900 prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            style={{ fontFamily: locale === 'ar' ? "'El Messiri', 'Cairo', sans-serif" : "'Inter', sans-serif" }}
            dangerouslySetInnerHTML={{
              __html: (locale === 'ar' ? blog.contentAr : blog.contentEn).replace(/\n/g, '<br/>')
            }}
          />

          {/* Bottom Nav */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark transition-colors no-underline"
            >
              {locale === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {locale === 'ar' ? 'جميع المقالات' : 'All Articles'}
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
