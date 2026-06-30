import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

// SSR: auth cookie aur fresh meetings chahiye
export const dynamic = 'force-dynamic';
import MeetingsClient from './MeetingsClient';
import type { Meeting } from '@/types/meeting';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getMeetings(): Promise<Meeting[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const res = await fetch(`${API}/meetings`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) redirect('/admin/login');
  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();
  const pending = meetings.filter((m) => m.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminSidebar pendingCount={pending} />
      <div className="ml-64 p-8">
        <MeetingsClient initialMeetings={meetings} />
      </div>
    </div>
  );
}
