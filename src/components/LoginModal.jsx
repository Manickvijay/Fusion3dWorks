import { useState } from 'react';
import { X, ShieldCheck, ArrowRight, User, Lock, Mail } from 'lucide-react';

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleQuickCustomer = () => {
    onLoginSuccess({
      id: 'USR-1001',
      name: 'Manick Vijay',
      email: 'manickvijay596@gmail.com',
      phone: '+91 98765 43210',
      role: 'customer'
    });
    onClose();
  };

  const handleQuickAdmin = () => {
    onLoginSuccess({
      id: 'USR-ADMIN',
      name: 'Manick Vijay (Admin)',
      email: 'admin@flipkart.com',
      phone: '+91 98765 43210',
      role: 'admin'
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhone.trim()) {
      setError('Please enter a valid Email ID or Mobile Number');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (isOtpMode) {
      if (otpValue.length < 4) {
        setError('Please enter valid 4-digit OTP (e.g. 1234)');
        return;
      }
    }

    // Determine role based on email/identifier
    const isAdmin = emailOrPhone.toLowerCase().includes('admin') || emailOrPhone.toLowerCase().includes('flipkart.com');
    const userDisplayName = isSignUp ? fullName : (emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Customer');

    onLoginSuccess({
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: userDisplayName,
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@mobile.in`,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : '+91 98765 43210',
      role: isAdmin ? 'admin' : 'customer'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[480px]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Teal Gromuse Column */}
        <div className="w-full md:w-2/5 bg-[#0d4243] text-white p-7 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <h2 className="text-2xl font-bold tracking-tight">
              {isSignUp ? "Looks like you're new here!" : 'Login'}
            </h2>
            <p className="text-emerald-100 text-sm leading-relaxed">
              {isSignUp
                ? 'Sign up with your mobile number to get started with Gromuse express grocery delivery.'
                : 'Get access to your Orders, Wishlist, Express 15-min delivery and organic groceries.'}
            </p>
          </div>

          {/* Gromuse Visual Decorative Graphic */}
          <div className="py-6 flex flex-col items-center justify-center relative z-10">
            <div className="w-24 h-24 rounded-full bg-emerald-500/30 border border-emerald-300/30 flex items-center justify-center mb-2 shadow-inner">
              <ShieldCheck className="w-12 h-12 text-[#86efac]" />
            </div>
            <div className="text-[11px] text-emerald-100 font-medium tracking-wide text-center">
              100% Secure &amp; Authentic Gromuse Platform
            </div>
          </div>

          {/* Quick Demo Logins Pill */}
          <div className="pt-2 border-t border-emerald-400/30 text-xs text-emerald-100 relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#86efac] block mb-1.5">
              1-Click Demo Logins:
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={handleQuickCustomer}
                className="w-full py-1.5 px-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>⚡ Customer (Manick)</span>
                <ArrowRight className="w-3 h-3 text-[#86efac]" />
              </button>
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="w-full py-1.5 px-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold text-left flex items-center justify-between transition-colors shadow-xs cursor-pointer"
              >
                <span>🛡️ Admin Portal (Full Access)</span>
                <ArrowRight className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>

          {/* Background circles */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-600/30 pointer-events-none" />
          <div className="absolute top-10 -right-10 w-32 h-32 rounded-full bg-teal-400/20 pointer-events-none" />
        </div>

        {/* Right Form Column */}
        <div className="w-full md:w-3/5 p-7 flex flex-col justify-between bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
                {error}
              </div>
            )}

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-3 py-2 text-sm border-b-2 border-gray-200 focus:border-[#0d4243] outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Enter Email / Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Enter Email or 10-digit mobile number"
                  className="w-full pl-9 pr-3 py-2 text-sm border-b-2 border-gray-200 focus:border-[#0d4243] outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {isOtpMode ? (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-600">
                    Enter OTP sent to your number
                  </label>
                  <span className="text-[11px] text-emerald-700 font-medium cursor-pointer">
                    Resend in 24s
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    placeholder="Enter OTP (demo: 1234)"
                    className="w-full pl-9 pr-3 py-2 text-sm tracking-widest font-mono border-b-2 border-gray-200 focus:border-[#2874f0] outline-none transition-colors"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Tip: Any 4-digit code works for instant demo verification.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Password (Optional for OTP login)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password or leave blank for OTP"
                    className="w-full pl-9 pr-3 py-2 text-sm border-b-2 border-gray-200 focus:border-[#2874f0] outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <p className="text-[11px] text-gray-500 leading-normal pt-1">
              By continuing, you agree to Gromuse's{' '}
              <span className="text-emerald-700 cursor-pointer hover:underline">Terms of Use</span> and{' '}
              <span className="text-emerald-700 cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0d4243] hover:bg-[#115e59] text-white text-sm font-bold shadow-md transition-all active:scale-98 cursor-pointer"
            >
              {isOtpMode ? 'Verify & Continue' : (isSignUp ? 'CONTINUE' : 'Request OTP / Login')}
            </button>

            {!isOtpMode && (
              <button
                type="button"
                onClick={() => setIsOtpMode(true)}
                className="w-full py-2.5 rounded-xl border border-gray-300 text-emerald-800 text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Login with Instant OTP
              </button>
            )}
          </form>

          {/* Bottom Switcher */}
          <div className="pt-4 mt-4 border-t border-gray-100 text-center">
            {isSignUp ? (
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setIsOtpMode(false);
                }}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Existing User? Log in
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setIsOtpMode(false);
                }}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                New to Gromuse? Create an account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
