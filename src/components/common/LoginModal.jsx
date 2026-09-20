import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, ShieldCheck, Mail, Lock, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useShop();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = login(email, password);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  const handleQuickCustomer = () => {
    setEmail('user@gmail.com');
    setPassword('Pass1234');
    login('user@gmail.com', 'Pass1234');
  };

  const handleQuickAdmin = () => {
    setEmail('admin@gmail.com');
    setPassword('Pass1234');
    login('admin@gmail.com', 'Pass1234');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLoginModalOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 text-white text-center overflow-hidden">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>

            <h2 className="text-xl font-black tracking-tight">
              {isSignUp ? 'Create Fusion3D Account' : 'Welcome to Fusion3D Works'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Print your imagination with precision custom 3D models
            </p>
          </div>

          <div className="p-6 space-y-5">
            
            {/* Demo Credentials Box (Mandated by user prompt) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Demo Quick-Access Credentials
                </span>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                  1-Click Fill
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Customer Demo Box */}
                <button
                  type="button"
                  onClick={handleQuickCustomer}
                  className="text-left p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/60 hover:border-indigo-400 transition-all group"
                >
                  <div className="flex items-center space-x-1.5 text-indigo-700 font-bold text-[11px] mb-1">
                    <User className="w-3.5 h-3.5" />
                    <span>Customer Role</span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-600 font-semibold truncate">user@gmail.com</div>
                  <div className="font-mono text-[10px] text-slate-400">Pass: Pass1234</div>
                </button>

                {/* Admin Demo Box */}
                <button
                  type="button"
                  onClick={handleQuickAdmin}
                  className="text-left p-2.5 rounded-xl border border-orange-200 bg-orange-50/50 hover:bg-orange-100/60 hover:border-orange-400 transition-all group"
                >
                  <div className="flex items-center space-x-1.5 text-orange-700 font-bold text-[11px] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Portal</span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-600 font-semibold truncate">admin@gmail.com</div>
                  <div className="font-mono text-[10px] text-slate-400">Pass: Pass1234</div>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="user@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-xs font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>{isSignUp ? 'Sign Up & Start Printing' : 'Sign In to Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign Up / Login */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                {isSignUp
                  ? 'Already have an account? Sign in here'
                  : "Don't have an account? Create one now"}
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
