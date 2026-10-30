import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '../../types';
import { useApp } from '../../context/AppContext';
import { SessionStatusBadge } from './SessionStatusBadge';
import { ReviewDialog } from './ReviewDialog';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Star,
  ExternalLink,
  Coins,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const SessionCard: React.FC<{ session: Session }> = ({ session }) => {
  const {
    currentUser,
    acceptSession,
    declineSession,
    cancelSession,
    markSessionCompleted,
    confirmSessionCompletion,
    startOrGetConversation,
  } = useApp();

  const navigate = useNavigate();
  const [reviewOpen, setReviewOpen] = useState(false);

  const isTeacher = session.teacherId === currentUser.id;
  const isLearner = session.learnerId === currentUser.id;

  const partnerName = isTeacher ? session.learnerName : session.teacherName;
  const partnerAvatar = isTeacher ? session.learnerAvatar : session.teacherAvatar;
  const partnerRole = isTeacher ? 'Student / Learner' : 'Teacher / Mentor';
  const partnerId = isTeacher ? session.learnerId : session.teacherId;

  const handleMessagePartner = () => {
    const convId = startOrGetConversation(partnerId);
    navigate(`/messages?conv=${convId}`);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2EAE6] shadow-card hover:border-[#C5E9DC] transition-all flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2EAE6]">
            <div className="flex items-center gap-3">
              <img
                src={partnerAvatar}
                alt={partnerName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#063F83]/15 flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#152238]">
                    {partnerName}
                  </h4>
                  <span className="text-[10px] font-semibold text-[#063F83] bg-[#EAF6F0] px-2 py-0.5 rounded-full">
                    {partnerRole}
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  {isTeacher ? 'Requested by' : 'Teaching'}: <span className="font-medium text-[#152238]">{session.skillName}</span>
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <SessionStatusBadge status={session.status} />
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#063F83] flex-shrink-0" />
              <span>{session.scheduledDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#063F83] flex-shrink-0" />
              <span>{session.scheduledTime} (30m)</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              {session.meetingMode === 'Online' ? (
                <>
                  <Video className="w-4 h-4 text-[#16845B] flex-shrink-0" />
                  <span>Google Meet Video</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 text-[#C17B20] flex-shrink-0" />
                  <span>On-Campus Session</span>
                </>
              )}
            </div>
          </div>

          {/* Learning Goal & Notes */}
          {session.learningGoal && (
            <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#E2EAE6] text-xs text-[#152238] mb-4">
              <span className="font-semibold text-[#063F83] block mb-0.5">Session Goal:</span>
              <p className="text-[#64748B] leading-relaxed">{session.learningGoal}</p>
            </div>
          )}

          {/* Status Note or Escrow banner */}
          {session.status === 'accepted' && (
            <div className="p-2.5 rounded-xl bg-[#EAF6F0] border border-[#C5E9DC] text-xs text-[#063F83] flex items-center justify-between mb-4">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#16845B]" />
                1 credit held in escrow. Released upon mutual confirmation.
              </span>
              {session.meetingLocationOrLink && (
                <a
                  href={session.meetingLocationOrLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline text-[#063F83] hover:text-[#082B50] inline-flex items-center gap-1 text-[11px]"
                >
                  <span>Open Meet</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {session.status === 'awaiting_confirmation' && (
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 mb-4">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Ready for Mutual Confirmation!</span>
              </div>
              <p className="text-[11px] text-purple-700 mt-1">
                {session.teacherConfirmed && !session.learnerConfirmed && isLearner
                  ? 'The teacher has marked this session completed. Please confirm to release the held credit!'
                  : session.learnerConfirmed && !session.teacherConfirmed && isTeacher
                  ? 'The learner has confirmed completion. Please submit your confirmation to settle the credit.'
                  : 'Waiting for mutual confirmation from both parties to release the escrowed credit.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E2EAE6] flex flex-wrap items-center justify-between gap-2.5">
          <button
            onClick={handleMessagePartner}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#063F83] hover:bg-[#EAF6F0] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message {partnerName.split(' ')[0]}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* If Incoming Request & Current User is Teacher */}
            {session.status === 'requested' && isTeacher && (
              <>
                <button
                  onClick={() => declineSession(session.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => acceptSession(session.id)}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
                >
                  Accept & Hold 1 Credit
                </button>
              </>
            )}

            {/* If Accepted: Mark completed or cancel */}
            {session.status === 'accepted' && (
              <>
                <button
                  onClick={() => cancelSession(session.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => markSessionCompleted(session.id)}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#16845B] hover:bg-[#126b4a] shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </button>
              </>
            )}

            {/* If Awaiting Confirmation: Confirm & release escrow */}
            {session.status === 'awaiting_confirmation' && (
              <button
                onClick={() => confirmSessionCompletion(session.id)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all flex items-center gap-1.5"
              >
                <Coins className="w-3.5 h-3.5 text-[#C5E9DC]" />
                <span>Confirm & Settle Credit</span>
              </button>
            )}

            {/* If Settled: Leave a review */}
            {session.status === 'settled' && (
              <button
                onClick={() => setReviewOpen(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#063F83] bg-[#EAF6F0] hover:bg-[#C5E9DC] transition-colors flex items-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Leave Review</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <ReviewDialog
        sessionId={session.id}
        recipientId={partnerId}
        recipientName={partnerName}
        skillName={session.skillName}
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
      />
    </>
  );
};
