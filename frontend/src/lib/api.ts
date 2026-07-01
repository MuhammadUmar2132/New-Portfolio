import axios from 'axios';
import { Project, CreateProjectDto } from '@/types/project';
import { Meeting, CreateMeetingDto } from '@/types/meeting';
import { Profile } from '@/types/profile';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Projects
export const getProjects = () => api.get<Project[]>('/projects').then((r) => r.data);
export const getProject = (id: string) => api.get<Project>(`/projects/${id}`).then((r) => r.data);
export const createProject = (data: CreateProjectDto) => api.post<Project>('/projects', data).then((r) => r.data);
export const updateProject = (id: string, data: Partial<CreateProjectDto>) => api.patch<Project>(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`).then((r) => r.data);

// Meetings
export const getMeetings = () => api.get<Meeting[]>('/meetings').then((r) => r.data);
export const createMeeting = (data: CreateMeetingDto) => api.post<Meeting>('/meetings', data).then((r) => r.data);
export const updateMeetingStatus = (id: string, status: Meeting['status']) =>
  api.patch<Meeting>(`/meetings/${id}/status`, { status }).then((r) => r.data);
export const deleteMeeting = (id: string) => api.delete(`/meetings/${id}`).then((r) => r.data);

// Auth
export const adminLogin = (password: string) =>
  api.post<{ access_token: string }>('/auth/login', { password }).then((r) => r.data);

// Profile
export const getProfile = () => api.get<Profile>('/profile').then((r) => r.data);
export const updateProfile = (data: Profile) => api.patch<Profile>('/profile', data).then((r) => r.data);

// Uploads
export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api
    .post<{ url: string }>('/uploads', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);
};
