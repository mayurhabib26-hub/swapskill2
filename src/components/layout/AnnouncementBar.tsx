import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#EAF6F0] border-b border-[#C5E9DC]/60 text-[#063F83] py-2 px-4 text-xs sm:text-sm font-medium transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <span className="flex items-center gap-1.5 font-semibold text-[#16845B]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Semester Learning:</span>
        </span>
        <span className="hidden sm:inline">Learn a new skill. Share what you know. Grow together.</span>
        <span className="sm:hidden">Share skills, earn credits.</span>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1 font-bold underline decoration-[#16845B] hover:text-[#082B50] ml-1 transition-colors group"
        >
          <span>Explore Skills</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};
