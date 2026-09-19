import { useState, useMemo } from 'react';
import {
  Upload,
  Sparkles,
  CheckCircle2,
  ShoppingCart,
  FileCheck
} from 'lucide-react';
import ModelViewer from './ModelViewer';

const MATERIAL_OPTIONS = [
  { id: 'pla', name: 'PLA+ High Speed', tech: 'FDM', ratePerGram: 3.5, baseDensity: 1.24, desc: 'Cost-effective, vivid colors, smooth outer walls.' },
  { id: 'petg-cf', name: 'PETG-CF Carbon Fiber', tech: 'FDM', ratePerGram: 5.8, baseDensity: 1.29, desc: 'High rigidity, heat resistant to 80°C, industrial matte finish.' },
  { id: 'abs', name: 'ABS Industrial Grade', tech: 'FDM', ratePerGram: 4.8, baseDensity: 1.05, desc: 'High impact tolerance, acetone vapor smoothable.' },
  { id: 'tpu', name: 'TPU 95A Flexible', tech: 'FDM', ratePerGram: 6.5, baseDensity: 1.21, desc: 'Rubber-like elasticity, shock-absorbing gaskets and bumpers.' },
  { id: 'resin-8k', name: '8K Tough Resin', tech: 'SLA', ratePerGram: 8.9, baseDensity: 1.15, desc: 'Micron-level detail, razor sharp edges, zero layer stepping.' }
];

const SAMPLE_CAD_FILES = [
  { id: 'heart', name: 'Anatomical_Heart_V1.obj', type: 'obj', url: '/models/12190_Heart_v1_L3.obj', baseGrams: 220, defaultColor: '#ef4444' },
  { id: 'chassis', name: 'TinkerBot_Chassis_Rev4.obj', type: 'obj', url: '/models/tinker.obj', baseGrams: 165, defaultColor: '#0284c7' },
  { id: 'gear', name: 'Planetary_Gearbox_Assembly.step', type: 'procedural', proceduralType: 'gearbox', baseGrams: 130, defaultColor: '#d97706' },
  { id: 'vase', name: 'Voronoi_Parametric_Pot.stl', type: 'procedural', proceduralType: 'vase', baseGrams: 190, defaultColor: '#059669' }
];

