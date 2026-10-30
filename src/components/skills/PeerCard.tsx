import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types';
import { BookingDialog } from '../sessions/BookingDialog';
import {
  Star,
  GraduationCap,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

export const PeerCard: React.FC<{ peer: User }> = ({ peer }) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 border border-[#E2EAE6] shadow-card hover:border-[#063F83]/30 hover:shadow-elevated transition-all flex flex-col justify-between group">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3.5">
              <Link to={`/peer/${peer.id}`} className="relative flex-shrink-0">
                <img
                  src={peer.avatar}
                  alt={peer.name}
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-[#E2EAE6] group-hover:ring-[#063F83]/30 transition-all"
                />
                {peer.verifiedStudent && (
                  <span
                    className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm text-[#16845B]"
                    title="Verified Student"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                )}
              </Link>
              <div>
                <Link
                  to={`/peer/${peer.id}`}
                  className="font-heading font-bold text-base text-[#152238] hover:text-[#063F83] transition-colors"
                >
                  {peer.name}
                </Link>
                <div className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[160px] sm:max-w-none">{peer.major}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-[#EAF6F0] px-2.5 py-1 rounded-xl text-xs font-bold text-[#063F83]">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{peer.rating}</span>
              <span className="text-[10px] text-[#64748B] font-normal">({peer.reviewCount})</span>
            </div>
          </div>

          {/* Bio snippet */}
          <p className="text-xs text-[#64748B] line-clamp-2 mb-4 leading-relaxed">
            {peer.bio}
          </p>

          {/* Skills They Teach */}
          <div className="mb-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#063F83] block mb-1.5">
              Teaches:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {peer.skillsTeaching.map((st) => (
                <span
                  key={st.id}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[#F0F5FA] text-[#063F83] font-semibold border border-[#DDE9F4]"
                >
                  <span>{st.skillName}</span>
                  <span className="text-[9px] text-[#1769AA] bg-white px-1.5 py-0.2 rounded font-mono">
                    {st.proficiency}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Skills They Want to Learn */}
          <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16845B] block mb-1.5">
              Wants to Learn:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {peer.skillsLearning.map((sl) => (
                <span
                  key={sl.id}
                  className="inline-flex items-center text-xs px-2 py-0.5 rounded-lg bg-[#EAF6F0] text-[#16845B] font-medium border border-[#C5E9DC]/60"
                >
                  {sl.skillName}
                </span>
              ))}
            </div>
          </div>

          {/* Availability badge */}
          <div className="pt-3 border-t border-[#F1F5F3] flex items-center justify-between text-[11px] text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#063F83]" />
              <span>
                {peer.availability.slice(0, 2).map((a) => a.day).join(', ')}
              </span>
            </div>
            <span className="font-semibold text-[#152238]">30 min slots</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-[#E2EAE6] flex items-center justify-between gap-2">
          <Link
            to={`/peer/${peer.id}`}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#063F83] hover:bg-[#EAF6F0] transition-colors"
          >
            View Profile
          </Link>
          <button
            onClick={() => setBookingOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm hover:shadow-card transition-all flex items-center gap-1.5 group-hover:bg-[#063F83]"
          >
            <span>Request Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <BookingDialog
        teacher={peer}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
};
