import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/layout/Logo';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center" />
        <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-[#152238] tracking-tight">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-[#64748B]">
          Enter your registered college email and we'll send you recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-card rounded-2xl border border-[#E2EAE6]">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF6F0] text-[#16845B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#152238]">Check your inbox</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                If an account exists for <span className="font-semibold text-[#152238]">{email}</span>, we have sent a password reset link.
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-bold text-[#063F83] bg-[#EAF6F0] hover:bg-[#C5E9DC] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span>Back to login</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center text-xs font-semibold text-[#64748B] hover:text-[#063F83]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
