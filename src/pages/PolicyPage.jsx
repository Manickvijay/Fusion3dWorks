import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export default function PolicyPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'shipping';
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Store Policies & Warranty</span>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs mb-8 overflow-x-auto">
          {[
            { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
            { id: 'returns', label: '30-Day Returns & Refunds', icon: RotateCcw },
            { id: 'warranty', label: '2-Year Hardware Warranty', icon: ShieldCheck },
            { id: 'privacy', label: 'Privacy & Terms', icon: FileText }
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-black text-slate-900">Shipping & Delivery Policy</h1>
              <p>
                At Fusion3D Works, all shipments containing filament spools, precision resins, or 3D printers are packaged using specialized climate-controlled desiccant protection and shock-damped corners to prevent shipping fatigue.
              </p>
              <h3 className="text-base font-bold text-slate-900 pt-2">Free Express Shipping Threshold</h3>
              <p>
                Orders exceeding $49.00 USD qualify for free standard ground delivery (3–5 business days) across the contiguous 48 United States.
              </p>
              <h3 className="text-base font-bold text-slate-900 pt-2">Freight Delivery for Large Machines</h3>
              <p>
                Heavy industrial 3D printers (e.g., Fusion3D Titan XL) are delivered via wooden crate with liftgate pallet service. A phone call appointment will be scheduled prior to drop-off.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-black text-slate-900">30-Day Return & Replacement Guarantee</h1>
              <p>
                If you are not completely satisfied with your purchase, you may initiate a return within 30 days of receipt for an exchange or full refund.
              </p>
              <h3 className="text-base font-bold text-slate-900 pt-2">Condition of Returned Items</h3>
              <p>
                3D printers must include all original gantry packing foam, tool kits, and spare screws. Filament spools must not be unwound or damaged. If you received a defective spool with diameter variance exceeding ±0.03mm, we will replace it free of charge.
              </p>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-black text-slate-900">Comprehensive 2-Year Hardware Warranty</h1>
              <p>
                Every 3D printer and Wash & Cure station comes with our comprehensive 2-Year Direct Factory Hardware Warranty.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Free replacement motherboards, stepper motors, and linear rails.</li>
                <li>Live 1-on-1 technician diagnostics via phone, email, and video call.</li>
                <li>Fast air shipment of repair parts directly from our US fulfillment hub.</li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-black text-slate-900">Privacy & Security Commitment</h1>
              <p>
                Your CAD designs, 3D printing geometries, and personal details remain confidential. All uploaded 3D files for quotation are automatically purged from temporary slicing cache after 30 days.
              </p>
              <p>
                We do not sell customer data to third-party ad brokers. Payment transactions are processed via 256-bit SSL encrypted tokenization.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
