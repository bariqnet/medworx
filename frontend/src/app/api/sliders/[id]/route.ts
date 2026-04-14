import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Slider } from '@/lib/models';
import { mockSliders } from '@/lib/mock-data';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();

  // Fall back to mock data if DB is unavailable
  if (!db) {
    const slider = mockSliders.find(s => s._id === params.id);
    if (!slider) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(slider);
  }

  const slider = await Slider.findById(params.id);
  if (!slider) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(slider);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();
  const body = await req.json();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const slider = mockSliders.find(s => s._id === params.id);
    if (!slider) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...slider, ...body, updatedAt: new Date().toISOString() };
    return NextResponse.json(updated);
  }

  const slider = await Slider.findByIdAndUpdate(params.id, body, { new: true });
  if (!slider) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(slider);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    return NextResponse.json({ success: true });
  }

  await Slider.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
