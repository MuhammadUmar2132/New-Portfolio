'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { CreateProjectDto } from '@/types/project';
import type { Meeting } from '@/types/meeting';
import type { Profile } from '@/types/profile';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function authFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
}

export async function login(password: string): Promise<{ error?: string }> {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) return { error: 'Invalid password. Please try again.' };
    const data: { access_token: string } = await res.json();
    const cookieStore = await cookies();
    cookieStore.set('admin_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return {};
  } catch {
    return { error: 'Server unreachable. Make sure backend is running.' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  redirect('/admin/login');
}

export async function createProject(data: CreateProjectDto) {
  const res = await authFetch('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create project');
  revalidatePath('/admin/projects');
  return res.json();
}

export async function updateProject(id: string, data: Partial<CreateProjectDto>) {
  const res = await authFetch(`/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update project');
  revalidatePath('/admin/projects');
  return res.json();
}

export async function deleteProject(id: string) {
  const res = await authFetch(`/projects/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete project');
  revalidatePath('/admin/projects');
}

export async function updateMeetingStatus(id: string, status: Meeting['status']) {
  const res = await authFetch(`/meetings/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update meeting');
  revalidatePath('/admin/meetings');
  return res.json();
}

export async function deleteMeeting(id: string) {
  const res = await authFetch(`/meetings/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete meeting');
  revalidatePath('/admin/meetings');
}

export async function uploadImage(formData: FormData): Promise<{ url: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const res = await fetch(`${API}/uploads`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return res.json();
}

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${API}/profile`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load profile');
  return res.json();
}

export async function updateProfile(data: Profile): Promise<Profile> {
  const res = await authFetch('/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  revalidatePath('/admin/profile');
  return res.json();
}
