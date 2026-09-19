import { useState } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  Zap,
  Truck,
  CheckCircle2,
  Tag,
  MapPin,
  Heart,
  Share2
} from 'lucide-react';
import ModelViewer from './ModelViewer';

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  pincode,
  city
}) {
  const [selectedColor, setSelectedColor] = useState(
    product?.availableColors?.[0] || { name: 'Default', hex: product?.color || '#2563eb' }
  );
  const [quantity, setQuantity] = useState(1);
  const [inputPincode, setInputPincode] = useState(pincode || '560001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAdd = () => {
    const customizedProduct = {
      ...product,
      color: selectedColor.hex,
      selectedColorName: selectedColor.name,
      quantity
    };
    onAddToCart(customizedProduct, quantity);
  };

  const handleBuy = () => {
    const customizedProduct = {
      ...product,
      color: selectedColor.hex,
      selectedColorName: selectedColor.name,
      quantity
    };
    onBuyNow(customizedProduct, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-8">
          {/* Left Column: Interactive 3D Studio & Finishes (5 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-slate-900">
              <ModelViewer
                url={product.modelUrl}
                modelType={product.modelType}
                proceduralType={product.proceduralType}
                initialColor={selectedColor.hex}
                height="420px"
              />
            </div>

            {/* Color & Material Finish Variants */}
            {product.availableColors && (
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-800">
                    Selected Finish: <strong className="text-blue-700">{selectedColor.name}</strong>
                  </span>
                  <span className="text-[11px] text-gray-700 font-mono">Updates 3D View</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((col) => (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        selectedColor.hex === col.hex
                          ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-300"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Specs Micro-Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                <span className="text-[10px] text-gray-700 block">Dimensions</span>
                <span className="font-bold text-gray-800">{product.dimensions}</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                <span className="text-[10px] text-gray-700 block">Part Weight</span>
                <span className="font-bold text-gray-800">{product.weight}</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-700 block">Estimated Slicing</span>
                <span className="font-bold text-gray-800">{product.printTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: E-Commerce Data & Buying Controls (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Header: Assured + Title */}
            <div>
              <div className="flex items-center justify-between gap-2 pb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="text-xs font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    className="text-xs font-medium text-gray-700 hover:text-rose-600 flex items-center gap-1"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>Wishlist</span>
                  </button>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                {product.title}
              </h2>
              <p className="text-xs text-gray-700 mt-1">{product.tagline}</p>

              {/* Rating + Assured Badge */}
              <div className="flex items-center gap-3 mt-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-700 text-white text-xs font-black">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-current" />
                </span>
                <span className="text-xs text-gray-700 font-medium">
                  {product.ratingCount} Ratings & Reviews
                </span>
                {product.isAssured && (
                  <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Fusion Assured</span>
                  </span>
                )}
              </div>
            </div>

            {/* Pricing Section (Flipkart / Amazon style) */}
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-gray-600 line-through">
                  ₹{(product.originalPrice * quantity).toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-extrabold text-emerald-600">
                  {product.discount}
                </span>
              </div>
              <div className="text-[11px] text-gray-700 font-medium">
                Inclusive of all taxes • Free Shipping available
              </div>
            </div>

            {/* Bank Offers Box (Amazon/Flipkart iconic pattern) */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Available Bank Offers & Discounts</span>
              </div>
              <div className="space-y-1 text-xs text-gray-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-800 shrink-0">Bank Offer:</span>
                  <span>10% Instant Discount on HDFC & SBI Credit Cards on orders above ₹1,500.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-800 shrink-0">No Cost EMI:</span>
                  <span>Zero interest EMI starting at ₹160/month on major banks.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-800 shrink-0">Special 3D Perk:</span>
                  <span>Complimentary CAD inspection and slicing report sent with your delivery.</span>
                </div>
              </div>
            </div>

            {/* Pincode Delivery Check */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-800">
                Delivery Availability:
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-blue-600 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    maxLength={6}
                    value={inputPincode}
                    onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setPincodeChecked(true)}
                  className="px-4 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold rounded-lg transition-colors"
                >
                  Check
                </button>
              </div>

              {pincodeChecked && (
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold pt-0.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Available in {city || 'Bangalore'} ({inputPincode}) • Fast dispatch by {product.fastDelivery}</span>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Buttons */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-gray-900 bg-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-102 active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuy}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 transition-all hover:scale-102 active:scale-98"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Highlights List */}
            {product.highlights && (
              <div className="pt-2 border-t border-gray-200 space-y-1.5">
                <div className="text-xs font-bold text-gray-800">Product Highlights:</div>
                <ul className="space-y-1 text-xs text-gray-600">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Table */}
            {product.specs && (
              <div className="pt-2 border-t border-gray-200 space-y-1.5">
                <div className="text-xs font-bold text-gray-800">Technical Specifications:</div>
                <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-2 px-3 py-1.5 ${
                        idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <span className="text-gray-700 font-medium">{key}</span>
                      <span className="text-gray-900 font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50/70 p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span>Customer Reviews & Ratings</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Verified 3D Print Buyers
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.reviews.map((rev, i) => (
                <div key={i} className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-800">{rev.user}</span>
                    <span className="text-[11px] text-gray-700">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s < rev.rating ? 'text-amber-400 fill-current' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
