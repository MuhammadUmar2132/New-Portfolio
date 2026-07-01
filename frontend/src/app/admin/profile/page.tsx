import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProfileClient from './ProfileClient';
import type { Profile } from '@/types/profile';

export const dynamic = 'force-dynamic';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getProfile(): Promise<Profile> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const res = await fetch(`${API}/profile`, { cache: 'no-store' });
  if (!res.ok) return { avatarUrl: undefined };
  return res.json();
}

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <ProfileClient initialProfile={profile} />
      </div>
    </div>
  );
}
