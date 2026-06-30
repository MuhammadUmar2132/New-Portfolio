'use client';

import { useState, useTransition } from 'react';
import { CheckCircle, XCircle, Clock, Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import { updateMeetingStatus, deleteMeeting } from '../actions';
import type { Meeting } from '@/types/meeting';

const STATUS_COLORS: Record<Meeting['status'], string> = {
  pending: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  confirmed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
};

function StatusIcon({ status, size }: { status: Meeting['status']; size: number }) {
  if (status === 'confirmed') return <CheckCircle size={size} />;
  if (status === 'cancelled') return <XCircle size={size} />;
  return <Clock size={size} />;
}

export default function MeetingsClient({ initialMeetings }: { initialMeetings: Meeting[] }) {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [filter, setFilter] = useState<'all' | Meeting['status']>('all');
  const [isPending, startTransition] = useTransition();

  const handleStatus = (id: string, status: Meeting['status']) => {
    startTransition(async () => {
      const updated = await updateMeetingStatus(id, status);
      setMeetings((prev) => prev.map((m) => (m._id === id ? updated : m)));
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this meeting?')) return;
    startTransition(async () => {
      await deleteMeeting(id);
      setMeetings((prev) => prev.filter((m) => m._id !== id));
    });
  };

  const filtered = filter === 'all' ? meetings : meetings.filter((m) => m.status === filter);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Meeting Requests</h1>
        <div className="flex gap-2">
          {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs capitalize transition-all ${
                filter === s
                  ? 'bg-cyan-500 text-black font-semibold'
                  : 'border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((m) => (
          <div key={m._id} className="p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-white/15 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-semibold">{m.name}</h3>
                  <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border capitalize ${STATUS_COLORS[m.status]}`}>
                    <StatusIcon status={m.status} size={11} /> {m.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1.5"><Mail size={13} /> {m.email}</span>
                  {m.phone && <span className="flex items-center gap-1.5"><Phone size={13} /> {m.phone}</span>}
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {m.date} at {m.time}</span>
                </div>

                {m.message && (
                  <p className="text-gray-400 text-sm leading-relaxed bg-white/3 rounded-lg p-3 border border-white/5">
                    {m.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {m.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatus(m._id, 'confirmed')}
                      disabled={isPending}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-colors disabled:opacity-40"
                    >
                      <CheckCircle size={13} /> Confirm
                    </button>
                    <button
                      onClick={() => handleStatus(m._id, 'cancelled')}
                      disabled={isPending}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-40"
                    >
                      <XCircle size={13} /> Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(m._id)}
                  disabled={isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-white/5 disabled:opacity-40"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600">
            No {filter !== 'all' ? filter : ''} meetings found.
          </div>
        )}
      </div>
    </>
  );
}
