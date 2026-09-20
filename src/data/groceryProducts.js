export const GROCERY_CATEGORIES = [
  {
    id: 'vegetables',
    name: 'Vegetable',
    subtext: 'Local market',
    icon: 'Carrot',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=160&auto=format&fit=crop&q=80',
    color: '#e8f5e9'
  },
  {
    id: 'snacks',
    name: 'Snacks & Breads',
    subtext: 'In store delivery',
    icon: 'Cookie',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
    color: '#fff3e0'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    subtext: 'Chemical free',
    icon: 'Apple',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=160&auto=format&fit=crop&q=80',
    color: '#fce4ec'
  },
  {
    id: 'chicken',
    name: 'Chicken legs',
    subtext: 'Frozen Meat',
    icon: 'Drumstick',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=160&auto=format&fit=crop&q=80',
    color: '#ffebee'
  },
  {
    id: 'dairy',
    name: 'Milk & Dairy',
    subtext: 'Process food',
    icon: 'Milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=160&auto=format&fit=crop&q=80',
    color: '#e3f2fd'
  }
];

export const WEEKLY_TABS = [
  { id: 'frozen', label: 'Frozen food' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'meat', label: 'Meat & Ball' },
  { id: 'dairy', label: 'Dairy & Milk' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'fruits', label: 'Fruits' }
];

export const FEATURED_STORES = [
  {
    id: 'store-1',
    name: 'Crush grocery',
    time: 'Delivery in 12 minute',
    badge: 'Crush',
    bgColor: 'from-orange-500 to-amber-600',
    logoText: 'Crush'
  },
  {
    id: 'store-2',
    name: 'Delivery market',
    time: 'Delivery in 12 minute',
    badge: 'NOW Delivery',
    bgColor: 'from-blue-600 to-indigo-700',
    logoText: 'NOW Delivery'
  },
  {
    id: 'store-3',
    name: 'Quality product',
    time: 'Delivery in 12 minute',
    badge: 'Quality',
    bgColor: 'from-teal-600 to-emerald-700',
    logoText: 'Q'
  }
];

export const PROMO_DISCOUNTS = [
  {
    id: 'p1',
    title: 'Save',
    amount: '$29',
    subtitle: 'Enjoy Discount all types of Grocery & Frozen item',
    bgColor: 'bg-[#fce7f3]', // pink
    textColor: 'text-[#9d174d]',
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7cd5?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'p2',
    title: 'Discount',
    amount: '30%',
    subtitle: 'Enjoy Discount all types of Grocery & Frozen item',
    bgColor: 'bg-[#ffedd5]', // peach/orange
    textColor: 'text-[#c2410c]',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'p3',
    title: 'Up to',
    amount: '50%',
    subtitle: 'Enjoy Discount all types of Grocery & Frozen item',
    bgColor: 'bg-[#e0f2fe]', // sky blue
    textColor: 'text-[#0369a1]',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'p4',
    title: 'Free',
    amount: 'SHIP',
    subtitle: 'Enjoy Discount all types of Grocery & Frozen item',
    bgColor: 'bg-[#f3e8ff]', // purple
    textColor: 'text-[#6b21a8]',
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=300&auto=format&fit=crop&q=80'
  }
];

