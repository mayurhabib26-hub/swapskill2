import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/layout/Logo';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useApp();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast(
        'Account created successfully!',
        'Welcome to SwapSkill! Please set up your learning preferences to claim your 2 starter credits.',
        'success'
      );
      navigate('/onboarding');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center" />
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#16845B] bg-[#EAF6F0] border border-[#C5E9DC]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Claim 2 Starter Credits on Sign Up</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#152238] tracking-tight">
          Create Your SwapSkill Account
        </h2>
        <p className="mt-1 text-sm text-[#64748B]">
          Join your student peer network and trade knowledge without tuition costs.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-card rounded-2xl border border-[#E2EAE6]">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83] focus:border-transparent transition-all"
                  placeholder="e.g. Alex Chen"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Campus or Student Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83] focus:border-transparent transition-all"
                  placeholder="student@campus.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83] focus:border-transparent transition-all"
                  placeholder="At least 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83] focus:border-transparent transition-all"
                  placeholder="Re-type password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm hover:shadow-card transition-all disabled:opacity-70 group"
            >
              {isLoading ? (
                <span>Creating your account...</span>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#64748B]">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-[#063F83] hover:underline">
              Log in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
