import React, { useState } from 'react';
import { Settings, Save, ShieldAlert, CheckCircle2, RotateCcw, Building, Globe } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function AdminSettingsPage() {
  const { addToast } = useShop();

  const [settings, setSettings] = useState({
    storeName: 'Fusion3D Works',
    tagline: 'Print Your Imagination',
    supportEmail: 'support@fusion3dworks.com',
    supportPhone: '+1 (800) 348-7466',
    taxRate: 7.5,
    freeShippingThreshold: 49.00,
    currency: 'USD ($)',
    warehouseLocation: 'San Jose Logistics Hub #1',
    maintenanceMode: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Store configuration saved successfully!', 'success');
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all demo orders, cart items, and catalog edits back to factory default?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Top Header */}
      <div>
        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
          Store Operations
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Store Settings & Configuration
        </h1>
      </div>

      <form onSubmit={handleSave} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            Brand Identity & Support Contacts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Technical Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Support Phone Hotline</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Financial & Shipping Configuration */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            Taxation, Shipping & Currency
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Sales Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Free Shipping Min ($)</label>
              <input
                type="number"
                step="1"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Base Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white font-medium"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="CAD ($)">CAD ($)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Fulfillment Center */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            Logistics & Slicing Facility
          </h3>
          <div>
            <label className="block font-bold text-slate-300 mb-1">Primary Fulfillment Center</label>
            <input
              type="text"
              value={settings.warehouseLocation}
              onChange={(e) => setSettings({ ...settings, warehouseLocation: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 outline-hidden text-white"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center space-x-2 shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Preferences</span>
          </button>
        </div>

      </form>

      {/* Danger Zone: Factory Reset */}
      <div className="bg-rose-950/40 border border-rose-900/60 p-6 rounded-3xl space-y-3">
        <div className="flex items-center space-x-2 text-rose-400">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="text-sm font-bold">Prototype Data Reset</h3>
        </div>
        <p className="text-xs text-rose-300/80 leading-relaxed">
          Reset all locally modified products, placed orders, cart data, and customer addresses back to default factory mock state.
        </p>
        <button
          onClick={handleResetData}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Mock Data</span>
        </button>
      </div>

    </div>
  );
}
