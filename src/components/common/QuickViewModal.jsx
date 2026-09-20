import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Star, ShoppingCart, Heart, Scale, Check, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare
  } = useShop();

  const navigate = useNavigate();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const currentImage = activeImage || product.image;

  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, selectedColor);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            
            {/* Left: Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl bg-slate-50 overflow-hidden border border-slate-200 relative">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold bg-rose-500 text-white rounded-lg">
                    {product.discount}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        currentImage === img ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Service Badges */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="flex items-center space-x-1.5 p-2 bg-slate-50 rounded-xl">
                  <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Free shipping on orders $49+</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-slate-50 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2-Year Factory Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Controls */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-indigo-600 uppercase tracking-wider">{product.brand}</span>
                  <span className="text-slate-400 font-medium">{product.categoryLabel}</span>
                </div>

                <h2 className="text-xl font-black text-slate-900 leading-snug">
                  {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-slate-800 ml-1 text-sm">{product.rating}</span>
                  </div>
                  <span className="text-slate-400 text-xs">({product.reviewCount} customer reviews)</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-emerald-600 text-xs font-semibold flex items-center">
                    <Check className="w-3.5 h-3.5 mr-0.5" /> In Stock ({product.stock} units)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3 mt-4">
                  <span className="text-3xl font-black text-slate-900">${currentPrice.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      Save {product.discount}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Variants if any */}
                {product.variants && (
                  <div className="mt-4">
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Package / Edition:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            selectedVariant?.name === v.name
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {v.name} (${v.price.toFixed(2)})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color choices if any */}
                {product.availableColors && (
                  <div className="mt-4">
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Spool / Filament Color: {selectedColor?.name || product.availableColors[0].name}
                    </label>
                    <div className="flex items-center space-x-2">
                      {product.availableColors.map((col, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(col)}
                          className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                            (selectedColor?.name || product.availableColors[0].name) === col.name
                              ? 'border-indigo-600 scale-110 ring-2 ring-indigo-200'
                              : 'border-slate-200 hover:scale-105'
                          }`}
                          title={col.name}
                        >
                          <span
                            className="w-full h-full rounded-full block border border-slate-300"
                            style={{ backgroundColor: col.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Actions */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add ${(currentPrice * quantity).toFixed(2)} to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-300 text-slate-600 hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>

                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isCompared ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-300 text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    <Scale className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    <span>View full specs, box contents & reviews</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
