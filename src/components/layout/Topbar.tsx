import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Coins,
  Menu,
  Shield,
  User,
  LogOut,
  ChevronDown,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface TopbarProps {
  onOpenMobileNav: () => void;
  pageTitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileNav, pageTitle }) => {
  const { currentUser, sessions, switchUserRole, addToast } = useApp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    addToast('Logged out of demo session', 'Redirecting to home page...', 'info');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2EAE6] h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left: Mobile menu button & page title / search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-[#063F83] hover:bg-[#F7FAF8] focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {pageTitle && (
          <h1 className="text-base sm:text-lg font-bold text-[#152238] font-heading hidden sm:block truncate mr-4">
            {pageTitle}
          </h1>
        )}

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-xs sm:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, peers, Java, Figma..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-xs sm:text-sm text-[#152238] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83] transition-all"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Role Demo Pill */}
        <button
          onClick={() => switchUserRole(currentUser.role === 'admin' ? 'student' : 'admin')}
          className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
            currentUser.role === 'admin'
              ? 'bg-purple-100 text-purple-800 border-purple-300'
              : 'bg-[#EAF6F0] text-[#063F83] border-[#C5E9DC]'
          }`}
          title="Click to toggle between Demo Student and Demo Admin mode"
        >
          <span className="text-[10px] text-slate-500 font-normal">Role:</span>
          <span className="font-bold uppercase text-[11px]">{currentUser.role}</span>
        </button>

        {/* Credit Balance Pill */}
        <Link
          to="/credits"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF6F0] border border-[#C5E9DC] text-xs font-bold text-[#063F83] hover:bg-[#C5E9DC]/60 transition-colors"
          title={`${currentUser.creditsAvailable} available credits, ${currentUser.creditsHeld} held in escrow`}
        >
          <Coins className="w-4 h-4 text-[#16845B]" />
          <span>{currentUser.creditsAvailable}</span>
          <span className="text-[11px] font-normal text-[#16845B] hidden md:inline">Credits</span>
          {currentUser.creditsHeld > 0 && (
            <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-mono">
              {currentUser.creditsHeld} held
            </span>
          )}
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-[#063F83] hover:bg-[#F7FAF8] relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16845B]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-[#E2EAE6] py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 pb-2 border-b border-[#E2EAE6] flex items-center justify-between">
                <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#152238]">
                  Notifications
                </span>
                <span className="text-[10px] font-bold text-[#16845B] bg-[#EAF6F0] px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-[#F1F5F3] max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-[#F7FAF8] transition-colors flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EAF6F0] text-[#16845B] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-[#152238]">Maya Lin accepted your session request</p>
                    <p className="text-[#64748B] text-[11px] mt-0.5">1 credit is securely placed in escrow.</p>
                    <span className="text-[10px] text-slate-400">10 mins ago</span>
                  </div>
                </div>

                <div className="p-3 hover:bg-[#F7FAF8] transition-colors flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#063F83]/10 text-[#063F83] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-[#152238]">Rohit Patel requested a session with you</p>
                    <p className="text-[#64748B] text-[11px] mt-0.5">Java & Data Structures (Binary Trees)</p>
                    <span className="text-[10px] text-slate-400">2 hrs ago</span>
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-[#E2EAE6] text-center">
                <Link
                  to="/sessions"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-bold text-[#063F83] hover:underline"
                >
                  View all sessions & requests
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#F7FAF8] transition-colors focus:outline-none"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#063F83]/20"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-[#E2EAE6] py-2 z-50">
              <div className="px-4 py-2 border-b border-[#E2EAE6]">
                <div className="text-xs font-bold text-[#152238]">{currentUser.name}</div>
                <div className="text-[11px] text-[#64748B]">{currentUser.email}</div>
              </div>

              <Link
                to="/profile"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#152238] hover:bg-[#EAF6F0] hover:text-[#063F83] transition-colors"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Link>

              <Link
                to="/admin"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-purple-900 hover:bg-purple-50 transition-colors"
              >
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Demo Admin Dashboard</span>
              </Link>

              <div className="border-t border-[#E2EAE6] my-1" />

              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
