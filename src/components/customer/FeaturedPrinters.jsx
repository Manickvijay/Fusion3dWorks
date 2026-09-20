import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Check, Zap, Scale, ShoppingCart, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function FeaturedPrinters() {
  const { products, addToCart, toggleCompare, isInCompare } = useShop();

  // Filter 3D printers
  const printers = products.filter(p => p.category === '3d-printers').slice(0, 3);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Flagship Hardware</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured 3D Printers & Industrial Stations
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Turnkey machines engineered with Klipper firmware, active input shaping, AI camera defect interception, and high-temp enclosed chambers.
            </p>
          </div>

          <Link
            to="/category/3d-printers"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            <span>Compare all 3D printers</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Printers Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {printers.map((printer) => {
            const isCompared = isInCompare(printer.id);

            return (
              <div
                key={printer.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-500 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
                    <img
                      src={printer.image}
                      alt={printer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      <span className="px-2.5 py-1 text-xs font-bold bg-indigo-600 text-white rounded-lg shadow-md">
                        {printer.badge || 'Featured'}
                      </span>
                      {printer.discount && (
                        <span className="px-2.5 py-0.5 text-xs font-extrabold bg-rose-500 text-white rounded-lg shadow-md">
                          Save {printer.discount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-bold text-indigo-600 uppercase tracking-wider">{printer.brand}</span>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800 ml-1 text-xs">{printer.rating}</span>
                        <span className="text-slate-400 ml-1">({printer.reviewCount})</span>
                      </div>
                    </div>

                    <Link to={`/product/${printer.id}`} className="block">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                        {printer.title}
                      </h3>
                    </Link>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-slate-50 rounded-2xl text-xs text-slate-600 border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Build Volume</span>
                        <strong className="text-slate-800 text-xs truncate block">{printer.buildVolume || '256x256x256 mm'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Max Speed</span>
                        <strong className="text-slate-800 text-xs truncate block">{printer.printSpeed || 'Up to 600 mm/s'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Technology</span>
                        <strong className="text-slate-800 text-xs truncate block">{printer.technology || 'CoreXY FDM'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Warranty</span>
                        <strong className="text-slate-800 text-xs truncate block">2 Years Guaranteed</strong>
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    {printer.highlights && (
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                        {printer.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black text-slate-900">${printer.price.toFixed(2)}</span>
                        {printer.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">${printer.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
                        <Check className="w-3 h-3 mr-0.5" /> Free Priority Freight
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleCompare(printer.id)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isCompared ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-200 text-slate-600 hover:text-indigo-600'
                        }`}
                        title="Compare printer"
                      >
                        <Scale className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => addToCart(printer, 1)}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
