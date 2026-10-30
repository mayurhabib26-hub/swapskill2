import React from 'react';
import { SessionStatus } from '../../types';
import { Clock, CheckCircle2, Lock, XCircle, AlertCircle, Sparkles } from 'lucide-react';

export const SessionStatusBadge: React.FC<{ status: SessionStatus }> = ({ status }) => {
  switch (status) {
    case 'requested':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>Requested</span>
        </span>
      );
    case 'accepted':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF6F0] text-[#063F83] border border-[#C5E9DC]">
          <Lock className="w-3 h-3 text-[#16845B]" />
          <span>Accepted · 1 Credit Held</span>
        </span>
      );
    case 'awaiting_confirmation':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
          <Sparkles className="w-3 h-3 text-purple-600" />
          <span>Awaiting Mutual Confirmation</span>
        </span>
      );
    case 'settled':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#16845B] border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-[#16845B]" />
          <span>Settled · Credit Released</span>
        </span>
      );
    case 'declined':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
          <XCircle className="w-3 h-3 text-slate-500" />
          <span>Declined</span>
        </span>
      );
    case 'cancelled':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="w-3 h-3 text-rose-500" />
          <span>Cancelled</span>
        </span>
      );
    default:
      return null;
  }
};
