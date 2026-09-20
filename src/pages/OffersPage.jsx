import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Copy, CheckCircle2, Percent, ArrowRight, Sparkles, Gift } from 'lucide-react';
import { COUPONS } from '../data/coupons';
import { useShop } from '../context/ShopContext';

export default function OffersPage() {
  const { applyCouponCode, addToast, appliedCoupon } = useShop();

  const handleCopyAndApply = (coupon) => {
    navigator.clipboard?.writeText(coupon.code);
    applyCouponCode(coupon.code);
    addToast(`Coupon "${coupon.code}" copied & applied to your cart!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Special Offers & Vouchers</span>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-indigo-700/50 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" />
              <span>Additive Maker Savings</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Exclusive Coupons, Vouchers & Bundle Deals
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Unlock savings on precision CoreXY printers, bulk filament spools, and hardened replacement parts with our verified discount vouchers.
            </p>
          </div>
        </div>

        {/* Active Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {COUPONS.map((c) => {
            const isCurrentlyApplied = appliedCoupon?.code === c.code;

            return (
              <div
                key={c.code}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between shadow-xs ${
                  isCurrentlyApplied ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-indigo-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-50 text-indigo-600 uppercase tracking-wider">
                      {c.type === 'percentage' ? `${c.value}% OFF` : `$${c.value} OFF`}
                    </span>
                    {isCurrentlyApplied && (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Applied to Cart
                      </span>
                    )}
                  </div>

                  {/* Code Card */}
                  <div className="p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-between mb-4">
                    <span className="text-base font-black font-mono text-slate-900 tracking-wider">
                      {c.code}
                    </span>
                    <button
                      onClick={() => handleCopyAndApply(c)}
                      className="p-1.5 bg-white hover:bg-slate-100 text-indigo-600 rounded-lg border border-slate-200 shadow-xs transition-colors"
                      title="Copy code & apply"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {c.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 space-y-1">
                    <p>Minimum Purchase: <strong className="text-slate-700">${c.minSubtotal}</strong></p>
                    <p>Valid Through: <strong className="text-slate-700">{c.expiresAt}</strong></p>
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <button
                    onClick={() => handleCopyAndApply(c)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>Apply to Current Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volume & University Discounts Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Bulk & Educational Discounts
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Operating a 3D Print Farm, University Lab, or School?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              We offer wholesale spool pricing (10+ rolls), tax-exempt purchase order support, and NET 30 invoicing terms for educational institutions.
            </p>
          </div>

          <Link
            to="/support"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md whitespace-nowrap transition-colors"
          >
            Apply for Educational Tier &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
