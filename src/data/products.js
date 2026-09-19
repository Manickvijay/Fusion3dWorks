export const CATEGORIES = [
  { id: 'all', name: 'All 3D Works', icon: 'Layers' },
  { id: 'medical', name: 'Medical & Anatomy', icon: 'Activity' },
  { id: 'mechanical', name: 'Mechanical & Functional', icon: 'Cog' },
  { id: 'figurines', name: 'Figurines & Cosplay', icon: 'Bot' },
  { id: 'decor', name: 'Architectural & Decor', icon: 'Home' },
  { id: 'materials', name: 'Filaments & Resins', icon: 'Disc' },
  { id: 'custom', name: 'Custom 3D Printing', icon: 'Wrench' }
];

export const PRODUCTS = [
  {
    id: 'prod-heart',
    title: 'Anatomical Human Heart 3D Model (Medical Grade High-Precision)',
    tagline: 'Life-size 1:1 scale anatomical study model with chamber detailing',
    category: 'medical',
    categoryLabel: 'Medical & Anatomy',
    price: 1899,
    originalPrice: 3499,
    discount: '46% off',
    rating: 4.9,
    ratingCount: 842,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Tomorrow, by 2 PM',
    material: 'Medical PLA+ (Non-toxic)',
    technology: 'SLA / High-Res FDM',
    dimensions: '120 x 95 x 145 mm',
    weight: '240g',
    printTime: '14 hrs 30 min',
    modelType: 'obj',
    modelUrl: '/models/12190_Heart_v1_L3.obj',
    color: '#ef4444',
    availableColors: [
      { name: 'Anatomical Crimson', hex: '#ef4444' },
      { name: 'Medical White', hex: '#f8fafc' },
      { name: 'Translucent Cyan', hex: '#06b6d4' },
      { name: 'Obsidian Matte', hex: '#1e293b' }
    ],
    description: 'Accurately cast 3D anatomical heart model prepared from high-resolution micro-CT data. Ideal for medical students, cardiology demonstrations, and clinical education. Features realistic ventricular walls, aorta, and pulmonary arteries.',
    highlights: [
      '100% anatomically accurate scaled from medical scan data',
      'High layer resolution (0.12mm) with zero visible stepping',
      'Includes custom detachable acrylic display stand',
      'Sterilizable and heat resistant up to 60°C'
    ],
    specs: {
      'Layer Resolution': '0.12 mm (120 microns)',
      'Infill Density': '25% Gyroid Infill',
      'Tensile Strength': '58 MPa',
      'Surface Finish': 'Micro-bead vapor smoothed',
      'Warranty': '1 Year Fusion3D Integrity Guarantee'
    },
    reviews: [
      { user: 'Dr. Rajesh Nair', rating: 5, date: '12 Sep 2026', comment: 'Exceptional level of anatomical fidelity. The coronary sulcus and ventricles are clearly demarcated. Used it in my hospital clinic.' },
      { user: 'Kavita Sundaram', rating: 5, date: '04 Sep 2026', comment: 'Packed securely in dense foam. Finish is smooth with no stringing or layer defects.' }
    ]
  },
  {
    id: 'prod-tinker',
    title: 'TinkerBot Autonomous Chassis & Gear Enclosure',
    tagline: 'Engineering-grade robotics core platform with snap-fit mounts',
    category: 'mechanical',
    categoryLabel: 'Mechanical & Functional',
    price: 1249,
    originalPrice: 2299,
    discount: '45% off',
    rating: 4.8,
    ratingCount: 620,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Tomorrow, by 5 PM',
    material: 'Carbon-Fiber Reinforced PETG',
    technology: 'Industrial FDM',
    dimensions: '140 x 110 x 85 mm',
    weight: '185g',
    printTime: '9 hrs 15 min',
    modelType: 'obj',
    modelUrl: '/models/tinker.obj',
    color: '#0284c7',
    availableColors: [
      { name: 'Electric Cyan', hex: '#0284c7' },
      { name: 'Industrial Gray', hex: '#475569' },
      { name: 'Stealth Black', hex: '#0f172a' },
      { name: 'Caution Orange', hex: '#ea580c' }
    ],
    description: 'A modular, high-rigidity robotics housing engineered for microcontrollers, sensors, and dual continuous servo motors. Features pre-tapped M3 brass heat-set inserts and precision ventilation louvers.',
    highlights: [
      'Pre-installed M3 threaded brass inserts (12 mounting points)',
      'Rigid carbon-fiber PETG composite prevents structural flex',
      'Compatible with Arduino, Raspberry Pi 4/5, and ESP32',
      'Shock-absorbing corner bumpers included'
    ],
    specs: {
      'Material': 'PETG-CF (15% chopped carbon fiber)',
      'Wall Thickness': '2.8 mm (4 outer perimeters)',
      'Infill Density': '40% Triangular Grid',
      'Tolerance': '±0.08 mm dimensional accuracy',
      'Warranty': '6 Months Replacement Guarantee'
    },
    reviews: [
      { user: 'Aditya Verma', rating: 5, date: '14 Sep 2026', comment: 'Dimensions matched my CAD blueprint to under 0.1mm. Motors snapped right in!' },
      { user: 'Siddharth Rao', rating: 4.5, date: '01 Sep 2026', comment: 'Super sturdy! The carbon fiber texture gives it a top-tier industrial look.' }
    ]
  },
  {
    id: 'prod-gearbox',
    title: 'Planetary Gear Reduction Kit (3:1 High-Torque Functional Assembly)',
    tagline: 'Precision interlocking sun, planet, and ring gears with smooth bearings',
    category: 'mechanical',
    categoryLabel: 'Mechanical & Functional',
    price: 999,
    originalPrice: 1899,
    discount: '47% off',
    rating: 4.9,
    ratingCount: 1120,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Today by 9 PM',
    material: 'Engineering Tough Nylon (PA12)',
    technology: 'SLS / FDM',
    dimensions: '90 x 90 x 45 mm',
    weight: '140g',
    printTime: '6 hrs 45 min',
    modelType: 'procedural',
    proceduralType: 'gearbox',
    color: '#d97706',
    availableColors: [
      { name: 'Amber Gold', hex: '#d97706' },
      { name: 'Machined Steel', hex: '#64748b' },
      { name: 'Signal Red', hex: '#dc2626' },
      { name: 'Matte Jet', hex: '#18181b' }
    ],
    description: 'Fully assembled 3:1 planetary gearbox designed for educational robotics and motion engineering. Spins effortlessly right out of the box with zero binding, utilizing involute tooth profile optimization.',
    highlights: [
      'Print-in-place tolerances pre-calibrated to 0.25mm clearance',
      'Self-lubricating wear-resistant nylon gears',
      'Includes knurled manual crank and motor shaft coupling adapter',
      'Rated for up to 2.5 Nm continuous output torque'
    ],
    specs: {
      'Gear Ratio': '3:1 Reduction Ratio',
      'Tooth Profile': '20° Pressure Angle Involute',
      'Bearing Setup': 'Integrated sealed 608RS ball bearings',
      'Lubrication': 'Dry PTFE coating applied'
    },
    reviews: [
      { user: 'Arun K.', rating: 5, date: '18 Sep 2026', comment: 'Butter smooth rotation. Zero backlash and teeth mesh flawlessly.' }
    ]
  },
  {
    id: 'prod-planter',
    title: 'Voronoi Spiral Parametric Architecture Lamp & Planter',
    tagline: 'Self-watering dual-tier modern geometric home centerpiece',
    category: 'decor',
    categoryLabel: 'Architectural & Decor',
    price: 849,
    originalPrice: 1699,
    discount: '50% off',
    rating: 4.7,
    ratingCount: 940,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Tomorrow, by 11 AM',
    material: 'Eco-friendly Silk PLA with Wood Fiber',
    technology: 'FDM Ultra-Fine',
    dimensions: '130 x 130 x 180 mm',
    weight: '210g',
    printTime: '11 hrs 20 min',
    modelType: 'procedural',
    proceduralType: 'vase',
    color: '#059669',
    availableColors: [
      { name: 'Emerald Silk', hex: '#059669' },
      { name: 'Warm Terracotta', hex: '#c2410c' },
      { name: 'Champagne Gold', hex: '#eab308' },
      { name: 'Porcelain White', hex: '#f8fafc' }
    ],
    description: 'Award-winning mathematical Voronoi tessellation vase and ambient tabletop planter. Casts mesmerizing shadow patterns when illuminated with internal LED tea lights.',
    highlights: [
      'Dual-function: watertight succulent pot or ambient tea-light lamp',
      'Organic algorithmic cellular lattice inspired by natural leaf veins',
      'Zero waste additive manufacturing process',
      'Weighted silicone anti-slip base pads included'
    ],
    specs: {
      'Waterproofing': '3x acrylic sealed inner lining (leak-tested)',
      'Temperature Rating': '-10°C to 55°C',
      'Finish': 'Satin iridescent sheen'
    },
    reviews: [
      { user: 'Meera Deshmukh', rating: 5, date: '10 Sep 2026', comment: 'Looks like a ₹5,000 museum art piece on my living room coffee table.' }
    ]
  },
  {
    id: 'prod-cyber-samurai',
    title: 'Cyber Samurai Mech Figurine (8K Resin Collector Edition)',
    tagline: 'Ultra-dense 28-micron resin miniature with removable katana blades',
    category: 'figurines',
    categoryLabel: 'Figurines & Cosplay',
    price: 1499,
    originalPrice: 2999,
    discount: '50% off',
    rating: 4.9,
    ratingCount: 1540,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Tomorrow, by 1 PM',
    material: '8K Tough Photopolymer Resin',
    technology: 'SLA / DLP 8K UV Resin',
    dimensions: '85 x 65 x 160 mm',
    weight: '160g',
    printTime: '8 hrs 50 min',
    modelType: 'procedural',
    proceduralType: 'samurai',
    color: '#8b5cf6',
    availableColors: [
      { name: 'Cyber Purple', hex: '#8b5cf6' },
      { name: 'Gunmetal Titanium', hex: '#334155' },
      { name: 'Blood Crimson', hex: '#b91c1c' },
      { name: 'Primer Gray (Ready to Paint)', hex: '#94a3b8' }
    ],
    description: 'Designed by master concept sculptors, this high-octane cybernetic warrior features micro-etched cyber armor, articulated shoulder pauldrons, and twin dual-wielded high-frequency blades.',
    highlights: [
      '8K layer exposure (28 micron pixel size) capturing microscopic rivets',
      'UV cured and ultrasonic alcohol cleaned for pristine matte finish',
      'Ready for primer and acrylic miniature painting or instant display',
      'Heavy magnetic display plinth included'
    ],
    specs: {
      'Resolution': '8K UV Mono LCD (7680 x 4320)',
      'Shore Hardness': '84D Tough Resin',
      'Assembly': 'Pre-assembled with magnetized weapons'
    },
    reviews: [
      { user: 'Vikram Joshi', rating: 5, date: '16 Sep 2026', comment: 'Insane detail! Even the individual mesh wires on the armor are razor sharp.' }
    ]
  },
  {
    id: 'prod-filament-pla',
    title: 'Fusion3D HyperSpeed PLA+ 1.75mm 1kg High-Flow Filament Spool',
    tagline: 'High-speed printing up to 600mm/s with ±0.02mm laser diameter precision',
    category: 'materials',
    categoryLabel: 'Filaments & Resins',
    price: 899,
    originalPrice: 1599,
    discount: '43% off',
    rating: 4.8,
    ratingCount: 2310,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Tomorrow, by 10 AM',
    material: 'Pure NatureWorks Bio-Polymer',
    technology: 'Raw 3D Material',
    dimensions: '200 x 200 x 65 mm (Spool)',
    weight: '1.0 kg (Net Filament)',
    printTime: 'Instant Ready',
    modelType: 'procedural',
    proceduralType: 'spool',
    color: '#2563eb',
    availableColors: [
      { name: 'Royal Blue', hex: '#2563eb' },
      { name: 'Jet Black', hex: '#09090b' },
      { name: 'Snow White', hex: '#f8fafc' },
      { name: 'Galaxy Silver (Glitter)', hex: '#94a3b8' },
      { name: 'Fire Engine Red', hex: '#ef4444' }
    ],
    description: 'Engineered specifically for high-speed CoreXY 3D printers (Bambu Lab, Creality K1, Voron, Prusa MK4). Features enhanced melt flow index, zero tangle neat winding, and vacuum packaging with industrial desiccant.',
    highlights: [
      'Tested up to 600mm/s without under-extrusion',
      'Neat layer winding prevents mid-print knot jams',
      'Toughness 10x higher than standard basic PLA',
      'Cardboard spool with calibrated remaining-weight scale'
    ],
    specs: {
      'Diameter': '1.75 mm ± 0.02 mm',
      'Nozzle Temp': '190°C - 230°C',
      'Bed Temp': '50°C - 65°C',
      'Print Speed': '50 - 600 mm/s'
    },
    reviews: [
      { user: 'Sanjay Patel', rating: 5, date: '15 Sep 2026', comment: 'Printed on my P1S at 350mm/s without a single glitch. Zero stringing.' }
    ]
  },
  {
    id: 'prod-resin-8k',
    title: 'Fusion3D OptiCure 8K Precision Photopolymer UV Resin (1000g)',
    tagline: 'Ultra-low shrinkage, odorless formula for SLA/DLP 405nm 3D printers',
    category: 'materials',
    categoryLabel: 'Filaments & Resins',
    price: 1849,
    originalPrice: 3200,
    discount: '42% off',
    rating: 4.9,
    ratingCount: 780,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Tomorrow, by 4 PM',
    material: 'Low-Odor Methacrylate Resin',
    technology: 'UV 405nm SLA/DLP/LCD',
    dimensions: '95 x 95 x 240 mm (Bottle)',
    weight: '1.0 kg',
    printTime: 'Instant Ready',
    modelType: 'procedural',
    proceduralType: 'bottle',
    color: '#64748b',
    availableColors: [
      { name: 'Space Gray', hex: '#64748b' },
      { name: 'Matte Black', hex: '#1e293b' },
      { name: 'Crystal Clear', hex: '#e2e8f0' }
    ],
    description: 'High-definition 405nm light-curing resin designed for micro-feature capture. Formulated for minimal volumetric contraction during curing, yielding pin-point dimensional precision for dental, jewelry, and gaming miniatures.',
    highlights: [
      'Minimal shrinkage (<2.2%) guarantees accurate snaps',
      'Fast curing layer time (1.4s - 2.2s on monochrome LCD)',
      'Low viscosity allows rapid leveling and easy alcohol cleaning',
      'Leak-proof aluminum sealed container with child-safe cap'
    ],
    specs: {
      'Curing Wavelength': '385 - 405 nm',
      'Viscosity': '180 - 250 mPa·s at 25°C',
      'Tensile Modulus': '1800 - 2400 MPa',
      'Elongation at Break': '8 - 14%'
    },
    reviews: [
      { user: 'Nitin Gupta', rating: 5, date: '11 Sep 2026', comment: 'Best resin in Indian market. Prints come out crisp with negligible odor.' }
    ]
  },
  {
    id: 'prod-keychain',
    title: 'Custom Dual-Tone Name & Logo Keychain (Custom Made to Order)',
    tagline: 'Personalized embossed typography with reinforced stainless steel ring',
    category: 'custom',
    categoryLabel: 'Custom 3D Printing',
    price: 249,
    originalPrice: 499,
    discount: '50% off',
    rating: 4.8,
    ratingCount: 3410,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Delivered in 48 Hours',
    material: 'Impact-Resistant PLA+',
    technology: 'Multi-Color FDM',
    dimensions: '75 x 25 x 6 mm',
    weight: '18g',
    printTime: '45 min',
    modelType: 'procedural',
    proceduralType: 'keychain',
    color: '#e11d48',
    availableColors: [
      { name: 'Ruby & Black', hex: '#e11d48' },
      { name: 'Electric Blue & White', hex: '#2563eb' },
      { name: 'Gold & Obsidian', hex: '#eab308' },
      { name: 'Toxic Green & Black', hex: '#16a34a' }
    ],
    description: 'Customizable embossed 3D keychain manufactured on multi-material printers. Enter any name, car number, or gamertag during checkout to receive a bespoke, durable personalized gift.',
    highlights: [
      'Multi-material dual extrusion: raised lettering will never peel or fade',
      'Reinforced lanyard hole with steel split ring included',
      'Pocket-friendly beveled chamfers prevent snagging',
      'Over 50,000 custom keychains shipped across India'
    ],
    specs: {
      'Customization': 'Up to 12 letters alphanumeric',
      'Hardware': '30mm 304 stainless steel ring included',
      'Process': 'Fused Dual Filament Integration'
    },
    reviews: [
      { user: 'Deepa Sharma', rating: 5, date: '17 Sep 2026', comment: 'Ordered 15 keychains for my team. Every single one had crisp, perfect letters!' }
    ]
  },
  {
    id: 'prod-drone',
    title: 'AeroPulse 5-Inch Carbon-Reinforced FPV Drone Frame & Canopy',
    tagline: 'Aerodynamic crash-tested drone frame with vibration damping camera mounts',
    category: 'mechanical',
    categoryLabel: 'Mechanical & Functional',
    price: 1799,
    originalPrice: 3199,
    discount: '43% off',
    rating: 4.9,
    ratingCount: 430,
    inStock: true,
    isAssured: true,
    fastDelivery: 'Tomorrow, by 6 PM',
    material: 'Carbon-Nylon PA-CF + TPU Bumper',
    technology: 'Multi-Material Industrial FDM',
    dimensions: '210 x 210 x 55 mm',
    weight: '115g',
    printTime: '10 hrs 15 min',
    modelType: 'procedural',
    proceduralType: 'drone',
    color: '#0d9488',
    availableColors: [
      { name: 'Teal & Carbon', hex: '#0d9488' },
      { name: 'Neon Lime & Carbon', hex: '#84cc16' },
      { name: 'Stealth Matte Black', hex: '#111827' }
    ],
    description: 'Engineered for high-speed freestyle drone pilots. Combines high-modulus carbon nylon arms with flexible 95A TPU camera cushions to eliminate jello effect in high-definition action cams.',
    highlights: [
      'Direct mount for DJI O3 Air Unit and Caddx Vista digital systems',
      'Vibration isolated camera bracket eliminates video resonance',
      'Impact tested at speeds exceeding 110 km/h',
      'Hardware pack included: black oxide steel screws & standoffs'
    ],
    specs: {
      'Wheelbase': '225 mm True-X geometry',
      'Arm Thickness': '5.0 mm equivalent stiffness',
      'TPU Durometer': '95A Flexible Polyurethane'
    },
    reviews: [
      { user: 'Rohan Deshpande', rating: 5, date: '08 Sep 2026', comment: 'Survived 3 major concrete wall crashes with only minor scuffs. Incredible print density.' }
    ]
  }
];

export const DEALS_OF_THE_DAY = [
  {
    title: 'Custom 3D Printing Service',
    badge: 'INSTANT QUOTE',
    discount: 'Starting ₹3.5/gram',
    action: 'Calculate Now'
  },
  {
    title: 'Rapid Prototyping (24h Delivery)',
    badge: 'EXPRESS',
    discount: 'Zero Setup Cost',
    action: 'Upload STL'
  },
  {
    title: 'High-Flow Filaments',
    badge: 'BUY 2 GET 1',
    discount: 'Up to 55% Off',
    action: 'Shop Materials'
  },
  {
    title: 'Medical Scan Conversions',
    badge: 'DICOM TO 3D',
    discount: '100% Confidential',
    action: 'Consult Engineer'
  }
];
