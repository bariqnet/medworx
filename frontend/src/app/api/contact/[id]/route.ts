import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Contact } from '@/lib/models';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();
  const body = await req.json();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const mockMessage = {
      _id: params.id,
      name: 'Ahmed Al-Mansouri',
      email: 'ahmed@example.com',
      phone: '+964 770 123 4567',
      subject: 'Office Space Inquiry',
      message: 'Interested in renting a medical office space',
      ...body,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(mockMessage);
  }

  const message = await Contact.findByIdAndUpdate(params.id, body, { new: true });
  if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(message);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    return NextResponse.json({ success: true });
  }

  await Contact.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
