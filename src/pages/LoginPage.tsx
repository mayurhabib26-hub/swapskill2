import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/layout/Logo';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.chen@campus.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToast, switchUserRole } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast('Welcome back, Alex!', 'Logged in with 2 available credits.', 'success');
      navigate('/dashboard');
    }, 600);
  };

  const quickDemoLogin = (role: 'student' | 'admin') => {
    switchUserRole(role);
    addToast(
      role === 'admin' ? 'Logged in as Demo Admin' : 'Logged in as Alex Chen',
      'Demo authentication active.',
      'success'
    );
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center" />
        <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-[#152238] tracking-tight">
          Welcome back to SwapSkill
        </h2>
        <p className="mt-2 text-sm text-[#64748B]">
          Log in to manage your 30-minute skill sessions and credit wallet.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-card rounded-2xl border border-[#E2EAE6]">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
                Campus Email Address
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#063F83] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm hover:shadow-card transition-all disabled:opacity-70 group"
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Log In to Account</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins Section */}
          <div className="mt-6 pt-6 border-t border-[#E2EAE6]">
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                Instant Demo Quick Login
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => quickDemoLogin('student')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#C5E9DC] bg-[#EAF6F0] text-xs font-semibold text-[#063F83] hover:bg-[#C5E9DC]/60 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#16845B]" />
                <span>Alex (Student)</span>
              </button>
              <button
                type="button"
                onClick={() => quickDemoLogin('admin')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-purple-200 bg-purple-50 text-xs font-semibold text-purple-800 hover:bg-purple-100 transition-colors"
              >
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-[#64748B]">
            <span>Don't have an account yet? </span>
            <Link to="/signup" className="font-bold text-[#063F83] hover:underline">
              Sign up and get 2 free credits
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
