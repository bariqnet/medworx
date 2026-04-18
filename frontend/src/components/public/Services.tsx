'use client';

import { useLang } from '@/components/providers/LangProvider';
import { Building2, GraduationCap, Lightbulb, FolderKanban, Presentation, Coffee } from 'lucide-react';
import { FadeUp, SlideIn, ScaleUp } from '@/components/motion';

const services = [
  {
    icon: Building2,
    titleEn: 'Administrative & Office Services',
    titleAr: 'الخدمات الإدارية والمكتبية',
    descEn: 'MedWorx operates as a primary incubator within the medical sector by offering fully equipped administrative offices and specialized halls tailored for meetings, training sessions, and professional engagements. The infrastructure is designed to ensure operational efficiency, privacy, and a high-standard business environment aligned with the needs of healthcare professionals, organizations, and scientific bureaus.',
    descAr: 'تُعد مدووركس حاضنة رئيسية في القطاع الطبي من خلال توفير مكاتب إدارية مجهزة بالكامل، وقاعات مخصصة للاجتماعات والتدريب والفعاليات المهنية. تم تصميم هذه البيئة لضمان الكفاءة التشغيلية، والخصوصية، وتقديم مستوى عالٍ من الاحترافية بما يتناسب مع احتياجات الأطباء، والشركات، والمكاتب العلمية.',
    image: '/b1.JPG',
  },
  {
    icon: Presentation,
    titleEn: 'Rooms & Halls for Events, Meetings & Training',
    titleAr: 'قاعات وغرف للفعاليات والاجتماعات والتدريب',
    descEn: 'MedWorx offers a complete collection of 8 fully equipped rooms and halls designed for medical events, professional meetings, and training programs, with capacities ranging from 10 to 100 attendees. Each space is built with modern audio-visual technology, flexible seating layouts, and a refined business atmosphere to support workshops, seminars, conferences, and corporate gatherings of any scale — all within a dedicated medical environment in the heart of Baghdad.',
    descAr: 'توفر مدووركس مجموعة متكاملة بعدد ٨ قاعات وغرف مجهزة بالكامل ومصممة لاستضافة الفعاليات الطبية والاجتماعات المهنية والبرامج التدريبية، تستوعب من ١٠ إلى ١٠٠ شخص. كل مساحة مزوّدة بأحدث التقنيات السمعية والبصرية، وتنسيقات جلوس مرنة، وأجواء مهنية راقية تدعم ورش العمل والندوات والمؤتمرات والاجتماعات بمختلف أحجامها، ضمن بيئة طبية متخصصة في قلب بغداد.',
    image: '/b8.jpeg',
  },
  {
    icon: GraduationCap,
    titleEn: 'Training & Development Services (MedWorx Academy)',
    titleAr: 'خدمات التدريب والتطوير (أكاديمية مدووركس)',
    descEn: 'Through MedWorx Academy, the organization delivers structured training programs and professional development initiatives for medical personnel. These programs are conducted in a practice-oriented environment that simulates real-world scenarios, ensuring effective skill development, continuous learning, and measurable performance outcomes.',
    descAr: 'من خلال أكاديمية مدووركس، يتم تقديم برامج تدريبية متخصصة ومبادرات تطوير مهني تستهدف الملاكات الطبية. تُنفذ هذه البرامج ضمن بيئة عملية تحاكي الواقع، مما يضمن اكتساب المهارات بشكل فعال، وتعزيز التعلم المستمر، وتحقيق نتائج قابلة للقياس.',
    image: '/b2.JPG',
  },
  {
    icon: Lightbulb,
    titleEn: 'Creative Solutions for Medical Events & Exhibitions',
    titleAr: 'الحلول الإبداعية لتنظيم المعارض والمؤتمرات الطبية',
    descEn: 'MedWorx provides end-to-end solutions for organizing medical conferences, exhibitions, and large-scale industry events. This includes concept creation, strategic planning, execution, and post-event analysis. The goal is to create impactful platforms that enhance knowledge exchange, strengthen networking, and support collaboration across the healthcare ecosystem.',
    descAr: 'تقدم مدووركس حلولاً متكاملة لتنظيم المؤتمرات والمعارض الطبية، بدءاً من تطوير الفكرة والتخطيط الاستراتيجي، وصولاً إلى التنفيذ والتقييم بعد الحدث. وتهدف هذه الخدمات إلى خلق منصات مؤثرة تعزز تبادل المعرفة، وتقوي العلاقات المهنية، وتدعم التعاون داخل القطاع الصحي.',
    image: '/b3.JPG',
  },
  {
    icon: FolderKanban,
    titleEn: 'Project Management Excellence',
    titleAr: 'إدارة المشاريع باحترافية',
    descEn: 'MedWorx adopts a structured and results-driven project management approach to ensure the successful delivery of all initiatives. By integrating strategic planning, cost optimization, timeline control, and performance tracking, MedWorx guarantees efficient execution with measurable outcomes. This methodology transforms projects into value-driven investments, minimizing risks while maximizing operational and financial impact.',
    descAr: 'تعتمد مدووركس منهجية احترافية قائمة على إدارة المشاريع بشكل منظم وموجه نحو النتائج، لضمان تنفيذ جميع المبادرات بأعلى كفاءة. من خلال الدمج بين التخطيط الاستراتيجي، وتحسين التكاليف، وإدارة الوقت، وقياس الأداء، تضمن مدووركس تحقيق نتائج واضحة وقابلة للقياس، وتحويل المشاريع إلى استثمارات ذات قيمة عالية مع تقليل المخاطر وتعظيم الأثر التشغيلي والمالي.',
    image: '/s2.jpeg',
  },
  {
    icon: Coffee,
    titleEn: 'Med Cafe — Cafe & Restaurant for the Medical Community',
    titleAr: 'مد كافيه — مقهى ومطعم للمجتمع الطبي',
    descEn: 'Med Cafe is a dedicated cafe and restaurant created exclusively for the medical community — a calm, inspiring space where doctors, students, and healthcare professionals can study, work, and connect over thoughtfully prepared meals and specialty coffee. With reliable Wi-Fi, comfortable seating, and a quiet, focused atmosphere, Med Cafe blends productivity with hospitality, offering the perfect setting for individual study sessions, peer discussions, or informal professional meetings.',
    descAr: 'مد كافيه هو مقهى ومطعم مخصص حصراً للمجتمع الطبي — مساحة هادئة وملهمة تستطيع فيها المجموعة الطبية الدراسة والعمل والتواصل أثناء الاستمتاع بوجبات مُعدّة بعناية وقهوة مختصة. ومع توفر شبكة إنترنت موثوقة وجلسات مريحة وأجواء هادئة تدعم التركيز، يجمع مد كافيه بين الإنتاجية والضيافة، ليكون المكان المثالي لجلسات الدراسة الفردية، والنقاشات بين الزملاء، والاجتماعات المهنية غير الرسمية.',
    image: '/s1.jpeg',
  },
];

