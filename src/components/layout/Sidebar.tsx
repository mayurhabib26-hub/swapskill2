import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  CalendarDays,
  MessageSquare,
  User,
  Wallet,
  Settings,
  ShieldAlert,
  Coins,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const { currentUser, sessions, conversations, switchUserRole } = useApp();

  // Calculate unread / pending badges
  const pendingRequestsCount = sessions.filter(
    (s) => s.status === 'requested' && s.teacherId === currentUser.id
  ).length;

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const mainNavItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Explore Skills', to: '/explore', icon: Compass },
    {
      label: 'My Sessions',
      to: '/sessions',
      icon: CalendarDays,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    {
      label: 'Messages',
      to: '/messages',
      icon: MessageSquare,
      badge: totalUnreadMessages > 0 ? totalUnreadMessages : undefined,
    },
    { label: 'Credits & Wallet', to: '/credits', icon: Wallet },
    { label: 'My Profile', to: '/profile', icon: User },
    { label: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E2EAE6] flex flex-col justify-between h-full select-none">
      {/* Top Section: Logo & Quick Wallet Pill */}
      <div>
        <div className="h-18 px-6 py-4 border-b border-[#E2EAE6] flex items-center justify-between">
          <Logo size="sm" to="/dashboard" />
        </div>

        {/* Credit Balance Snapshot Widget */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-[#EAF6F0] border border-[#C5E9DC]">
          <div className="flex items-center justify-between text-xs text-[#063F83]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Your Wallet</span>
            <span className="flex items-center gap-1 font-bold">
              <Coins className="w-3.5 h-3.5 text-[#16845B]" />
              {currentUser.creditsAvailable} Available
            </span>
          </div>
          {currentUser.creditsHeld > 0 && (
            <div className="mt-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg flex items-center justify-between">
              <span>Held in escrow:</span>
              <span className="font-bold">{currentUser.creditsHeld} credit</span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onItemClick}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#063F83] text-white shadow-sm'
                      : 'text-[#152238] hover:bg-[#F7FAF8] hover:text-[#063F83]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#16845B] text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Admin Mode & User Card */}
      <div className="p-3 border-t border-[#E2EAE6] space-y-3">
        {/* Admin Link for Demo */}
        <NavLink
          to="/admin"
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              isActive
                ? 'bg-purple-800 text-white border-purple-800'
                : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
            }`
          }
        >
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-purple-600" />
            <span>Admin Dashboard</span>
          </div>
          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-200 text-purple-800 font-mono">
            Demo
          </span>
        </NavLink>

        {/* User Profile Mini Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#F7FAF8] border border-[#E2EAE6]">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#063F83]"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#152238] truncate">{currentUser.name}</div>
              <div className="text-[10px] text-[#64748B] truncate">{currentUser.major}</div>
            </div>
          </div>
          <button
            onClick={() => switchUserRole(currentUser.role === 'admin' ? 'student' : 'admin')}
            title="Toggle between demo student / admin roles"
            className="text-[10px] font-bold text-[#063F83] hover:underline px-1.5 py-1"
          >
            Switch
          </button>
        </div>
      </div>
    </aside>
  );
};
