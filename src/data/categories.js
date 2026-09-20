export const CATEGORIES = [
  {
    id: '3d-printers',
    name: '3D Printers',
    slug: '3d-printers',
    icon: 'Printer',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    description: 'High-speed CoreXY, enclosed engineering FDM, and ultra-high resolution 8K/12K SLA resin 3D printers for makers, labs, and factories.',
    subcategories: ['CoreXY FDM Printers', 'Enclosed Engineering Printers', 'SLA Resin Printers', 'Entry-Level Printers', 'Industrial IDEX Dual-Extruder'],
    filterSpecs: {
      technologies: ['CoreXY FDM', 'Cartesian FDM', 'SLA / MSLA Resin', 'SLS Industrial', 'IDEX Dual Nozzle'],
      buildVolumes: ['Small (< 180mm³)', 'Standard (220-256mm³)', 'Large (300-350mm³)', 'Industrial (400mm³+)'],
      printSpeeds: ['Up to 250 mm/s', 'Up to 500 mm/s', 'HyperSpeed 600+ mm/s'],
      brands: ['Fusion3D Apex', 'Bambu Labs', 'Creality', 'Elegoo', 'Anycubic', 'Voron Design']
    },
    faqs: [
      {
        q: 'Which 3D printer is best for beginners?',
        a: 'For beginners, we recommend fully assembled CoreXY or auto-leveling Cartesian printers like the Fusion3D Apex Pro or Ender 3 V3 series. They feature out-of-the-box auto bed leveling, vibration compensation, and integrated filament runout sensors.'
      },
      {
        q: 'What is the difference between FDM and Resin SLA?',
        a: 'FDM melts plastic filament through a heated nozzle and is ideal for functional, high-strength parts, large enclosures, and prototypes. Resin (SLA/MSLA) cures liquid photopolymer using UV light to deliver sub-50-micron miniature details, jewelry, and dental castings.'
      }
    ]
  },
  {
    id: 'filaments',
    name: 'Filaments',
    slug: 'filaments',
    icon: 'Disc',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80',
    description: 'Premium laser-calibrated (±0.02mm) 1.75mm spools. High-speed PLA+, Carbon-Fiber PETG, Engineering Nylon PA12-CF, Silk aesthetic, and Flexible TPU.',
    subcategories: ['HyperSpeed PLA+', 'PETG & Carbon Fiber', 'Nylon & Engineering PA-CF', 'Silk & Dual-Color PLA', 'TPU Flexible 95A', 'ABS & ASA Weatherproof'],
    filterSpecs: {
      materialTypes: ['PLA / PLA+', 'PETG-CF', 'PA12-CF (Nylon Carbon)', 'TPU 95A', 'ABS / ASA', 'Polycarbonate (PC)'],
      diameters: ['1.75 mm', '2.85 mm'],
      weights: ['1.0 kg (Standard)', '2.5 kg (Bulk)', '5.0 kg (Production)', 'Sample Pack (250g)'],
      nozzleTemps: ['190°C - 220°C', '220°C - 250°C', '260°C - 300°C+']
    },
    faqs: [
      {
        q: 'How should I store 3D printer filaments to prevent moisture absorption?',
        a: 'Hydrophilic filaments like PETG, Nylon, and TPU absorb ambient humidity, causing stringing and weak layer adhesion. Store them in sealed dry boxes with silica desiccant, or use an active filament dryer at 50°C-70°C before printing.'
      }
    ]
  },
  {
    id: 'resins',
    name: 'Resins',
    slug: 'resins',
    icon: 'FlaskConical',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    description: 'Ultra-low viscosity 405nm photopolymer liquid resins engineered for 8K/12K LCD screens. Standard, Plant-Based, Tough ABS-like, High-Temp, and Castable.',
    subcategories: ['8K Standard Photopolymer', 'Water-Washable Eco', 'Tough & Impact ABS-Like', 'High-Temp Engineering (180°C)', 'Jewelry Castable Wax'],
    filterSpecs: {
      resinTypes: ['Standard 8K', 'Water Washable', 'Plant-Based Bio', 'Engineering Tough', 'High Temp / Dental'],
      wavelengths: ['385 - 405 nm UV'],
      bottleSizes: ['1.0 kg Bottle', '2.0 kg Jug', '5.0 kg Drum']
    }
  },
  {
    id: 'spare-parts',
    name: 'Spare Parts & Nozzles',
    slug: 'spare-parts',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    description: 'Hardened steel, Ruby-tipped, and high-flow CHT nozzles, all-metal bi-metal heatbreaks, ceramic heater blocks, extruders, stepper motors, and timing belts.',
    subcategories: ['Hardened Steel Nozzles', 'Ruby & Diamond Nozzles', 'All-Metal Hotends', 'Dual-Drive Extruders', 'Stepper Motors & Belts', 'Thermistor & Ceramic Heaters'],
    filterSpecs: {
      nozzleSizes: ['0.2 mm (Detail)', '0.4 mm (Standard)', '0.6 mm (High-Flow)', '0.8 mm (Fast Draft)'],
      materials: ['Hardened Tool Steel', 'Brass with Nickel Coating', 'Tungsten Carbide', 'Synthetic Ruby Tip'],
      hotendCompatibility: ['Bambu X1/P1', 'E3D V6 / Volcano', 'Creality Sprite', 'Voron Stealthburner']
    }
  },
  {
    id: 'accessories',
    name: 'Accessories & Build Plates',
    slug: 'accessories',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
    description: 'Spring steel double-sided textured PEI sheets, holographic carbon-fiber build plates, heated filament dry boxes, silicone socks, and anti-vibration rubber feet.',
    subcategories: ['Double-Sided PEI Sheets', 'Holographic PEO/PET Plates', 'Filament Dryers & Dry Boxes', 'Enclosure Heating Tents', 'Anti-Vibration Feet', 'LED Lighting Kits'],
    filterSpecs: {
      plateSizes: ['180 x 180 mm', '235 x 235 mm (Ender/Bambu)', '256 x 256 mm', '310 x 310 mm (CR-10/K1 Max)', '350 x 350 mm (Voron 350)'],
      coatings: ['Textured PEI Powder', 'Smooth Gold PEI', 'Carbon Fiber Texture', 'Diamond Holographic']
    }
  },
  {
    id: 'tools',
    name: 'Printing Tools',
    slug: 'tools',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
    description: 'Professional 150mm digital vernier calipers, 360° deburring tool handles, precision spring craft knives, nozzle torque wrenches, and heat-set insert iron tips.',
    subcategories: ['Digital Precision Calipers', 'Deburring & Trimming Tools', 'Heat-Set Insert Iron Tips', 'Nozzle Torque Wrenches', 'Ultrasonic Cleaners & UV Curing'],
    filterSpecs: {
      toolTypes: ['Measuring & Calibration', 'Post-Processing & Finishing', 'Assembly & Hardware', 'Maintenance & Cleaning']
    }
  },
  {
    id: 'custom-prints',
    name: 'Custom 3D Printed Products',
    slug: 'custom-prints',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80',
    description: 'Finished medical anatomical study models, industrial robotics chassis, parametric home decor, Voron functional part kits, and bespoke SLA miniatures.',
    subcategories: ['Medical & Anatomy Models', 'Mechanical & Robotics Kits', 'Parametric Decor & Planters', 'Voron Functional Part Kits', 'Collector Resin Figurines'],
    filterSpecs: {
      categories: ['Medical & Science', 'Robotics & Hardware', 'Home & Living', 'Cosplay & Collectibles']
    }
  }
];

