import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/lib/models';
import { slugify } from '@/lib/utils';
import { mockBlogs } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  const db = await connectDB();
  const { searchParams } = new URL(req.url);
  const published = searchParams.get('published');

  // Fall back to mock data if DB is unavailable
  if (!db) {
    let blogs = mockBlogs;
    if (published === 'true') {
      blogs = blogs.filter(b => b.published);
    }
    return NextResponse.json(blogs);
  }

  let query: any = {};
  if (published === 'true') query.isPublished = true;

  const blogs = await Blog.find(query).sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const db = await connectDB();
  const body = await req.json();

  // Generate slug from English title
  let slug = slugify(body.titleEn);

  // Fall back to mock response if DB is unavailable
  if (!db) {
    const mockBlog = {
      _id: Date.now().toString(),
      ...body,
      slug,
      publishedAt: body.isPublished ? new Date() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(mockBlog, { status: 201 });
  }

  const existing = await Blog.findOne({ slug });
  if (existing) slug = `${slug}-${Date.now()}`;

  const blog = await Blog.create({
    ...body,
    slug,
    publishedAt: body.isPublished ? new Date() : undefined,
  });
  return NextResponse.json(blog, { status: 201 });
}
