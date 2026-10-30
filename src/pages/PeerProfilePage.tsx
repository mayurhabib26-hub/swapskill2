import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { BookingDialog } from '../components/sessions/BookingDialog';
import {
  Star,
  GraduationCap,
  Calendar,
  Clock,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const PeerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { users, reviews, startOrGetConversation } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'availability' | 'reviews'>('overview');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSkillToBook, setSelectedSkillToBook] = useState<string | undefined>(undefined);

  const peer = users.find((u) => u.id === id) || users[1]; // fallback to Maya Lin
  const peerReviews = reviews.filter((r) => r.recipientId === peer.id);

  const handleMessage = () => {
    const convId = startOrGetConversation(peer.id);
    navigate(`/messages?conv=${convId}`);
  };

  const handleBookWithSkill = (skillName: string) => {
    setSelectedSkillToBook(skillName);
    setBookingOpen(true);
  };

  return (
    <AppShell pageTitle={`${peer.name}'s Profile`}>
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063F83] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Skills</span>
        </Link>

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={peer.avatar}
                alt={peer.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-[#EAF6F0] shadow-sm flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152238] font-heading">
                    {peer.name}
                  </h1>
                  {peer.verifiedStudent && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#16845B] bg-[#EAF6F0] px-2.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Student</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>
                    {peer.major} ({peer.year || 'Student'}) · {peer.university}
                  </span>
                </p>

                <div className="flex items-center gap-4 mt-3 text-xs">
                  <div className="flex items-center gap-1 font-bold text-[#152238]">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{peer.rating}</span>
                    <span className="text-[#64748B] font-normal">({peer.reviewCount} student reviews)</span>
                  </div>
                  <span>·</span>
                  <div className="text-[#16845B] font-semibold">
                    {peer.skillsTeaching.reduce((acc, s) => acc + s.sessionCount, 0)} sessions completed
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleMessage}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#063F83] bg-[#EAF6F0] hover:bg-[#C5E9DC] border border-[#C5E9DC] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>

              <button
                onClick={() => {
                  setSelectedSkillToBook(undefined);
                  setBookingOpen(true);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm hover:shadow-card transition-all"
              >
                <span>Request 30m Session</span>
                <Sparkles className="w-4 h-4 text-[#C5E9DC]" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 pt-6 border-t border-[#E2EAE6] flex items-center gap-2 overflow-x-auto">
            {(
              [
                { id: 'overview', label: 'Overview & Bio' },
                { id: 'skills', label: 'Skills & Offerings' },
                { id: 'availability', label: 'Schedule Availability' },
                { id: 'reviews', label: `Reviews (${peerReviews.length})` },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === t.id
                    ? 'bg-[#063F83] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#152238] hover:bg-[#F7FAF8]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card">
                <h3 className="font-heading font-bold text-base text-[#152238] mb-3">About Me</h3>
                <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">
                  {peer.bio}
                </p>
              </div>

              {/* Languages Spoken */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card">
                <h3 className="font-heading font-bold text-base text-[#152238] mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {peer.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-[#F0F5FA] text-[#063F83] font-semibold text-xs border border-[#DDE9F4]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details: Portfolio & Escrow Notice */}
            <div className="space-y-6">
              {peer.portfolioLinks && peer.portfolioLinks.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card">
                  <h3 className="font-heading font-bold text-sm text-[#152238] mb-3">
                    Portfolio & Project Links
                  </h3>
                  <div className="space-y-2.5">
                    {peer.portfolioLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAF8] hover:bg-[#EAF6F0] text-xs font-semibold text-[#063F83] border border-[#E2EAE6] transition-colors"
                      >
                        <span>{link.title}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#EAF6F0] rounded-2xl p-5 border border-[#C5E9DC]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#063F83] mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#16845B]" />
                  <span>Escrow Guarantee</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Booking a 30m session holds 1 credit in escrow only when {peer.name} accepts. The credit is transferred once both participants confirm completion.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Skills & Offerings */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card">
              <h3 className="font-heading font-bold text-base text-[#152238] mb-4">
                Skills {peer.name} Can Teach
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {peer.skillsTeaching.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-5 rounded-2xl bg-[#F7FAF8] border border-[#E2EAE6] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#063F83] bg-[#EAF6F0] px-2.5 py-1 rounded-lg">
                          {skill.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#16845B] font-bold">
                          {skill.proficiency}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-base text-[#152238]">
                        {skill.skillName}
                      </h4>
                      <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2EAE6] flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        {skill.sessionCount} sessions taught
                      </span>
                      <button
                        onClick={() => handleBookWithSkill(skill.skillName)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#063F83] hover:bg-[#082B50] transition-colors"
                      >
                        Request This Skill
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills wanted to learn */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card">
              <h3 className="font-heading font-bold text-base text-[#152238] mb-4">
                Skills {peer.name} Wants to Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {peer.skillsLearning.map((sl) => (
                  <div
                    key={sl.id}
                    className="p-4 rounded-xl bg-[#EAF6F0]/60 border border-[#C5E9DC]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#16845B]">{sl.category}</span>
                      <span className="text-[10px] text-slate-600 font-medium">
                        Goal: {sl.targetLevel}
                      </span>
                    </div>
                    <div className="font-heading font-bold text-sm text-[#152238] mt-1">
                      {sl.skillName}
                    </div>
                    <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                      {sl.goalDescription}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Availability */}
        {activeTab === 'availability' && (
          <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card">
            <h3 className="font-heading font-bold text-base text-[#152238] mb-2">
              Weekly Availability Schedule
            </h3>
            <p className="text-xs text-[#64748B] mb-6">
              All sessions are 30 minutes in duration. Select a day to request a time slot.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {peer.availability.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#E2EAE6] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-[#152238]">
                      {slot.day}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#EAF6F0] text-[#063F83]">
                      {slot.mode}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {slot.timeSlots.map((time, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white border border-[#E2EAE6]"
                      >
                        <span className="text-[#152238] font-medium">{time}</span>
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full py-1.5 text-center text-xs font-bold text-[#063F83] hover:underline"
                  >
                    Select this day
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2EAE6]">
              <div>
                <h3 className="font-heading font-bold text-base text-[#152238]">
                  Student Feedback & Reviews
                </h3>
                <p className="text-xs text-[#64748B]">
                  Ratings left by verified peers after completing 30-minute sessions.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#152238]">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{peer.rating} out of 5.0</span>
              </div>
            </div>

            {peerReviews.length > 0 ? (
              <div className="space-y-4 pt-2">
                {peerReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-[#F7FAF8] border border-[#E2EAE6] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.authorAvatar}
                          alt={rev.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-bold text-xs text-[#152238]">{rev.authorName}</span>
                        <span className="text-[11px] text-[#64748B]">· {rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#152238] leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                    <div className="text-[10px] text-[#063F83] font-semibold">
                      Skill: {rev.skillName}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-[#64748B]">
                No reviews yet for this student mentor. Book a session to be the first!
              </div>
            )}
          </div>
        )}
      </div>

      <BookingDialog
        teacher={peer}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialSkill={selectedSkillToBook}
      />
    </AppShell>
  );
};
