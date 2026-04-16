import mongoose, { Schema, models } from 'mongoose';

// ============== SLIDER MODEL ==============
const SliderSchema = new Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  subtitleEn: { type: String, default: '' },
  subtitleAr: { type: String, default: '' },
  image: { type: String, required: true },
  link: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// ============== BLOG MODEL ==============
const BlogSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  excerptEn: { type: String, default: '' },
  excerptAr: { type: String, default: '' },
  contentEn: { type: String, default: '' },
  contentAr: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  author: { type: String, default: 'MedWorx' },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

// ============== MEETING ROOM MODEL ==============
const MeetingRoomSchema = new Schema({
  nameEn: { type: String, required: true },
  nameAr: { type: String, required: true },
  capacity: { type: Number, required: true },
  floor: { type: Number, required: true, default: 5 },
  amenities: [{ type: String }],
  pricePerHour: { type: Number, required: true },
  priceType: { type: String, enum: ['hourly', 'daily'], default: 'hourly' },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// ============== BOOKING MODEL ==============
const BookingSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: 'MeetingRoom', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  company: { type: String, default: '' },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  purpose: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' },
  notes: { type: String, default: '' },
}, { timestamps: true });

// ============== CONTACT MODEL ==============
const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

// ============== USER MODEL (Admin) ==============
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
}, { timestamps: true });

export const Slider = models.Slider || mongoose.model('Slider', SliderSchema);
export const Blog = models.Blog || mongoose.model('Blog', BlogSchema);
export const MeetingRoom = models.MeetingRoom || mongoose.model('MeetingRoom', MeetingRoomSchema);
export const Booking = models.Booking || mongoose.model('Booking', BookingSchema);
export const Contact = models.Contact || mongoose.model('Contact', ContactSchema);
export const User = models.User || mongoose.model('User', UserSchema);
