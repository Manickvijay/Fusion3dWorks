import React, { useState } from 'react';
import { Upload, FileCode, CheckCircle2, ShoppingCart, Calculator, Sparkles, Cpu, Layers, HelpCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function CustomPrintCalculator() {
  const { addToCart, addToast } = useShop();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [technology, setTechnology] = useState('fdm');
  const [material, setMaterial] = useState('pla');
  const [layerHeight, setLayerHeight] = useState('0.12');
  const [infill, setInfill] = useState(25);
  const [estimatedGrams, setEstimatedGrams] = useState(85);
  const [quantity, setQuantity] = useState(1);
  const [finishOption, setFinishOption] = useState('standard');

  // File drop handler
  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({ name: file.name, size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' });
      addToast(`Uploaded CAD file "${file.name}" for instant geometric analysis.`, 'info');
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length > 0) {
      const file = e.target.files[0];
      setUploadedFile({ name: file.name, size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' });
      addToast(`Uploaded CAD file "${file.name}" for instant geometric analysis.`, 'info');
    }
  };

  // Pricing formula
  const materialMultipliers = {
    pla: 0.08,
    petgcf: 0.14,
    nyloncf: 0.28,
    resin8k: 0.18,
    resintough: 0.24
  };

  const techBaseCosts = {
    fdm: 12.00,
    sla: 18.00,
    sls: 29.00
  };

  const finishCosts = {
    standard: 0.00,
    vapor_smooth: 8.00,
    support_removal_hand: 5.00,
    threaded_inserts: 6.50
  };

  const matRate = materialMultipliers[material] || 0.10;
  const techBase = techBaseCosts[technology] || 15.00;
  const infillMultiplier = 1 + (infill / 100) * 0.4;
  const finishCost = finishCosts[finishOption] || 0;

  const unitPrice = Math.round((techBase + (estimatedGrams * matRate * infillMultiplier) + finishCost) * 100) / 100;
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;
  const estimatedHours = Math.round((estimatedGrams / 12 + 1.5) * 10) / 10;

  const handleAddCustomPrintToCart = () => {
    const customProduct = {
      id: `prod-custom-${Date.now()}`,
      title: `Custom 3D Print: ${uploadedFile ? uploadedFile.name : 'Precision CAD Part'}`,
      brand: 'Fusion3D Rapid Works',
      category: 'custom-prints',
      categoryLabel: 'Custom 3D Prints',
      price: unitPrice,
      originalPrice: unitPrice * 1.25,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      description: `Custom manufactured part using ${technology.toUpperCase()} with ${material.toUpperCase()} at ${layerHeight}mm layer height and ${infill}% infill.`,
      sku: `F3D-CST-${Math.floor(1000 + Math.random() * 9000)}`,
      inStock: true
    };

    addToCart(customProduct, quantity, { name: `${material.toUpperCase()} (${technology.toUpperCase()})`, price: unitPrice });
    addToast('Custom 3D print job added to your shopping cart!', 'success');
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200" id="custom-quote">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 mr-1" />
            <span>Instant Slicing & Quote Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order On-Demand Custom 3D Printed Parts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Upload your STL, OBJ, or STEP file for automated pricing, material selection, and 48-hour dispatched manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Upload & Spec Configurator */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* File Dropzone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/40 rounded-3xl p-6 text-center transition-all cursor-pointer relative"
            >
              <input
                type="file"
                accept=".stl,.obj,.step,.stp,.3mf"
                onChange={handleFileInput}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center mb-3 shadow-md">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                {uploadedFile ? uploadedFile.name : 'Click to Upload or Drag & Drop CAD Files'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports .STL, .OBJ, .STEP, and .3MF (Max 100MB per file)
              </p>
              {uploadedFile && (
                <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>File Verified ({uploadedFile.size})</span>
                </div>
              )}
            </div>

            {/* Configurator Controls */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-5">
              
              {/* Technology Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Additive Technology
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fdm', label: 'High-Speed FDM', desc: 'Functional prototypes & enclosures' },
                    { id: 'sla', label: '8K UV Resin', desc: 'Sub-micron miniatures & jewelry' },
                    { id: 'sls', label: 'Industrial SLS', desc: 'Production PA12 without supports' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTechnology(t.id)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        technology === t.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-xs font-bold">{t.label}</span>
                      <span className={`text-[10px] mt-0.5 line-clamp-1 ${technology === t.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {t.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Material Grade
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'pla', name: 'HyperSpeed PLA+', rate: '$0.08/g' },
                    { id: 'petgcf', name: 'PETG-CF (Carbon)', rate: '$0.14/g' },
                    { id: 'nyloncf', name: 'PA12-CF Nylon', rate: '$0.28/g' },
                    { id: 'resin8k', name: '8K Sharp Photopolymer', rate: '$0.18/g' },
                    { id: 'resintough', name: 'ABS-Like Tough Resin', rate: '$0.24/g' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMaterial(m.id)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                        material === m.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block truncate">{m.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{m.rate}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layer Resolution & Infill */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Layer Height: {layerHeight} mm
                  </label>
                  <select
                    value={layerHeight}
                    onChange={(e) => setLayerHeight(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-hidden"
                  >
                    <option value="0.08">0.08 mm (Ultra Fine / Minimum Stepping)</option>
                    <option value="0.12">0.12 mm (Recommended Standard)</option>
                    <option value="0.20">0.20 mm (Draft / High Speed)</option>
                    <option value="0.28">0.28 mm (Coarse Structural)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Infill Density: {infill}%
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="5"
                    value={infill}
                    onChange={(e) => setInfill(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>15% (Light)</span>
                    <span>40% (Standard)</span>
                    <span>100% (Solid)</span>
                  </div>
                </div>
              </div>

              {/* Estimated Weight Slider */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Estimated Part Mass: {estimatedGrams} grams
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={estimatedGrams}
                  onChange={(e) => setEstimatedGrams(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Post-Processing Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Post-Processing & Surface Finish
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'standard', name: 'Raw As-Printed (Support Cleaned)', extra: '+$0.00' },
                    { id: 'vapor_smooth', name: 'Acetone / Vapor Chemical Smooth', extra: '+$8.00' },
                    { id: 'threaded_inserts', name: 'Brass M3/M4 Heat-Set Inserts', extra: '+$6.50' },
                    { id: 'support_removal_hand', name: 'Fine Micro-Hand Sanding', extra: '+$5.00' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinishOption(f.id)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                        finishOption === f.id
                          ? 'border-orange-500 bg-orange-50 text-orange-950'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block truncate">{f.name}</span>
                      <span className="text-[10px] text-orange-600 font-bold">{f.extra}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Instant Live Quotation Box */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Live Instant Quote
              </span>
              <span className="text-xs text-slate-400">Turnaround: 48 Hours</span>
            </div>

            {/* Price Large */}
            <div className="py-6 border-b border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase block font-semibold">Total Estimated Price</span>
              <span className="text-4xl sm:text-5xl font-black text-white">${totalPrice.toFixed(2)}</span>
              <span className="text-xs text-slate-400 block mt-1">(${unitPrice.toFixed(2)} each × {quantity} units)</span>
            </div>

            {/* Cost Breakdown */}
            <div className="py-4 space-y-2.5 text-xs text-slate-300 border-b border-slate-800">
              <div className="flex justify-between">
                <span>Machine Setup & Slicing:</span>
                <span className="font-semibold text-white">${techBase.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Material Cost ({estimatedGrams}g):</span>
                <span className="font-semibold text-white">${(estimatedGrams * matRate * infillMultiplier).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Surface Treatment:</span>
                <span className="font-semibold text-white">${finishCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Print Runtime:</span>
                <span className="font-semibold text-orange-400">~{estimatedHours} hours</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="py-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Quantity Needed:</span>
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddCustomPrintToCart}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Custom Print to Cart</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                All custom prints include complimentary digital caliper dimensional verification report and ultrasonic solvent wash.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
