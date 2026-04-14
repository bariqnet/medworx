import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Contact } from '@/lib/models';

export async function GET() {
  const db = await connectDB();

  // Fall back to mock data if DB is unavailable
  if (!db) {
    return NextResponse.json([
      {
        _id: '1',
        name: 'Ahmed Al-Mansouri',
        email: 'ahmed@example.com',
        phone: '+964 770 123 4567',
        subject: 'Office Space Inquiry',
        message: 'Interested in renting a medical office space',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  const messages = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const body = await req.json();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const mockMessage = {
      _id: Date.now().toString(),
      ...body,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(mockMessage, { status: 201 });
  }

  const message = await Contact.create(body);
  return NextResponse.json(message, { status: 201 });
}
