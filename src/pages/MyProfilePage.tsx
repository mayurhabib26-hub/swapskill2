import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  Sparkles,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/mockData';

export const MyProfilePage: React.FC = () => {
  const { currentUser, updateCurrentUserProfile } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [university, setUniversity] = useState(currentUser.university);
  const [major, setMajor] = useState(currentUser.major);
  const [year, setYear] = useState(currentUser.year || 'Junior (3rd Year)');
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  // Teaching skills state
  const [teachingSkills, setTeachingSkills] = useState(currentUser.skillsTeaching);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming');
  const [newSkillProficiency, setNewSkillProficiency] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');

  // Learning skills state
  const [learningSkills, setLearningSkills] = useState(currentUser.skillsLearning);
  const [newLearnName, setNewLearnName] = useState('');
  const [newLearnCategory, setNewLearnCategory] = useState('UI/UX Design');

  const handleAddTeachSkill = () => {
    if (!newSkillName.trim()) return;
    setTeachingSkills([
      ...teachingSkills,
      {
        id: 'ts_' + Date.now(),
        skillName: newSkillName.trim(),
        category: newSkillCategory,
        proficiency: newSkillProficiency,
        description: 'New skill offering prepared for 30m peer exchange.',
        sessionCount: 0,
      },
    ]);
    setNewSkillName('');
  };

  const handleRemoveTeachSkill = (id: string) => {
    setTeachingSkills(teachingSkills.filter((s) => s.id !== id));
  };

  const handleAddLearnSkill = () => {
    if (!newLearnName.trim()) return;
    setLearningSkills([
      ...learningSkills,
      {
        id: 'ls_' + Date.now(),
        skillName: newLearnName.trim(),
        category: newLearnCategory,
        targetLevel: 'Intermediate',
        goalDescription: 'Eager to learn from experienced peers.',
      },
    ]);
    setNewLearnName('');
  };

  const handleRemoveLearnSkill = (id: string) => {
    setLearningSkills(learningSkills.filter((s) => s.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name,
      university,
      major,
      year,
      bio,
      avatar,
      skillsTeaching: teachingSkills,
      skillsLearning: learningSkills,
    });
  };

  return (
    <AppShell pageTitle="My Profile">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Header with Save Button */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#063F83] bg-[#EAF6F0] border border-[#C5E9DC] mb-2">
              <User className="w-3.5 h-3.5 text-[#16845B]" />
              <span>Public Student Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152238] tracking-tight">
              Edit Your Profile & Skills
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Keep your major, bio, and skill offerings updated so campus peers can discover you.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card space-y-5">
          <h3 className="font-heading font-bold text-base text-[#152238]">
            Basic Information
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6 pb-4">
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-3xl object-cover ring-2 ring-[#063F83]/20 shadow-sm"
            />
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Avatar Image URL
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-xs text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Full Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                University / College
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Major / Department
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
              >
                <option value="Freshman (1st Year)">Freshman (1st Year)</option>
                <option value="Sophomore (2nd Year)">Sophomore (2nd Year)</option>
                <option value="Junior (3rd Year)">Junior (3rd Year)</option>
                <option value="Senior (4th Year)">Senior (4th Year)</option>
                <option value="Graduate Student">Graduate Student</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
              Personal Bio & Introduction
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
            />
          </div>
        </div>

        {/* Skills I Can Teach Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#152238]">
              Skills You Teach (Earn Credits)
            </h3>
            <span className="text-xs text-[#16845B] font-semibold">
              {teachingSkills.length} active offerings
            </span>
          </div>

          <div className="space-y-3">
            {teachingSkills.map((st) => (
              <div
                key={st.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7FAF8] border border-[#E2EAE6]"
              >
                <div>
                  <div className="font-bold text-sm text-[#152238]">{st.skillName}</div>
                  <div className="text-xs text-[#64748B] mt-0.5">
                    Category: {st.category} · Proficiency: <span className="font-semibold text-[#063F83]">{st.proficiency}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTeachSkill(st.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  aria-label="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Teaching Skill Input Row */}
          <div className="pt-3 border-t border-[#E2EAE6] grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="New skill (e.g. Next.js, C++)"
              className="sm:col-span-2 px-3 py-2 rounded-xl border border-[#E2EAE6] text-xs text-[#152238] focus:outline-none focus:ring-1 focus:ring-[#063F83]"
            />
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E2EAE6] text-xs text-[#152238] focus:outline-none focus:ring-1 focus:ring-[#063F83]"
            >
              {SKILL_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddTeachSkill}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#EAF6F0] text-[#063F83] font-bold text-xs hover:bg-[#C5E9DC] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* Skills I Want to Learn Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#152238]">
              Skills You Want to Learn (Spend Credits)
            </h3>
            <span className="text-xs text-[#063F83] font-semibold">
              {learningSkills.length} goals
            </span>
          </div>

          <div className="space-y-3">
            {learningSkills.map((sl) => (
              <div
                key={sl.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#EAF6F0]/50 border border-[#C5E9DC]"
              >
                <div>
                  <div className="font-bold text-sm text-[#152238]">{sl.skillName}</div>
                  <div className="text-xs text-[#64748B] mt-0.5">
                    Category: {sl.category}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLearnSkill(sl.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  aria-label="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Learning Skill Input Row */}
          <div className="pt-3 border-t border-[#E2EAE6] grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <input
              type="text"
              value={newLearnName}
              onChange={(e) => setNewLearnName(e.target.value)}
              placeholder="Target skill (e.g. Graphic Design)"
              className="sm:col-span-2 px-3 py-2 rounded-xl border border-[#E2EAE6] text-xs text-[#152238] focus:outline-none focus:ring-1 focus:ring-[#063F83]"
            />
            <select
              value={newLearnCategory}
              onChange={(e) => setNewLearnCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E2EAE6] text-xs text-[#152238] focus:outline-none focus:ring-1 focus:ring-[#063F83]"
            >
              {SKILL_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddLearnSkill}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#EAF6F0] text-[#063F83] font-bold text-xs hover:bg-[#C5E9DC] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Target</span>
            </button>
          </div>
        </div>
      </form>
    </AppShell>
  );
};
