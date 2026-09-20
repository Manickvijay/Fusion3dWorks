import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Truck,
  Tag,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function CartDrawer() {
  const {
    cart,
    cartItemCount,
    cartSubtotal,
    cartDrawerOpen,
    closeCartDrawer,
    updateCartQuantity,
    removeFromCart,
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

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  if (!cartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput);
      setCouponInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Your Cart</h2>
              <span className="bg-indigo-100 text-indigo-700 font-bold text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-indigo-50/70 border-b border-indigo-100 px-4 py-3">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center space-x-1.5 text-indigo-900">
                <Truck className="w-4 h-4 text-indigo-600" />
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-bold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> You unlocked FREE Express Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-indigo-700">${amountToFreeShipping.toFixed(2)}</strong> for FREE Shipping
                  </span>
                )}
              </span>
              <span className="text-indigo-600 font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-indigo-200/60 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFreeShipping ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your cart is currently empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Explore our precision 3D printers, carbon-fiber filaments, and 8K resins to get started.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/shop');
                  }}
                  className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                >
                  Browse 3D Catalog &rarr;
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex space-x-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.productId}`}
                          onClick={closeCartDrawer}
                          className="text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant / Color if selected */}
                      {(item.variant || item.color) && (
                        <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500">
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
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-slate-400">
                            (${item.price.toFixed(2)} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Financial Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
              
              {/* Promo code bar */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
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
                <form onSubmit={handleApplyCoupon} className="flex rounded-xl overflow-hidden border border-slate-300 bg-white">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. FUSION10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs text-slate-800 outline-hidden uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Cost rows */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">${cartSubtotal.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-800">
                    {standardShippingFee === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `$${standardShippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (7.5%)</span>
                  <span className="font-semibold text-slate-800">${estTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-base text-indigo-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/cart');
                  }}
                  className="w-full py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs transition-colors"
                >
                  View Full Cart Details
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Encrypted 256-bit checkout with 30-day money back guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
