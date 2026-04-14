import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Slider } from '@/lib/models';
import { mockSliders } from '@/lib/mock-data';

export async function GET() {
  const db = await connectDB();

  // Fall back to mock data if DB is unavailable
  if (!db) {
    return NextResponse.json(mockSliders);
  }

  const sliders = await Slider.find().sort({ order: 1 });
  return NextResponse.json(sliders);
}

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const body = await req.json();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const mockSlider = {
      _id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(mockSlider, { status: 201 });
  }

  const slider = await Slider.create(body);
  return NextResponse.json(slider, { status: 201 });
}
