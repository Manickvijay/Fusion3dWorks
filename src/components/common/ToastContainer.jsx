import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        let bg = 'bg-slate-900 text-white border-slate-700';
        let Icon = CheckCircle2;
        let iconColor = 'text-emerald-400';

        if (t.type === 'error') {
          bg = 'bg-rose-950 text-white border-rose-800';
          Icon = AlertCircle;
          iconColor = 'text-rose-400';
        } else if (t.type === 'warning') {
          bg = 'bg-amber-950 text-white border-amber-800';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (t.type === 'info') {
          bg = 'bg-slate-900 text-white border-slate-700';
          Icon = Info;
          iconColor = 'text-indigo-400';
        }

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start space-x-3 p-3.5 rounded-2xl shadow-2xl border ${bg} text-xs animate-in slide-in-from-bottom-5 duration-200`}
          >
            <Icon className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`} />
            <div className="flex-1 font-medium leading-relaxed">
              {t.message}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-0.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