export default function CustomPrintCalculator({ onAddToCart, onClose }) {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_CAD_FILES[0]);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [materialId, setMaterialId] = useState('pla');
  const [infill, setInfill] = useState(25);
  const [layerHeight, setLayerHeight] = useState('0.16');
  const [scale, setScale] = useState(1.0);
  const [colorHex, setColorHex] = useState('#2563eb');
  const [colorName, setColorName] = useState('Royal Blue');
  const [quantity, setQuantity] = useState(1);
  const [customJobTitle, setCustomJobTitle] = useState('Custom 3D Print Job #FUS-88');
  const [postProcessing, setPostProcessing] = useState('standard'); // standard or vapor
  const [notes, setNotes] = useState('');

  const selectedMaterial = MATERIAL_OPTIONS.find((m) => m.id === materialId) || MATERIAL_OPTIONS[0];

  // Dynamic engineering calculations
  const calculations = useMemo(() => {
    const baseWeight = selectedSample.baseGrams * Math.pow(scale, 3);
    const infillFactor = 0.5 + (infill / 100) * 0.7;
    const finalGrams = Math.round(baseWeight * infillFactor * (selectedMaterial.baseDensity / 1.24));
    
    // Print hours estimate
    const layerFactor = layerHeight === '0.08' ? 1.8 : layerHeight === '0.16' ? 1.0 : 0.65;
    const estMinutes = Math.round((finalGrams * 3.5 * layerFactor) / (selectedMaterial.tech === 'SLA' ? 1.5 : 1));
    const hours = Math.floor(estMinutes / 60);
    const mins = estMinutes % 60;

    // Pricing
    const materialCost = finalGrams * selectedMaterial.ratePerGram;
    const machineTimeCost = (estMinutes / 60) * 45; // ₹45 per machine hour
    const finishCost = postProcessing === 'vapor' ? 250 : 50;
    const unitPriceBeforeDiscount = Math.max(199, Math.round(materialCost + machineTimeCost + finishCost));
    
    // Volume discount
    const discountMultiplier = quantity >= 20 ? 0.75 : quantity >= 5 ? 0.90 : 1.0;
    const unitPrice = Math.round(unitPriceBeforeDiscount * discountMultiplier);
    const subtotal = unitPrice * quantity;
    const gst = Math.round(subtotal * 0.18);
    const totalPrice = subtotal + gst;

    return {
      grams: finalGrams,
      timeFormatted: `${hours}h ${mins}m`,
      unitPrice,
      subtotal,
      gst,
      totalPrice,
      discountPercent: quantity >= 20 ? 25 : quantity >= 5 ? 10 : 0
    };
  }, [selectedSample, scale, infill, selectedMaterial, layerHeight, postProcessing, quantity]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setCustomJobTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleAddToCart = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      title: `${customJobTitle} (${selectedMaterial.name})`,
      tagline: `Custom 3D Print: ${calculations.grams}g • ${infill}% Infill • ${layerHeight}mm • ${colorName}`,
      price: calculations.unitPrice,
      originalPrice: Math.round(calculations.unitPrice * 1.4),
      discount: '30% off',
      quantity,
      modelType: selectedSample.type,
      modelUrl: selectedSample.url,
      proceduralType: selectedSample.proceduralType,
      color: colorHex,
      isCustom: true,
      customSpecs: {
        fileName: uploadedFileName || selectedSample.name,
        material: selectedMaterial.name,
        tech: selectedMaterial.tech,
        infill: `${infill}%`,
        layerHeight: `${layerHeight} mm`,
        scale: `${scale.toFixed(1)}x`,
        finish: postProcessing === 'vapor' ? 'Vapor Smoothed & Hand Polished' : 'Standard Degated & Deburred',
        estimatedTime: calculations.timeFormatted,
        weight: `${calculations.grams}g`,
        color: colorName,
        notes: notes || 'Standard dimensional tolerance ±0.08mm requested.'
      }
    };

    onAddToCart(customItem, quantity);
    if (onClose) onClose();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden max-w-5xl mx-auto my-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Slicing Engine v4.2</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Instant Custom 3D Printing Quote & Order
          </h2>
          <p className="text-xs text-slate-300">
            Upload your CAD file (STL, OBJ, STEP) or test with sample models to get real-time weight, print time, and transparent pricing.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
          >
            Close Calculator
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 p-6 gap-6">
        {/* Left Column: 3D Preview & File Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
              Step 1: Select or Upload 3D File
            </label>
            
            {/* File Upload Box */}
            <div className="relative border-2 border-dashed border-blue-400/70 hover:border-blue-600 rounded-xl p-4 text-center bg-blue-50/40 hover:bg-blue-50/80 transition-all cursor-pointer">
              <input
                type="file"
                accept=".stl,.obj,.step,.3mf"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-gray-800">
                  {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Drop STL / OBJ / STEP file here'}
                </div>
                <span className="text-[11px] text-gray-700">or click to browse from device (Max 150MB)</span>
              </div>
            </div>

            {/* Preloaded Sample Models Quick Switch */}
            <div>
              <span className="text-[11px] font-semibold text-gray-700 block mb-1">
                Or test with sample 3D CAD files:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {SAMPLE_CAD_FILES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setSelectedSample(sample);
                      setColorHex(sample.defaultColor);
                      setUploadedFileName(null);
                      setCustomJobTitle(sample.name.replace(/\.[^/.]+$/, ''));
                    }}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      selectedSample.id === sample.id && !uploadedFileName
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="truncate font-mono text-[11px]">{sample.name}</div>
                    <span className="text-[10px] text-gray-700">~{sample.baseGrams}g Base</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Interactive Viewport */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800">Interactive 3D Simulation</span>
              <span className="text-[11px] font-mono text-blue-600 font-semibold">
                Scale: {scale.toFixed(1)}x ({Math.round(calculations.grams)}g)
              </span>
            </div>
            <ModelViewer
              url={selectedSample.url}
              modelType={selectedSample.type}
              proceduralType={selectedSample.proceduralType}
              initialColor={colorHex}
              height="280px"
            />
          </div>

          {/* Scale Slider */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-gray-700">Dimensional Scaling Multiplier:</span>
              <span className="font-bold text-blue-700">{scale.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-700">
              <span>0.5x (Miniature)</span>
              <span>1.0x (1:1 Native CAD)</span>
              <span>2.0x (Oversized)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Parameters & Live Costing (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
            Step 2: Engineering Specs & Material Selection
          </label>

          {/* Material Selector Cards */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-gray-700">Select Print Material:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MATERIAL_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterialId(m.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    materialId === m.id
                      ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">{m.name}</span>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                      m.tech === 'SLA' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {m.tech}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-700 line-clamp-1 mt-0.5">{m.desc}</p>
                  <div className="text-[11px] font-bold text-blue-700 mt-1">
                    ₹{m.ratePerGram}/gram
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Infill Density Slider & Layer Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Infill Slider */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Internal Infill Density:</span>
                <span className="font-bold text-blue-700">{infill}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                step="5"
                value={infill}
                onChange={(e) => setInfill(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="text-[10px] text-gray-700">
                {infill <= 25 ? 'Standard Visual Prototype' : infill <= 50 ? 'Strong Functional Part' : 'Heavy Industrial Solid'}
              </div>
            </div>

            {/* Layer Height Selector */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Layer Resolution:</span>
                <span className="font-bold text-blue-700">{layerHeight} mm</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { val: '0.08', label: 'Ultra 80µ' },
                  { val: '0.16', label: 'Fine 160µ' },
                  { val: '0.28', label: 'Draft 280µ' }
                ].map((l) => (
                  <button
                    key={l.val}
                    type="button"
                    onClick={() => setLayerHeight(l.val)}
                    className={`py-1.5 text-center text-xs font-semibold rounded-lg border transition-all ${
                      layerHeight === l.val
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-gray-700">
                {layerHeight === '0.08' ? 'Zero visible layer lines' : layerHeight === '0.16' ? 'Recommended standard' : 'Fastest turnaround'}
              </div>
            </div>
          </div>

          {/* Color & Finish Selection */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-gray-700">Color Variant: {colorName}</div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: 'Royal Blue', hex: '#2563eb' },
                { name: 'Matte Stealth Black', hex: '#1e293b' },
                { name: 'Arctic White', hex: '#f8fafc' },
                { name: 'Crimson Red', hex: '#dc2626' },
                { name: 'Silk Amber Gold', hex: '#d97706' },
                { name: 'Emerald Green', hex: '#059669' },
                { name: 'Space Gray', hex: '#64748b' }
              ].map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => {
                    setColorHex(c.hex);
                    setColorName(c.name);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all ${
                    colorHex === c.hex
                      ? 'border-blue-600 bg-blue-50 font-bold text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-gray-300 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Post Processing & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Post-Processing Finish:
              </label>
              <select
                value={postProcessing}
                onChange={(e) => setPostProcessing(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-gray-300 bg-white text-gray-800 outline-none"
              >
                <option value="standard">Standard Ultrasonic Degating & Clean (+₹50)</option>
                <option value="vapor">Vapor Chemical Smoothing & Hand Polish (+₹250)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Order Quantity (Volume Discounts):
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center font-bold text-gray-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center text-xs font-bold py-1.5 border border-gray-300 rounded-lg outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center font-bold text-gray-700"
                >
                  +
                </button>
                {calculations.discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    {calculations.discountPercent}% Bulk Off!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Optional Engineering Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Custom Engineering Notes / Tolerances (Optional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Needs brass heat-set M3 inserts, press-fit tolerance ±0.05mm"
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 outline-none focus:border-blue-600"
            />
          </div>

          {/* Transparent Quotation Breakdown Card (Flipkart/Amazon style) */}
          <div className="bg-slate-900 text-white rounded-xl p-4 shadow-md space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                <FileCheck className="w-4 h-4" />
                <span>Instant Slicing Price Breakdown</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Est. Print Time: {calculations.timeFormatted} • {calculations.grams}g
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs py-1">
              <div>
                <span className="text-[10px] text-slate-400 block">Unit Price</span>
                <span className="font-bold text-slate-200">₹{calculations.unitPrice}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Quantity</span>
                <span className="font-bold text-slate-200">{quantity} units</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">GST (18%)</span>
                <span className="font-bold text-slate-200">₹{calculations.gst}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-semibold block">Total Payable</span>
                <span className="font-extrabold text-base text-white">
                  ₹{calculations.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free 24hr QC Slicing Verification by Fusion Engineers</span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-900/50 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Custom Print Order to Cart (₹{calculations.totalPrice.toLocaleString('en-IN')})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
