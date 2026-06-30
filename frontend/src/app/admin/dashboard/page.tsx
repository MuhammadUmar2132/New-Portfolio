import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// SSR: har request pe fresh data chahiye (auth + live stats)
export const dynamic = 'force-dynamic';
import { Layers, Calendar, Plus } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import type { Meeting } from '@/types/meeting';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getStats() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const headers: HeadersInit = { Authorization: `Bearer ${token}` };
  const [projectsRes, meetingsRes] = await Promise.all([
    fetch(`${API}/projects`, { headers, cache: 'no-store' }),
    fetch(`${API}/meetings`, { headers, cache: 'no-store' }),
  ]);

  if (!projectsRes.ok || !meetingsRes.ok) redirect('/admin/login');

  const projects = await projectsRes.json();
  const meetings: Meeting[] = await meetingsRes.json();

  return {
    projects: projects.length,
    meetings: meetings.length,
    pending: meetings.filter((m) => m.status === 'pending').length,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminSidebar pendingCount={stats.pending} />

      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Projects', value: stats.projects, color: 'text-cyan-400' },
            { label: 'Total Meetings', value: stats.meetings, color: 'text-purple-400' },
            { label: 'Pending Meetings', value: stats.pending, color: 'text-amber-400' },
          ].map((s) => (
            <div key={s.label} className="p-6 rounded-2xl bg-white/3 border border-white/8">
              <p className="text-gray-500 text-sm">{s.label}</p>
              <p className={`text-4xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Link
            href="/admin/projects"
            className="flex items-center gap-4 p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-cyan-500/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
              <Plus className="text-cyan-400" size={22} />
            </div>
            <div>
              <p className="text-white font-semibold">Manage Projects</p>
              <p className="text-gray-500 text-sm">Add, edit or delete projects</p>
            </div>
          </Link>

          <Link
            href="/admin/meetings"
            className="flex items-center gap-4 p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-purple-500/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center group-hover:bg-purple-400/20 transition-colors">
              <Calendar className="text-purple-400" size={22} />
            </div>
            <div>
              <p className="text-white font-semibold">View Meetings</p>
              <p className="text-gray-500 text-sm">
                {stats.pending > 0 ? `${stats.pending} pending requests` : 'Manage meeting requests'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
