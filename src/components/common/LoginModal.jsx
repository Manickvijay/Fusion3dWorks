import React, { useState } from 'react';
import { X, Mail, Lock, User, LogIn, AlertCircle, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login, register } = useShop();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        if (!formData.name.trim()) {
          setErrorMsg('Please enter your full name.');
          setIsSubmitting(false);
          return;
        }
        const res = await register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });
        if (!res?.success) {
          setErrorMsg(res?.message || 'Registration failed. Please try again.');
        }
      } else {
        const res = await login(formData.email.trim(), formData.password);
        if (!res?.success) {
          setErrorMsg(res?.message || 'Invalid email or password.');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (email, password) => {
    setFormData({
      name: email === 'admin@gmail.com' ? 'Admin David' : 'Alex Rivera',
      email,
      password,
    });
    setErrorMsg('');
    setIsRegisterMode(false);
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setErrorMsg('');
  };

  return (
    <div
      id="login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      onClick={handleClose}
    >
      <div
        id="login-modal-card"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {isRegisterMode ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-indigo-100 mt-0.5">
              {isRegisterMode
                ? 'Join Fusion3D to track orders and save 3D designs'
                : 'Sign in to access your dashboard and tracked orders'}
            </p>
          </div>
          <button
            id="close-login-modal-button"
            type="button"
            onClick={handleClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMsg && (
            <div
              id="login-error-banner"
              className="mb-4 flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="register-name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    required={isRegisterMode}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-password-input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800"
                />
              </div>
            </div>

            <button
              id="submit-auth-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium text-sm rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{isRegisterMode ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Fill Demo Credentials */}
          {!isRegisterMode && (
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Quick demo fill:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="quick-demo-admin-button"
                  type="button"
                  onClick={() => handleQuickFill('admin@gmail.com', 'admin123')}
                  className="text-xs py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium text-left truncate"
                >
                  Admin (David)
                </button>
                <button
                  id="quick-demo-user-button"
                  type="button"
                  onClick={() => handleQuickFill('user@gmail.com', 'user123')}
                  className="text-xs py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium text-left truncate"
                >
                  Customer (Alex)
                </button>
              </div>
            </div>
          )}

          {/* Toggle Login / Register */}
          <div className="mt-5 text-center text-xs text-slate-600">
            {isRegisterMode ? (
              <span>
                Already have an account?{' '}
                <button
                  id="switch-to-login-button"
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(false);
                    setErrorMsg('');
                  }}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
                >
                  Sign in here
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  id="switch-to-register-button"
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(true);
                    setErrorMsg('');
                  }}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
                >
                  Create one now
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
