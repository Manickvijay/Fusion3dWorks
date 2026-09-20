import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Truck,
  Tag,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    cartItemCount,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    freeShippingThreshold,
    amountToFreeShipping,
    isFreeShipping,
    standardShippingFee,
    couponDiscount,
    estTax,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput);
      setCouponInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-6 leading-relaxed">
            You don't have any 3D printers, filaments, or replacement parts in your cart yet. Explore our precision catalog to start building.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
          >
            <span>Start 3D Shopping</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Shopping Cart</span>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs mb-8">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center space-x-1.5 text-slate-800">
              <Truck className="w-4 h-4 text-indigo-600" />
              {isFreeShipping ? (
                <span className="text-emerald-600 font-bold flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-500" /> You unlocked FREE Priority Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-indigo-600">${amountToFreeShipping.toFixed(2)}</strong> more to unlock FREE shipping!
                </span>
              )}
            </span>
            <span className="text-indigo-600 font-bold">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Cart Items List + Order Summary Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items Table */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900">
                  Cart Items ({cartItemCount})
                </h1>
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Cart</span>
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Thumbnail & Title */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-2xl object-cover bg-slate-50 border border-slate-200 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                          {item.brand}
                        </span>
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>

                        {(item.variant || item.color) && (
                          <div className="flex items-center space-x-2 mt-1 text-xs text-slate-500">
                            {item.variant && <span>Variant: {item.variant}</span>}
                            {item.color && (
                              <span className="flex items-center space-x-1">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-slate-300"
                                  style={{ backgroundColor: item.color.hex }}
                                />
                                <span>{item.color.name}</span>
                              </span>
                            )}
                          </div>
                        )}

                        <span className="text-xs text-slate-400 mt-1 block">
                          Unit: ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <span className="text-base font-black text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions Note */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Order Note / Slicing Special Instructions (Optional)
              </label>
              <textarea
                rows="2"
                placeholder="E.g., Please ensure filaments are vacuum-sealed with fresh silica desiccant gel..."
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3 text-xs text-slate-800 outline-hidden focus:border-indigo-600"
              />
            </div>

          </div>

          {/* Right Column: Order Summary Box */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Coupon "{appliedCoupon.code}" applied (-${couponDiscount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 hover:underline text-[11px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Promo or Voucher Code
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-300">
                    <input
                      type="text"
                      placeholder="e.g., FUSION10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs uppercase outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Try using code <strong className="text-indigo-600">FUSION10</strong> for 10% off your entire order!
                  </p>
                </form>
              )}

              {/* Cost Rows */}
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Promo Discount</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {standardShippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `$${standardShippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (7.5%)</span>
                  <span className="font-semibold text-slate-900">${estTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                  <span>Estimated Total</span>
                  <span className="text-indigo-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/shop"
                className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-1"
              >
                &larr; Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>30-Day Hassle-Free Returns & Replacements</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
