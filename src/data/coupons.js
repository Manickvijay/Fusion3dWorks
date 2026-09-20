export const ACTIVE_COUPONS = [
  {
    code: 'FUSION10',
    title: 'Welcome 10% Off',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 50,
    maxDiscount: 100,
    expiresAt: '2026-12-31',
    description: 'Get 10% instant discount on any purchase above $50.',
    categoryRestriction: 'all',
    usageCount: 1420,
    status: 'Active'
  },
  {
    code: 'PRINT50',
    title: '$50 Flat Off on 3D Printers',
    discountType: 'fixed',
    discountValue: 50,
    minOrderAmount: 499,
    maxDiscount: 50,
    expiresAt: '2026-11-30',
    description: 'Save $50 on any enclosed or CoreXY 3D printer order over $499.',
    categoryRestriction: '3d-printers',
    usageCount: 580,
    status: 'Active'
  },
  {
    code: 'FILAMENTBOGO',
    title: 'Filament Bundle 15% Off',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 60,
    maxDiscount: 35,
    expiresAt: '2026-10-31',
    description: 'Buy 3 or more filament spools and get 15% off your filament cart.',
    categoryRestriction: 'filaments',
    usageCount: 890,
    status: 'Active'
  },
  {
    code: 'PROMAKER20',
    title: 'Engineer & Maker 20% Off',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 150,
    maxDiscount: 80,
    expiresAt: '2026-12-15',
    description: '20% off on all accessories, nozzles, build plates, and precision tools.',
    categoryRestriction: 'accessories',
    usageCount: 310,
    status: 'Active'
  },
  {
    code: 'FREESHIP',
    title: 'Free Express Courier Shipping',
    discountType: 'shipping',
    discountValue: 15,
    minOrderAmount: 40,
    maxDiscount: 15,
    expiresAt: '2026-12-31',
    description: 'Waives express courier shipping on orders exceeding $40.',
    categoryRestriction: 'all',
    usageCount: 2450,
    status: 'Active'
  }
];

export const COUPONS = ACTIVE_COUPONS.map(c => ({
  ...c,
  minSubtotal: c.minOrderAmount,
  value: c.discountValue,
  type: c.discountType
}));

export function validateCoupon(code, cartItems, subtotal) {
  const normalized = code.trim().toUpperCase();
  const found = ACTIVE_COUPONS.find(c => c.code === normalized);

  if (!found) {
    return { valid: false, message: `Invalid coupon code "${code}". Please check for typos.` };
  }

  if (found.status !== 'Active') {
    return { valid: false, message: `Coupon "${found.code}" has expired or is deactivated.` };
  }

  if (subtotal < found.minOrderAmount) {
    return {
      valid: false,
      message: `Minimum order of $${found.minOrderAmount} required for coupon ${found.code}. Add $${(found.minOrderAmount - subtotal).toFixed(2)} more.`
    };
  }

  // Category specific validation if applicable
  if (found.categoryRestriction !== 'all') {
    const hasCategoryItem = cartItems.some(i => i.category === found.categoryRestriction);
    if (!hasCategoryItem) {
      return {
        valid: false,
        message: `Coupon ${found.code} is valid only for products in "${found.categoryRestriction}".`
      };
    }
  }

  let discountAmount = 0;
  if (found.discountType === 'percentage') {
    discountAmount = (subtotal * found.discountValue) / 100;
    if (found.maxDiscount && discountAmount > found.maxDiscount) {
      discountAmount = found.maxDiscount;
    }
  } else if (found.discountType === 'fixed') {
    discountAmount = Math.min(found.discountValue, subtotal);
  } else if (found.discountType === 'shipping') {
    discountAmount = found.discountValue;
  }

  return {
    valid: true,
    coupon: found,
    discountAmount: Math.round(discountAmount * 100) / 100,
    message: `Coupon "${found.code}" applied! You saved $${discountAmount.toFixed(2)}.`
  };
}
