import React from 'react';
import HeroBanner from '../components/customer/HeroBanner';
import CategoryGrid from '../components/customer/CategoryGrid';
import FeaturedPrinters from '../components/customer/FeaturedPrinters';
import DealsSection from '../components/customer/DealsSection';
import UseCaseSection from '../components/customer/UseCaseSection';
import CustomPrintCalculator from '../components/customer/CustomPrintCalculator';
import WhyChooseUs from '../components/customer/WhyChooseUs';
import TestimonialsSection from '../components/customer/TestimonialsSection';
import ProductCard from '../components/common/ProductCard';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export default function HomePage() {
  const { products } = useShop();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newReleases = products.filter(p => p.isFeatured || p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Banner with 3D CAD Orbit Viewport */}
      <HeroBanner />

      {/* 2. Main Category Visual Grid */}
      <CategoryGrid />

      {/* 3. Featured 3D Printers Spotlight */}
      <FeaturedPrinters />

      {/* 4. Limited Time Deals with Live Countdown */}
      <DealsSection />

      {/* 5. Best Sellers Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
                Top Rated by Additive Labs
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Maker Community Bestsellers
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Highest-rated spools, ruby-tipped nozzles, and textured PEI build plates.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>Explore full catalog</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Use Cases: Beginners, Makers, Engineers, Print Farms */}
      <UseCaseSection />

      {/* 7. Instant Custom 3D Slicing & Quote Calculator */}
      <CustomPrintCalculator />

      {/* 8. Why Choose Fusion3D Standards */}
      <WhyChooseUs />

      {/* 9. Verified Customer Testimonials */}
      <TestimonialsSection />
    </div>
  );
}
