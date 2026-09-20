import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-5 right-5 z-99999 flex flex-col space-y-2 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {toasts.map(toast => {
          let Icon = CheckCircle2;
          let bgColor = 'bg-slate-950 text-white border-slate-800';
          let iconColor = 'text-emerald-400';

          if (toast.type === 'error') {
            Icon = AlertCircle;
            iconColor = 'text-rose-400';
          } else if (toast.type === 'info') {
            Icon = Info;
            iconColor = 'text-indigo-400';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto p-3.5 rounded-2xl shadow-2xl border flex items-center justify-between space-x-3 backdrop-blur-md ${bgColor}`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
                <span className="text-xs font-semibold text-slate-100 leading-snug">
                  {toast.message}
                </span>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
