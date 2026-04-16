// ============== SLIDER ==============
export interface Slider {
  _id?: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  image: string;
  link?: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ============== BLOG ==============
export interface Blog {
  _id?: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  coverImage: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// ============== MEETING ROOM ==============
export type PriceType = 'hourly' | 'daily';

export interface MeetingRoom {
  _id?: string;
  nameEn: string;
  nameAr: string;
  capacity: number;
  floor: number;
  amenities: string[];
  pricePerHour: number;
  priceType: PriceType;
  image?: string;
  isActive: boolean;
}

// ============== BOOKING ==============
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface Booking {
  _id?: string;
  roomId: string;
  room?: MeetingRoom;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  purpose?: string;
  status: BookingStatus;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ============== CONTACT ==============
export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
}

// ============== LANGUAGE ==============
export type Locale = 'en' | 'ar';

export interface TranslationStrings {
  [key: string]: {
    en: string;
    ar: string;
  };
}
