import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-navy-600 flex-shrink-0" />;
        let borderClass = 'border-navy-100 bg-white';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-mint-accent flex-shrink-0" />;
          borderClass = 'border-mint-dark/50 bg-white';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-brand-warning flex-shrink-0" />;
          borderClass = 'border-amber-200 bg-white';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-brand-error flex-shrink-0" />;
          borderClass = 'border-rose-200 bg-white';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-elevated border flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-bottom-5 ${borderClass}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-brand-text">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-brand-secondary mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
