import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models';
import { mockBlogs } from '@/lib/mock-data';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();

  // Fall back to mock data if DB is unavailable
  if (!db) {
    const blog = mockBlogs.find(b => b._id === params.id || b.slug === params.id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
  }

  // Support both ID and slug lookup
  const blog = await Blog.findOne({
    $or: [
      { _id: params.id.match(/^[0-9a-fA-F]{24}$/) ? params.id : undefined },
      { slug: params.id },
    ].filter(Boolean),
  });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();
  const body = await req.json();

  if (body.isPublished && !body.publishedAt) {
    body.publishedAt = new Date();
  }

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const blog = mockBlogs.find(b => b._id === params.id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...blog, ...body, updatedAt: new Date().toISOString() };
    return NextResponse.json(updated);
  }

  const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectDB();

  // Fall back to mock response if DB is unavailable
  if (!db) {
    return NextResponse.json({ success: true });
  }

  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
