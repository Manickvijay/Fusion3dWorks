import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Truck,
  ArrowRight,
  Clock,
  CheckCircle2,
  Sparkles,
  Printer
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CheckoutPage() {
  const { cart, cartSubtotal, totalPrintMinutes, placeOrder, currentUser, addToast } = useShop();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: currentUser?.name || 'Alex Rivera',
    phone: currentUser?.phone || '+1 (555) 438-9021',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('890');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500">Add some customized 3D prints before checking out!</p>
        <Link to="/" className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold">
          Explore Creations
        </Link>
      </div>
    );
  }

  const shippingFee = cartSubtotal > 35 ? 0 : 4.99;
  const grandTotal = cartSubtotal + shippingFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }

      const createdOrder = placeOrder({
        shippingAddress,
        items: [...cart],
        subtotal: cartSubtotal,
        shippingFee,
        total: grandTotal,
        paymentMethod: paymentMethod === 'card' ? 'Visa •••• 4242' : 'Apple Pay Instant'
      });

      addToast(`Order ${createdOrder.id} successfully queued for 3D printing!`, 'success');
      navigate(`/track-order?orderId=${createdOrder.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Checkout & 3D Print Queue Confirmation
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your custom print options, configure shipping address, and secure payment.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>1. Delivery Destination</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Recipient Full Name</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone Number (For Tracking)</label>
                <input
                  type="tel"
                  required
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-bold text-slate-700">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">City</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">State</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">ZIP</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.zip}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>2. Secure Payment</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-slate-900">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Credit Card</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Visa, Mastercard, Amex</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'apple'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-slate-900">
                  <Lock className="w-4 h-4 text-slate-900" />
                  <span>Apple / Google Pay</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">1-Tap Fast Checkout</p>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">CVC Code</label>
                    <input
                      type="password"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Order Review & Submit */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5 text-xs">
          <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Print Queue Summary</span>
            <span className="font-mono text-indigo-600 font-bold">{cart.length} creations</span>
          </h3>

          {/* Items Preview */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
            {cart.map(item => (
              <div key={item.cartItemId} className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                  <div>
                    <h4 className="font-bold text-slate-900 truncate max-w-[170px]">{item.name}</h4>
                    {item.customText && (
                      <span className="text-[10px] text-indigo-600 font-mono font-semibold block">
                        Text: "{item.customText}"
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                  </div>
                </div>

                <span className="font-mono font-bold text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 pt-2 text-slate-600">
            <div className="flex justify-between">
              <span>Print Subtotal:</span>
              <span className="font-mono font-bold text-slate-800">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Insured Shipping:</span>
              <span className="font-mono font-bold text-slate-800">
                {shippingFee === 0 ? <span className="text-emerald-600 uppercase">FREE</span> : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CAD Geometry Slicing & Quality Guarantee:</span>
              <span className="text-emerald-600 font-bold">INCLUDED</span>
            </div>

            <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
              <span>Grand Total:</span>
              <span className="font-mono text-xl text-indigo-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer text-sm disabled:opacity-70"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 animate-spin" />
                <span>Slicing & Assigning Printer...</span>
              </div>
            ) : (
              <>
                <span>Confirm & Queue 3D Print Job</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>End-to-End Slicing Guarantee • Immediate Queue Priority</span>
          </div>

        </div>

      </form>

    </div>
  );
}
