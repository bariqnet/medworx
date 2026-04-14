import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Booking } from '@/lib/models';
import { mockBookings } from '@/lib/mock-data';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();

  // Fall back to mock data if DB is unavailable
  if (!db) {
    const booking = mockBookings.find(b => b._id === params.id);
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(booking);
  }

  const booking = await Booking.findById(params.id);
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();
  const body = await req.json();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const booking = mockBookings.find(b => b._id === params.id);
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...booking, ...body };
    return NextResponse.json(updated);
  }

  const booking = await Booking.findByIdAndUpdate(params.id, body, { new: true });
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(booking);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    return NextResponse.json({ success: true });
  }

  await Booking.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
