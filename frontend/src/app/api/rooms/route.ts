import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { MeetingRoom } from '@/lib/models';
import { mockRooms } from '@/lib/mock-data';

export async function GET() {
  const db = await connectDB();

  // Fall back to mock data if DB is unavailable
  if (!db) {
    return NextResponse.json(mockRooms);
  }

  const rooms = await MeetingRoom.find({ isActive: true }).sort({ floor: 1, nameEn: 1 });
  return NextResponse.json(rooms);
}

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const body = await req.json();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const mockRoom = {
      _id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(mockRoom, { status: 201 });
  }

  const room = await MeetingRoom.create(body);
  return NextResponse.json(room, { status: 201 });
}
