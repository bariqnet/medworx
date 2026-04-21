'use client';

import { useState, useEffect } from 'react';
import { Image, FileText, Calendar, MessageSquare } from 'lucide-react';

interface DashboardStats {
  sliders: number;
  blogs: number;
  pendingBookings: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ sliders: 0, blogs: 0, pendingBookings: 0, unreadMessages: 0 });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  const cards = [
    { label: 'Active Sliders', value: stats.sliders, icon: Image, color: 'from-purple-600 to-blue-600' },
    { label: 'Published Blogs', value: stats.blogs, icon: FileText, color: 'from-[#c4197d] to-[#e84393]' },
    { label: 'Pending Bookings', value: stats.pendingBookings, icon: Calendar, color: 'from-amber-500 to-orange-500' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: MessageSquare, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="surface-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-extrabold">{card.value}</span>
              </div>
              <p className="text-sm text-[#7a779a]">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="surface-card rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/sliders" className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-center transition-all">
            <Image className="w-6 h-6 mx-auto mb-2 text-[#c4197d]" />
            <span className="text-sm">Manage Sliders</span>
          </a>
          <a href="/admin/blogs" className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-center transition-all">
            <FileText className="w-6 h-6 mx-auto mb-2 text-[#c4197d]" />
            <span className="text-sm">Write Blog</span>
          </a>
          <a href="/admin/calendar" className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-center transition-all">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-[#c4197d]" />
            <span className="text-sm">View Calendar</span>
          </a>
          <a href="/admin/messages" className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-center transition-all">
            <MessageSquare className="w-6 h-6 mx-auto mb-2 text-[#c4197d]" />
            <span className="text-sm">Read Messages</span>
          </a>
        </div>
      </div>
    </div>
  );
}