export const USE_CASES = [
  {
    id: 'beginners',
    title: 'Beginners & Hobbyists',
    badge: 'Plug & Play Simplicity',
    description: 'Turnkey 3D printers with AI camera spaghetti detection, automatic bed leveling, and pre-sliced starter filament kits.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    recommendedProducts: ['prod-printer-apex', 'prod-filament-pla', 'prod-tools-kit']
  },
  {
    id: 'makers',
    title: 'Makers & DIY Builders',
    badge: 'Open Ecosystem & Modding',
    description: 'Voron 2.4 and Trident compatible components, hardened steel nozzles, Klipper touchscreen controllers, and high-speed fans.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
    recommendedProducts: ['prod-parts-voronkit', 'prod-nozzle-ruby', 'prod-plate-pei']
  },
  {
    id: 'professionals',
    title: 'Engineers & Designers',
    badge: 'Dimensional Tolerance < 0.08mm',
    description: 'High-temperature chamber printers for PEEK, ULTEM, and Carbon-Fiber Nylon. Validated rapid prototyping and end-use jigs.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&auto=format&fit=crop&q=80',
    recommendedProducts: ['prod-printer-pro-idex', 'prod-filament-nyloncf', 'prod-tools-calipers']
  },
  {
    id: 'industrial',
    title: 'Production & Manufacturing',
    badge: '24/7 Farm Production',
    description: 'Multi-machine print farm fleet management, 5kg filament reels, automatic continuous plate ejection, and certified ISO test reports.',
    icon: 'Factory',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&auto=format&fit=crop&q=80',
    recommendedProducts: ['prod-printer-industrial', 'prod-filament-petgcf', 'prod-dryer-box']
  }
];
