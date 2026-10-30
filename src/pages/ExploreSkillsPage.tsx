import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { PeerCard } from '../components/skills/PeerCard';
import { SKILL_CATEGORIES } from '../data/mockData';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const ExploreSkillsPage: React.FC = () => {
  const { users, currentUser } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filters State
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [proficiencyFilter, setProficiencyFilter] = useState<string>('All');
  const [modeFilter, setModeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync with URL params if category query changed
  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Client-side Filtering & Sorting
  const filteredPeers = useMemo(() => {
    return users.filter((user) => {
      // Exclude current user from peer cards so they don't request themselves
      if (user.id === currentUser.id) return false;

      // 1. Category Filter
      if (selectedCategory !== 'All') {
        const matchesCategory = user.skillsTeaching.some(
          (st) => st.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!matchesCategory) return false;
      }

      // 2. Search Query Filter (name, major, skills taught, skills wanted)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = user.name.toLowerCase().includes(query);
        const matchesMajor = user.major.toLowerCase().includes(query);
        const matchesTeach = user.skillsTeaching.some(
          (st) =>
            st.skillName.toLowerCase().includes(query) ||
            st.description.toLowerCase().includes(query)
        );
        const matchesLearn = user.skillsLearning.some((sl) =>
          sl.skillName.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesMajor && !matchesTeach && !matchesLearn) {
          return false;
        }
      }

      // 3. Proficiency Filter
      if (proficiencyFilter !== 'All') {
        const matchesProf = user.skillsTeaching.some(
          (st) => st.proficiency === proficiencyFilter
        );
        if (!matchesProf) return false;
      }

      // 4. Mode Filter (Online / On-Campus / Both)
      if (modeFilter !== 'All') {
        const matchesMode = user.availability.some(
          (a) => a.mode === modeFilter || a.mode === 'Both'
        );
        if (!matchesMode) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'reviews') {
        return b.reviewCount - a.reviewCount;
      }
      return 0; // default recommended
    });
  }, [users, currentUser.id, selectedCategory, searchQuery, proficiencyFilter, modeFilter, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setProficiencyFilter('All');
    setModeFilter('All');
    setSortBy('recommended');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery !== '' ||
    proficiencyFilter !== 'All' ||
    modeFilter !== 'All';

  return (
    <AppShell pageTitle="Explore Skills">
      <div className="space-y-6">
        {/* Top Header & Search Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#063F83] bg-[#EAF6F0] border border-[#C5E9DC] mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#16845B]" />
              <span>Peer Mentorship Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152238] tracking-tight">
              Discover Your Next Skill
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Connect with talented students across technical, design, and creative disciplines. Exchange 30-minute sessions with your credits.
            </p>
          </div>

          {/* Large Search Field */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skill (e.g. Java, Figma, Python, Video, Spanish) or student name..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#EAF6F0] border border-[#C5E9DC] text-xs font-bold text-[#063F83]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters & Sort</span>
            </button>
          </div>

          {/* Category Chips (Horizontally Scrollable) */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchParams({});
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-[#063F83] text-white shadow-sm'
                  : 'bg-[#F7FAF8] text-[#152238] border border-[#E2EAE6] hover:bg-slate-100'
              }`}
            >
              All Categories
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSearchParams({ category: cat.name });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-[#063F83] text-white shadow-sm font-bold'
                    : 'bg-[#F7FAF8] text-[#152238] border border-[#E2EAE6] hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Filter & Sorting Bar */}
        <div className="hidden sm:flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E2EAE6] shadow-sm text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#152238]">Proficiency:</span>
              <select
                value={proficiencyFilter}
                onChange={(e) => setProficiencyFilter(e.target.value)}
                className="py-1.5 px-3 rounded-lg border border-[#E2EAE6] bg-[#F7FAF8] font-medium text-[#152238] focus:outline-none focus:ring-1 focus:ring-[#063F83]"
              >
                <option value="All">Any Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#152238]">Mode:</span>
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="py-1.5 px-3 rounded-lg border border-[#E2EAE6] bg-[#F7FAF8] font-medium text-[#152238] focus:outline-none focus:ring-1 focus:ring-[#063F83]"
              >
                <option value="All">Online & On-Campus</option>
                <option value="Online">Online Video Only</option>
                <option value="On-Campus">On-Campus Only</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 text-[#063F83] font-bold hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#64748B]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1.5 px-3 rounded-lg border border-[#E2EAE6] bg-[#F7FAF8] font-semibold text-[#152238] focus:outline-none focus:ring-1 focus:ring-[#063F83]"
            >
              <option value="recommended">Recommended Matches</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Sessions Taught</option>
            </select>
          </div>
        </div>

        {/* Results Count & Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#64748B]">
              Showing <span className="font-bold text-[#152238]">{filteredPeers.length}</span> student mentors
            </span>
          </div>

          {filteredPeers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeers.map((peer) => (
                <PeerCard key={peer.id} peer={peer} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-[#E2EAE6] text-center shadow-sm">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-lg text-[#152238]">
                No student mentors found matching criteria
              </h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto mt-1 mb-6">
                Try clearing your search keyword or relaxing category and proficiency filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
