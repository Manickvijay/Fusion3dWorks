import { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Repeat,
  Clock,
  Flame
} from 'lucide-react';

export default function GromuseProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 270,
    hours: 13,
    minutes: 10,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) return null;

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image, product.image, product.image, product.image];

  // Format price
  const formattedPrice = Number(product.price).toFixed(2);
  const [dollars, cents] = formattedPrice.split('.');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Gallery & Badges */}
          <div className="relative flex flex-col items-center">
            {/* 70% Discount round badge matching video */}
            <div className="absolute top-2 left-2 z-10 w-16 h-16 rounded-full bg-[#1e3a8a] text-white flex flex-col items-center justify-center text-center p-1 font-black shadow-lg">
              <span className="text-xs leading-none">70%</span>
              <span className="text-[9px] font-bold tracking-wider leading-none mt-0.5">DISCOUNT</span>
            </div>

            {/* Main Featured Image */}
            <div className="w-full h-72 sm:h-84 flex items-center justify-center p-4 rounded-2xl bg-gray-50/50">
              <img
                src={galleryImages[selectedImageIdx]}
                alt={product.title}
                className="max-h-full max-w-full object-contain drop-shadow-md transition-all duration-300"
              />
            </div>

            {/* Thumbnails row below */}
            <div className="flex items-center gap-3 mt-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-14 h-14 rounded-xl border-2 p-1 bg-white overflow-hidden transition-all ${
                    selectedImageIdx === idx
                      ? 'border-emerald-500 shadow-sm scale-105'
                      : 'border-gray-200 hover:border-gray-300 opacity-70'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${idx}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Red active indicator dots */}
            <div className="flex gap-1.5 mt-3">
              {galleryImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    selectedImageIdx === idx ? 'w-6 bg-rose-500' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Product details & actions */}
          <div className="space-y-4">
            {/* Countdown Deal Timer */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full w-fit border border-gray-100">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>
                {timeLeft.days} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            <div>
              <span className="text-xs text-gray-400 font-medium">
                {product.vendor || 'Bevino grocery'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="font-bold text-gray-900">{product.rating || 4.5}</span>
              <span>Rating ({product.reviewsCount || 15} reviews)</span>
            </div>

            {/* Big Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {dollars}.
              </span>
              <span className="text-xl font-bold text-gray-900">
                {cents}$
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, 1);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl border-2 border-gray-900 hover:bg-gray-900 hover:text-white font-bold text-xs sm:text-sm text-gray-900 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to bucket</span>
                </button>

                {/* Tamara Button */}
                <button
                  type="button"
                  onClick={() => {
                    onBuyNow?.(product);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-[#86efac] hover:bg-[#4ade80] font-black text-xs sm:text-sm text-emerald-950 flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Buy with</span>
                  <span className="italic font-extrabold tracking-wider">tamara</span>
                </button>
              </div>

              {/* Wishlist & Compare buttons */}
              <div className="flex items-center gap-6 pt-2 text-xs text-gray-600 font-semibold">
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  className="flex items-center gap-1.5 hover:text-rose-600 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'IN WISHLIST' : 'ADD TO WISHLIST'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Product comparison feature is ready!')}
                  className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
                >
                  <Repeat className="w-4 h-4" />
                  <span>Compare with other vendor</span>
                </button>
              </div>
            </div>

            {/* Sold in last hours badge & progress bar */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold">
                <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>{product.soldCount || '100 sold in last 35 hour'}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-rose-500 rounded-full" />
              </div>
            </div>

            {/* SKU and categories */}
            <div className="text-xs text-gray-500 space-y-1 pt-1">
              <div>
                <strong className="text-gray-900">SKU:</strong> {product.sku || 'MB3442'}
              </div>
              <div>
                <strong className="text-gray-900">Categories:</strong>{' '}
                {(product.categoriesList || ['Fruits', 'Hoodies', 'Juice', 'Snacks', 'Tshirts']).join(', ')}
              </div>
            </div>

            {/* Product description */}
            <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
              {product.description || 'Coconut Oil is a great-tasting, nutritious alternative to use when cooking or baking. Coconut Oil is a naturally rich source of medium chain triglycerides (MCTs).'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
