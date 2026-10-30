import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/layout/Logo';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-center items-center px-4 py-12 text-center">
      <Logo size="lg" className="mb-6" />
      <span className="text-sm font-bold text-[#063F83] bg-[#EAF6F0] px-3 py-1 rounded-full border border-[#C5E9DC] mb-3">
        404 — Page Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#152238] tracking-tight">
        Lost in the learning exchange?
      </h1>
      <p className="mt-2 text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
        The page or peer profile you are looking for doesn't exist or may have been moved.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#063F83] bg-[#EAF6F0] hover:bg-[#C5E9DC] transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Skills</span>
        </Link>
      </div>
    </div>
  );
};
