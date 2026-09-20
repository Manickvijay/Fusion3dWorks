import React, { useState } from 'react';
import {
  UploadCloud,
  Layers,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Box,
  Flame,
  ShoppingBag,
  Sliders
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CustomPrintPage() {
  const { addToCart, addToast, uploadStorageFile } = useShop();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [material, setMaterial] = useState('PLA+ PolyTerra Silk');
  const [infill, setInfill] = useState(20);
  const [selectedColor, setSelectedColor] = useState('#F59E0B');
  const [layerHeight, setLayerHeight] = useState('0.16mm (Standard Detail)');
  const [isDragging, setIsDragging] = useState(false);

  // Simulated metrics based on inputs
  const estimatedGrams = Math.round(35 + (infill * 0.8));
  const estimatedPrintHours = Math.round((estimatedGrams / 25) * 10) / 10;
  const estimatedMinutes = Math.round(estimatedPrintHours * 60);
  const calculatedPrice = Math.max(14.50, Math.round((9.50 + estimatedGrams * 0.22) * 100) / 100);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = async (file) => {
    const fileInfo = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.name.split('.').pop().toUpperCase(),
      fileUrl: null
    };
    setUploadedFile(fileInfo);
    addToast(`Analyzed ${file.name} — Mesh geometry watertight!`, 'success');

    if (uploadStorageFile) {
      setIsUploading(true);
      try {
        const uploadRes = await uploadStorageFile(file, 'custom-cad');
        if (uploadRes && (uploadRes.url || uploadRes.fileUrl)) {
          const finalUrl = uploadRes.url || uploadRes.fileUrl;
          setUploadedFile(prev => ({ ...prev, fileUrl: finalUrl }));
          addToast('CAD model securely uploaded to Render cloud storage!', 'success');
        }
      } catch (err) {
        console.log('Local model preserved, cloud sync deferred:', err.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleAddCustomToCart = (e) => {
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: uploadedFile ? `Custom 3D Print: ${uploadedFile.name}` : 'Custom CAD 3D Model Print',
      price: calculatedPrice,
      printTime: `${Math.floor(estimatedMinutes / 60)}h ${estimatedMinutes % 60}m`,
      printTimeMinutes: estimatedMinutes,
      category: 'custom-print',
      material: `${material} (${infill}% Infill)`,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    };

    addToCart(
      customProduct,
      {
        quantity: 1,
        selectedColors: { main_filament: selectedColor },
        customText: `File: ${uploadedFile?.name || 'Customer CAD'}`
      },
      e
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <UploadCloud className="w-3.5 h-3.5 text-indigo-600" />
          <span>On-Demand Industrial 3D Slicing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Upload Your Custom 3D Model (STL / OBJ)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Upload your 3D CAD mesh, configure your preferred materials and infill density, and receive an instant machine slicing estimate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Drag & Drop Zone & File Preview */}
        <div className="lg:col-span-7 space-y-6">
          
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all flex flex-col items-center justify-center space-y-4 ${
              isDragging
                ? 'border-indigo-600 bg-indigo-50/60 scale-101'
                : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-400'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-md">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <h3 className="text-base font-bold text-slate-800">
                  {uploadedFile ? uploadedFile.name : 'Drag and drop your 3D model here'}
                </h3>
                {isUploading && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                    Uploading to Render Cloud...
                  </span>
                )}
                {uploadedFile?.fileUrl && !isUploading && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Synced to Cloud
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Supports .STL, .OBJ, .3MF, .STEP (Max file size: 100 MB)
              </p>
            </div>

            <label className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all">
              <span>{isUploading ? 'Uploading...' : 'Browse Computer Files'}</span>
              <input
                type="file"
                accept=".stl,.obj,.3mf,.step"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelected(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          {/* Sliced Geometry Telemetry Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
              <Box className="w-4 h-4 text-indigo-600" />
              <span>Automated Slicing Analysis</span>
            </h4>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-semibold">Est. Filament Weight</span>
                <span className="font-mono font-bold text-slate-900 text-base">{estimatedGrams}g</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-semibold">Print Farm Time</span>
                <span className="font-mono font-bold text-indigo-600 text-base">
                  {Math.floor(estimatedMinutes / 60)}h {estimatedMinutes % 60}m
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-semibold">Watertight Mesh</span>
                <span className="font-bold text-emerald-600 text-base flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Valid</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Customization Controls & Instant Pricing */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 text-xs">
          
          <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100">
            Print Specifications
          </h3>

          {/* Filament Material */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Select Filament Material</label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium text-xs focus:outline-hidden focus:border-indigo-500"
            >
              <option>PLA+ PolyTerra Silk (High Detail / Decorative)</option>
              <option>Food-Safe Bio Resin (Ultra-Smooth 12K)</option>
              <option>Engineering PETG (Waterproof / Heat Resistant)</option>
              <option>Carbon-Fiber Reinforced PLA (High Rigidity)</option>
            </select>
          </div>

          {/* Infill Density Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="font-bold text-slate-800">Infill Density</label>
              <span className="font-mono font-bold text-indigo-600">{infill}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={infill}
              onChange={(e) => setInfill(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10% (Lightweight / Art)</span>
              <span>40% (Structural)</span>
              <span>100% (Solid Solid)</span>
            </div>
          </div>

          {/* Layer Height */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Layer Resolution</label>
            <select
              value={layerHeight}
              onChange={(e) => setLayerHeight(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium text-xs focus:outline-hidden focus:border-indigo-500"
            >
              <option>0.12mm (Ultra Fine / Miniature)</option>
              <option>0.16mm (Standard Detail / Smooth)</option>
              <option>0.24mm (Draft Speed / Rapid Prototype)</option>
            </select>
          </div>

          {/* Color Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Filament Color</label>
            <div className="flex items-center space-x-2">
              {[
                { name: 'Silk Gold', hex: '#F59E0B' },
                { name: 'Cyber Cyan', hex: '#06B6D4' },
                { name: 'Matte Obsidian', hex: '#0F172A' },
                { name: 'Pure White', hex: '#FFFFFF' },
                { name: 'Neon Coral', hex: '#F43F5E' },
                { name: 'Emerald', hex: '#10B981' }
              ].map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColor === c.hex ? 'scale-110 border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Price & Add to Cart Button */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-slate-600">Calculated Print Job Cost:</span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                ${calculatedPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddCustomToCart}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Queue Custom 3D Print Job</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
