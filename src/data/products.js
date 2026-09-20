// Catalog of 3D Printed Custom Products: Keychains, Cake Toppers, Name Boards, Gifts, Lamps, Sculptures
export const INITIAL_PRODUCTS = [
  {
    id: 'prod-keychain-dual',
    name: 'Personalized Dual-Color 3D Name Keychain',
    category: '3d-keychain',
    categoryLabel: '3D Keychains',
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.9,
    reviewsCount: 148,
    printTime: '45m',
    printTimeMinutes: 45,
    badge: 'Best Seller',
    dimensions: '75 x 28 x 6 mm',
    material: 'PLA+ Silk PolyTerra',
    layerHeight: '0.16mm Fine Detail',
    weight: '18g',
    description: 'Custom extruded 3D typography keychain featuring crisp dual-layer color contrast. Engineered with reinforced split-ring loop that withstands everyday pocket use without snapping.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80'
    ],
    modelType: 'keychain',
    allowCustomText: true,
    customTextPlaceholder: 'e.g. EMILY, DAVID, or MAKER',
    requiresUserImage: false,
    minImages: 0,
    maxImages: 0,
    customizableSections: [
      {
        id: 'top_text',
        name: 'Top Lettering / Text Color',
        defaultColor: '#F59E0B',
        options: [
          { name: 'Silk Gold', hex: '#F59E0B' },
          { name: 'Pure White', hex: '#FFFFFF' },
          { name: 'Neon Coral', hex: '#F43F5E' },
          { name: 'Cyan Blue', hex: '#06B6D4' },
          { name: 'Emerald', hex: '#10B981' }
        ]
      },
      {
        id: 'base_plate',
        name: 'Base Plate / Backing Color',
        defaultColor: '#0F172A',
        options: [
          { name: 'Matte Obsidian', hex: '#0F172A' },
          { name: 'Deep Space Navy', hex: '#1E3A8A' },
          { name: 'Graphite Gray', hex: '#475569' },
          { name: 'Pastel Lilac', hex: '#A855F7' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Jessica Miller',
        rating: 5,
        date: '3 days ago',
        comment: 'The dual color lettering is super sharp and the split-ring loop is very sturdy. Exactly as previewed in the 3D model!',
        verified: true,
        images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80']
      },
      {
        id: 'rev-2',
        author: 'Daniel Craig',
        rating: 5,
        date: '1 week ago',
        comment: 'Ordered 3 of these as gifts for my team. Fast delivery via BlueDart and zero stringing on the text.',
        verified: true,
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80']
      },
      {
        id: 'rev-3',
        author: 'Priya Sharma',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great quality and colors. The silk gold top text pops nicely against the black base plate.',
        verified: true,
        images: []
      }
    ]
  },
  {
    id: 'prod-cake-topper-wedding',
    name: 'Custom Calligraphy Wedding & Birthday Cake Topper',
    category: 'cake-toppers',
    categoryLabel: 'Cake Toppers',
    price: 24.50,
    originalPrice: 32.00,
    rating: 5.0,
    reviewsCount: 92,
    printTime: '1h 25m',
    printTimeMinutes: 85,
    badge: 'Popular Gift',
    dimensions: '160 x 180 x 4 mm',
    material: 'Food-Safe Organic Bio-PLA',
    layerHeight: '0.12mm High Precision',
    weight: '32g',
    description: 'Bespoke floating script cake topper with integrated food-safe support stakes. Food-contact safe, lightweight so it will not sink into frosting, with radiant silk sheen reflection.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80'
    ],
    modelType: 'topper',
    allowCustomText: true,
    customTextPlaceholder: 'e.g. Mr & Mrs Miller, or Happy 25th',
    requiresUserImage: false,
    minImages: 0,
    maxImages: 0,
    customizableSections: [
      {
        id: 'script_finish',
        name: 'Calligraphy Color Finish',
        defaultColor: '#E2B872',
        options: [
          { name: 'Champagne Silk Gold', hex: '#E2B872' },
          { name: 'Metallic Rose Gold', hex: '#E0807E' },
          { name: 'Sterling Silver', hex: '#CBD5E1' },
          { name: 'Gloss Pearl White', hex: '#F8FAFC' },
          { name: 'Matte Velvet Black', hex: '#18181B' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Elena Rostova',
        rating: 5,
        date: '5 days ago',
        comment: 'Stunning centerpiece on our wedding cake! The champagne silk gold finish sparkled under the venue lights.',
        verified: true,
        images: ['https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=400&auto=format&fit=crop&q=80']
      },
      {
        id: 'rev-5',
        author: 'Michael Chang',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Safe food grade plastic, sturdy stems that hold firmly in multi-tier buttercream cakes.',
        verified: true,
        images: []
      }
    ]
  },
  {
    id: 'prod-nameboard-desk',
    name: 'Gamer Tag & Desk 3D Illuminated Name Board',
    category: 'name-boards',
    categoryLabel: 'Name Boards',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewsCount: 64,
    printTime: '4h 10m',
    printTimeMinutes: 250,
    badge: 'Trending',
    dimensions: '220 x 80 x 45 mm',
    material: 'Diffusion PETG + Matte PLA',
    layerHeight: '0.20mm Heavy Duty',
    weight: '190g',
    description: 'Freestanding 3D desk nameplate featuring dual-extruded 3D floating characters mounted on a hollow channel chassis that supports internal LED strip backlighting.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80'
    ],
    modelType: 'signboard',
    allowCustomText: true,
    customTextPlaceholder: 'e.g. VORTEX, SARAH STUDIO, or DEV-LEAD',
    requiresUserImage: false,
    minImages: 0,
    maxImages: 0,
    customizableSections: [
      {
        id: 'font_face',
        name: 'Front Letter Face Color',
        defaultColor: '#06B6D4',
        options: [
          { name: 'Cyber Cyan', hex: '#06B6D4' },
          { name: 'Neon Orange', hex: '#F97316' },
          { name: 'Toxic Lime', hex: '#84CC16' },
          { name: 'Hot Magenta', hex: '#D946EF' },
          { name: 'Signal White', hex: '#FFFFFF' }
        ]
      },
      {
        id: 'frame_housing',
        name: 'Desk Stand Frame Color',
        defaultColor: '#0F172A',
        options: [
          { name: 'Stealth Carbon Black', hex: '#0F172A' },
          { name: 'Concrete Gray', hex: '#64748B' },
          { name: 'Arctic White', hex: '#F1F5F9' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Liam Vance',
        rating: 5,
        date: '4 days ago',
        comment: 'Looks wicked on my battlestation stream setup. Cyber cyan really contrasts with the matte black chassis.',
        verified: true,
        images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80']
      }
    ]
  },
  {
    id: 'prod-lithophane-lamp',
    name: 'Custom 3D Lithophane Memory Photo Lamp Gift',
    category: '3d-gift',
    categoryLabel: '3D Gifts',
    price: 34.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviewsCount: 110,
    printTime: '5h 30m',
    printTimeMinutes: 330,
    badge: 'Photo Upload',
    dimensions: '140 x 140 x 160 mm',
    material: 'Optical Translucent PLA & Wood PLA',
    layerHeight: '0.10mm Ultra Fine',
    weight: '140g',
    description: 'Transform your cherished couple, family, or pet photos into a light-diffusing cylindrical lithophane. When backlit by the included warm USB LED base, your image magically appears in photorealistic grayscale relief.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80'
    ],
    modelType: 'lamp',
    allowCustomText: true,
    customTextPlaceholder: 'Base engraving text (e.g. Always & Forever 2026)',
    requiresUserImage: true,
    minImages: 1,
    maxImages: 3,
    imageInstructions: 'Upload 1 to 3 high-contrast portrait or landscape photos. Our CAD software converts your pictures into curved 3D light-relief lithophane panels.',
    customizableSections: [
      {
        id: 'base_pedestal',
        name: 'Pedestal Lamp Base Color',
        defaultColor: '#78350F',
        options: [
          { name: 'Walnut Wood Grain', hex: '#78350F' },
          { name: 'Matte Marble White', hex: '#F8FAFC' },
          { name: 'Charcoal Black', hex: '#1E293B' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Sophia Chen',
        rating: 5,
        date: '2 days ago',
        comment: 'I uploaded our wedding picture and the lithophane detail is unbelievable! When the warm LED turns on, everyone gasps.',
        verified: true,
        images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80']
      },
      {
        id: 'rev-8',
        author: 'Rajiv Patel',
        rating: 5,
        date: '1 week ago',
        comment: 'Bought this for my mother’s 60th birthday with a photo of her grandkids. Super fast shipping and pristine packaging.',
        verified: true,
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop&q=80']
      }
    ]
  },
  {
    id: 'prod-spotify-keychain',
    name: '3D Scannable Spotify Song Code Keychain',
    category: '3d-keychain',
    categoryLabel: '3D Keychains',
    price: 11.50,
    originalPrice: 15.00,
    rating: 4.9,
    reviewsCount: 230,
    printTime: '35m',
    printTimeMinutes: 35,
    badge: 'Under $15',
    dimensions: '70 x 20 x 5 mm',
    material: 'UV Stable PLA+',
    layerHeight: '0.12mm High Precision',
    weight: '12g',
    description: 'Precision embossed Spotify barcode that scans instantly using the Spotify mobile camera! Plays your special anniversary song, podcast, or romantic playlist whenever scanned.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80'
    ],
    modelType: 'keychain',
    allowCustomText: true,
    customTextPlaceholder: 'Song Title & Artist (e.g. Perfect - Ed Sheeran)',
    requiresUserImage: false,
    minImages: 0,
    maxImages: 0,
    customizableSections: [
      {
        id: 'code_bars',
        name: 'Scannable Code Bars Color',
        defaultColor: '#10B981',
        options: [
          { name: 'Spotify Green', hex: '#10B981' },
          { name: 'Pitch Black', hex: '#000000' },
          { name: 'Silver Chrome', hex: '#CBD5E1' }
        ]
      },
      {
        id: 'fob_body',
        name: 'Keychain Body Color',
        defaultColor: '#0F172A',
        options: [
          { name: 'Matte Black', hex: '#0F172A' },
          { name: 'Opal White', hex: '#FFFFFF' },
          { name: 'Pastel Blue', hex: '#38BDF8' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Brandon Taylor',
        rating: 5,
        date: '6 days ago',
        comment: 'Scans instantly every single time on iPhone and Android Spotify app. Incredible gift for our 2nd anniversary.',
        verified: true,
        images: []
      }
    ]
  },
  {
    id: 'prod-sculpture-infinity-heart',
    name: 'Geometric Infinity Heart 3D Sculpture Gift',
    category: '3d-gift',
    categoryLabel: '3D Gifts',
    price: 28.00,
    originalPrice: 38.00,
    rating: 4.8,
    reviewsCount: 75,
    printTime: '2h 50m',
    printTimeMinutes: 170,
    badge: 'Anniversary Pick',
    dimensions: '130 x 120 x 40 mm',
    material: 'Silk Tricolor Co-Extruded PLA',
    layerHeight: '0.16mm Silk Finish',
    weight: '85g',
    description: 'An elegant Mobius strip infinity heart that twists gracefully in 3-dimensional space. Self-standing on any mantle or office desk with reflective prismatic dual-tone luster.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80'
    ],
    modelType: 'statue',
    allowCustomText: false,
    requiresUserImage: false,
    minImages: 0,
    maxImages: 0,
    customizableSections: [
      {
        id: 'sculpture_tone',
        name: 'Ribbon Gradient Tone',
        defaultColor: '#F43F5E',
        options: [
          { name: 'Silk Rose Quartz', hex: '#F43F5E' },
          { name: 'Imperial Gold', hex: '#EAB308' },
          { name: 'Cosmic Purple-Blue', hex: '#6366F1' },
          { name: 'Pure Alabaster', hex: '#F8FAFC' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Chloe Bennett',
        rating: 5,
        date: '1 week ago',
        comment: 'Silky smooth surface with beautiful shifting colors as the sunlight hits it.',
        verified: true,
        images: []
      }
    ]
  },
  {
    id: 'prod-gyroscope-fidget',
    name: 'Precision Print-in-Place Gyroscope Fidget Cube',
    category: '3d-gift',
    categoryLabel: '3D Gifts',
    price: 15.00,
    originalPrice: 19.99,
    rating: 4.9,
    reviewsCount: 189,
    printTime: '1h 10m',
    printTimeMinutes: 70,
    badge: 'Kinetic Art',
    dimensions: '60 x 60 x 60 mm',
    material: 'Tough Impact PLA',
    layerHeight: '0.20mm Free-Spinning Clearance',
    weight: '48g',
    description: 'Printed fully assembled in a single job with zero screws or glue required. Four concentric nested gimbal rings spin freely around a central gemstone core for soothing tactile desk therapy.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80'
    ],
    modelType: 'statue',
    allowCustomText: false,
    requiresUserImage: false,
    minImages: 0,
    maxImages: 0,
    customizableSections: [
      {
        id: 'outer_rings',
        name: 'Outer Gimbal Rings',
        defaultColor: '#4F46E5',
        options: [
          { name: 'Cobalt Indigo', hex: '#4F46E5' },
          { name: 'Neon Green', hex: '#22C55E' },
          { name: 'Vibrant Orange', hex: '#F97316' },
          { name: 'Stealth Black', hex: '#18181B' }
        ]
      },
      {
        id: 'core_sphere',
        name: 'Inner Gem Core',
        defaultColor: '#EAB308',
        options: [
          { name: 'Golden Sun', hex: '#EAB308' },
          { name: 'Ruby Glow', hex: '#EF4444' },
          { name: 'Diamond White', hex: '#F8FAFC' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-11',
        author: 'Marcus Brody',
        rating: 5,
        date: '3 days ago',
        comment: 'Mind-blowing print-in-place tolerances. Spins silently and endlessly on my workstation desk.',
        verified: true,
        images: []
      }
    ]
  },
  {
    id: 'prod-planter-poly',
    name: 'Nordic Low-Poly Self-Watering Desk Planter',
    category: '3d-gift',
    categoryLabel: '3D Gifts',
    price: 22.00,
    originalPrice: 28.00,
    rating: 4.7,
    reviewsCount: 52,
    printTime: '3h 15m',
    printTimeMinutes: 195,
    badge: 'Home Decor',
    dimensions: '110 x 110 x 95 mm',
    material: 'Waterproof Recycled PETG',
    layerHeight: '0.24mm Watertight Perimeters',
    weight: '115g',
    description: 'Modern geometric succulent pot with hidden capillary water reservoir in the base. Prevents over-watering and root rot while serving as a striking architectural desk ornament.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80'
    ],
    modelType: 'planter',
    allowCustomText: false,
    requiresUserImage: false,
    minImages: 0,
    maxImages: 0,
    customizableSections: [
      {
        id: 'planter_body',
        name: 'Planter Pot Finish',
        defaultColor: '#10B981',
        options: [
          { name: 'Sage Green', hex: '#10B981' },
          { name: 'Warm Terracotta', hex: '#EA580C' },
          { name: 'Carrara Marble', hex: '#E2E8F0' },
          { name: 'Matte Charcoal', hex: '#334155' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-12',
        author: 'Hannah Lee',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Completely watertight and looks like modern Scandinavian ceramics.',
        verified: true,
        images: []
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All 3D Creations', icon: 'Sparkles', count: 8 },
  { id: '3d-keychain', name: '3D Keychains', icon: 'Key', count: 2 },
  { id: 'cake-toppers', name: 'Cake Toppers', icon: 'Cake', count: 1 },
  { id: 'name-boards', name: 'Name Boards', icon: 'Type', count: 1 },
  { id: '3d-gift', name: '3D Gifts & Art', icon: 'Gift', count: 4 }
];
