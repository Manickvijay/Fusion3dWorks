import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../../context/ShopContext';
import { Box, Sparkles } from 'lucide-react';

export default function FlyingCartItem() {
  const { flyingItem } = useShop();

  if (!flyingItem) return null;

  const { image, startX, startY, targetX, targetY } = flyingItem;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-99999 overflow-hidden">
        <motion.div
          key={flyingItem.id}
          initial={{
            x: startX - 28,
            y: startY - 28,
            scale: 1,
            opacity: 1,
            rotate: 0
          }}
          animate={{
            x: targetX - 16,
            y: targetY - 16,
            scale: 0.25,
            opacity: 0.85,
            rotate: 360
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1] // sleek cubic-bezier arc
          }}
          className="relative w-14 h-14 rounded-2xl shadow-2xl bg-white p-1 border-2 border-indigo-500 overflow-hidden flex items-center justify-center"
        >
          {image ? (
            <img
              src={image}
              alt="Adding to Cart"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Box className="w-8 h-8 text-indigo-600 animate-pulse" />
          )}

          {/* Sparkle badge */}
          <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1 shadow-md">
            <Sparkles className="w-3 h-3 text-slate-900" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
