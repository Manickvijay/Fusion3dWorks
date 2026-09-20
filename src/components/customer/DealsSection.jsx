import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight, Zap, Tag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';

export default function DealsSection() {
  const { products } = useShop();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products with good discounts
  const dealProducts = products.filter(p => p.discount).slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 animate-bounce text-orange-400" />
              <span>Flash Additive Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Limited-Time Maker Deals & Spool Bundles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Deep markdowns on high-flow PLA+, carbon fiber PETG, hardened nozzles, and build sheets.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-2xl backdrop-blur-md">
            <Clock className="w-5 h-5 text-orange-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-300 mr-2">Deals Expire In:</span>
            <div className="flex items-center space-x-1 font-mono font-bold text-sm">
              <span className="bg-slate-950 px-2 py-1 rounded-lg border border-slate-700 text-orange-400">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-950 px-2 py-1 rounded-lg border border-slate-700 text-orange-400">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-950 px-2 py-1 rounded-lg border border-slate-700 text-orange-400">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* View All Deals CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/offers"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs sm:text-sm font-bold transition-colors"
          >
            <Tag className="w-4 h-4 text-orange-400" />
            <span>View All Active Promo Coupons & Discounts</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
