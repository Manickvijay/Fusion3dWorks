import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Phone,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login, register } = useShop();

  // Mode: 'login' | 'signup'
  const [activeTab, setActiveTab] = useState('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isLoginModalOpen) return null;

  const handleClose = () => {
    setErrorMessage('');
    setIsLoading(false);
    setIsLoginModalOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.message || 'Invalid email or password.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    const res = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      role
    });

    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.message || 'Registration failed. Please try a different email.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-6"
        >
          {/* Top Brand Banner */}
          <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white text-center overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-11 h-11 mx-auto mb-2.5 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>

            <h2 className="text-xl font-black tracking-tight">
              {activeTab === 'login' ? 'Welcome to Fusion3D Works' : 'Create Your Fusion3D Account'}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Live Authentication & 3D Print Farm Fleet
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              New User? Register
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* SIGN IN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
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
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* REGISTER / SIGN UP FORM */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number (Optional)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Account Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('customer')}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        role === 'customer'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 font-bold text-[11px]">
                        <User className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Customer</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">Order custom 3D prints</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        role === 'admin'
                          ? 'border-orange-600 bg-orange-50/70 text-orange-900'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 font-bold text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                        <span>3D Print Admin</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">Manage farm queue & fleet</p>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
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
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Confirm</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Register & Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Real DB note */}
            <div className="text-center pt-2 border-t border-slate-100">
              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Live Render PostgreSQL authentication enabled</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
