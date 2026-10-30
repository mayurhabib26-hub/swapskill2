import React, { useState } from 'react';
import { User, Session } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Video,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface BookingDialogProps {
  teacher: User;
  isOpen: boolean;
  onClose: () => void;
  initialSkill?: string;
}

export const BookingDialog: React.FC<BookingDialogProps> = ({
  teacher,
  isOpen,
  onClose,
  initialSkill,
}) => {
  const { currentUser, requestSession } = useApp();

  const [selectedSkill, setSelectedSkill] = useState(
    initialSkill || teacher.skillsTeaching[0]?.skillName || 'General Mentorship'
  );
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 4:00 PM');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    teacher.availability[0]?.timeSlots[0] || '4:00 PM - 4:30 PM'
  );
  const [meetingMode, setMeetingMode] = useState<'Online' | 'On-Campus'>('Online');
  const [learningGoal, setLearningGoal] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedSkillCategory =
      teacher.skillsTeaching.find((s) => s.skillName === selectedSkill)?.category ||
      'General';

    setTimeout(() => {
      requestSession({
        teacherId: teacher.id,
        teacherName: teacher.name,
        teacherAvatar: teacher.avatar,
        learnerId: currentUser.id,
        learnerName: currentUser.name,
        learnerAvatar: currentUser.avatar,
        skillName: selectedSkill,
        skillCategory: selectedSkillCategory,
        scheduledDate: selectedDate,
        scheduledTime: selectedTimeSlot,
        durationMinutes: 30,
        meetingMode,
        learningGoal: learningGoal || `Learn fundamentals of ${selectedSkill}`,
        notes,
      });

      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-[#E2EAE6] relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header & Teacher Summary */}
        <div className="flex items-center gap-3.5 pb-5 border-b border-[#E2EAE6]">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-13 h-13 rounded-2xl object-cover ring-2 ring-[#063F83]/20"
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16845B] bg-[#EAF6F0] px-2 py-0.5 rounded-full">
              Book a 30m Session
            </span>
            <h3 className="font-heading font-extrabold text-lg text-[#152238] mt-0.5">
              Request session with {teacher.name}
            </h3>
            <p className="text-xs text-[#64748B]">
              {teacher.major} · {teacher.university}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Skill Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
              Select Skill to Learn
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
            >
              {teacher.skillsTeaching.map((st) => (
                <option key={st.id} value={st.skillName}>
                  {st.skillName} ({st.proficiency})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Preferred Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
              >
                <option value="Tomorrow, 4:00 PM">Tomorrow</option>
                <option value="Friday, 3:30 PM">This Friday</option>
                <option value="Saturday, 11:00 AM">This Saturday</option>
                <option value="Next Monday, 2:00 PM">Next Monday</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Available Time Slot
              </label>
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
              >
                {teacher.availability.flatMap((a) =>
                  a.timeSlots.map((slot) => (
                    <option key={`${a.day}-${slot}`} value={slot}>
                      {a.day}: {slot}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Mode & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Meeting Preference
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMeetingMode('Online')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    meetingMode === 'Online'
                      ? 'bg-[#063F83] text-white border-[#063F83]'
                      : 'bg-[#F7FAF8] text-[#152238] border-[#E2EAE6]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Online</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMeetingMode('On-Campus')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    meetingMode === 'On-Campus'
                      ? 'bg-[#063F83] text-white border-[#063F83]'
                      : 'bg-[#F7FAF8] text-[#152238] border-[#E2EAE6]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Campus</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Duration
              </label>
              <div className="py-2 px-3 rounded-xl bg-[#F7FAF8] border border-[#E2EAE6] text-xs font-bold text-[#152238] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#063F83]" />
                <span>30 Minutes (Standard)</span>
              </div>
            </div>
          </div>

          {/* Learning Goal */}
          <div>
            <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
              Specific Learning Goal
            </label>
            <input
              type="text"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              placeholder="e.g. Help me debug React state or understand auto-layout"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
              Notes or Questions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any relevant links, code repos, or class topics you'd like to share in advance..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-xs text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
            />
          </div>

          {/* Escrow Rule Explainer Pill */}
          <div className="p-3.5 rounded-2xl bg-[#EAF6F0] border border-[#C5E9DC] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#063F83]">
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-[#16845B]" />
                <span>Session Cost: 1 Credit</span>
              </div>
              <span className="text-[#16845B]">You have {currentUser.creditsAvailable} Available</span>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed flex items-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16845B] flex-shrink-0 mt-0.5" />
              <span>
                <strong>No upfront deduction:</strong> 1 credit is held in escrow <em>only after</em> {teacher.name} accepts your request. It is released when you mutually confirm completion.
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#64748B] hover:text-[#152238] hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm hover:shadow-card transition-all disabled:opacity-70 flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <span>Submitting request...</span>
              ) : (
                <>
                  <span>Send Booking Request</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5E9DC]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
