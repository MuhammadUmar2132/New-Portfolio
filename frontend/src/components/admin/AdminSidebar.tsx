'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Layers, Calendar, User, LogOut } from 'lucide-react';
import { logout } from '@/app/admin/actions';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: Layers },
  { href: '/admin/meetings', label: 'Meetings', icon: Calendar },
  { href: '/admin/profile', label: 'Profile', icon: User },
];

export default function AdminSidebar({ pendingCount = 0 }: { pendingCount?: number }) {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-[#0d0d0d] border-r border-white/8 flex flex-col p-6 z-40">
      <div className="mb-10">
        <span className="text-lg font-bold">
          <span className="text-cyan-400">{'<'}</span>Admin<span className="text-cyan-400">{'/>'}</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-cyan-500/10 text-cyan-400 font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
              {label === 'Meetings' && pendingCount > 0 && (
                <span className="ml-auto text-xs bg-cyan-500 text-black px-1.5 py-0.5 rounded-full font-bold">
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 pt-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          ← View Portfolio
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-red-400 text-sm transition-colors w-full"
          >
            <LogOut size={14} /> Logout
          </button>
        </form>
      </div>
    </div>
  );
}
