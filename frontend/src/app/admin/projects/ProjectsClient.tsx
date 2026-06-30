'use client';

import { useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { createProject, updateProject, deleteProject } from '../actions';
import type { Project, CreateProjectDto } from '@/types/project';

const CATEGORIES: Project['category'][] = ['fullstack', 'frontend', 'backend', 'mobile', 'other'];

const emptyForm: CreateProjectDto = {
  title: '', description: '', longDescription: '', techStack: [],
  githubUrl: '', liveUrl: '', imageUrl: '', category: 'fullstack', featured: false, order: 0,
};

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateProjectDto>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState('');
  const [isPending, startTransition] = useTransition();

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (p: Project) => {
    setForm({
      title: p.title, description: p.description, longDescription: p.longDescription ?? '',
      techStack: p.techStack, githubUrl: p.githubUrl ?? '', liveUrl: p.liveUrl ?? '',
      imageUrl: p.imageUrl ?? '', category: p.category, featured: p.featured, order: p.order,
    });
    setEditId(p._id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.description) return;
    startTransition(async () => {
      if (editId) {
        const updated = await updateProject(editId, form);
        setProjects((prev) => prev.map((p) => (p._id === editId ? updated : p)));
      } else {
        const created = await createProject(form);
        setProjects((prev) => [...prev, created]);
      }
      setShowForm(false);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this project?')) return;
    startTransition(async () => {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    });
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) {
      setForm((f) => ({ ...f, techStack: [...f.techStack, t] }));
    }
    setTechInput('');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors text-sm"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p._id} className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 transition-all">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-white font-semibold">{p.title}</span>
                {p.featured && (
                  <span className="text-xs px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">Featured</span>
                )}
              </div>
              <p className="text-gray-500 text-sm truncate">{p.description}</p>
              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                {p.techStack.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs px-1.5 py-0.5 bg-white/5 text-gray-400 rounded">{t}</span>
                ))}
                {p.techStack.length > 4 && (
                  <span className="text-xs text-gray-500">+{p.techStack.length - 4}</span>
                )}
              </div>
            </div>
            <span className="text-xs text-purple-400 capitalize">{p.category}</span>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(p)}
                className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                disabled={isPending}
                className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-20 text-gray-600">No projects yet. Add your first one!</div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editId ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text" placeholder="Project Title *"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
              />
              <textarea
                placeholder="Short Description *" rows={2}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none resize-none"
              />
              <textarea
                placeholder="Long Description (optional)" rows={3}
                value={form.longDescription}
                onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none resize-none"
              />

              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text" placeholder="Add technology (press Enter)"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
                  />
                  <button
                    onClick={addTech}
                    className="px-4 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.techStack.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 text-gray-300 text-xs rounded border border-white/10">
                      {t}
                      <button
                        onClick={() => setForm((f) => ({ ...f, techStack: f.techStack.filter((x) => x !== t) }))}
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="url" placeholder="GitHub URL" value={form.githubUrl}
                  onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
                />
                <input type="url" placeholder="Live URL" value={form.liveUrl}
                  onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
                />
              </div>

              <input type="url" placeholder="Image URL (optional)" value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Project['category'] }))}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-500/50 focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-[#0d0d0d]">{c}</option>
                  ))}
                </select>
                <input type="number" placeholder="Order (0, 1, 2...)" value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${form.featured ? 'bg-cyan-500' : 'bg-white/10'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${form.featured ? 'left-5' : 'left-0.5'}`} />
                </div>
                <span className="text-gray-300 text-sm">Featured Project</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border border-white/10 text-gray-400 rounded-lg hover:bg-white/5 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isPending
                    ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    : <><Check size={16} /> Save</>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