export default function Services() {
  const { locale, t } = useLang();
  const isAr = locale === 'ar';

  return (
    <section className="bg-white py-24 lg:py-32" id="services" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-sm font-bold tracking-widest uppercase mb-5"
            style={{ color: '#9B1B5E' }}>
            {t('services.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.2] tracking-tight"
            style={{ color: '#1d1d1f' }}>
            {t('services.title')}
          </h2>
        </FadeUp>

        {/* Service Cards */}
        <div className="space-y-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            const imageFirst = i % 2 === 0;
            return (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="grid lg:grid-cols-2 gap-0 bg-[#f5f5f7] rounded-2xl overflow-hidden">
                  {/* Image */}
                  <ScaleUp delay={i * 0.1 + 0.15} className={`aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden ${!imageFirst ? 'lg:order-2' : ''}`}>
                    <img
                      src={service.image}
                      alt={isAr ? service.titleAr : service.titleEn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </ScaleUp>

                  {/* Content */}
                  <SlideIn direction={imageFirst ? (isAr ? 'left' : 'right') : (isAr ? 'right' : 'left')} delay={i * 0.1 + 0.1} className={`p-8 lg:p-12 xl:p-14 flex flex-col justify-center ${isAr ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: i % 2 === 0 ? '#0C2340' : '#9B1B5E' }}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-semibold" style={{ color: '#1d1d1f' }}>
                        {isAr ? service.titleAr : service.titleEn}
                      </h3>
                    </div>
                    <p className="text-[15px] leading-[1.8]" style={{ color: 'rgba(0,0,0,0.56)' }}>
                      {isAr ? service.descAr : service.descEn}
                    </p>
                  </SlideIn>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
}
