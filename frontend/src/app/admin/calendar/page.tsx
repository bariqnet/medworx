'use client';

import { useState, useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Check, X, Clock, ChevronDown } from 'lucide-react';
import type { Booking, MeetingRoom } from '@/types';

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch('/api/rooms');
    const data = await res.json();
    setRooms(data);
  };

  const fetchBookings = async () => {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    setBookings(data);
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
    setSelectedBooking(null);
  };

  const calendarEvents = useMemo(() => {
    return bookings
      .filter(b => selectedRoom === 'all' || b.roomId === selectedRoom)
      .map(b => {
        const room = rooms.find(r => r._id === b.roomId);
        return {
          id: b._id,
          title: `${b.customerName} - ${room?.nameEn || 'Room'}`,
          start: new Date(`${b.date}T${b.startTime}`),
          end: new Date(`${b.date}T${b.endTime}`),
          resource: b,
        };
      });
  }, [bookings, rooms, selectedRoom]);

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    cancelled: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Meeting Room Calendar</h1>
          {pendingBookings.length > 0 && (
            <p className="text-sm text-amber-400 mt-1">{pendingBookings.length} pending booking(s) awaiting approval</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Room Filter */}
          <div className="relative">
            <select
              value={selectedRoom}
              onChange={e => setSelectedRoom(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#c4197d] outline-none"
            >
              <option value="all">All Rooms</option>
              {rooms.map(r => (
                <option key={r._id} value={r._id}>{r.nameEn}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a779a] pointer-events-none" />
          </div>
          {/* View Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-white/[0.08]">
            <button onClick={() => setView('calendar')} className={`px-4 py-2 text-sm ${view === 'calendar' ? 'btn-gradient text-white' : 'text-[#7a779a]'}`}>Calendar</button>
            <button onClick={() => setView('list')} className={`px-4 py-2 text-sm ${view === 'list' ? 'btn-gradient text-white' : 'text-[#7a779a]'}`}>List</button>
          </div>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="surface-card rounded-2xl p-6" style={{ height: 650 }}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.WEEK}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            onSelectEvent={(event: any) => setSelectedBooking(event.resource)}
            eventPropGetter={(event: any) => ({
              style: {
                backgroundColor: event.resource.status === 'approved' ? '#059669' : event.resource.status === 'pending' ? '#d97706' : '#dc2626',
                border: 'none',
                borderRadius: '4px',
              }
            })}
          />
        </div>
      ) : (
        <div className="surface-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase">Room</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase">Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#7a779a] uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#7a779a] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.filter(b => selectedRoom === 'all' || b.roomId === selectedRoom).map((booking) => {
                const room = rooms.find(r => r._id === booking.roomId);
                return (
                  <tr key={booking._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{booking.customerName}</div>
                      <div className="text-xs text-[#7a779a]">{booking.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">{room?.nameEn || '-'}</td>
                    <td className="px-6 py-4 text-sm">{booking.date}</td>
                    <td className="px-6 py-4 text-sm">{booking.startTime} - {booking.endTime}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[booking.status]}`}>
                        {booking.status === 'pending' && <Clock className="w-3 h-3" />}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {booking.status === 'pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => updateBookingStatus(booking._id!, 'approved')} className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-all" title="Approve">
                            <Check className="w-4 h-4 text-emerald-400" />
                          </button>
                          <button onClick={() => updateBookingStatus(booking._id!, 'rejected')} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all" title="Reject">
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-[#141043] border border-white/[0.08] rounded-2xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">Booking Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-[#7a779a]">Customer</span><p className="font-medium">{selectedBooking.customerName}</p></div>
                <div><span className="text-xs text-[#7a779a]">Email</span><p className="font-medium">{selectedBooking.customerEmail}</p></div>
                <div><span className="text-xs text-[#7a779a]">Phone</span><p className="font-medium">{selectedBooking.customerPhone}</p></div>
                <div><span className="text-xs text-[#7a779a]">Company</span><p className="font-medium">{selectedBooking.company || '-'}</p></div>
                <div><span className="text-xs text-[#7a779a]">Date</span><p className="font-medium">{selectedBooking.date}</p></div>
                <div><span className="text-xs text-[#7a779a]">Time</span><p className="font-medium">{selectedBooking.startTime} - {selectedBooking.endTime}</p></div>
              </div>
              {selectedBooking.purpose && (
                <div><span className="text-xs text-[#7a779a]">Purpose</span><p className="text-sm mt-1">{selectedBooking.purpose}</p></div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[selectedBooking.status]}`}>{selectedBooking.status}</span>
              </div>
              {selectedBooking.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <button onClick={() => updateBookingStatus(selectedBooking._id!, 'approved')} className="flex-1 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all">Approve</button>
                  <button onClick={() => updateBookingStatus(selectedBooking._id!, 'rejected')} className="flex-1 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all">Reject</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
