import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  ArrowRight,
  Lock,
  PackageCheck,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    couponDiscount,
    estTax,
    standardShippingFee,
    appliedCoupon,
    placeOrder,
    user
  } = useShop();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Method, 3: Payment
  const [orderComplete, setOrderComplete] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    email: user?.email || 'alex.chen@additive.io',
    firstName: 'Alex',
    lastName: 'Chen',
    company: 'HyperRobotics Lab',
    address: '742 Evergreen Terrace',
    apartment: 'Building 4, Suite 200',
    city: 'San Jose',
    state: 'CA',
    zip: '95125',
    country: 'United States',
    phone: '+1 (408) 555-0199',
    shippingMethod: 'standard', // 'standard' | 'express' | 'freight'
    paymentMethod: 'card', // 'card' | 'paypal' | 'installments' | 'wire'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/28',
    cardCvc: '888',
    saveAddress: true
  });

  const shippingRates = {
    standard: standardShippingFee,
    express: 19.99,
    freight: 49.00
  };

  const selectedShippingCost = shippingRates[formData.shippingMethod];
  const finalTotal = cartSubtotal - couponDiscount + selectedShippingCost + estTax;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const orderData = {
      items: cart,
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        company: formData.company,
        street: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        phone: formData.phone
      },
      shippingMethod: formData.shippingMethod,
      shippingFee: selectedShippingCost,
      subtotal: cartSubtotal,
      discount: couponDiscount,
      tax: estTax,
      total: finalTotal,
      couponCode: appliedCoupon?.code || null,
      paymentMethod: formData.paymentMethod
    };

    const newOrder = placeOrder(orderData);
    setOrderComplete(newOrder);
  };

  // If order is completed, show Order Success confirmation screen
  if (orderComplete) {
    return (
      <div className="min-h-[80vh] bg-slate-50 py-12 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-2xl w-full border border-slate-200 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <PackageCheck className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed & Queued for Packing
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              We've dispatched confirmation details to <strong className="text-slate-800">{formData.email}</strong>. Your 3D components will be packed with desiccant protection.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3 text-xs">
            <div className="flex justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500">Order Number:</span>
              <strong className="text-slate-900 font-mono text-sm">{orderComplete.id}</strong>
            </div>
            <div className="flex justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500">Tracking Code:</span>
              <strong className="text-indigo-600 font-mono">{orderComplete.trackingNumber}</strong>
            </div>
            <div className="flex justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500">Shipping To:</span>
              <span className="text-slate-800 font-semibold">{orderComplete.shippingAddress.name}, {orderComplete.shippingAddress.city}, {orderComplete.shippingAddress.state}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-500 font-bold">Total Paid:</span>
              <strong className="text-base text-slate-900">${orderComplete.total.toFixed(2)}</strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              to={`/track-order?tracking=${orderComplete.trackingNumber}`}
              className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery</span>
            </Link>

            <Link
              to={`/invoice/${orderComplete.id}`}
              className="py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Tax Invoice</span>
            </Link>
          </div>

          <div className="pt-2">
            <Link to="/shop" className="text-xs font-semibold text-indigo-600 hover:underline">
              &larr; Return to Fusion3D Storefront
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // If cart is empty and no order completed
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-800">Your cart is empty</h2>
          <Link to="/shop" className="mt-4 inline-block px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl">
            Browse Products &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Secure Checkout
            </h1>
          </div>
          <div className="flex items-center space-x-1 text-xs text-emerald-600 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encryption</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Multi-step Shipping & Payment Details */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Customer Contact & Shipping Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  Shipping Address & Contact
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email for Delivery Updates *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-bold text-slate-700 mb-1">Company / University / Lab (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                />
              </div>

              <div className="text-xs">
                <label className="block font-bold text-slate-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State / Province *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Postal / ZIP Code *</label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  Select Delivery Method
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'standard',
                    name: 'Standard Ground Delivery (3-5 Business Days)',
                    cost: standardShippingFee === 0 ? 'FREE' : `$${standardShippingFee.toFixed(2)}`,
                    desc: 'Tracked insured delivery via FedEx / UPS with desiccant protection.'
                  },
                  {
                    id: 'express',
                    name: 'Priority Air Express (1-2 Business Days)',
                    cost: '$19.99',
                    desc: 'Guaranteed priority airline dispatch for mission-critical parts.'
                  },
                  {
                    id: 'freight',
                    name: 'White-Glove Pallet Delivery (High-Precision Calibration)',
                    cost: '$49.00',
                    desc: 'Wooden crate delivery with lift-gate service, ideal for 3D printers.'
                  }
                ].map((meth) => (
                  <label
                    key={meth.id}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.shippingMethod === meth.id
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-100'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={meth.id}
                        checked={formData.shippingMethod === meth.id}
                        onChange={handleChange}
                        className="mt-1 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{meth.name}</span>
                        <span className="text-[11px] text-slate-500">{meth.desc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-900">{meth.cost}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  Payment Method
                </h2>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', name: 'Credit Card', icon: CreditCard },
                  { id: 'paypal', name: 'PayPal', icon: ShieldCheck },
                  { id: 'installments', name: 'Klarna 4x', icon: CheckCircle2 },
                  { id: 'wire', name: 'Net 30 / PO', icon: Building }
                ].map(p => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: p.id }))}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all ${
                        formData.paymentMethod === p.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mock Credit Card Form */}
              {formData.paymentMethod === 'card' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Card Number (Mock Prototype)</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 outline-hidden font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Expiration</label>
                      <input
                        type="text"
                        name="cardExp"
                        value={formData.cardExp}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 outline-hidden font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CVV / CVC</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 outline-hidden font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod !== 'card' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 text-center">
                  Payment provider will authenticate securely during checkout confirmation.
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Review ({cart.length} items)
              </h2>

              {/* Items List mini */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-center space-x-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-xl border border-slate-200 bg-slate-50 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-slate-900 block truncate">{item.title}</span>
                      <span className="text-slate-400 text-[11px]">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-extrabold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedShippingCost === 0 ? 'FREE' : `$${selectedShippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax:</span>
                  <span className="font-semibold text-slate-900">${estTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                  <span>Final Total:</span>
                  <span className="text-indigo-600 text-lg">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-black rounded-xl text-sm flex items-center justify-center space-x-2 shadow-xl shadow-indigo-600/20 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Place Order (${finalTotal.toFixed(2)})</span>
              </button>

              <div className="text-[11px] text-slate-400 text-center space-y-1 pt-1">
                <p>30-day money-back guarantee & manufacturer warranty included.</p>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
