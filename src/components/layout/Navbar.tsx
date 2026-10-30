import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  ArrowRight,
  Coins,
  LayoutDashboard,
  Compass,
  HelpCircle,
  Users,
  Shield,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, switchUserRole } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Explore Skills', href: '/explore', icon: Compass },
    { label: 'How It Works', href: '/#how-it-works', icon: HelpCircle },
    { label: 'Community', href: '/#community', icon: Users },
    { label: 'About', href: '/#about', icon: Shield },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2EAE6]'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[#063F83] bg-[#EAF6F0] font-semibold'
                    : 'text-[#152238] hover:text-[#063F83] hover:bg-[#F7FAF8]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Quick Demo Role Switcher Toggle */}
            <button
              onClick={() => switchUserRole(currentUser.role === 'admin' ? 'student' : 'admin')}
              className={`text-xs px-2.5 py-1 rounded-full font-medium border transition-all ${
                currentUser.role === 'admin'
                  ? 'bg-purple-100 text-purple-800 border-purple-300'
                  : 'bg-[#EAF6F0] text-[#063F83] border-[#C5E9DC]'
              }`}
              title="Click to toggle between Demo Student and Demo Admin mode"
            >
              Role: <span className="font-bold uppercase">{currentUser.role}</span>
            </button>

            {/* Quick Balance indicator */}
            <Link
              to="/credits"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF6F0] border border-[#C5E9DC] text-xs font-semibold text-[#063F83] hover:bg-[#C5E9DC]/60 transition-colors"
            >
              <Coins className="w-3.5 h-3.5 text-[#16845B]" />
              <span>{currentUser.creditsAvailable} Credits</span>
              {currentUser.creditsHeld > 0 && (
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-full font-mono">
                  {currentUser.creditsHeld} held
                </span>
              )}
            </Link>

            <Link
              to="/dashboard"
              className="text-sm font-medium text-[#152238] hover:text-[#063F83] px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span>App App</span>
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm hover:shadow-md transition-all group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/credits"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EAF6F0] text-xs font-semibold text-[#063F83]"
            >
              <Coins className="w-3.5 h-3.5 text-[#16845B]" />
              <span>{currentUser.creditsAvailable}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-navy-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#063F83]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Sheet-like overlay) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-50 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border-b border-[#E2EAE6] p-6 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-[#152238] hover:bg-[#EAF6F0] hover:text-[#063F83] transition-colors"
                >
                  <item.icon className="w-5 h-5 text-[#063F83]" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E2EAE6] space-y-3">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-[#063F83] bg-[#EAF6F0] hover:bg-[#C5E9DC] transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Go to Student Dashboard</span>
              </Link>

              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-colors"
              >
                <span>Get Started (2 Free Credits)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-500">
                <span>Demo Perspective: {currentUser.name}</span>
                <button
                  onClick={() => switchUserRole(currentUser.role === 'admin' ? 'student' : 'admin')}
                  className="text-navy-600 font-bold underline"
                >
                  Toggle Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
