import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Printer, Disc, FlaskConical, Cpu, Wrench, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

const ICON_MAP = {
  '3d-printers': Printer,
  'filaments': Disc,
  'resins': FlaskConical,
  'spare-parts': Cpu,
  'accessories': Layers,
  'tools': Wrench,
  'custom-prints': Sparkles
};

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Explore Additive Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Browse by 3D Printing Category
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              From flagship CoreXY machines to sub-micron photopolymer resins, source everything needed for high-fidelity additive fabrication.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors group"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.id] || Layers;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Banner */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Category icon pill */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-orange-400 flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Subcategories count badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/20">
                      {cat.subcategories.length} Collections
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Subcategory Pills */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md truncate max-w-[140px]"
                      >
                        {sub}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] font-semibold text-indigo-600 px-1 py-0.5">
                        +{cat.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
