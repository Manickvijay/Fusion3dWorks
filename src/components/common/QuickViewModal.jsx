import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Clock, Sparkles, Star, Layers, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import Interactive3DViewer from './Interactive3DViewer';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, filaments } = useShop();
  
  if (!quickViewProduct) return null;

  // Selected colors state for quick 3D customizer preview
  const initialColors = {};
  if (quickViewProduct.customizableSections && Array.isArray(quickViewProduct.customizableSections)) {
    quickViewProduct.customizableSections.forEach(s => {
      initialColors[s.id] = s.defaultColor || (s.options && s.options[0]?.hex) || filaments?.[0]?.hex || '#4F46E5';
    });
  }

  return (
    <QuickViewModalContent
      product={quickViewProduct}
      initialColors={initialColors}
      onClose={() => setQuickViewProduct(null)}
      addToCart={addToCart}
      filaments={filaments}
    />
  );
}

function QuickViewModalContent({ product, initialColors, onClose, addToCart, filaments }) {
  const [selectedColors, setSelectedColors] = useState(initialColors);
  const [customText, setCustomText] = useState('SARAH');

  const handleColorSelect = (sectionId, hex) => {
    setSelectedColors(prev => ({ ...prev, [sectionId]: hex }));
  };

  const handleAddToCart = (e) => {
    addToCart(
      product,
      {
        quantity: 1,
        selectedColors,
        customText: product.allowCustomText ? customText : ''
      },
      e
    );
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-all backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Interactive 3D Viewer */}
          <div className="w-full md:w-1/2 bg-slate-950 p-4 flex flex-col justify-center">
            <Interactive3DViewer
              product={product}
              selectedColors={selectedColors}
              customText={customText}
            />
          </div>

          {/* Right: Customization Controls */}
          <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-bold text-indigo-600 uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <span className="text-slate-300">•</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{product.printTime} print time</span>
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black text-slate-900 font-mono">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Custom Text input if supported */}
              {product.allowCustomText && (
                <div className="space-y-1 pt-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Custom Name or Wording
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                    placeholder={product.customTextPlaceholder || 'CUSTOM TEXT'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono tracking-wider focus:outline-hidden focus:border-indigo-500 uppercase"
                  />
                </div>
              )}

              {/* Color Sections from Filament Inventory */}
              {(() => {
                const isSingle = product.colorMode === 'single' || (product.customizableSections || []).length <= 1;
                const sections = isSingle
                  ? [{ id: 'color_main', name: product.singleHeading || product.customizableSections?.[0]?.name || 'Filament Colour' }]
                  : (product.customizableSections && product.customizableSections.length > 0
                      ? product.customizableSections
                      : (product.colorHeadings || ['Top Colour', 'Bottom Colour']).map((h, i) => ({ id: `color_part_${i}`, name: h }))
                    );

                return sections.map(section => {
                  const activeHex = selectedColors[section.id] || selectedColors['color_main'] || section.defaultColor || filaments?.[0]?.hex || '#F59E0B';
                  const activeFilament = (filaments || []).find(f => f.hex?.toLowerCase() === activeHex?.toLowerCase());

                  return (
                    <div key={section.id} className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{section.name}:</span>
                        <span className="text-indigo-600 font-bold font-mono text-[11px]">
                          {activeFilament?.name || 'Selected'}
                        </span>
                      </div>
                      <div className="flex items-center flex-wrap gap-2">
                        {(filaments || []).map(fil => {
                          const isOutOfStock = fil.inStock === false;
                          const isSelected = activeHex?.toLowerCase() === fil.hex?.toLowerCase();

                          return (
                            <button
                              key={fil.id}
                              type="button"
                              disabled={isOutOfStock}
                              onClick={() => handleColorSelect(section.id, fil.hex)}
                              className={`relative w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                                isOutOfStock
                                  ? 'opacity-30 cursor-not-allowed border-rose-400 border-dashed overflow-hidden'
                                  : isSelected
                                  ? 'scale-115 border-white ring-2 ring-indigo-600 shadow-xs'
                                  : 'border-slate-300 hover:scale-105'
                              }`}
                              style={{ backgroundColor: fil.hex }}
                              title={isOutOfStock ? `${fil.name} - Out of stock` : `${fil.name} (${fil.material})`}
                            >
                              {isOutOfStock && (
                                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <span className="w-full h-0.5 bg-rose-600 rotate-45 transform" />
                                </span>
                              )}
                              {isSelected && !isOutOfStock && (
                                <Check className="w-3 h-3 text-white stroke-[3] drop-shadow-xs" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer text-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Customized 3D Print</span>
              </button>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors flex items-center space-x-1"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
