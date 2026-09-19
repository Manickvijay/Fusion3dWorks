import { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  MapPin,
  CreditCard,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Box
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  checkoutData,
  onOrderPlaced,
  defaultPincode = '560001',
  defaultCity = 'Bangalore'
}) {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [address, setAddress] = useState({
    name: 'Manick Vijay',
    phone: '9876543210',
    pincode: defaultPincode,
    addressLine: 'Flat 402, Precision Residency, 8th Main Road',
    city: defaultCity,
    state: 'Karnataka',
    landmark: 'Near Tech Park',
    addressType: 'Home'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiApp, setUpiApp] = useState('gpay');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  if (!isOpen || !checkoutData) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    setTimeout(() => {
      setIsPlacingOrder(false);
      const generatedOrder = {
        id: `FUS-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        items: checkoutData.items,
        total: checkoutData.finalTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        address: `${address.name}, ${address.addressLine}, ${address.city} - ${address.pincode}`,
        phone: address.phone,
        status: '3D Printing in Progress',
        progress: 35,
        estimatedDelivery: 'Tomorrow, by 5:00 PM'
      };

      setOrderResult(generatedOrder);
      setStep(3);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }

      onOrderPlaced(generatedOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="font-extrabold text-base">Secure 3D Checkout</h2>
            </div>
            <span className="text-[11px] text-slate-300">
              Flipkart & Amazon Safe Payment Gateway • 256-Bit SSL Encryption
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center justify-between text-xs">
          <div
            className={`flex items-center gap-1.5 font-bold ${
              step >= 1 ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Delivery Address</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-200"></div>
          <div
            className={`flex items-center gap-1.5 font-bold ${
              step >= 2 ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Payment Options</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-200"></div>
          <div
            className={`flex items-center gap-1.5 font-bold ${
              step === 3 ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px]">
              3
            </span>
            <span>3D Job Confirmed</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {/* STEP 1: Address */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-4"
            >
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Shipping & 3D Print Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    10-Digit Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Street Address & Flat / House No *
                </label>
                <input
                  type="text"
                  required
                  value={address.addressLine}
                  onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-blue-600 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              {/* Order summary mini bar */}
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-600">Order Items:</span>{' '}
                  <strong className="text-gray-900">{checkoutData.items.length} items</strong>
                </div>
                <div>
                  <span className="text-gray-600">Total Payable:</span>{' '}
                  <strong className="text-blue-700 text-sm font-black">
                    ₹{checkoutData.finalTotal.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-102"
                >
                  <span>Deliver to this Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Select Payment Method</span>
              </h3>

              {/* Payment Methods Accordion */}
              <div className="space-y-2 text-xs">
                {/* UPI */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-0.5 accent-blue-600"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-gray-900 flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-blue-600" />
                        <span>UPI / QR (Google Pay, PhonePe, Paytm, BHIM)</span>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Fastest • Zero Fees
                      </span>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="pt-2 border-t border-blue-200/60 flex items-center gap-3">
                        {['gpay', 'phonepe', 'paytm'].map((app) => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => setUpiApp(app)}
                            className={`px-3 py-1 rounded-lg border text-xs font-semibold capitalize ${
                              upiApp === app
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-200'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-0.5 accent-blue-600"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">
                      Credit / Debit / ATM Card
                    </div>
                    <span className="text-[11px] text-gray-500">
                      Visa, MasterCard, RuPay, Maestro
                    </span>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 accent-blue-600"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">Cash on Delivery</div>
                    <span className="text-[11px] text-gray-500">
                      Pay cash upon delivery of 3D package
                    </span>
                  </div>
                </label>
              </div>

              {/* Total Card */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-600 block">Deliver to:</span>
                  <span className="font-bold text-gray-800">
                    {address.name}, {address.city} ({address.pincode})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-600 block">Final Amount:</span>
                  <span className="text-base font-black text-gray-900">
                    ₹{checkoutData.finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  ← Back to Address
                </button>

                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-102"
                >
                  {isPlacingOrder ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Initializing 3D Slicing Queue...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Confirm & Pay ₹{checkoutData.finalTotal.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Placed & 3D Manufacturing Tracker */}
          {step === 3 && orderResult && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Thank you for shopping at <strong>Fusion3D Works</strong>. Your CAD files have been queued on our high-speed industrial printers.
                </p>
                <div className="inline-block mt-2 font-mono text-xs font-black bg-blue-50 text-blue-800 px-3 py-1 rounded-lg border border-blue-200">
                  Order ID: {orderResult.id}
                </div>
              </div>

              {/* 3D Manufacturing Pipeline Progress (Flipkart / Amazon Live Tracking) */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-left space-y-4 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <Box className="w-4 h-4 animate-spin" />
                    <span>Live 3D Print Job Status</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Est. Dispatch: {orderResult.estimatedDelivery}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-200">FDM / SLA CoreXY Farm #04</span>
                    <span className="text-emerald-400 font-mono">35% Layer Completed</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full animate-pulse"
                      style={{ width: '35%' }}
                    ></div>
                  </div>
                </div>

                {/* Production milestones */}
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-slate-300 font-semibold block">Order Placed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-slate-300 font-semibold block">CAD Sliced</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
                      3D
                    </div>
                    <span className="text-cyan-400 font-bold block">Printing</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">
                      4
                    </div>
                    <span className="text-slate-500 font-semibold block">QC & Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Delivery info summary */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-left text-gray-700">
                <span className="font-bold text-gray-900 block mb-0.5">Shipping To:</span>
                <p>{orderResult.address}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Phone: {orderResult.phone}</p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
                >
                  Continue Exploring 3D Works
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
