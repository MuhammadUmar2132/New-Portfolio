import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

// SSR: auth cookie aur fresh project list chahiye
export const dynamic = 'force-dynamic';
import ProjectsClient from './ProjectsClient';
import type { Project } from '@/types/project';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getProjects(): Promise<Project[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) redirect('/admin/login');

  const res = await fetch(`${API}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) redirect('/admin/login');
  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <ProjectsClient initialProjects={projects} />
      </div>
    </div>
  );
}
