import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { SessionCard } from '../components/sessions/SessionCard';
import {
  Calendar,
  Clock,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SessionsPage: React.FC = () => {
  const { sessions, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<
    'upcoming' | 'pending' | 'awaiting' | 'completed' | 'cancelled'
  >('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sessions involving current user
  const userSessions = sessions.filter(
    (s) => s.teacherId === currentUser.id || s.learnerId === currentUser.id
  );

  // Group by tab criteria
  const upcomingList = userSessions.filter((s) => s.status === 'accepted');
  const pendingList = userSessions.filter((s) => s.status === 'requested');
  const awaitingList = userSessions.filter((s) => s.status === 'awaiting_confirmation');
  const completedList = userSessions.filter((s) => s.status === 'settled');
  const cancelledList = userSessions.filter(
    (s) => s.status === 'cancelled' || s.status === 'declined'
  );

  const getActiveList = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingList;
      case 'pending':
        return pendingList;
      case 'awaiting':
        return awaitingList;
      case 'completed':
        return completedList;
      case 'cancelled':
        return cancelledList;
      default:
        return upcomingList;
    }
  };

  const currentList = getActiveList().filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.skillName.toLowerCase().includes(q) ||
      s.teacherName.toLowerCase().includes(q) ||
      s.learnerName.toLowerCase().includes(q)
    );
  });

  return (
    <AppShell pageTitle="My Sessions">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#063F83] bg-[#EAF6F0] border border-[#C5E9DC] mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#16845B]" />
              <span>Session Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152238] tracking-tight">
              30-Minute Learning Sessions
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Track your upcoming peer mentorships, approve requests, and release held credits upon mutual confirmation.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all flex-shrink-0"
          >
            <span>Book New Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Controls & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#E2EAE6] shadow-sm overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'upcoming'
                  ? 'bg-[#063F83] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#152238]'
              }`}
            >
              <span>Upcoming</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === 'upcoming' ? 'bg-white/20 text-white' : 'bg-[#EAF6F0] text-[#063F83]'
                }`}
              >
                {upcomingList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'pending'
                  ? 'bg-[#063F83] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#152238]'
              }`}
            >
              <span>Pending Requests</span>
              {pendingList.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-white">
                  {pendingList.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('awaiting')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'awaiting'
                  ? 'bg-[#063F83] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#152238]'
              }`}
            >
              <span>Awaiting Confirmation</span>
              {awaitingList.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-600 text-white animate-pulse">
                  {awaitingList.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'completed'
                  ? 'bg-[#063F83] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#152238]'
              }`}
            >
              Completed ({completedList.length})
            </button>

            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'cancelled'
                  ? 'bg-[#063F83] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#152238]'
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2EAE6] bg-white text-xs text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
            />
          </div>
        </div>

        {/* Sessions Grid / List */}
        {currentList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentList.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-[#E2EAE6] text-center shadow-sm">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-base text-[#152238]">
              No sessions in this section
            </h3>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1 mb-6">
              {activeTab === 'pending'
                ? 'No incoming booking requests require your review right now.'
                : activeTab === 'awaiting'
                ? 'No sessions are currently waiting for mutual completion confirmation.'
                : 'Browse our peer directory to request or schedule your next skill swap.'}
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
            >
              <span>Explore Student Mentors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
};
