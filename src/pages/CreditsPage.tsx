import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { TransactionType } from '../types';
import {
  Coins,
  Lock,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Filter,
  RefreshCw,
  Info,
} from 'lucide-react';

export const CreditsPage: React.FC = () => {
  const { currentUser, transactions } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  // Calculate wallet metrics
  const totalEarned = transactions
    .filter((t) => t.type === 'earned' || t.type === 'starter')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalTransferred = transactions
    .filter((t) => t.type === 'released')
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  return (
    <AppShell pageTitle="Credits & Wallet">
      <div className="space-y-8">
        {/* Wallet Hero Banner */}
        <div className="bg-gradient-to-r from-[#063F83] via-[#082B50] to-[#1769AA] rounded-3xl p-6 sm:p-8 text-white shadow-elevated relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5E9DC]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#063F83] bg-[#C5E9DC] mb-3">
                <Coins className="w-3.5 h-3.5 text-[#063F83]" />
                <span>Zero-Cash Time Bank</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                SwapSkill Credit Wallet
              </h1>
              <p className="text-white/80 text-sm mt-1 max-w-lg leading-relaxed">
                1 Credit = 30 minutes of peer learning. Credits are earned when you teach and spent when you learn.
              </p>
            </div>

            {/* Wallet Big Display */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C5E9DC] font-semibold">
                  Spendable Balance
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold mt-0.5">
                  {currentUser.creditsAvailable} <span className="text-lg font-normal text-white/80">Credits</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#C5E9DC] text-[#063F83] flex items-center justify-center font-bold">
                <Coins className="w-6 h-6 text-[#063F83]" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1. Available */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Available Credits
            </span>
            <div className="text-3xl font-extrabold text-[#063F83] mt-2">
              {currentUser.creditsAvailable}
            </div>
            <p className="text-xs text-[#16845B] mt-2 font-medium">
              Ready to schedule new sessions
            </p>
          </div>

          {/* 2. Held in Escrow */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-card bg-amber-50/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                Held in Escrow
              </span>
              <Lock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-amber-800 mt-2">
              {currentUser.creditsHeld}
            </div>
            <p className="text-xs text-amber-700 mt-2">
              Reserved for accepted sessions
            </p>
          </div>

          {/* 3. Total Credits Earned */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Total Earned
              </span>
              <ArrowDownLeft className="w-4 h-4 text-[#16845B]" />
            </div>
            <div className="text-3xl font-extrabold text-[#152238] mt-2">
              {totalEarned}
            </div>
            <p className="text-xs text-[#64748B] mt-2">
              Starter bonus + taught sessions
            </p>
          </div>

          {/* 4. Total Transferred */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2EAE6] shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Transferred to Teachers
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#063F83]" />
            </div>
            <div className="text-3xl font-extrabold text-[#152238] mt-2">
              {totalTransferred}
            </div>
            <p className="text-xs text-[#64748B] mt-2">
              Completed 30m lessons
            </p>
          </div>
        </div>

        {/* How Escrow Works Info Banner */}
        <div className="bg-white rounded-2xl p-6 border border-[#C5E9DC] shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#EAF6F0] text-[#063F83] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#C5E9DC]">
              <ShieldCheck className="w-5 h-5 text-[#16845B]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#152238]">
                How Escrow Protection Works
              </h4>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed max-w-2xl">
                Credits are earned by teaching and spent when learning. When a teacher accepts your booking, 1 credit is temporarily held in escrow. After both students click 'Confirm Completion', the held credit is released directly to the teacher.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 bg-[#EAF6F0] px-3.5 py-2 rounded-xl text-xs font-bold text-[#063F83]">
            1 Session = 1 Credit
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#152238]">
                Transaction Ledger
              </h3>
              <p className="text-xs text-[#64748B]">
                Complete audit trail of starter credits, escrow holds, and completions.
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(
                [
                  { id: 'all', label: 'All Transactions' },
                  { id: 'starter', label: 'Starter Bonus' },
                  { id: 'held', label: 'Held in Escrow' },
                  { id: 'earned', label: 'Earned' },
                  { id: 'released', label: 'Released' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    filterType === f.id
                      ? 'bg-[#063F83] text-white shadow-sm'
                      : 'bg-[#F7FAF8] text-[#64748B] border border-[#E2EAE6] hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2EAE6] text-[#64748B] uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Date</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F3]">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F7FAF8] transition-colors">
                    <td className="py-3.5 pl-2 font-mono text-slate-500">{tx.date}</td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          tx.type === 'starter'
                            ? 'bg-[#EAF6F0] text-[#16845B]'
                            : tx.type === 'held'
                            ? 'bg-amber-100 text-amber-800'
                            : tx.type === 'earned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-[#063F83]'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 font-medium text-[#152238] max-w-md">
                      {tx.description}
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16845B]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="capitalize">{tx.status}</span>
                      </span>
                    </td>
                    <td
                      className={`py-3.5 pr-2 text-right font-mono font-bold text-sm ${
                        tx.amount > 0 ? 'text-[#16845B]' : 'text-amber-800'
                      }`}
                    >
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount} Credit
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#E2EAE6] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#64748B]">{tx.date}</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      tx.type === 'starter'
                        ? 'bg-[#EAF6F0] text-[#16845B]'
                        : tx.type === 'held'
                        ? 'bg-amber-100 text-amber-800'
                        : tx.type === 'earned'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-[#063F83]'
                    }`}
                  >
                    {tx.type}
                  </span>
                </div>
                <div className="font-semibold text-[#152238]">{tx.description}</div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E2EAE6]">
                  <span className="text-[11px] text-[#16845B] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="capitalize">{tx.status}</span>
                  </span>
                  <span
                    className={`font-mono font-bold text-sm ${
                      tx.amount > 0 ? 'text-[#16845B]' : 'text-amber-800'
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount} Credit
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
