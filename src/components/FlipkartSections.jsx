import { useState, useEffect } from 'react';
import {
  Clock,
  ShieldCheck,
  RotateCcw,
  Truck,
  CreditCard,
  Sparkles,
  Zap,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function FlipkartSections({
  products,
  onSelectProduct,
  onOpenCustomQuote,
  onSelectCategory
}) {
  // Live Flipkart Flash Deal Countdown Timer (Simulated)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 36, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealsProducts = products.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 1. Flipkart Bank Offers Strip */}
      <div className="bg-gradient-to-r from-blue-700 via-[#2874f0] to-indigo-600 rounded-xl p-3 sm:p-4 text-white shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-yellow-300">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-yellow-300">
                Flipkart Bank Festival Offers
              </span>
              <span className="text-[10px] bg-yellow-400 text-slate-900 font-bold px-1.5 py-0.2 rounded">
                LIVE
              </span>
            </div>
            <p className="text-xs text-blue-100">
              10% Instant Discount on Axis Bank, ICICI &amp; SBI Cards • 5% Unlimited Cashback on Flipkart Axis Bank Card
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="hidden md:inline text-blue-200">Flipkart Pay Later: ₹1,00,000 Credit</span>
          <button
            type="button"
            onClick={onOpenCustomQuote}
            className="px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-xs shadow-xs transition-transform active:scale-95"
          >
            Apply Offer
          </button>
        </div>
      </div>

      {/* 2. Flipkart "Deals of the Day" with Countdown Timer (Iconic Flipkart layout) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Deal Header */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>Deals of the Day</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Extra 15% Off</span>
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono bg-gray-100 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-[#2874f0]" />
              <span className="font-bold text-gray-800">
                {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')} Left
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="px-4 py-1.5 rounded bg-[#2874f0] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            VIEW ALL
          </button>
        </div>

        {/* Deals Row */}
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {dealsProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="group cursor-pointer p-3 rounded-lg hover:shadow-md border border-transparent hover:border-gray-200 transition-all flex flex-col items-center text-center"
            >
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${prod.color || '#2563eb'}15` }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: prod.color || '#2563eb' }}
                >
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[#2874f0] transition-colors">
                {prod.title}
              </h3>
              <div className="text-xs font-bold text-emerald-600 mt-1">
                From ₹{prod.price?.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                {prod.categoryLabel || '3D Parts'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Flipkart 3-Column Promotional Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={onOpenCustomQuote}
          className="cursor-pointer bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-xl p-5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all"
        >
          <div className="relative z-10 space-y-2 max-w-[70%]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-400 bg-white/10 px-2 py-0.5 rounded">
              CUSTOM LAB
            </span>
            <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors">
              Upload Your CAD / STL File
            </h3>
            <p className="text-xs text-blue-200">
              Instant volumetric slicer calculation from ₹3.5/gram with 24-hr turnaround.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-yellow-400 group-hover:translate-x-1 transition-transform">
              <span>Calculate Quote Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-blue-500/20 group-hover:scale-125 transition-transform" />
        </div>

        <div
          onClick={() => onSelectCategory('mechanical')}
          className="cursor-pointer bg-gradient-to-br from-amber-700 to-orange-800 text-white rounded-xl p-5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all"
        >
          <div className="relative z-10 space-y-2 max-w-[70%]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200 bg-white/10 px-2 py-0.5 rounded">
              ROBOTICS &amp; GEARS
            </span>
            <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
              High-Torque Planetary Kits
            </h3>
            <p className="text-xs text-amber-100">
              Engineered carbon-fiber and self-lubricating nylon functional assemblies.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-yellow-300 group-hover:translate-x-1 transition-transform">
              <span>Explore Mechanics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-amber-500/20 group-hover:scale-125 transition-transform" />
        </div>

        <div
          onClick={() => onSelectCategory('medical')}
          className="cursor-pointer bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-xl p-5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all"
        >
          <div className="relative z-10 space-y-2 max-w-[70%]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200 bg-white/10 px-2 py-0.5 rounded">
              MEDICAL GRADE
            </span>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-200 transition-colors">
              Anatomical Scan Models
            </h3>
            <p className="text-xs text-emerald-100">
              High-resolution 120-micron CT scan replicas for clinical demonstration.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
              <span>Shop Anatomy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-emerald-500/20 group-hover:scale-125 transition-transform" />
        </div>
      </div>

      {/* 4. Flipkart Value Promises & Trust Badges */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-center">
          <div className="p-2 space-y-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900">100% Authentic Quality</div>
            <p className="text-[11px] text-gray-500">Every part inspected by laser micrometers</p>
          </div>

          <div className="p-2 space-y-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900">7 Days Free Replacement</div>
            <p className="text-[11px] text-gray-500">Zero-hassle reprint if defects detected</p>
          </div>

          <div className="p-2 space-y-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900">Free Express Delivery</div>
            <p className="text-[11px] text-gray-500">On all qualified orders above ₹999</p>
          </div>

          <div className="p-2 space-y-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900">24x7 Customer Support</div>
            <p className="text-[11px] text-gray-500">Dedicated engineering &amp; order assistance</p>
          </div>
        </div>
      </div>

      {/* 5. Flipkart Informational SEO & Platform Content Directory */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4 text-xs text-gray-600 leading-relaxed">
        <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wide">
          Flipkart: India's Leading Online Marketplace &amp; 3D Manufacturing Hub
        </h3>
        <p>
          Welcome to the new era of online shopping with Flipkart and Fusion3D Works. Whether you are looking for functional engineering components, medical anatomical study casts, cosplay accessories, or high-flow 3D printing filaments, our platform brings together top-tier industrial additive manufacturing with the unmatched convenience of Flipkart delivery, Flipkart Assured guarantees, and safe payment choices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100 text-[11px]">
          <div>
            <span className="font-bold text-gray-800 block mb-1">What is Flipkart Assured (f-assured)?</span>
            <p>
              Products marked with the Flipkart Assured badge undergo stringent 6-point quality checks including dimensional inspection, infill verification, high-temperature resistance testing, and premium protective foam packaging for safe transit across 19,000+ Indian postal pincodes.
            </p>
          </div>
          <div>
            <span className="font-bold text-gray-800 block mb-1">No Cost EMI &amp; Easy Payment Modes</span>
            <p>
              Enjoy flexible financing with No-Cost EMI on major credit cards, UPI instant checkout (Google Pay, PhonePe, Paytm), NetBanking, and Cash on Delivery (COD) on eligible orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
