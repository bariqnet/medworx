import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Booking } from '@/lib/models';
import { mockBookings } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  const db = await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const roomId = searchParams.get('roomId');
  const date = searchParams.get('date');

  // Fall back to mock data if DB is unavailable
  if (!db) {
    let bookings = mockBookings;
    if (status) bookings = bookings.filter(b => b.status === status);
    if (roomId) bookings = bookings.filter(b => b.room._id === roomId);
    if (date) bookings = bookings.filter(b => b.date === date);
    return NextResponse.json(bookings);
  }

  let query: any = {};
  if (status) query.status = status;
  if (roomId) query.roomId = roomId;
  if (date) query.date = date;

  const bookings = await Booking.find(query).sort({ date: 1, startTime: 1 });
  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const body = await req.json();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const mockBooking = {
      _id: Date.now().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(mockBooking, { status: 201 });
  }

  // Check for conflicting bookings
  const conflict = await Booking.findOne({
    roomId: body.roomId,
    date: body.date,
    status: { $in: ['pending', 'approved'] },
    $or: [
      { startTime: { $lt: body.endTime }, endTime: { $gt: body.startTime } },
    ],
  });

  if (conflict) {
    return NextResponse.json(
      { error: 'This time slot is already booked or pending approval' },
      { status: 409 }
    );
  }

  const booking = await Booking.create({ ...body, status: 'pending' });
  return NextResponse.json(booking, { status: 201 });
}
