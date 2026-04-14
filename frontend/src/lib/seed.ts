import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Direct import models to avoid Next.js module caching issues
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medworx';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db!;

  // ============== CLEAR EXISTING DATA ==============
  const collections = ['users', 'sliders', 'meetingrooms', 'blogs', 'bookings'];
  for (const col of collections) {
    try { await db.dropCollection(col); } catch {}
  }

  // ============== ADMIN USER ==============
  const hashedPassword = await bcrypt.hash('changeme123', 12);
  await db.collection('users').insertOne({
    name: 'MedWorx Admin',
    email: 'admin@medworx.iq',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log('✓ Admin user created (admin@medworx.iq / changeme123)');

  // ============== SLIDERS ==============
  await db.collection('sliders').insertMany([
    {
      titleEn: 'The Capital of Medical Businesses',
      titleAr: 'عاصمة الأعمال الطبية',
      subtitleEn: 'Premium coworking spaces and meeting rooms exclusively for medical professionals in Baghdad',
      subtitleAr: 'مساحات عمل مشتركة وقاعات اجتماعات متميزة حصرياً للمهنيين الطبيين في بغداد',
      image: '/images/slides/hero-coworking.jpg',
      link: '#services',
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      titleEn: 'MedWorx Academy - Level Up Your Career',
      titleAr: 'أكاديمية مـدووركـس - ارتقِ بمسيرتك المهنية',
      subtitleEn: 'Professional courses in medical selling skills, business management, and leadership',
      subtitleAr: 'دورات مهنية في مهارات البيع الطبي وإدارة الأعمال والقيادة',
      image: '/images/slides/hero-academy.jpg',
      link: '#academy',
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      titleEn: 'Book Your Meeting Room Today',
      titleAr: 'احجز قاعة اجتماعاتك اليوم',
      subtitleEn: 'State-of-the-art conference halls on Al Harthya-Kindi Street, 5th & 6th floors',
      subtitleAr: 'قاعات مؤتمرات مجهزة بأحدث التقنيات في شارع الحارثية-الكندي، الطابق الخامس والسادس',
      image: '/images/slides/hero-meeting.jpg',
      link: '/booking',
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log('✓ 3 sliders created');

  // ============== MEETING ROOMS ==============
  const rooms = await db.collection('meetingrooms').insertMany([
    {
      nameEn: 'Executive Boardroom',
      nameAr: 'قاعة مجلس الإدارة التنفيذي',
      capacity: 20,
      floor: 6,
      amenities: ['projector', 'whiteboard', 'video_conference', 'catering', 'sound_system'],
      pricePerHour: 75000,
      image: '/images/rooms/boardroom.jpg',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nameEn: 'Conference Room A',
      nameAr: 'قاعة المؤتمرات أ',
      capacity: 12,
      floor: 5,
      amenities: ['projector', 'whiteboard', 'video_conference'],
      pricePerHour: 45000,
      image: '/images/rooms/conference-a.jpg',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nameEn: 'Meeting Room B',
      nameAr: 'قاعة الاجتماعات ب',
      capacity: 8,
      floor: 5,
      amenities: ['whiteboard', 'screen', 'video_conference'],
      pricePerHour: 30000,
      image: '/images/rooms/meeting-b.jpg',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nameEn: 'Training Hall',
      nameAr: 'قاعة التدريب',
      capacity: 50,
      floor: 6,
      amenities: ['projector', 'sound_system', 'stage', 'whiteboard', 'microphone', 'catering'],
      pricePerHour: 100000,
      image: '/images/rooms/training-hall.jpg',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log('✓ 4 meeting rooms created');

  // ============== BLOGS ==============
  await db.collection('blogs').insertMany([
    {
      slug: 'why-medical-professionals-need-dedicated-workspaces',
      titleEn: 'Why Medical Professionals Need Dedicated Workspaces',
      titleAr: 'لماذا يحتاج المهنيون الطبيون إلى مساحات عمل مخصصة',
      excerptEn: 'Discover why a specialized medical business center can transform your practice and accelerate growth in Iraq\'s healthcare sector.',
      excerptAr: 'اكتشف كيف يمكن لمركز أعمال طبي متخصص أن يحول ممارستك ويسرع النمو في قطاع الرعاية الصحية في العراق.',
      contentEn: 'The healthcare industry in Iraq is rapidly evolving. Medical professionals today need more than just a clinic — they need business infrastructure that supports growth, networking, and continuous education.\n\nAt MedWorx, we understand these needs because we built our entire center around them. Located on Al Harthya-Kindi Street in Baghdad, our 5th and 6th floor spaces provide everything from private offices to shared desks, all designed with the medical professional in mind.\n\nKey benefits of a dedicated medical workspace:\n\n1. Professional Environment: Meet with pharmaceutical representatives, investors, and partners in a setting that reflects the seriousness of your practice.\n\n2. Networking Opportunities: Being surrounded by other medical professionals creates natural opportunities for collaboration, referrals, and knowledge sharing.\n\n3. Access to Training: Through MedWorx Academy, tenants get priority access to courses on medical selling skills, business management, and leadership.\n\n4. Cost Efficiency: Instead of maintaining your own office with all its overhead, a coworking membership gives you everything you need at a fraction of the cost.\n\nIf you\'re a medical professional in Baghdad looking to take your practice to the next level, we invite you to visit MedWorx and see the difference for yourself.',
      contentAr: 'يتطور قطاع الرعاية الصحية في العراق بسرعة. يحتاج المهنيون الطبيون اليوم إلى أكثر من مجرد عيادة — يحتاجون إلى بنية تحتية تجارية تدعم النمو والتواصل والتعليم المستمر.\n\nفي مـدووركـس، نفهم هذه الاحتياجات لأننا بنينا مركزنا بالكامل حولها. يقع مركزنا في شارع الحارثية-الكندي في بغداد، وتوفر مساحاتنا في الطابقين الخامس والسادس كل شيء من المكاتب الخاصة إلى المكاتب المشتركة، وكلها مصممة مع وضع المهني الطبي في الاعتبار.\n\nالفوائد الرئيسية لمساحة عمل طبية مخصصة:\n\n1. بيئة مهنية: قابل ممثلي شركات الأدوية والمستثمرين والشركاء في بيئة تعكس جدية ممارستك.\n\n2. فرص التواصل: التواجد بين مهنيين طبيين آخرين يخلق فرصاً طبيعية للتعاون والإحالات وتبادل المعرفة.\n\n3. الوصول إلى التدريب: من خلال أكاديمية مـدووركـس، يحصل المستأجرون على أولوية الوصول إلى دورات مهارات البيع الطبي وإدارة الأعمال والقيادة.\n\n4. كفاءة التكلفة: بدلاً من الحفاظ على مكتبك الخاص بكل نفقاته، يمنحك عضوية العمل المشترك كل ما تحتاجه بجزء من التكلفة.',
      coverImage: '/images/blog/medical-workspace.jpg',
      author: 'MedWorx Team',
      tags: ['coworking', 'medical', 'workspace', 'baghdad'],
      isPublished: true,
      publishedAt: new Date('2026-03-15'),
      createdAt: new Date('2026-03-15'),
      updatedAt: new Date('2026-03-15'),
    },
    {
      slug: 'top-5-selling-skills-for-medical-representatives',
      titleEn: 'Top 5 Selling Skills Every Medical Representative Needs',
      titleAr: 'أهم 5 مهارات بيع يحتاجها كل مندوب طبي',
      excerptEn: 'Master these essential selling techniques to stand out in Iraq\'s competitive pharmaceutical market.',
      excerptAr: 'أتقن تقنيات البيع الأساسية هذه لتتميز في سوق الأدوية التنافسي في العراق.',
      contentEn: 'The pharmaceutical industry in Iraq is growing fast, and with it comes fierce competition. Whether you\'re a new medical representative or a seasoned professional, mastering these five selling skills will give you a significant edge.\n\n1. Active Listening: Before you pitch, listen. Understand the doctor\'s needs, patient demographics, and current treatment preferences. This builds trust and helps you tailor your approach.\n\n2. Product Knowledge: Know your products inside and out — clinical data, side effects, drug interactions, and cost comparisons. Confidence comes from expertise.\n\n3. Relationship Building: In Iraqi medical culture, relationships matter tremendously. Invest time in building genuine connections with healthcare providers.\n\n4. Objection Handling: When a doctor says "I already use a competitor," don\'t retreat. Have data-driven responses ready that highlight your product\'s unique advantages.\n\n5. Follow-Up Discipline: The sale rarely happens on the first visit. Maintain a systematic follow-up schedule and provide value at each touchpoint.\n\nAt MedWorx Academy, we offer intensive workshops on all these skills and more. Our next Medical Selling Skills course starts soon — contact us to reserve your spot.',
      contentAr: 'تنمو صناعة الأدوية في العراق بسرعة، ومعها تأتي منافسة شرسة. سواء كنت مندوباً طبياً جديداً أو محترفاً متمرساً، فإن إتقان هذه المهارات الخمس سيمنحك ميزة كبيرة.\n\n1. الاستماع الفعال: قبل أن تعرض، استمع. افهم احتياجات الطبيب والتركيبة السكانية للمرضى وتفضيلات العلاج الحالية.\n\n2. معرفة المنتج: اعرف منتجاتك من الداخل والخارج — البيانات السريرية والآثار الجانبية والتفاعلات الدوائية ومقارنات التكلفة.\n\n3. بناء العلاقات: في ثقافة الطب العراقية، العلاقات مهمة للغاية. استثمر الوقت في بناء علاقات حقيقية مع مقدمي الرعاية الصحية.\n\n4. التعامل مع الاعتراضات: عندما يقول الطبيب "أنا أستخدم منافساً بالفعل"، لا تتراجع. جهز ردوداً مبنية على البيانات.\n\n5. انضباط المتابعة: نادراً ما يحدث البيع في الزيارة الأولى. حافظ على جدول متابعة منهجي وقدم قيمة في كل نقطة اتصال.\n\nفي أكاديمية مـدووركـس، نقدم ورش عمل مكثفة حول كل هذه المهارات والمزيد.',
      coverImage: '/images/blog/selling-skills.jpg',
      author: 'MedWorx Academy',
      tags: ['selling skills', 'medical rep', 'pharma', 'training'],
      isPublished: true,
      publishedAt: new Date('2026-03-22'),
      createdAt: new Date('2026-03-22'),
      updatedAt: new Date('2026-03-22'),
    },
    {
      slug: 'how-to-choose-the-right-meeting-room-for-your-medical-event',
      titleEn: 'How to Choose the Right Meeting Room for Your Medical Event',
      titleAr: 'كيف تختار القاعة المناسبة لفعاليتك الطبية',
      excerptEn: 'From intimate team meetings to large medical conferences — a guide to selecting the perfect space at MedWorx.',
      excerptAr: 'من اجتماعات الفريق الصغيرة إلى المؤتمرات الطبية الكبيرة — دليل لاختيار المساحة المثالية في مـدووركـس.',
      contentEn: 'Planning a medical event in Baghdad? Whether it\'s a small team meeting, a pharmaceutical product launch, or a full-scale medical conference, choosing the right room can make all the difference.\n\nHere\'s our quick guide to MedWorx\'s meeting spaces:\n\nFor Small Team Meetings (2-8 people): Our Meeting Room B on the 5th floor is perfect. It comes with a whiteboard, screen, and video conferencing capability — everything you need for focused discussions. At 30,000 IQD per hour, it\'s our most affordable option.\n\nFor Board Meetings & Presentations (8-20 people): The Executive Boardroom on the 6th floor offers a premium environment with a projector, whiteboard, video conferencing, and catering services. At 75,000 IQD per hour, it\'s ideal for important client meetings.\n\nFor Training Sessions & Workshops (up to 50 people): Our Training Hall on the 6th floor features a stage, professional sound system, projector, and microphone setup. At 100,000 IQD per hour, it\'s the go-to choice for MedWorx Academy courses and external training events.\n\nAll rooms include high-speed WiFi, climate control, and professional reception services. Book online through our website or call +964 776 020 6080.',
      contentAr: 'هل تخطط لفعالية طبية في بغداد؟ سواء كان اجتماع فريق صغير أو إطلاق منتج دوائي أو مؤتمر طبي كامل، اختيار القاعة المناسبة يمكن أن يحدث فرقاً كبيراً.\n\nإليك دليلنا السريع لمساحات الاجتماعات في مـدووركـس:\n\nللاجتماعات الصغيرة (2-8 أشخاص): قاعة الاجتماعات ب في الطابق الخامس مثالية. تأتي مع لوح أبيض وشاشة وإمكانية مؤتمرات الفيديو. بسعر 30,000 دينار عراقي للساعة.\n\nلاجتماعات مجلس الإدارة (8-20 شخص): قاعة مجلس الإدارة التنفيذي في الطابق السادس توفر بيئة متميزة مع جهاز عرض ولوح أبيض ومؤتمرات فيديو وخدمات ضيافة. بسعر 75,000 دينار عراقي للساعة.\n\nلجلسات التدريب (حتى 50 شخص): قاعة التدريب في الطابق السادس تتميز بمنصة ونظام صوت احترافي وجهاز عرض وميكروفون. بسعر 100,000 دينار عراقي للساعة.\n\nجميع القاعات تشمل واي فاي عالي السرعة وتكييف هواء وخدمات استقبال مهنية.',
      coverImage: '/images/blog/meeting-room-guide.jpg',
      author: 'MedWorx Team',
      tags: ['meeting rooms', 'events', 'guide', 'baghdad'],
      isPublished: true,
      publishedAt: new Date('2026-04-01'),
      createdAt: new Date('2026-04-01'),
      updatedAt: new Date('2026-04-01'),
    },
    {
      slug: 'baghdad-healthcare-startup-ecosystem-2026',
      titleEn: 'Baghdad\'s Healthcare Startup Ecosystem in 2026',
      titleAr: 'منظومة الشركات الناشئة الصحية في بغداد 2026',
      excerptEn: 'An overview of the growing healthcare startup scene in Baghdad and how MedWorx is at its center.',
      excerptAr: 'نظرة عامة على مشهد الشركات الناشئة الصحية المتنامي في بغداد وكيف يقع مـدووركـس في مركزه.',
      contentEn: 'Baghdad\'s healthcare startup scene is experiencing unprecedented growth in 2026. From telemedicine platforms to medical supply chain innovations, entrepreneurs across Iraq are solving real healthcare challenges.\n\nMedWorx has been proud to serve as a launchpad for many of these startups. Our coworking spaces have hosted early-stage medical tech companies, our conference rooms have seen countless investor pitches, and our academy has trained the next generation of healthcare business leaders.\n\nThe ecosystem is thriving thanks to several factors: increasing internet penetration, a young population eager for better healthcare, government support for digital health initiatives, and growing investor interest in the region.\n\nIf you\'re building a healthcare startup in Iraq, MedWorx offers the perfect environment to grow — from your first desk to your first board meeting.',
      contentAr: 'يشهد مشهد الشركات الناشئة الصحية في بغداد نمواً غير مسبوق في 2026. من منصات الطب عن بعد إلى ابتكارات سلسلة التوريد الطبية، يحل رواد الأعمال في جميع أنحاء العراق تحديات رعاية صحية حقيقية.\n\nفخر مـدووركـس بأنه كان منصة انطلاق للعديد من هذه الشركات الناشئة. استضافت مساحات العمل المشتركة لدينا شركات تقنية طبية في مراحلها المبكرة، وشهدت قاعات المؤتمرات لدينا عروضاً لا حصر لها للمستثمرين.\n\nتزدهر المنظومة بفضل عدة عوامل: زيادة انتشار الإنترنت، وسكان شباب متلهفون لرعاية صحية أفضل، ودعم حكومي لمبادرات الصحة الرقمية.',
      coverImage: '/images/blog/startup-ecosystem.jpg',
      author: 'MedWorx Team',
      tags: ['startups', 'healthcare', 'iraq', 'ecosystem'],
      isPublished: false,
      createdAt: new Date('2026-04-05'),
      updatedAt: new Date('2026-04-05'),
    },
  ]);
  console.log('✓ 4 blog posts created (3 published, 1 draft)');

  // ============== SAMPLE BOOKINGS ==============
  const roomIds = rooms.insertedIds;
  await db.collection('bookings').insertMany([
    {
      roomId: roomIds[0],
      customerName: 'Dr. Ahmed Al-Rashid',
      customerEmail: 'ahmed.rashid@iraqmed.com',
      customerPhone: '07701234567',
      company: 'Iraq Medical Group',
      date: '2026-04-15',
      startTime: '10:00',
      endTime: '12:00',
      purpose: 'Board meeting to discuss Q2 expansion plans',
      status: 'approved',
      notes: 'Catering needed for 15 people',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roomId: roomIds[2],
      customerName: 'Fatima Hassan',
      customerEmail: 'fatima.h@pharmaiq.com',
      customerPhone: '07809876543',
      company: 'PharmaIQ',
      date: '2026-04-18',
      startTime: '14:00',
      endTime: '16:00',
      purpose: 'Product presentation for new cardiovascular medication',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log('✓ 2 sample bookings created (1 approved, 1 pending)');

  console.log('\n✅ Seed completed successfully!');
  console.log('Admin login: admin@medworx.iq / changeme123');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