export const GROCERY_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Beetroot (Local shop)',
    category: 'vegetables',
    categoryLabel: 'Vegetable',
    weight: '500 gm.',
    price: 17.29,
    originalPrice: 22.00,
    rating: 4.8,
    reviewsCount: 24,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Green Valley Organic',
    description: 'Fresh, earth-sweet local organic beetroots harvested at peak crispness. Packed with nitrates, folate, and potassium.'
  },
  {
    id: 'prod-2',
    title: 'Italian Avocado (Local shop)',
    category: 'fruits',
    categoryLabel: 'Fruits',
    weight: '500 gm.',
    price: 12.29,
    originalPrice: 16.50,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Italian Orchard Co.',
    description: 'Creamy Hass avocados with rich nutty flavour and buttery texture. Perfect for guacamole, toast, and salads.'
  },
  {
    id: 'prod-3',
    title: 'Szam amm (Process food)',
    category: 'snacks',
    categoryLabel: 'Snacks & Breads',
    weight: '500 gm.',
    price: 14.29,
    originalPrice: 18.00,
    rating: 4.6,
    reviewsCount: 19,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281698?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281698?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Artisan Kitchens',
    description: 'Lightly toasted multi-grain snack cakes with mild Himalayan pink salt and savory natural crunch.'
  },
  {
    id: 'prod-4',
    title: 'Beef Mixed (Cut Bone)',
    category: 'meat',
    categoryLabel: 'Meat & Ball',
    weight: '500 gm.',
    price: 16.29,
    originalPrice: 21.00,
    rating: 4.7,
    reviewsCount: 42,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Master Butchers',
    description: 'Hand-selected premium bone-in beef cuts. Ideal for hearty broths, stews, and slow roasts.'
  },
  {
    id: 'prod-5',
    title: 'Cold drinks (Sprite)',
    category: 'drinks',
    categoryLabel: 'Beverages',
    weight: '500 gm.',
    price: 18.29,
    originalPrice: 20.00,
    rating: 4.9,
    reviewsCount: 120,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Cold Refreshments',
    description: 'Crisp, refreshing lemon-lime sparkling soft drink. 100% natural flavors, best served chilled with ice.'
  },
  {
    id: 'prod-6',
    title: 'Plant Hunter (Frozen pack)',
    category: 'frozen',
    categoryLabel: 'Frozen food',
    weight: '500 gm.',
    price: 20.29,
    originalPrice: 25.00,
    rating: 4.7,
    reviewsCount: 31,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584947897667-27b87df3fc14?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584947897667-27b87df3fc14?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Green Planet Foods',
    description: 'Quick-frozen plant-based tender patties packed with 18g clean pea protein per serving.'
  },
  {
    id: 'prod-7',
    title: 'Deshi Gajor (Local Carrot)',
    category: 'vegetables',
    categoryLabel: 'Vegetable',
    weight: '500 gm.',
    price: 19.29,
    originalPrice: 23.00,
    rating: 4.8,
    reviewsCount: 57,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Deshi Agro Farm',
    description: 'Farm-fresh vibrant red and orange heirloom carrots with intense natural sweetness and crunch.'
  },
  {
    id: 'prod-8',
    title: 'Deshi Shosha (Local Cucumb)',
    category: 'vegetables',
    categoryLabel: 'Vegetable',
    weight: '500 gm.',
    price: 4.29,
    originalPrice: 6.50,
    rating: 4.9,
    reviewsCount: 65,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Green Valley Organic',
    description: 'Crisp, hydrating local cucumbers with thin skin and gentle seed core. Excellent for fresh salads.'
  },
  {
    id: 'prod-9',
    title: 'Lays chips (Bacon)',
    category: 'snacks',
    categoryLabel: 'Snacks & Breads',
    weight: '500 gm.',
    price: 21.29,
    originalPrice: 24.50,
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Snack Haven',
    description: 'Thin-sliced golden potato chips coated in savory smoked bacon seasoning with satisfying crunch.'
  },
  {
    id: 'prod-10',
    title: 'Badhakopi (Local Cabbage)',
    category: 'vegetables',
    categoryLabel: 'Vegetable',
    weight: '500 gm.',
    price: 9.29,
    originalPrice: 12.00,
    rating: 4.7,
    reviewsCount: 38,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Deshi Agro Farm',
    description: 'Dense, crisp green cabbage heads packed with dietary fiber, vitamin C, and fresh leafy layers.'
  },
  {
    id: 'prod-11',
    title: 'Organic frozen deer',
    category: 'frozen',
    categoryLabel: 'Frozen food',
    weight: '500 gm.',
    price: 14.29,
    originalPrice: 19.00,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Nordic Wild Game',
    description: 'Ultra-lean, high-protein organic venison portions flash frozen at source to seal in natural tenderness.'
  },
  {
    id: 'prod-12',
    title: 'Fresh Coral frozen fish',
    category: 'frozen',
    categoryLabel: 'Frozen food',
    weight: '500 gm.',
    price: 18.29,
    originalPrice: 22.50,
    rating: 4.9,
    reviewsCount: 47,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1534948216015-843149f72be3?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534948216015-843149f72be3?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Ocean Blue Seafood',
    description: 'Wild-caught coral reef fish fillets, cleaned and vacuum sealed for unmatched ocean-fresh sweetness.'
  },
  {
    id: 'prod-13',
    title: 'Bonduelle royal mix',
    category: 'vegetables',
    categoryLabel: 'Vegetable',
    weight: '500 gm.',
    price: 20.29,
    originalPrice: 25.00,
    rating: 4.7,
    reviewsCount: 36,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Bonduelle Gourmet',
    description: 'Chef mix of baby broccoli florets, French beans, and young sweet baby corn ready for stir-fries.'
  },
  {
    id: 'prod-14',
    title: 'Frozen boneless meat',
    category: 'meat',
    categoryLabel: 'Meat & Ball',
    weight: '500 gm.',
    price: 8.29,
    originalPrice: 11.50,
    rating: 4.6,
    reviewsCount: 29,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Prime Butcher Club',
    description: 'Evenly diced boneless tender meat cubes, trimmed of excess fat and ready for curries or grilling.'
  },
  {
    id: 'prod-15',
    title: 'Halal frozen Chicken',
    category: 'chicken',
    categoryLabel: 'Chicken',
    weight: '500 gm.',
    price: 15.29,
    originalPrice: 18.00,
    rating: 4.9,
    reviewsCount: 82,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Pure Farms Halal',
    description: '100% certified Halal chicken portions, grain fed without antibiotic residues, tender and juicy.'
  },
  {
    id: 'prod-16',
    title: 'Chicken penne with basil',
    category: 'chicken',
    categoryLabel: 'Chicken',
    weight: '500 gm.',
    price: 14.29,
    originalPrice: 17.50,
    rating: 4.8,
    reviewsCount: 44,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281698?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281698?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Bella Italia Fresh',
    description: 'Pre-prepped Italian penne bowl paired with grilled herb chicken breast and aromatic Genovese basil pesto.'
  },
  {
    id: 'prod-17',
    title: 'Chicken Onion rings',
    category: 'snacks',
    categoryLabel: 'Snacks & Breads',
    weight: '500 gm.',
    price: 15.29,
    originalPrice: 19.00,
    rating: 4.7,
    reviewsCount: 63,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1639024471287-032f66e57929?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1639024471287-032f66e57929?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Crisp Craft Treats',
    description: 'Crispy batter-coated rings seasoned with sweet Vidalia onion and chicken spices. Air-frier friendly.'
  },
  {
    id: 'prod-18',
    title: 'Pizza with ham and mushrooms',
    category: 'snacks',
    categoryLabel: 'Snacks & Breads',
    weight: '500 gm.',
    price: 18.29,
    originalPrice: 22.00,
    rating: 4.9,
    reviewsCount: 71,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Napoli Woodfire',
    description: 'Stone-baked artisan sourdough crust topped with Fior di Latte mozzarella, smoked ham, and button mushrooms.'
  },
  {
    id: 'prod-19',
    title: 'Bucket of pops and Drosed',
    category: 'snacks',
    categoryLabel: 'Snacks & Breads',
    weight: '500 gm.',
    price: 8.29,
    originalPrice: 11.00,
    rating: 4.6,
    reviewsCount: 35,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=500&auto=format&fit=crop&q=80'
    ],
    vendor: 'Pop Corner',
    description: 'Caramelized popcorn bucket mixed with roasted salted peanuts and candied drizzle.'
  },
  {
    id: 'prod-20',
    title: 'Bobs red mill whole wheat',
    category: 'dairy',
    categoryLabel: 'Flour & Grains',
    weight: '2.27 kg',
    price: 429.12,
    originalPrice: 1430.40,
    rating: 4.5,
    reviewsCount: 15,
    inStock: true,
    discountBadge: '70% DISCOUNT',
    sku: 'MB3442',
    vendor: 'Bevino grocery',
    soldCount: '100 sold in last 35 hour',
    categoriesList: ['Fruits', 'Hoodies', 'Juice', 'Snacks', 'Tshirts'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574316071802-0d684efa7cd5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Coconut Oil is a great-tasting, nutritious alternative to use when cooking or baking. Coconut Oil is a naturally rich source of medium chain triglycerides (MCTs). 100% stone ground organic whole wheat flour made from hard red spring wheat.'
  }
];
