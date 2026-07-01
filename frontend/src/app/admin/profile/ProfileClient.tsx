'use client';

import { useState, useTransition } from 'react';
import { Upload, Check, User, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { uploadImage, updateProfile } from '../actions';
import type { Profile } from '@/types/profile';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const imageSrc = (url: string) => (url.startsWith('http') ? url : `${API}${url}`);

const DEFAULT_STATS = [
  { value: '10+', label: 'Projects Completed' },
  { value: '2+', label: 'Years Experience' },
  { value: '15+', label: 'Technologies' },
  { value: '∞', label: 'Cups of Coffee' },
];

export default function ProfileClient({ initialProfile }: { initialProfile: Profile }) {
  const [profile, setProfile] = useState<Profile>({
    ...initialProfile,
    stats: initialProfile.stats?.length ? initialProfile.stats : DEFAULT_STATS,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAvatarSelect = async (file: File | undefined) => {
    if (!file) return;
    setSaved(false);
    setError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadImage(formData);
      setProfile((p) => ({ ...p, avatarUrl: url }));
    } catch {
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const updateStat = (index: number, field: 'value' | 'label', text: string) => {
    setProfile((p) => ({
      ...p,
      stats: (p.stats ?? DEFAULT_STATS).map((s, i) => (i === index ? { ...s, [field]: text } : s)),
    }));
  };

  const incrementStat = (index: number) => {
    setProfile((p) => ({
      ...p,
      stats: (p.stats ?? DEFAULT_STATS).map((s, i) => {
        if (i !== index) return s;
        const match = s.value.match(/^(\d+)(.*)$/);
        if (!match) return s;
        const [, digits, suffix] = match;
        return { ...s, value: `${Number(digits) + 1}${suffix}` };
      }),
    }));
  };

  const handleSave = () => {
    setError(null);
    startTransition(async () => {
      try {
        const updated = await updateProfile(profile);
        setProfile(updated);
        setSaved(true);
        toast.success('Profile saved');
      } catch {
        setError('Failed to save profile. Please try again.');
        toast.error('Failed to save profile. Please try again.');
      }
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Profile</h1>

      <div className="max-w-lg p-6 rounded-xl bg-white/3 border border-white/8">
        <p className="text-sm text-gray-400 mb-4">
          This avatar appears in the Hero section on your public portfolio.
        </p>

        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
            {profile.avatarUrl ? (
              <img src={imageSrc(profile.avatarUrl)} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={28} className="text-gray-600" />
            )}
          </div>

          <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 cursor-pointer hover:border-cyan-500/50 transition-colors">
            <Upload size={15} />
            {isUploading ? 'Uploading...' : 'Choose image'}
            <input
              type="file" accept="image/*" className="hidden"
              onChange={(e) => handleAvatarSelect(e.target.files?.[0])}
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="border-t border-white/8 pt-6 mb-6">
          <p className="text-sm text-gray-400 mb-4">
            These stats appear in the About section on your public portfolio.
          </p>
          <div className="space-y-3">
            {(profile.stats ?? DEFAULT_STATS).map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex items-center gap-1.5">
                  <input
                    type="text" placeholder="Value (e.g. 10+)" value={s.value}
                    onChange={(e) => updateStat(i, 'value', e.target.value)}
                    className="w-24 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => incrementStat(i)}
                    title="Increment by 1"
                    className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors shrink-0"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <input
                  type="text" placeholder="Label (e.g. Projects Completed)" value={s.label}
                  onChange={(e) => updateStat(i, 'label', e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          onClick={handleSave}
          disabled={isPending || isUploading}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isPending ? (
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <Check size={16} /> {saved ? 'Saved' : 'Save Profile'}
            </>
          )}
        </button>
      </div>
    </>
  );
}
