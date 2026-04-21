'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import type { Blog } from '@/types';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState({
    titleEn: '', titleAr: '', excerptEn: '', excerptAr: '',
    contentEn: '', contentAr: '', coverImage: '', author: 'MedWorx',
    tags: '', isPublished: false,
  });

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/blogs/${editing._id}` : '/api/blogs';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setShowModal(false);
    setEditing(null);
    resetForm();
    fetchBlogs();
  };

  const resetForm = () => setForm({ titleEn: '', titleAr: '', excerptEn: '', excerptAr: '', contentEn: '', contentAr: '', coverImage: '', author: 'MedWorx', tags: '', isPublished: false });

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  const openEdit = (blog: Blog) => {
    setEditing(blog);
    setForm({
      titleEn: blog.titleEn, titleAr: blog.titleAr, excerptEn: blog.excerptEn, excerptAr: blog.excerptAr,
      contentEn: blog.contentEn, contentAr: blog.contentAr, coverImage: blog.coverImage,
      author: blog.author, tags: blog.tags.join(', '), isPublished: blog.isPublished,
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold">Blog Posts</h1>
        <button onClick={() => { setEditing(null); resetForm(); setShowModal(true); }} className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full btn-gradient text-white text-sm font-semibold glow-magenta">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="surface-card rounded-2xl overflow-hidden group">
            <div className="h-40 bg-gradient-to-br from-[#141043] to-[#3a1d8e] relative">
              {blog.coverImage && <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />}
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {blog.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold mb-1 line-clamp-1">{blog.titleEn}</h3>
              <p className="text-sm text-[#7a779a] mb-3 line-clamp-2">{blog.excerptEn}</p>
              <div className="flex items-center gap-2 mb-4">
                {blog.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-white/[0.05] text-[10px] text-[#b8b5d0]">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(blog)} className="flex-1 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-sm font-medium flex items-center justify-center gap-1 transition-all">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <a href={`/blog/${blog.slug}`} target="_blank" className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-all">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button onClick={() => handleDelete(blog._id!)} className="p-2 rounded-lg hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <div className="col-span-full surface-card rounded-2xl p-12 text-center text-[#7a779a]">
            No blog posts yet. Click &quot;New Post&quot; to write one.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-0 sm:p-4">
          <div className="bg-[#141043] border border-white/[0.08] sm:rounded-2xl w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">{editing ? 'Edit Blog Post' : 'New Blog Post'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Title (English)</label>
                  <input value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Title (Arabic)</label>
                  <input value={form.titleAr} onChange={e => setForm({...form, titleAr: e.target.value})} required dir="rtl" className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none font-ar" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Excerpt (English)</label>
                  <textarea value={form.excerptEn} onChange={e => setForm({...form, excerptEn: e.target.value})} rows={2} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none resize-y" />
                </div>
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Excerpt (Arabic)</label>
                  <textarea value={form.excerptAr} onChange={e => setForm({...form, excerptAr: e.target.value})} rows={2} dir="rtl" className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none resize-y font-ar" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#b8b5d0] mb-2">Content (English)</label>
                <textarea value={form.contentEn} onChange={e => setForm({...form, contentEn: e.target.value})} rows={6} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none resize-y" placeholder="Write your blog content in English..." />
              </div>
              <div>
                <label className="block text-sm text-[#b8b5d0] mb-2">Content (Arabic)</label>
                <textarea value={form.contentAr} onChange={e => setForm({...form, contentAr: e.target.value})} rows={6} dir="rtl" className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none resize-y font-ar" placeholder="اكتب محتوى المدونة بالعربية..." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Cover Image URL</label>
                  <input value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Author</label>
                  <input value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="medical, business, ..." className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({...form, isPublished: e.target.checked})} className="w-4 h-4 rounded accent-[#c4197d]" />
                <label className="text-sm text-[#b8b5d0]">Publish immediately</label>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-full border border-white/20 text-sm">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-full btn-gradient text-white font-semibold">{editing ? 'Update' : 'Create'} Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
