'use client';

import { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, Phone, Clock } from 'lucide-react';
import type { ContactMessage } from '@/types';

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/contact');
    const data = await res.json();
    setMessages(data);
  };

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead: true }) });
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (selected?._id === id) setSelected(null);
    fetchMessages();
  };

  const openMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.isRead) markRead(msg._id!);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Messages</h1>
      <div className="grid lg:grid-cols-[380px_1fr] gap-6">
        {/* Message List */}
        <div className="surface-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/[0.08]">
            <span className="text-sm text-[#7a779a]">{messages.filter(m => !m.isRead).length} unread</span>
          </div>
          <div className="max-h-[600px] overflow-y-auto divide-y divide-white/[0.04]">
            {messages.map((msg) => (
              <div key={msg._id} onClick={() => openMessage(msg)} className={`p-4 cursor-pointer hover:bg-white/[0.03] transition-all ${selected?._id === msg._id ? 'bg-white/[0.05]' : ''} ${!msg.isRead ? 'border-l-2 border-l-[#c4197d]' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {msg.isRead ? <MailOpen className="w-4 h-4 text-[#7a779a]" /> : <Mail className="w-4 h-4 text-[#c4197d]" />}
                    <span className={`text-sm ${!msg.isRead ? 'font-bold' : 'font-medium'}`}>{msg.name}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteMessage(msg._id!); }} className="p-1 hover:bg-red-500/10 rounded">
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
                <p className="text-xs text-[#7a779a] mt-1 line-clamp-1">{msg.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-[#7a779a] px-2 py-0.5 rounded bg-white/[0.04]">{msg.service}</span>
                  {msg.createdAt && <span className="text-[10px] text-[#7a779a]"><Clock className="w-2.5 h-2.5 inline mr-1" />{new Date(msg.createdAt).toLocaleDateString()}</span>}
                </div>
              </div>
            ))}
            {messages.length === 0 && <div className="p-8 text-center text-[#7a779a] text-sm">No messages yet.</div>}
          </div>
        </div>

        {/* Message Detail */}
        <div className="surface-card rounded-2xl p-8">
          {selected ? (
            <div>
              <h2 className="text-lg font-bold mb-1">{selected.name}</h2>
              <div className="flex items-center gap-4 text-sm text-[#7a779a] mb-6">
                <span>{selected.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{selected.phone}</span>
              </div>
              <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-[#c4197d]/10 text-[#e84393] text-xs font-medium">{selected.service}</span>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-6">
                <p className="text-[#b8b5d0] leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              {selected.createdAt && (
                <p className="text-xs text-[#7a779a] mt-4">Received: {new Date(selected.createdAt).toLocaleString()}</p>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[#7a779a]">
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
