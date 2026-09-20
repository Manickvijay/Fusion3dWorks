import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Wrench, Briefcase, Factory, CheckCircle2, ArrowRight } from 'lucide-react';
import { USE_CASES } from '../../data/categories';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';

const ICON_MAP = {
  Sparkles: Sparkles,
  Wrench: Wrench,
  Briefcase: Briefcase,
  Factory: Factory
};

export default function UseCaseSection() {
  const [activeTab, setActiveTab] = useState(USE_CASES[0].id);
  const { products } = useShop();

  const currentCase = USE_CASES.find(c => c.id === activeTab) || USE_CASES[0];

  // Filter recommended products
  const recommendedItems = products.filter(p =>
    currentCase.recommendedProducts.includes(p.id)
  );

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs block mb-1">
            Tailored 3D Hardware Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Designed for Every Stage of Your Additive Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Whether you are printing your first miniature, modding a Voron 2.4 CoreXY, or operating a 50-printer manufacturing farm.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {USE_CASES.map((uc) => {
            const Icon = ICON_MAP[uc.icon] || Sparkles;
            const isActive = activeTab === uc.id;

            return (
              <button
                key={uc.id}
                onClick={() => setActiveTab(uc.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-2 border transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 scale-102'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
                <span>{uc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Use Case Spotlight */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-orange-100 text-orange-800 font-bold text-xs">
                {currentCase.badge}
              </span>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {currentCase.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentCase.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-xs text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Curated hardware configurations & calibrated slicing profiles</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct technical onboarding & 1-on-1 maker consultation</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full spare parts availability with next-day dispatch</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  <span>Explore Suitable Equipment</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

            {/* Right: Recommended Products */}
            <div className="lg:col-span-7">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Recommended Hardware & Materials:
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedItems.slice(0, 2).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
