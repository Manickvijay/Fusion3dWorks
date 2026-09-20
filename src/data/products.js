export const PRODUCTS = [
  // --- 3D PRINTERS ---
  {
    id: 'prod-printer-apex',
    title: 'Fusion3D Apex Pro CoreXY High-Speed 3D Printer (600mm/s)',
    brand: 'Fusion3D Apex',
    category: '3d-printers',
    categoryLabel: '3D Printers',
    price: 749.00,
    originalPrice: 999.00,
    discount: '25% off',
    rating: 4.9,
    reviewCount: 428,
    stock: 35,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    sku: 'F3D-PRT-APX-01',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Flagship CoreXY',
    technology: 'CoreXY FDM',
    buildVolume: '256 x 256 x 256 mm',
    printSpeed: 'Up to 600 mm/s',
    acceleration: '20,000 mm/s²',
    nozzleMaxTemp: '300°C All-Metal',
    bedMaxTemp: '120°C Aluminum Heated Bed',
    supportedMaterials: ['PLA', 'PETG', 'TPU', 'ABS', 'ASA', 'PA-CF', 'PET-CF'],
    description: 'The Apex Pro sets a new benchmark for desktop FDM performance. Powered by Klipper architecture with active input shaping and automated vibration compensation, it prints functional engineering prototypes in a fraction of standard print times without ringing or surface artifacts.',
    highlights: [
      'Integrated AI LiDAR dual-check sensor for 100% first-layer perfection',
      'Enclosed chamber with activated carbon HEPA air filtration',
      'Hardened steel dual-gear direct drive extruder handles abrasive carbon fiber',
      '4.3-inch responsive IPS touchscreen with dual-band Wi-Fi & remote cloud monitoring'
    ],
    variants: [
      { name: 'Standard Unit', price: 749.00, sku: 'F3D-APX-STD' },
      { name: 'Combo + 4-Color AMS Unit', price: 949.00, sku: 'F3D-APX-AMS' },
      { name: 'Engineer Bundle (Includes Hardened Steel 0.6mm + 3kg PA-CF)', price: 1049.00, sku: 'F3D-APX-ENG' }
    ],
    specs: {
      'Printing Technology': 'CoreXY Direct Drive FDM',
      'Build Volume': '256 × 256 × 256 mm³',
      'Max Toolhead Speed': '600 mm/s',
      'Max Acceleration': '20,000 mm/s²',
      'Max Hotend Temp': '300 °C (Ceramic All-Metal)',
      'Chamber Type': 'Fully Enclosed with Air Purifier',
      'Bed Leveling': 'Full-Auto Dual Redundant Sensor Matrix',
      'Filament Runout': 'Optical Sensor with Auto-Tangle Pause',
      'Connectivity': 'Wi-Fi 6, Ethernet, USB 3.0'
    },
    whatInBox: [
      'Fusion3D Apex Pro 3D Printer (Pre-assembled 95%)',
      'Double-Sided Textured PEI Spring Steel Plate',
      'Hardened Steel 0.4mm Nozzle (Pre-installed)',
      '1.0kg High-Speed PLA+ Test Spool',
      'Hex wrench set, needle cleaner, grease lubricant & scraper',
      'AC Power Cord & Quick Start Guide'
    ],
    warranty: '2-Year Fusion3D Factory Limited Warranty with 24/7 Priority Support',
    shippingInfo: 'Free Express Courier Shipping. Ships in heavy-duty foam crate.',
    reviews: [
      { user: 'Marcus Vance', rating: 5, date: '14 Sep 2026', comment: 'Blowing away every printer I have ever owned. 18-minute 3DBenchy with zero stringing and mirror-smooth walls.' },
      { user: 'Elena Rostova', rating: 5, date: '02 Sep 2026', comment: 'The AI camera caught a failed spaghetti print immediately and sent an alert to my phone. Brilliant engineering.' }
    ]
  },
  {
    id: 'prod-printer-saturn-resin',
    title: 'Saturn 4 Ultra 12K Precision Mono SLA Resin 3D Printer',
    brand: 'Elegoo',
    category: '3d-printers',
    categoryLabel: '3D Printers',
    price: 499.00,
    originalPrice: 629.00,
    discount: '20% off',
    rating: 4.8,
    reviewCount: 312,
    stock: 22,
    inStock: true,
    isFeatured: true,
    sku: 'ELG-ST4-12K',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '12K Sub-Micron Detail',
    technology: 'SLA / MSLA Resin',
    buildVolume: '218.88 x 122.88 x 220 mm',
    printSpeed: 'Up to 150 mm/h with Tilt-Release',
    description: 'Equipped with a 10-inch 12K monochrome LCD providing an astonishing 19x24 micron XY resolution. The revolutionary tilting vat technology detaches cured layers in a fraction of a second, drastically speeding up miniature, dental, and jewelry production.',
    highlights: [
      '12K Mono LCD (11520 x 5120) with 9H tempered screen protector',
      'Tilt-release technology reduces peel force by 80%',
      'Auto-leveling mechanical sensor with zero manual bed tramming required',
      'Integrated AI monitoring camera and resin vat residue sensor'
    ],
    variants: [
      { name: 'Printer Only', price: 499.00, sku: 'ELG-ST4-STD' },
      { name: 'Studio Bundle (+ Wash & Cure Station Plus)', price: 699.00, sku: 'ELG-ST4-WCS' }
    ],
    specs: {
      'Screen Type': '10-inch 12K Monochrome LCD',
      'XY Resolution': '19 × 24 μm (Microns)',
      'Light Source': 'COB Refractive UV LED (405nm)',
      'Layer Height': '0.01 - 0.2 mm',
      'Release Mechanism': 'High-Speed Dynamic Tilt Vat'
    },
    whatInBox: ['Saturn 4 Ultra Printer', 'Laser-etched Build Plate', 'Resin Vat with PFA Film', 'USB Air Purifier', 'Tool kit, gloves & masks'],
    warranty: '1-Year Official Warranty with Screen Replacement Guarantee',
    shippingInfo: 'Fast dispatch within 24 hours in reinforced packaging.'
  },
  {
    id: 'prod-printer-pro-idex',
    title: 'Fusion3D Forge IDEX Dual-Extruder Industrial 3D Printer',
    brand: 'Fusion3D Apex',
    category: '3d-printers',
    categoryLabel: '3D Printers',
    price: 1899.00,
    originalPrice: 2499.00,
    discount: '24% off',
    rating: 4.9,
    reviewCount: 164,
    stock: 12,
    inStock: true,
    isFeatured: true,
    sku: 'F3D-PRT-IDEX-02',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Industrial IDEX',
    technology: 'IDEX Dual Nozzle',
    buildVolume: '350 x 300 x 400 mm',
    printSpeed: 'Up to 400 mm/s',
    description: 'Independent Dual Extrusion (IDEX) allows seamless printing of water-soluble supports (PVA/BVOH) for impossible overhangs, or synchronous mirror & duplicate printing for doubled manufacturing throughput.',
    highlights: [
      'Independent Dual Toolheads with automatic nozzle parking',
      'Actively heated build chamber up to 70°C prevents warping in Nylon and Polycarbonate',
      'Direct water-soluble support compatibility for intricate internal geometries',
      'Continuous print-farm API integration with auto job queue'
    ],
    specs: {
      'Technology': 'Independent Dual Extrusion (IDEX)',
      'Build Volume': '350 × 300 × 400 mm³',
      'Chamber Heater': 'Active 70 °C PTC Heated Chamber',
      'Nozzle Temperatures': 'Up to 350 °C Hardened Alloy'
    },
    whatInBox: ['Forge IDEX Printer', 'Dual Toolhead assemblies', 'PVA Soluble support spool 500g', 'Tool chest & calibration kit'],
    warranty: '2-Year Commercial & Industrial On-Site Warranty'
  },

  // --- FILAMENTS ---
  {
    id: 'prod-filament-pla',
    title: 'Fusion3D HyperSpeed PLA+ 1.75mm 1kg High-Flow Spool',
    brand: 'Fusion3D Apex',
    category: 'filaments',
    categoryLabel: 'Filaments',
    price: 24.99,
    originalPrice: 34.99,
    discount: '28% off',
    rating: 4.8,
    reviewCount: 1240,
    stock: 240,
    inStock: true,
    isBestSeller: true,
    sku: 'F3D-FIL-PLA-01',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Fast Flow 600mm/s',
    material: 'High-Purity PLA+ Polymer',
    diameter: '1.75 mm ± 0.02 mm',
    weight: '1.0 kg (2.2 lbs)',
    nozzleTemp: '190°C - 230°C',
    bedTemp: '50°C - 60°C',
    color: '#3b82f6',
    availableColors: [
      { name: 'Cobalt Blue', hex: '#3b82f6' },
      { name: 'Matte Charcoal', hex: '#1e293b' },
      { name: 'Signal Orange', hex: '#f97316' },
      { name: 'Arctic White', hex: '#f8fafc' },
      { name: 'Emerald Green', hex: '#10b981' }
    ],
    description: 'Specially formulated with molecular chain length control to deliver rapid melt fluidity and instant cooling. Delivers 5x faster printing speeds without nozzle clogs, stringing, or brittle layer adhesion.',
    highlights: [
      'Laser-gauged diameter tolerance of ±0.02mm eliminates extrusion variation',
      'Vacuum-sealed with industrial desiccant in an eco-friendly cardboard spool',
      'Enhanced impact toughness over standard PLA by 250%'
    ],
    specs: {
      'Melt Flow Index': '18 g/10min (210°C, 2.16kg)',
      'Tensile Strength': '62 MPa',
      'Density': '1.24 g/cm³',
      'Spool Material': '100% Recyclable Biodegradable Cardboard'
    },
    reviews: [
      { user: 'Dan Higgins', rating: 5, date: '11 Sep 2026', comment: 'Zero stringing at 500mm/s on my Klipper machine. Colors are vibrant and matte.' }
    ]
  },
  {
    id: 'prod-filament-petgcf',
    title: 'Carbon-Fiber Reinforced PETG-CF 1.75mm 1kg High-Rigidity',
    brand: 'Fusion3D Apex',
    category: 'filaments',
    categoryLabel: 'Filaments',
    price: 38.99,
    originalPrice: 49.99,
    discount: '22% off',
    rating: 4.9,
    reviewCount: 680,
    stock: 95,
    inStock: true,
    isFeatured: true,
    sku: 'F3D-FIL-PETGCF',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Structural Carbon',
    material: 'PETG + 15% Chopped Carbon Fiber',
    diameter: '1.75 mm',
    weight: '1.0 kg',
    color: '#334155',
    availableColors: [
      { name: 'Carbon Stealth Black', hex: '#0f172a' },
      { name: 'Gunmetal Titanium', hex: '#475569' }
    ],
    description: 'Combining the moisture resistance and ease of PETG with high-modulus chopped carbon fibers. Delivers a gorgeous matte texture that completely hides layer lines while drastically improving flexural stiffness.',
    highlights: [
      '15% high-strength chopped carbon fibers prevent thermal warping',
      'Requires hardened steel nozzle (0.4mm or 0.6mm recommended)',
      'Ideal for drone arms, robotics frames, and camera mounts'
    ],
    specs: {
      'Tensile Modulus': '4,500 MPa',
      'Heat Deflection Temp': '78 °C at 0.45 MPa',
      'Nozzle Temperature': '240°C - 260°C'
    }
  },
  {
    id: 'prod-filament-nyloncf',
    title: 'Engineering PA12-CF Industrial Carbon Nylon 1kg Spool',
    brand: 'Fusion3D Apex',
    category: 'filaments',
    categoryLabel: 'Filaments',
    price: 64.99,
    originalPrice: 84.99,
    discount: '23% off',
    rating: 4.9,
    reviewCount: 340,
    stock: 45,
    inStock: true,
    sku: 'F3D-FIL-PA12CF',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Aerospace Grade',
    material: 'Polyamide 12 + 20% Carbon Fiber',
    diameter: '1.75 mm',
    weight: '1.0 kg',
    description: 'For mission-critical end-use parts. Exceptional tensile strength, low moisture absorption compared to PA6, high continuous heat deflection (190°C), and chemical resistance against oils and gasoline.',
    specs: {
      'Heat Deflection Temp': '190 °C',
      'Tensile Strength': '105 MPa',
      'Recommended Nozzle': 'Hardened Steel or Ruby 280°C - 300°C'
    }
  },
  {
    id: 'prod-filament-tpu',
    title: 'FlexiGrip TPU 95A High-Resilience Flexible Filament 1kg',
    brand: 'Fusion3D Apex',
    category: 'filaments',
    categoryLabel: 'Filaments',
    price: 29.99,
    originalPrice: 39.99,
    discount: '25% off',
    rating: 4.7,
    reviewCount: 510,
    stock: 80,
    inStock: true,
    sku: 'F3D-FIL-TPU95',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Extreme Flexibility',
    material: 'Thermoplastic Polyurethane 95A',
    description: 'Rubber-like flexibility with 450% elongation at break. Perfect for gaskets, RC tires, protective phone bumpers, and wearable vibration dampeners.',
    specs: {
      'Shore Hardness': '95A',
      'Elongation at Break': '480%',
      'Print Speed': '40 - 100 mm/s Direct Drive'
    }
  },

  // --- RESINS ---
  {
    id: 'prod-resin-8k-standard',
    title: 'Fusion3D 8K High-Definition Photopolymer UV Resin (1kg)',
    brand: 'Fusion3D Apex',
    category: 'resins',
    categoryLabel: 'Resins',
    price: 34.99,
    originalPrice: 44.99,
    discount: '22% off',
    rating: 4.9,
    reviewCount: 420,
    stock: 110,
    inStock: true,
    isBestSeller: true,
    sku: 'F3D-RSN-8K-01',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Micro-Detail 8K',
    material: 'UV-Curing Liquid Resin (405nm)',
    weight: '1.0 kg Bottle',
    color: '#64748b',
    availableColors: [
      { name: 'Space Gray', hex: '#64748b' },
      { name: 'Obsidian Black', hex: '#18181b' },
      { name: 'Clear Crystal', hex: '#e2e8f0' },
      { name: 'Sculptors Cream', hex: '#fef3c7' }
    ],
    description: 'Ultra-low shrinkage formulation designed specifically for high-density 8K and 12K monochrome resin printers. Renders razor-sharp eyelashes, chainmail links, and mechanical gears without layer expansion.',
    specs: {
      'Viscosity': '180 - 250 mPa·s (25°C)',
      'Shrinkage Rate': '< 3.5%',
      'Shore Hardness': '84D',
      'Wavelength': '385 - 405 nm'
    }
  },
  {
    id: 'prod-resin-tough',
    title: 'Pro-Impact ABS-Like Tough Engineering Resin (1kg)',
    brand: 'Fusion3D Apex',
    category: 'resins',
    categoryLabel: 'Resins',
    price: 42.99,
    originalPrice: 54.99,
    discount: '21% off',
    rating: 4.8,
    reviewCount: 290,
    stock: 75,
    inStock: true,
    sku: 'F3D-RSN-TOUGH',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Non-Brittle Impact Resistant',
    description: 'Engineered with high elongation and impact resistance, eliminating the brittleness of standard resin. Can be drilled, tapped with M3/M4 threads, and dropped on concrete without shattering.'
  },

  // --- SPARE PARTS & NOZZLES ---
  {
    id: 'prod-nozzle-hardened-kit',
    title: 'Hardened Steel High-Wear Nozzle 5-Piece Kit (0.2, 0.4, 0.6, 0.8mm)',
    brand: 'Fusion3D Apex',
    category: 'spare-parts',
    categoryLabel: 'Spare Parts & Nozzles',
    price: 26.99,
    originalPrice: 39.99,
    discount: '32% off',
    rating: 4.9,
    reviewCount: 780,
    stock: 180,
    inStock: true,
    isBestSeller: true,
    sku: 'F3D-NZL-HD-KIT',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Mohs Hardness 7.8',
    description: 'Precision CNC-machined from heat-treated tool steel with internal electroless nickel coating. Resists abrasive filaments including carbon fiber, glow-in-the-dark strontium, and wood composites for 500+ print hours.',
    specs: {
      'Nozzle Diameters Included': '1x 0.2mm, 2x 0.4mm, 1x 0.6mm, 1x 0.8mm',
      'Thread Type': 'M6 standard (V6 / Bambu / MK8 compatible)',
      'Max Temp': '450 °C'
    }
  },
  {
    id: 'prod-nozzle-ruby',
    title: 'Synthetic Ruby Tipped Ultra-Precision 0.4mm Wear-Proof Nozzle',
    brand: 'Fusion3D Apex',
    category: 'spare-parts',
    categoryLabel: 'Spare Parts & Nozzles',
    price: 59.99,
    originalPrice: 79.99,
    discount: '25% off',
    rating: 4.9,
    reviewCount: 310,
    stock: 40,
    inStock: true,
    isFeatured: true,
    sku: 'F3D-NZL-RUBY',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Lifetime Wear Guarantee',
    description: 'Features a genuine sapphire-grade monocrystalline synthetic ruby orifice set in high-thermal conductivity copper alloy. Offers the thermal speed of brass with diamond-like abrasion resistance.'
  },
  {
    id: 'prod-hotend-ceramic',
    title: 'High-Flow 300°C Ceramic Core All-Metal Hotend Assembly',
    brand: 'Fusion3D Apex',
    category: 'spare-parts',
    categoryLabel: 'Spare Parts & Nozzles',
    price: 49.99,
    originalPrice: 69.99,
    discount: '28% off',
    rating: 4.8,
    reviewCount: 245,
    stock: 65,
    inStock: true,
    sku: 'F3D-HOT-CERAMIC',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '32mm³/s Volumetric Flow',
    description: '360° cylindrical ceramic heating element heats from room temperature to 200°C in just 32 seconds. Bi-metal titanium/copper heatbreak prevents heat creep clogs.'
  },

  // --- ACCESSORIES & BUILD PLATES ---
  {
    id: 'prod-plate-pei',
    title: 'Double-Sided Gold Textured PEI Spring Steel Build Plate (256x256mm)',
    brand: 'Fusion3D Apex',
    category: 'accessories',
    categoryLabel: 'Accessories & Build Plates',
    price: 34.99,
    originalPrice: 48.99,
    discount: '28% off',
    rating: 4.9,
    reviewCount: 960,
    stock: 150,
    inStock: true,
    isBestSeller: true,
    sku: 'F3D-PLT-PEI-256',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Zero Glue Sticks Needed',
    description: 'Electrostatically powder-coated with genuine Ultem 1000 PEI. Adheres strongly when hot (60°C+) and parts release themselves with a gentle flex once cooled to room temperature.',
    specs: {
      'Size': '256 × 256 mm (Bambu, Voron & Ender compatible)',
      'Plate Core': '0.5mm hardened Swedish spring steel',
      'Coating': 'Double-sided textured coarse powder PEI'
    }
  },
  {
    id: 'prod-dryer-box',
    title: 'Active Heated Filament Dryer Box with Real-Time RH% Display',
    brand: 'Fusion3D Apex',
    category: 'accessories',
    categoryLabel: 'Accessories & Build Plates',
    price: 54.99,
    originalPrice: 74.99,
    discount: '26% off',
    rating: 4.8,
    reviewCount: 512,
    stock: 60,
    inStock: true,
    isFeatured: true,
    sku: 'F3D-DRY-BOX-01',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'Active 70°C Heating',
    description: 'Eliminates moisture-induced popping, stringing, and weakness. PTC 360° fan heating reaches up to 70°C for Nylon, PETG, and PLA with Teflon feed tube for printing directly from the box.'
  },

  // --- PRINTING TOOLS ---
  {
    id: 'prod-tools-calipers',
    title: 'Professional IP54 Stainless Steel Digital Calipers 150mm (0.01mm Acc)',
    brand: 'Fusion3D Apex',
    category: 'tools',
    categoryLabel: 'Printing Tools',
    price: 28.99,
    originalPrice: 39.99,
    discount: '27% off',
    rating: 4.9,
    reviewCount: 890,
    stock: 140,
    inStock: true,
    isBestSeller: true,
    sku: 'F3D-TLS-CAL-150',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '0.01mm Precision',
    description: 'Precision hardened stainless steel measuring calipers with high-contrast LCD screen. Instant mm/inch/fraction toggling with zero calibration at any point. Essential for reverse engineering and 3D printing tolerances.'
  },
  {
    id: 'prod-tools-kit',
    title: 'Master 3D Printing Post-Processing & Deburring Toolset (24 Pieces)',
    brand: 'Fusion3D Apex',
    category: 'tools',
    categoryLabel: 'Printing Tools',
    price: 32.99,
    originalPrice: 45.99,
    discount: '28% off',
    rating: 4.8,
    reviewCount: 430,
    stock: 90,
    inStock: true,
    sku: 'F3D-TLS-MST-24',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '24-Piece Workshop Set',
    description: 'Includes 360-degree rotating deburring tool with 10 spare blades, brass wire nozzle brushes, ergonomic bed scraper, flush cutters, precision hobby knife set, and nozzle cleaning needles.'
  },

  // --- CUSTOM 3D PRINTED PRODUCTS & KITS ---
  {
    id: 'prod-custom-heart',
    title: 'Anatomical Human Heart 3D Model (Medical-Grade Study Replica)',
    brand: 'Fusion3D Works',
    category: 'custom-prints',
    categoryLabel: 'Custom 3D Prints',
    price: 49.99,
    originalPrice: 79.99,
    discount: '37% off',
    rating: 4.9,
    reviewCount: 620,
    stock: 50,
    inStock: true,
    isFeatured: true,
    sku: 'F3D-MDL-HEART-01',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '1:1 Life-Size Anatomy',
    material: 'Medical PLA+ (Non-toxic)',
    color: '#ef4444',
    dimensions: '120 x 95 x 145 mm',
    printTime: '14 hrs 30 min',
    description: '100% anatomically accurate scaled model derived from high-resolution medical micro-CT scan data. Demonstrates internal ventricles, coronary arteries, and pulmonary valves. Cast on a heavy acrylic display plinth.',
    specs: {
      'Layer Height': '0.12 mm (120 microns)',
      'Infill': '25% Gyroid Infill',
      'Finish': 'Vapor micro-smoothed finish'
    }
  },
  {
    id: 'prod-custom-samurai',
    title: 'Cyber Samurai Mech Figurine (8K SLA Resin Collector Edition)',
    brand: 'Fusion3D Works',
    category: 'custom-prints',
    categoryLabel: 'Custom 3D Prints',
    price: 39.99,
    originalPrice: 59.99,
    discount: '33% off',
    rating: 4.9,
    reviewCount: 890,
    stock: 45,
    inStock: true,
    isBestSeller: true,
    sku: 'F3D-MDL-SAMURAI',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80'
    ],
    badge: '8K Resin 28-Micron',
    color: '#8b5cf6',
    dimensions: '85 x 65 x 160 mm',
    description: 'Master sculpted futuristic cybernetic warrior with magnetic detachable twin katanas, micro-etched power armor plates, and weighted display base. Hand-cleaned and UV-cured, ready for miniature painting or instant desktop showcase.'
  },
  {
    id: 'prod-parts-voronkit',
    title: 'Voron 2.4 R2 Complete Functional Printed Parts Kit (ABS/ASA)',
    brand: 'Fusion3D Works',
    category: 'custom-prints',
    categoryLabel: 'Custom 3D Prints',
    price: 119.99,
    originalPrice: 159.99,
    discount: '25% off',
    rating: 4.9,
    reviewCount: 380,
    stock: 25,
    inStock: true,
    isFeatured: true,
    sku: 'F3D-KIT-VORON24',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    badge: 'PIF Spec Verified',
    material: 'Heat-Resistant ASA Polymer',
    description: 'Every functional part for building a Voron 2.4 R2 300/350mm CoreXY machine. Printed strictly to Voron Design Print-It-Forward (PIF) standards: 4 perimeters, 40% infill, with brass heat-set inserts pre-installed.'
  }
];
