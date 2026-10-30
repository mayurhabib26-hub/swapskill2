import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { SessionCard } from '../components/sessions/SessionCard';
import { PeerCard } from '../components/skills/PeerCard';
import {
  Coins,
  CalendarDays,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser, sessions, users, transactions } = useApp();

  // Find user's upcoming active sessions
  const activeSessions = sessions.filter(
    (s) =>
      (s.teacherId === currentUser.id || s.learnerId === currentUser.id) &&
      (s.status === 'accepted' || s.status === 'requested' || s.status === 'awaiting_confirmation')
  );

  // Recommended peers matching user's learning goals (e.g. Figma, Spanish)
  const recommendedPeers = users.filter(
    (u) =>
      u.id !== currentUser.id &&
      u.skillsTeaching.some(
        (st) =>
          st.category === 'UI/UX Design' ||
          st.category === 'Languages' ||
          st.category === 'Programming'
      )
  ).slice(0, 3);

  const firstName = currentUser.name.split(' ')[0];

  return (
    <AppShell pageTitle="Student Dashboard">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#063F83] via-[#082B50] to-[#1769AA] rounded-3xl p-6 sm:p-8 text-white shadow-elevated relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5E9DC]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#063F83] bg-[#C5E9DC] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Exchange Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {firstName}!
              </h1>
              <p className="text-white/80 text-sm mt-1 max-w-lg">
                Ready to learn something new today? You have {currentUser.creditsAvailable} available credits to request a 30-minute peer session.
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
              <Link
                to="/explore"
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#063F83] bg-[#C5E9DC] hover:bg-white shadow-sm transition-all flex items-center gap-2"
              >
                <span>Find a Peer Mentor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Available Credits */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Available Credits
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#EAF6F0] text-[#16845B] flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#063F83]">
                {currentUser.creditsAvailable}
              </span>
              <span className="text-xs text-[#64748B]">credits</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#F1F5F3] flex items-center justify-between text-[11px]">
              <span className="text-amber-700 font-medium">
                {currentUser.creditsHeld} held in escrow
              </span>
              <Link to="/credits" className="font-bold text-[#063F83] hover:underline">
                Wallet →
              </Link>
            </div>
          </div>

          {/* Card 2: Upcoming Sessions */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Upcoming Sessions
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#F0F5FA] text-[#063F83] flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#152238]">
                {activeSessions.length}
              </span>
              <span className="text-xs text-[#64748B]">scheduled</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#F1F5F3] flex items-center justify-between text-[11px]">
              <span className="text-[#16845B] font-medium">30m 1:1 format</span>
              <Link to="/sessions" className="font-bold text-[#063F83] hover:underline">
                View all →
              </Link>
            </div>
          </div>

          {/* Card 3: Skills I Teach */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Skills I Teach
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#EAF6F0] text-[#063F83] flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#152238]">
                {currentUser.skillsTeaching.length}
              </span>
              <span className="text-xs text-[#64748B]">offerings</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#F1F5F3] text-[11px] text-[#64748B] truncate">
              {currentUser.skillsTeaching.map((s) => s.skillName.split(' ')[0]).join(', ')}
            </div>
          </div>

          {/* Card 4: Learning Goals */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Skills I Want
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#152238]">
                {currentUser.skillsLearning.length}
              </span>
              <span className="text-xs text-[#64748B]">in progress</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#F1F5F3] text-[11px] text-[#64748B] truncate">
              {currentUser.skillsLearning.map((s) => s.skillName.split(' ')[0]).join(', ')}
            </div>
          </div>
        </div>

        {/* Section 1: Upcoming Scheduled Sessions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-extrabold text-[#152238]">
                Upcoming 30-Minute Sessions
              </h2>
              <p className="text-xs text-[#64748B]">
                Your confirmed lessons and pending requests requiring confirmation.
              </p>
            </div>
            <Link
              to="/sessions"
              className="text-xs font-bold text-[#063F83] hover:underline flex items-center gap-1"
            >
              <span>Manage Sessions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-[#E2EAE6] text-center">
              <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-base text-[#152238]">
                No upcoming sessions right now
              </h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1 mb-4">
                Explore student mentors in programming, design, and languages to schedule your next 30-minute lesson.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#063F83]"
              >
                <span>Browse Skills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Section 2: Recommended Peers for Your Learning Goals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-extrabold text-[#152238]">
                Recommended Student Mentors
              </h2>
              <p className="text-xs text-[#64748B]">
                Peers who teach skills matching your current learning targets.
              </p>
            </div>
            <Link
              to="/explore"
              className="text-xs font-bold text-[#063F83] hover:underline flex items-center gap-1"
            >
              <span>View All Peers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedPeers.map((peer) => (
              <PeerCard key={peer.id} peer={peer} />
            ))}
          </div>
        </div>

        {/* Section 3: Learning Activity & Credit Escrow Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Credit Escrow Explainer Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#16845B]" />
              <h3 className="font-heading font-bold text-base text-[#152238]">
                Escrow Credit Summary
              </h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#EAF6F0] border border-[#C5E9DC] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#063F83]">Available Balance</div>
                  <div className="text-[11px] text-[#64748B]">Ready to book sessions</div>
                </div>
                <span className="text-lg font-extrabold text-[#063F83]">
                  {currentUser.creditsAvailable}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-900">Held in Escrow</div>
                  <div className="text-[11px] text-amber-700">Reserved for accepted sessions</div>
                </div>
                <span className="text-lg font-extrabold text-amber-800">
                  {currentUser.creditsHeld}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E2EAE6] text-center">
              <Link
                to="/credits"
                className="text-xs font-bold text-[#063F83] hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Transaction History</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Activity Stream */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#063F83]" />
                <h3 className="font-heading font-bold text-base text-[#152238]">
                  Recent Activity Stream
                </h3>
              </div>
              <span className="text-xs text-[#64748B]">Live demo state</span>
            </div>

            <div className="space-y-4">
              {transactions.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-start justify-between p-3 rounded-xl bg-[#F7FAF8] border border-[#E2EAE6] text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        tx.type === 'starter'
                          ? 'bg-[#EAF6F0] text-[#16845B]'
                          : tx.type === 'held'
                          ? 'bg-amber-100 text-amber-800'
                          : tx.type === 'earned'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {tx.type === 'held' ? (
                        <Lock className="w-4 h-4" />
                      ) : tx.type === 'starter' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <Coins className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-[#152238]">{tx.description}</div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">{tx.date}</div>
                    </div>
                  </div>

                  <span
                    className={`font-mono font-bold text-sm ${
                      tx.amount > 0 ? 'text-[#16845B]' : 'text-amber-800'
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount} Credit
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
