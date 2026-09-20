import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Layers, CheckCircle2, Star, Sparkles, Filter } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { products } = useShop();

  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  // Products belonging to this category
  const categoryProducts = products.filter(p => p.category === category.id);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-indigo-600">Catalog</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{category.name}</span>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 mb-10 border border-slate-800 shadow-xl">
          <div className="absolute inset-0 z-0 opacity-25">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-0" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Additive Category Showcase</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {category.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {category.description}
            </p>

            {/* Subcategory Filter Pills */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedSubcategory === 'all'
                    ? 'bg-white text-slate-900 shadow-md font-bold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All ({categoryProducts.length})
              </button>
              {category.subcategories.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedSubcategory === sub
                      ? 'bg-indigo-600 text-white shadow-md font-bold'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Available Hardware & Consumables ({categoryProducts.length})
            </h2>
            <Link to="/shop" className="text-xs font-bold text-indigo-600 hover:underline">
              View across all categories &rarr;
            </Link>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-base font-bold text-slate-800">No items found in this category.</p>
              <Link to="/shop" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">
                Browse Full Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

        {/* Category Specific FAQs */}
        {category.faqs && category.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Frequently Asked Questions: {category.name}
            </h3>
            <div className="divide-y divide-slate-100">
              {category.faqs.map((faq, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="w-full flex justify-between items-center text-left text-sm font-bold text-slate-800 hover:text-indigo-600"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed animate-in fade-in-50">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
