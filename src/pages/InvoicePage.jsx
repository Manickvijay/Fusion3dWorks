import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, ArrowLeft, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function InvoicePage() {
  const { orderId } = useParams();
  const { orders } = useShop();

  const order = orders.find(o => o.id === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 print:p-0">
        
        {/* Actions bar (hidden during print) */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/account"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to Account</span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>

        {/* Invoice Paper Document */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl print:shadow-none print:border-0 print:p-4 space-y-8 text-slate-800">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                  F
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">Fusion3D Works</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Fusion3D Additive Technologies Inc.<br />
                850 Maker Way, Suite 400<br />
                San Jose, CA 95134, United States<br />
                Tax ID / EIN: 84-2991048
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-2xl font-black text-slate-900 block uppercase">Commercial Tax Invoice</span>
              <p className="text-xs font-mono text-slate-600 mt-1">Invoice #: INV-{order.id.replace('F3D-ORD-', '')}</p>
              <p className="text-xs text-slate-500">Order Date: {order.date}</p>
              <p className="text-xs text-slate-500">Payment: {order.paymentMethod?.toUpperCase() || 'PAID IN FULL'}</p>
            </div>
          </div>

          {/* Bill To & Ship To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">Billed To</span>
              <p className="font-bold text-slate-900">{order.shippingAddress?.name}</p>
              {order.shippingAddress?.company && <p className="text-slate-600">{order.shippingAddress?.company}</p>}
              <p className="text-slate-600">{order.shippingAddress?.street}</p>
              <p className="text-slate-600">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
              <p className="text-slate-500 font-mono mt-1">{order.shippingAddress?.phone}</p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">Shipping Details</span>
              <p className="font-bold text-slate-900">{order.shippingAddress?.name}</p>
              <p className="text-slate-600">{order.shippingAddress?.street}</p>
              <p className="text-slate-600">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
              <p className="text-slate-500 font-mono mt-1">Carrier Tracking: {order.trackingNumber}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-2">Item Description</th>
                  <th className="py-3 px-2 text-center">Qty</th>
                  <th className="py-3 px-2 text-right">Unit Price</th>
                  <th className="py-3 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-2">
                      <span className="font-bold text-slate-900 block">{item.title}</span>
                      <span className="text-[11px] text-slate-400 font-mono">SKU: {item.sku || 'F3D-GEN-01'}</span>
                      {item.variant && <span className="text-[11px] text-slate-500 block">Option: {item.variant}</span>}
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-slate-800">{item.quantity}</td>
                    <td className="py-3 px-2 text-right font-mono">${item.price.toFixed(2)}</td>
                    <td className="py-3 px-2 text-right font-bold text-slate-900 font-mono">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="flex justify-end pt-4 border-t border-slate-200 text-xs">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">${order.subtotal?.toFixed(2) || order.total.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span className="font-mono">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping & Freight:</span>
                <span className="font-mono">
                  {order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee?.toFixed(2) || '0.00'}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Sales Tax (7.5%):</span>
                <span className="font-mono">${order.tax?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t-2 border-slate-200">
                <span>Total Paid (USD):</span>
                <span className="font-mono text-indigo-600">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-8 border-t border-slate-100 text-[11px] text-slate-400 text-center space-y-1">
            <p>Thank you for choosing Fusion3D Works for your additive manufacturing needs.</p>
            <p>For technical support or warranty assistance, email support@fusion3dworks.com or call 1-800-FUSION-3D.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
