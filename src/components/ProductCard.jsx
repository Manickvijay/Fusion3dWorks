import { useState } from 'react';
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Box
} from 'lucide-react';

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-md border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white text-gray-400 hover:text-rose-600 shadow-xs border border-gray-100 transition-all hover:scale-110"
        title="Add to Wishlist"
      >
        <Heart
          className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`}
        />
      </button>

      {/* Visual Product Display / 3D Viewer trigger */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative bg-white p-6 flex flex-col items-center justify-center min-h-[190px] cursor-pointer overflow-hidden border-b border-gray-100"
      >
        <div className="relative group-hover:scale-105 transition-transform duration-300 flex flex-col items-center">
          <div
            className="w-28 h-28 rounded-xl shadow-md flex items-center justify-center border border-gray-100 transition-all"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${product.color || '#2563eb'}, #0f172a)`
            }}
          >
            <Box className="w-14 h-14 text-white/90 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wider">
            {product.technology}
          </span>
        </div>

        {/* Hover "Interactive 3D" Pill */}
        <div className={`absolute bottom-2 inset-x-3 py-1.5 rounded-xs bg-[#2874f0] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive 3D View</span>
        </div>
      </div>

      {/* Product Content Details (Flipkart format) */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-semibold text-sm text-gray-900 line-clamp-2 hover:text-[#2874f0] cursor-pointer leading-snug"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Material & specs subtitle */}
          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
            {product.material} • {product.weight}
          </p>

          {/* Rating Badge + Flipkart Assured */}
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-[#388e3c] text-white text-[11px] font-bold">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-current" />
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ({(product.ratingCount || 120).toLocaleString('en-IN')})
            </span>

            {product.isAssured && (
              <span className="ml-auto inline-flex items-center text-[11px] font-bold italic tracking-tighter text-[#2874f0]">
                <span>f-assured</span>
                <span className="ml-0.5 text-yellow-500 font-black">★</span>
              </span>
            )}
          </div>
        </div>

        {/* Pricing Block (Flipkart format) */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-[#388e3c]">
              {product.discount}
            </span>
          </div>

          {/* Delivery tag */}
          <div className="flex items-center gap-1 text-[11px] text-gray-600 mt-1">
            <span className="text-emerald-700 font-semibold">Free delivery</span>
            <span>•</span>
            <span className="truncate">{product.fastDelivery || 'Tomorrow'}</span>
          </div>

          {/* Quick Actions Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={() => onSelectProduct(product)}
              className="py-1.5 px-2 rounded-xs border border-gray-300 text-gray-700 hover:border-[#2874f0] hover:text-[#2874f0] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <button
              type="button"
              onClick={() => onAddToCart(product, 1)}
              className="py-1.5 px-2 rounded-xs bg-[#ff9f00] hover:bg-[#f59700] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
