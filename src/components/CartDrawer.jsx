import { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  ArrowRight,
  Sparkles,
  Truck,
  Box
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);

  if (!isOpen) return null;

  // Totals calculations
  const totalMRP = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || item.price * 1.3) * item.quantity,
    0
  );
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountOnMRP = totalMRP - subtotal;
  const isFreeDelivery = subtotal >= 999;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 79;
  const couponSavings = Math.round(subtotal * appliedDiscount);
  const finalTotal = Math.max(0, subtotal - couponSavings + deliveryFee);
  const totalSavings = discountOnMRP + couponSavings + (isFreeDelivery && subtotal > 0 ? 79 : 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'FUSION10') {
      setAppliedDiscount(0.10);
      setCouponMessage({ type: 'success', text: 'Coupon FUSION10 applied! 10% instant discount.' });
    } else if (code === 'FIRSTPRINT') {
      setAppliedDiscount(0.15);
      setCouponMessage({ type: 'success', text: 'Welcome offer applied! 15% discount on 3D works.' });
    } else {
      setAppliedDiscount(0);
      setCouponMessage({ type: 'error', text: 'Invalid coupon code. Try FUSION10 or FIRSTPRINT' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base">Shopping Cart ({cartItems.length} items)</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {subtotal > 0 && (
          <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 text-xs">
            {isFreeDelivery ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Congratulations! Your order qualifies for FREE Express Delivery!</span>
              </span>
            ) : (
              <span className="text-blue-800">
                Add <strong>₹{(999 - subtotal).toLocaleString('en-IN')}</strong> more of 3D prints to unlock <strong>FREE Delivery</strong>!
              </span>
            )}
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-800 text-base">Your Cart is Empty</h3>
              <p className="text-xs max-w-xs">
                Explore our precision 3D models, medical anatomy prototypes, and filaments, or upload an STL for instant printing!
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-2xs space-y-2.5"
              >
                <div className="flex gap-3">
                  {/* Thumbnail / 3D Icon */}
                  <div
                    className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center border border-gray-200"
                    style={{ backgroundColor: item.color || '#3b82f6' }}
                  >
                    <Box className="w-8 h-8 text-white/90" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-gray-900 truncate">
                      {item.title}
                    </h4>
                    {item.isCustom && item.customSpecs ? (
                      <div className="text-[11px] text-blue-700 font-medium space-y-0.5 mt-0.5">
                        <span className="block font-mono">
                          {item.customSpecs.material} • {item.customSpecs.infill} • {item.customSpecs.color}
                        </span>
                        <span className="block text-[10px] text-gray-500">
                          Layer: {item.customSpecs.layerHeight} • {item.customSpecs.scale} scale
                        </span>
                      </div>
                    ) : (
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {item.tagline || item.material}
                      </p>
                    )}

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-extrabold text-sm text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[11px] text-gray-600 line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity & Remove controls */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-gray-200 text-gray-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-bold text-gray-900 bg-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-200 text-gray-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 p-1 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Flipkart Price Breakdown */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50/80 space-y-3">
            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Coupon (e.g. FUSION10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs uppercase border border-gray-300 rounded-lg focus:border-blue-600 outline-none font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Apply
              </button>
            </form>

            {couponMessage && (
              <div
                className={`text-[11px] px-2.5 py-1 rounded-md ${
                  couponMessage.type === 'success'
                    ? 'bg-emerald-100 text-emerald-800 font-medium'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {couponMessage.text}
              </div>
            )}

            {/* Price Details Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-2.5">
              <div className="flex justify-between font-bold text-gray-800">
                <span>PRICE DETAILS</span>
              </div>
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>₹{Math.round(totalMRP).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount on MRP</span>
                <span>- ₹{Math.round(discountOnMRP).toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Coupon Discount</span>
                  <span>- ₹{couponSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-black text-sm text-gray-900 pt-2 border-t border-gray-200">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Savings Notice */}
            {totalSavings > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>You will save ₹{Math.round(totalSavings).toLocaleString('en-IN')} on this order</span>
              </div>
            )}

            {/* Proceed to Buy CTA */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout({
                  items: cartItems,
                  subtotal,
                  discount: discountOnMRP + couponSavings,
                  deliveryFee,
                  finalTotal
                });
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
