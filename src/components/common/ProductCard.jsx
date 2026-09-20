import React from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Clock,
  ShoppingBag,
  Eye,
  Heart,
  Sparkles,
  Box
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useShop();
  const isWishlisted = (wishlist || []).includes(product.id);
  const [pulsing, setPulsing] = React.useState(false);

  // Derive default custom options
  const defaultSelectedColors = {};
  if (product.customizableSections && Array.isArray(product.customizableSections)) {
    product.customizableSections.forEach(section => {
      defaultSelectedColors[section.id] = section.defaultColor || (section.options && section.options[0]?.hex) || '#4F46E5';
    });
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      {
        quantity: 1,
        selectedColors: defaultSelectedColors,
        customText: product.allowCustomText ? 'CUSTOM NAME' : ''
      },
      e
    );
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPulsing(true);
    toggleWishlist(product.id);
    setTimeout(() => setPulsing(false), 400);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-250 flex flex-col overflow-hidden text-left">
      
      {/* Product Image Stage (Compact Aspect) */}
      <Link to={`/product/${product.id}`} className="relative aspect-square w-full bg-slate-100/70 overflow-hidden block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-400 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
              -{product.discountPercent}%
            </span>
          )}
          {product.badge && !product.discountPercent && (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-slate-900/85 text-white backdrop-blur-xs shadow-xs">
              {product.badge}
            </span>
          )}
          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-indigo-600/90 text-white backdrop-blur-xs flex items-center space-x-0.5 shadow-xs">
            <Clock className="w-2.5 h-2.5 mr-0.5" />
            <span>{product.printTime}</span>
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md shadow-xs transition-all duration-300 z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-105 shadow-sm'
              : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-white hover:scale-110'
          } ${pulsing ? 'animate-bounce' : ''}`}
          title={isWishlisted ? 'Remove from Saved' : 'Save to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 transition-transform duration-200 ${isWishlisted ? 'fill-rose-500 scale-110' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-2 bottom-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickView}
            className="w-full py-1.5 bg-slate-900/85 hover:bg-slate-900 text-white rounded-lg text-[11px] font-bold backdrop-blur-xs flex items-center justify-center space-x-1 shadow-md transition-all cursor-pointer"
          >
            <Eye className="w-3 h-3 text-indigo-400" />
            <span>Quick 3D</span>
          </button>
        </div>
      </Link>

      {/* Compact Product Details */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        
        <div className="space-y-1">
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-indigo-600 truncate max-w-[55%]">
              {product.categoryLabel || product.category}
            </span>
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
              <span>{Number(product.rating || 5.0).toFixed(1)}</span>
              <span className="text-slate-400 text-[9px] ml-0.5">({product.reviewsCount || 0})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Color Palette Indicators */}
        {product.customizableSections && product.customizableSections.length > 0 && product.customizableSections[0]?.options && (
          <div className="flex items-center space-x-1 pt-0.5">
            <div className="flex items-center space-x-1">
              {(product.customizableSections[0].options || []).slice(0, 5).map((color, idx) => (
                <div
                  key={color?.hex || `col-${idx}`}
                  className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: color?.hex || '#6366F1' }}
                  title={color?.name || 'Color'}
                />
              ))}
              {(product.customizableSections[0].options || []).length > 5 && (
                <span className="text-[8px] text-slate-400 font-bold">
                  +{(product.customizableSections[0].options || []).length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price & Add Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-1">
              <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] text-slate-400 line-through font-mono">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[11px] shadow-xs flex items-center space-x-1 transition-transform active:scale-95 cursor-pointer"
            title="Add to 3D Print Cart"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
}
