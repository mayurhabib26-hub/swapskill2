import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Users,
  Coins,
  CalendarDays,
  Lock,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { users, sessions, transactions, disputes, resolveDispute, switchUserRole } = useApp();

  const [activeTab, setActiveTab] = useState<'disputes' | 'users' | 'sessions'>('disputes');
  const [userSearch, setUserSearch] = useState('');

  // Overview Metrics
  const totalUsersCount = users.length;
  const activeSessionsCount = sessions.filter(
    (s) => s.status === 'accepted' || s.status === 'requested' || s.status === 'awaiting_confirmation'
  ).length;
  const totalCreditsInCirculation = users.reduce((acc, u) => acc + u.creditsAvailable + u.creditsHeld, 0);
  const totalHeldInEscrow = sessions.filter((s) => s.creditHeld).length;

  const filteredUsers = users.filter((u) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.major.toLowerCase().includes(q) || u.university.toLowerCase().includes(q);
  });

  return (
    <AppShell pageTitle="Admin Dashboard">
      <div className="space-y-8">
        {/* Admin Header Banner */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-[#082B50] rounded-3xl p-6 sm:p-8 text-white shadow-elevated relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-purple-200 bg-purple-800/60 border border-purple-500/40 mb-3">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
                <span>Demo Admin Monitor</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Platform Administration & Disputes
              </h1>
              <p className="text-white/80 text-sm mt-1 max-w-xl leading-relaxed">
                Supervise college peer skill swaps, audit credit reserves held in escrow, and resolve student attendance disputes.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => switchUserRole('student')}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-purple-950 hover:bg-purple-100 transition-colors"
              >
                Return to Student View
              </button>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Total Students
              </span>
              <Users className="w-4 h-4 text-[#063F83]" />
            </div>
            <div className="text-3xl font-extrabold text-[#152238] mt-2">
              {totalUsersCount}
            </div>
            <p className="text-xs text-[#16845B] mt-2 font-medium">All verified campus accounts</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Active Sessions
              </span>
              <CalendarDays className="w-4 h-4 text-[#16845B]" />
            </div>
            <div className="text-3xl font-extrabold text-[#152238] mt-2">
              {activeSessionsCount}
            </div>
            <p className="text-xs text-[#64748B] mt-2">Scheduled or awaiting review</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Credits in Circulation
              </span>
              <Coins className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-[#063F83] mt-2">
              {totalCreditsInCirculation}
            </div>
            <p className="text-xs text-[#64748B] mt-2">Total platform credits</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-card bg-purple-50/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
                Escrowed Credits
              </span>
              <Lock className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-3xl font-extrabold text-purple-800 mt-2">
              {totalHeldInEscrow}
            </div>
            <p className="text-xs text-purple-700 mt-2">Held pending mutual completion</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2EAE6] pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('disputes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'disputes'
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#152238] hover:bg-slate-100'
                }`}
              >
                Disputes & Reports ({disputes.filter((d) => d.status !== 'resolved').length})
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'users'
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#152238] hover:bg-slate-100'
                }`}
              >
                Student Directory ({users.length})
              </button>

              <button
                onClick={() => setActiveTab('sessions')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'sessions'
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#152238] hover:bg-slate-100'
                }`}
              >
                All Platform Sessions ({sessions.length})
              </button>
            </div>
          </div>

          {/* TAB 1: DISPUTES & REPORTS */}
          {activeTab === 'disputes' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-bold text-base text-[#152238]">
                  Student Dispute Resolution
                </h3>
                <p className="text-xs text-[#64748B]">
                  Review reported no-shows, unconfirmed completions, or misconduct.
                </p>
              </div>

              <div className="space-y-3">
                {disputes.map((disp) => (
                  <div
                    key={disp.id}
                    className="p-5 rounded-2xl bg-[#F7FAF8] border border-[#E2EAE6] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span className="font-heading font-bold text-sm text-[#152238]">
                          {disp.reason}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          disp.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : disp.status === 'dismissed'
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {disp.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {disp.details}
                    </p>

                    <div className="text-[11px] text-[#64748B] flex flex-wrap gap-4 pt-1">
                      <span>Reporter: <strong className="text-[#152238]">{disp.reporterName}</strong></span>
                      <span>Reported: <strong className="text-[#152238]">{disp.reportedUserName}</strong></span>
                      <span>Filed: {disp.date}</span>
                    </div>

                    {disp.status !== 'resolved' && disp.status !== 'dismissed' && (
                      <div className="pt-3 border-t border-[#E2EAE6] flex items-center justify-end gap-2">
                        <button
                          onClick={() => resolveDispute(disp.id, 'dismiss')}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          Dismiss
                        </button>
                        <button
                          onClick={() => resolveDispute(disp.id, 'refund')}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 transition-colors"
                        >
                          Refund Credit from Escrow
                        </button>
                        <button
                          onClick={() => resolveDispute(disp.id, 'resolve')}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-900 hover:bg-purple-950 transition-colors"
                        >
                          Mark as Resolved
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: USER DIRECTORY */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative max-w-sm w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search by student name or major..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2EAE6] text-xs text-[#152238]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E2EAE6] text-[#64748B] uppercase tracking-wider font-semibold">
                      <th className="pb-3 pl-2">Student</th>
                      <th className="pb-3">University & Major</th>
                      <th className="pb-3">Credits</th>
                      <th className="pb-3">Rating</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F3]">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#F7FAF8]">
                        <td className="py-3 pl-2 flex items-center gap-2.5">
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="font-bold text-[#152238]">{u.name}</div>
                            <div className="text-[10px] text-[#64748B]">{u.email}</div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="font-medium text-[#152238]">{u.major}</div>
                          <div className="text-[10px] text-[#64748B]">{u.university}</div>
                        </td>
                        <td className="py-3 font-mono font-bold text-[#063F83]">
                          {u.creditsAvailable} avail / {u.creditsHeld} held
                        </td>
                        <td className="py-3 font-bold text-amber-600">
                          ★ {u.rating} ({u.reviewCount})
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16845B] bg-[#EAF6F0] px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ALL SESSIONS */}
          {activeTab === 'sessions' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2EAE6] text-[#64748B] uppercase tracking-wider font-semibold">
                    <th className="pb-3 pl-2">Topic</th>
                    <th className="pb-3">Teacher</th>
                    <th className="pb-3">Learner</th>
                    <th className="pb-3">Schedule</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F3]">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-[#F7FAF8]">
                      <td className="py-3 pl-2 font-bold text-[#152238]">
                        {s.skillName}
                        <span className="block text-[10px] text-[#64748B] font-normal">{s.skillCategory}</span>
                      </td>
                      <td className="py-3">{s.teacherName}</td>
                      <td className="py-3">{s.learnerName}</td>
                      <td className="py-3 font-mono text-slate-500">{s.scheduledDate}</td>
                      <td className="py-3">
                        <span className="capitalize text-xs font-semibold px-2 py-0.5 rounded bg-slate-100">
                          {s.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
