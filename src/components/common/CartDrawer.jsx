import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartItemCount,
    totalPrintMinutes,
    currentUser,
    setIsLoginModalOpen,
    addToast
  } = useShop();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const totalHours = Math.floor(totalPrintMinutes / 60);
  const remainingMins = totalPrintMinutes % 60;

  const handleGoToCheckout = () => {
    if (!currentUser) {
      setIsCartOpen(false);
      setIsLoginModalOpen(true);
      addToast('Please sign in or create an account to process your cart items and complete checkout.', 'info');
      return;
    }
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-9999 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">Your 3D Print Cart</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {cartItemCount} {cartItemCount === 1 ? 'creation' : 'creations'} queued
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Total Print Time Banner */}
            {cart.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white px-5 py-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="font-bold">Total Machine Print Time:</span>
                </div>
                <span className="font-mono font-black text-amber-300 bg-white/10 px-2 py-0.5 rounded-md">
                  {totalHours > 0 ? `${totalHours}h ` : ''}{remainingMins}m
                </span>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Choose any custom 3D keychain, cake topper, or name board and see it render in 3D!
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all"
                  >
                    Start Exploring Creations
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const itemKey = item.cartItemId || item.id || `cart-item-${item.productId || 'custom'}-${idx}`;
                  const itemId = item.cartItemId || item.id || itemKey;
                  const itemPrice = Number(item.price) || 0;
                  const itemQty = Number(item.quantity) || 1;

                  return (
                    <div
                      key={itemKey}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all flex gap-3"
                    >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-18 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                    />

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customization Details */}
                        {item.customText && (
                          <div className="text-[11px] text-indigo-700 font-mono font-bold mt-0.5">
                            Text: "{item.customText}"
                          </div>
                        )}

                        {/* Color Chips preview */}
                        {item.selectedColors && typeof item.selectedColors === 'object' && Object.keys(item.selectedColors).length > 0 && (
                          <div className="flex items-center space-x-1.5 mt-1">
                            <span className="text-[10px] text-slate-400">Custom Colors:</span>
                            {Object.entries(item.selectedColors).map(([key, hex], colorIdx) => (
                              <div
                                key={`${itemKey}-${key}-${colorIdx}`}
                                className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs"
                                style={{ backgroundColor: typeof hex === 'string' ? hex : '#4F46E5' }}
                                title={`${key}: ${hex}`}
                              />
                            ))}
                          </div>
                        )}

                        <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-1">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 text-slate-400 mr-1" />
                            {item.printTime || '45m'} / unit
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateQuantity(itemId, itemQty - 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold font-mono text-slate-800">
                            {itemQty}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemId, itemQty + 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-black font-mono text-slate-900">
                          ${(itemPrice * itemQty).toFixed(2)}
                        </span>
                      </div>

                    </div>
                  </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Print Subtotal</span>
                    <span className="font-mono font-bold text-slate-800">
                      ${cartSubtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Precision Slicing & Quality Prep</span>
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Estimated Total</span>
                    <span className="font-mono text-base text-indigo-600">
                      ${cartSubtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGoToCheckout}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Proceed to Express Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-Bit SSL Encrypted • 100% Quality Reprint Guarantee</span>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
