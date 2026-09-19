import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function HeroBanner({ onOpenCustomQuote, onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  const slides = [
    {
      id: 1,
      badge: 'FUSION MEGA 3D FESTIVAL',
      title: 'India’s Precision 3D Printing Superstore',
      subtitle: 'From medical anatomy models to industrial carbon-nylon mechanical assemblies, get high-precision additive manufacturing in 24 hours.',
      offer: 'Up to 50% Off + Free Dimensional Inspection',
      ctaText: 'Explore 3D Catalog',
      ctaAction: () => onSelectCategory('all'),
      secondaryText: 'Upload STL File',
      secondaryAction: onOpenCustomQuote,
      gradient: 'from-blue-900 via-indigo-900 to-slate-950',
      accentColor: 'text-cyan-400',
      tag: '🔥 10,000+ Orders Shipped'
    },
    {
      id: 2,
      badge: 'INSTANT CAD QUOTATION',
      title: 'Instant 3D Print Quote & Slicing in 10 Seconds',
      subtitle: 'Drag and drop any STL, OBJ, or STEP file. Select your material from PLA, PETG-CF, or 8K Tough Resin and receive real-time pricing.',
      offer: 'Rates starting as low as ₹3.50 per gram',
      ctaText: 'Calculate Print Cost',
      ctaAction: onOpenCustomQuote,
      secondaryText: 'View Engineering Parts',
      secondaryAction: () => onSelectCategory('mechanical'),
      gradient: 'from-slate-900 via-sky-950 to-blue-950',
      accentColor: 'text-amber-400',
      tag: '⚡ 0.08mm Ultra-Tolerance'
    },
    {
      id: 3,
      badge: 'MEDICAL & SURGICAL 3D',
      title: 'Certified Anatomical & Pre-Op Planning Models',
      subtitle: 'True-to-life 1:1 scale heart, bone, and organ prototypes converted directly from DICOM CT/MRI scans with confidentiality.',
      offer: 'Trusted by over 140+ Hospitals & Universities',
      ctaText: 'Browse Medical Models',
      ctaAction: () => onSelectCategory('medical'),
      secondaryText: 'Request Custom Scan',
      secondaryAction: onOpenCustomQuote,
      gradient: 'from-indigo-950 via-purple-950 to-slate-950',
      accentColor: 'text-emerald-400',
      tag: '🩺 100% Scan Accurate'
    }
  ];

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Deal of the day countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4">
      {/* Main Carousel Banner */}
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${slide.gradient} text-white p-6 sm:p-10 shadow-lg min-h-[300px] sm:min-h-[340px] flex flex-col justify-between transition-all duration-700`}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40"></div>

        {/* Top Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-white border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{slide.badge}</span>
          </div>
          <span className="hidden sm:inline-block text-xs font-medium text-slate-300 px-2.5 py-0.5 rounded bg-black/30 border border-white/10 font-mono">
            {slide.tag}
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 my-4 max-w-2xl space-y-2.5">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {slide.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {slide.subtitle}
          </p>
          <div className={`text-sm sm:text-base font-bold ${slide.accentColor} flex items-center gap-1.5 pt-1`}>
            <Zap className="w-4 h-4 fill-current" />
            <span>{slide.offer}</span>
          </div>
        </div>

        {/* Buttons & Slider Nav */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={slide.ctaAction}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-900/50 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={slide.secondaryAction}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-colors"
            >
              {slide.secondaryText}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Left / Right Nav Arrows */}
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-colors backdrop-blur-xs hidden sm:flex"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-colors backdrop-blur-xs hidden sm:flex"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Lightning Deals Ticker & Value Props (Flipkart & Amazon Hybrid Bar) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Deal countdown block */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-3 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 animate-spin" />
            <div>
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-amber-100">
                Lightning Deals
              </div>
              <div className="text-xs font-bold">Ends in</div>
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono font-black text-sm bg-black/25 px-2.5 py-1 rounded-md">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Feature 1 */}
        <div className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">24-48 Hr Fast Delivery</div>
            <div className="text-[11px] text-gray-700">Free PAN India above ₹999</div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Fusion Assured QC</div>
            <div className="text-[11px] text-gray-700">±0.08mm Laser Verified</div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Free Reprint Guarantee</div>
            <div className="text-[11px] text-gray-700">If dimensional defect found</div>
          </div>
        </div>
      </div>
    </div>
  );
}
