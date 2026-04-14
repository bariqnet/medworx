import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Slider, Blog, Booking, Contact } from '@/lib/models';
import { mockStats } from '@/lib/mock-data';

export async function GET() {
  const db = await connectDB();

  // Fall back to mock data if DB is unavailable
  if (!db) {
    return NextResponse.json(mockStats);
  }

  const [sliders, blogs, pendingBookings, unreadMessages] = await Promise.all([
    Slider.countDocuments({ isActive: true }),
    Blog.countDocuments({ isPublished: true }),
    Booking.countDocuments({ status: 'pending' }),
    Contact.countDocuments({ isRead: false }),
  ]);

  return NextResponse.json({ sliders, blogs, pendingBookings, unreadMessages });
}
