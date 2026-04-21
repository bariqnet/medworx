'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import type { Slider } from '@/types';

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Slider | null>(null);
  const [form, setForm] = useState({ titleEn: '', titleAr: '', subtitleEn: '', subtitleAr: '', image: '', link: '', order: 0, isActive: true });

  useEffect(() => { fetchSliders(); }, []);

  const fetchSliders = async () => {
    const res = await fetch('/api/sliders');
    const data = await res.json();
    setSliders(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/sliders/${editing._id}` : '/api/sliders';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setShowModal(false);
    setEditing(null);
    setForm({ titleEn: '', titleAr: '', subtitleEn: '', subtitleAr: '', image: '', link: '', order: 0, isActive: true });
    fetchSliders();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slider?')) return;
    await fetch(`/api/sliders/${id}`, { method: 'DELETE' });
    fetchSliders();
  };

  const openEdit = (slider: Slider) => {
    setEditing(slider);
    setForm({ titleEn: slider.titleEn, titleAr: slider.titleAr, subtitleEn: slider.subtitleEn, subtitleAr: slider.subtitleAr, image: slider.image, link: slider.link || '', order: slider.order, isActive: slider.isActive });
    setShowModal(true);
  };

  const toggleActive = async (slider: Slider) => {
    await fetch(`/api/sliders/${slider._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...slider, isActive: !slider.isActive }) });
    fetchSliders();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold">Sliders</h1>
        <button onClick={() => { setEditing(null); setForm({ titleEn: '', titleAr: '', subtitleEn: '', subtitleAr: '', image: '', link: '', order: 0, isActive: true }); setShowModal(true); }} className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full btn-gradient text-white text-sm font-semibold glow-magenta">
          <Plus className="w-4 h-4" /> Add Slider
        </button>
      </div>

      {/* Table */}
      <div className="surface-card rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase tracking-wider">Order</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase tracking-wider">Image</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase tracking-wider">Title (EN)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase tracking-wider">Title (AR)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#7a779a] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((slider) => (
              <tr key={slider._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-6 py-4"><GripVertical className="w-4 h-4 text-[#7a779a]" />{slider.order}</td>
                <td className="px-6 py-4">
                  <div className="w-16 h-10 rounded-lg bg-white/[0.05] overflow-hidden">
                    {slider.image && <img src={slider.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{slider.titleEn}</td>
                <td className="px-6 py-4 text-sm font-ar text-right" dir="rtl">{slider.titleAr}</td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleActive(slider)} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${slider.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {slider.isActive ? <><Eye className="w-3 h-3" /> Active</> : <><EyeOff className="w-3 h-3" /> Hidden</>}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(slider)} className="p-2 rounded-lg hover:bg-white/[0.05] transition-all"><Pencil className="w-4 h-4 text-[#b8b5d0]" /></button>
                    <button onClick={() => handleDelete(slider._id!)} className="p-2 rounded-lg hover:bg-red-500/10 transition-all"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {sliders.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-[#7a779a]">No sliders yet. Click &quot;Add Slider&quot; to create one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-0 sm:p-4">
          <div className="bg-[#141043] border border-white/[0.08] sm:rounded-2xl w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">{editing ? 'Edit Slider' : 'Add Slider'}</h2>
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
                  <label className="block text-sm text-[#b8b5d0] mb-2">Subtitle (English)</label>
                  <input value={form.subtitleEn} onChange={e => setForm({...form, subtitleEn: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Subtitle (Arabic)</label>
                  <input value={form.subtitleAr} onChange={e => setForm({...form, subtitleAr: e.target.value})} dir="rtl" className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none font-ar" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#b8b5d0] mb-2">Image URL</label>
                <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} required placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Link (optional)</label>
                  <input value={form.link} onChange={e => setForm({...form, link: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[#b8b5d0] mb-2">Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-base focus:border-[#c4197d] outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-4 h-4 rounded accent-[#c4197d]" />
                <label className="text-sm text-[#b8b5d0]">Active (visible on website)</label>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-full border border-white/20 text-sm">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-full btn-gradient text-white font-semibold">{editing ? 'Update' : 'Create'} Slider</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
