import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Scale, Eye, ShoppingCart, Check, Zap } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ProductCard({ product, layout = 'grid' }) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setQuickViewProduct
  } = useShop();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Spec highlight summary string
  const specHighlight = product.printSpeed || product.diameter || product.buildVolume || product.material || product.badge;

  if (layout === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all overflow-hidden flex flex-col sm:flex-row p-4 gap-4">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 bg-slate-50 rounded-xl overflow-hidden shrink-0">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {product.discount && (
            <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-md shadow-xs">
              {product.discount}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-indigo-600 uppercase tracking-wider">{product.brand}</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-medium">{product.categoryLabel}</span>
            </div>

            <Link to={`/product/${product.id}`} className="block">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {product.title}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center text-amber-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800 ml-1">{product.rating}</span>
              </div>
              <span className="text-slate-400 text-xs">({product.reviewCount} reviews)</span>
              {product.inStock ? (
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center ml-2">
                  <Check className="w-3 h-3 mr-0.5" /> In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-[11px] text-rose-500 font-semibold ml-2">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <span className="text-[10px] text-slate-500">Free shipping eligible</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-600'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Layout
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.discount && (
          <span className="px-2 py-0.5 text-[10px] font-extrabold bg-rose-500 text-white rounded-md shadow-xs uppercase tracking-wide">
            {product.discount}
          </span>
        )}
        {product.badge && (
          <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-900/90 text-white rounded-md shadow-xs backdrop-blur-xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleWishlist}
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 backdrop-blur-xs text-slate-700 hover:text-rose-600 hover:bg-white'
          }`}
          title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        <button
          onClick={handleCompare}
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
            isCompared
              ? 'bg-indigo-600 text-white scale-110'
              : 'bg-white/90 backdrop-blur-xs text-slate-700 hover:text-indigo-600 hover:bg-white'
          }`}
          title={isCompared ? 'In Compare' : 'Add to Compare'}
        >
          <Scale className="w-4 h-4" />
        </button>

        <button
          onClick={handleQuickView}
          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:text-indigo-600 hover:bg-white flex items-center justify-center shadow-md transition-all"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />
        {specHighlight && (
          <div className="absolute bottom-2 left-2 right-2 flex justify-start">
            <span className="inline-block text-[10px] font-semibold px-2 py-0.5 bg-white/90 backdrop-blur-xs text-slate-700 rounded-md border border-slate-200/60 shadow-2xs truncate">
              {specHighlight}
            </span>
          </div>
        )}
      </Link>

      {/* Body Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-bold text-indigo-600 tracking-wider uppercase text-[10px]">
              {product.brand}
            </span>
            <span className="text-slate-400 font-medium">
              {product.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-indigo-600 transition-colors">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-1.5 mt-2">
            <div className="flex items-center text-amber-400 text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800 ml-1 text-xs">{product.rating}</span>
            </div>
            <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="p-2 sm:px-3 sm:py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold flex items-center space-x-1 shadow-xs transition-all"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>
    </div>
  );
}
