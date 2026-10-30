import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/layout/Logo';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Coins,
  GraduationCap,
  BookOpen,
  Code2,
  Calendar,
  Languages,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/mockData';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateCurrentUserProfile, addToast } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [university, setUniversity] = useState(currentUser.university || 'State Polytechnic Institute');
  const [major, setMajor] = useState(currentUser.major || 'Computer Science');
  const [year, setYear] = useState(currentUser.year || 'Junior (3rd Year)');
  const [bio, setBio] = useState(
    currentUser.bio || 'Passionate student eager to teach programming and learn UI/UX design.'
  );

  const [teachSkill, setTeachSkill] = useState('Java & Data Structures');
  const [teachCategory, setTeachCategory] = useState('Programming');
  const [teachProficiency, setTeachProficiency] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');
  const [teachDesc, setTeachDesc] = useState('OOP fundamentals, linked lists, trees, and algorithmic problem solving.');

  const [learnSkill, setLearnSkill] = useState('UI/UX Design in Figma');
  const [learnCategory, setLearnCategory] = useState('UI/UX Design');
  const [learnGoal, setLearnGoal] = useState('Build responsive prototypes and component libraries for web applications.');

  const [language, setLanguage] = useState('English (Fluent)');
  const [preferredMode, setPreferredMode] = useState<'Online' | 'On-Campus' | 'Both'>('Both');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Tuesday', 'Thursday', 'Saturday']);

  const [isCompleted, setIsCompleted] = useState(false);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleFinish = () => {
    updateCurrentUserProfile({
      university,
      major,
      year,
      bio,
      skillsTeaching: [
        {
          id: 'teach_ob_' + Date.now(),
          skillName: teachSkill,
          category: teachCategory,
          proficiency: teachProficiency,
          description: teachDesc,
          sessionCount: 0,
        },
      ],
      skillsLearning: [
        {
          id: 'learn_ob_' + Date.now(),
          skillName: learnSkill,
          category: learnCategory,
          targetLevel: 'Intermediate',
          goalDescription: learnGoal,
        },
      ],
      languages: [language],
      availability: selectedDays.map((d) => ({
        day: d as any,
        timeSlots: ['4:00 PM - 4:30 PM', '5:00 PM - 5:30 PM'],
        mode: preferredMode,
      })),
    });

    setIsCompleted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#063F83', '#C5E9DC', '#1769AA', '#16845B'],
      });
    } catch {
      // ignore
    }
  };

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-[#F7FAF8] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8">
          <Logo size="md" />
          <div className="flex items-center gap-2 bg-[#EAF6F0] border border-[#C5E9DC] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#063F83]">
            <Coins className="w-4 h-4 text-[#16845B]" />
            <span>2 Starter Credits Ready</span>
          </div>
        </div>

        {/* Wizard Progress Bar */}
        {!isCompleted && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 text-xs font-semibold text-[#64748B]">
              <span className="text-[#063F83]">Step {step} of 5</span>
              <span>
                {step === 1 && 'Basic Profile'}
                {step === 2 && 'Skills I Teach'}
                {step === 3 && 'Skills I Want to Learn'}
                {step === 4 && 'Availability & Language'}
                {step === 5 && 'Review Profile'}
              </span>
            </div>
            <div className="w-full bg-[#E2EAE6] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#063F83] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Wizard Card Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-[#E2EAE6]">
          {isCompleted ? (
            /* Step Completion Celebration Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#EAF6F0] text-[#16845B] border-2 border-[#C5E9DC] flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#16845B] bg-[#EAF6F0] border border-[#C5E9DC] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Onboarding Complete</span>
                </span>
                <h2 className="text-3xl font-extrabold text-[#152238] tracking-tight">
                  You're ready to start exchanging skills!
                </h2>
                <p className="text-sm text-[#64748B] max-w-md mx-auto mt-2 leading-relaxed">
                  Your profile has been created and your initial balance has been credited with 2 starter credits.
                </p>
              </div>

              {/* Starter Credit Card Preview */}
              <div className="max-w-sm mx-auto bg-gradient-to-br from-[#063F83] to-[#082B50] rounded-2xl p-6 text-white text-left shadow-elevated relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5E9DC]/10 rounded-full blur-2xl" />
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs uppercase font-semibold text-[#C5E9DC]">Active Balance</span>
                    <div className="text-3xl font-extrabold mt-0.5">2 Credits</div>
                  </div>
                  <Coins className="w-8 h-8 text-[#C5E9DC]" />
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-xs text-white/80">
                  <span>Student: {currentUser.name}</span>
                  <span>Worth: 2 x 30m Sessions</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/explore')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-[#063F83] bg-[#EAF6F0] hover:bg-[#C5E9DC] transition-all"
                >
                  <span>Browse Peer Skills</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: Basic Profile Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#152238]">
                      Tell us about your campus
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                      This helps match you with peers in your university or related fields.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                        College / University
                      </label>
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                        placeholder="State Polytechnic Institute"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                        Major / Discipline
                      </label>
                      <input
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                        placeholder="Computer Science"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                      Academic Year
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                    >
                      <option value="Freshman (1st Year)">Freshman (1st Year)</option>
                      <option value="Sophomore (2nd Year)">Sophomore (2nd Year)</option>
                      <option value="Junior (3rd Year)">Junior (3rd Year)</option>
                      <option value="Senior (4th Year)">Senior (4th Year)</option>
                      <option value="Graduate Student">Graduate Student</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                      Short Bio
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                      placeholder="Briefly introduce your background and what you're excited to teach or learn..."
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Skills I Can Teach */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#152238]">
                      What skills can you teach?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                      Choose at least one skill you feel confident explaining in a 30-minute session.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        value={teachSkill}
                        onChange={(e) => setTeachSkill(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                        placeholder="e.g. Java & Data Structures"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                        Category
                      </label>
                      <select
                        value={teachCategory}
                        onChange={(e) => setTeachCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                      >
                        {SKILL_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                      Your Proficiency Level
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {(['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setTeachProficiency(lvl)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            teachProficiency === lvl
                              ? 'bg-[#063F83] text-white border-[#063F83]'
                              : 'bg-[#F7FAF8] text-[#152238] border-[#E2EAE6] hover:bg-slate-100'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                      Session Overview Description
                    </label>
                    <textarea
                      rows={2}
                      value={teachDesc}
                      onChange={(e) => setTeachDesc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                      placeholder="What topics will you cover in a 30m session?"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Skills I Want to Learn */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#152238]">
                      What do you want to learn?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                      We'll recommend student peers who can help you achieve these goals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                        Target Skill
                      </label>
                      <input
                        type="text"
                        value={learnSkill}
                        onChange={(e) => setLearnSkill(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                        placeholder="e.g. UI/UX Design in Figma"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                        Category
                      </label>
                      <select
                        value={learnCategory}
                        onChange={(e) => setLearnCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                      >
                        {SKILL_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                      Your Goal Description
                    </label>
                    <textarea
                      rows={3}
                      value={learnGoal}
                      onChange={(e) => setLearnGoal(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                      placeholder="What would you like to achieve in your first 1-2 sessions?"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Proficiency, Language & Availability */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#152238]">
                      Availability & Preferences
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                      Set your convenient days and communication modes.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-2">
                      Available Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {daysList.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDay(d)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            selectedDays.includes(d)
                              ? 'bg-[#EAF6F0] text-[#063F83] border-[#C5E9DC] shadow-sm font-bold'
                              : 'bg-[#F7FAF8] text-[#64748B] border-[#E2EAE6] hover:bg-slate-100'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                        Session Mode Preference
                      </label>
                      <select
                        value={preferredMode}
                        onChange={(e) => setPreferredMode(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                      >
                        <option value="Both">Both Online & On-Campus</option>
                        <option value="Online">Online Video (Google Meet / Zoom)</option>
                        <option value="On-Campus">On-Campus (Library / Common Room)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                        Primary Communication Language
                      </label>
                      <input
                        type="text"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] text-sm text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                        placeholder="English (Fluent)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Review Profile */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#152238]">
                      Review Your Skill Profile
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                      Check your details. You can update these anytime in your profile settings.
                    </p>
                  </div>

                  <div className="bg-[#F7FAF8] rounded-2xl p-5 border border-[#E2EAE6] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2EAE6]">
                      <div>
                        <div className="font-bold text-base text-[#152238]">{currentUser.name}</div>
                        <div className="text-xs text-[#64748B]">
                          {major} · {year} at {university}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#16845B] bg-[#EAF6F0] px-2.5 py-1 rounded-full">
                        2 Credits Ready
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="bg-white p-3.5 rounded-xl border border-[#E2EAE6]">
                        <span className="font-bold text-[#063F83] uppercase tracking-wider block mb-1">
                          Teaching:
                        </span>
                        <div className="font-semibold text-sm text-[#152238]">{teachSkill}</div>
                        <div className="text-[#64748B] mt-0.5">
                          {teachCategory} · {teachProficiency}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-[#E2EAE6]">
                        <span className="font-bold text-[#16845B] uppercase tracking-wider block mb-1">
                          Learning:
                        </span>
                        <div className="font-semibold text-sm text-[#152238]">{learnSkill}</div>
                        <div className="text-[#64748B] mt-0.5">{learnCategory}</div>
                      </div>
                    </div>

                    <div className="text-xs text-[#64748B] pt-2">
                      <span className="font-semibold text-[#152238]">Availability: </span>
                      {selectedDays.join(', ')} ({preferredMode})
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-[#E2EAE6] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] hover:text-[#152238] hover:bg-[#F7FAF8] transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-elevated transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5E9DC]" />
                    <span>Finish & Claim 2 Credits</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
