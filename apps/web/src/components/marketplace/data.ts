import { Listing } from "./types";

export const INITIAL_LISTINGS: Listing[] = [
  // ==========================================
  // CATEGORY 1: TRACTORS (11 MODELS)
  // ==========================================
  {
    id: "eq-101",
    title: "Mahindra Yuvo Tech+ 475 DI 42HP Tractor",
    category: "equipment",
    type: "rent",
    price: 2200,
    priceUnit: "/ day",
    imageUrl: "/images/mahindra_yuvo_475.jpg",
    description: "4-cylinder 42 HP high-torque Yuvo Tech+ tractor with 12F+3R speed transmission, 1700 kg lift capacity, and power steering.",
    specs: { "Engine Power": "42 HP", "Transmission": "12 Forward + 3 Reverse", "Hydraulic Capacity": "1700 kg", "Driver Option": "Available (+₹500/day)" },
    seller: { id: "s-101", name: "Malnad Agri Machinery Hub", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 54, location: "Ajjampura, Chikkamagaluru, KA", distanceMiles: 4, isVerified: true, phone: "+91 98450 43210" },
    location: "Ajjampura, Chikkamagaluru, KA", distanceMiles: 4, isVerifiedItem: true, operatorAvailable: true, rating: 4.9, reviewsCount: 54, createdDate: "2026-08-01"
  },
  {
    id: "eq-102",
    title: "Swaraj 744 FE 48HP Heavy Duty Tractor",
    category: "equipment",
    type: "rent",
    price: 2500,
    priceUnit: "/ day",
    imageUrl: "/images/swaraj_744_fe.jpg",
    description: "Multi-speed 48 HP tractor with 3-cylinder water-cooled engine, multi-disc oil immersed brakes, and dual PTO.",
    specs: { "Power": "48 HP", "Engine": "3-Cylinder 3136cc", "PTO Speed": "540 & 1000 RPM", "Lift": "1700 kg" },
    seller: { id: "s-102", name: "Kisan Tractor Care Shivamogga", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", rating: 4.8, reviewsCount: 41, location: "Shivamogga, KA", distanceMiles: 28, isVerified: true, phone: "+91 98451 45678" },
    location: "Shivamogga, KA", distanceMiles: 28, isVerifiedItem: true, operatorAvailable: true, rating: 4.8, reviewsCount: 41, createdDate: "2026-08-01"
  },

  // ==========================================
  // CATEGORY 2: 15 ESSENTIAL IMPLEMENTS
  // ==========================================
  {
    id: "imp-1",
    title: "Shaktiman 7-Feet Multi-Speed Rotavator",
    category: "equipment",
    type: "rent",
    price: 1200,
    priceUnit: "/ day",
    imageUrl: "/images/imp_rotavator.jpg",
    description: "Primary soil preparation rotavator with 48 L-type boron steel blades for fine seedbed pulverization in single pass.",
    specs: { "Main Use": "Soil Preparation", "Working Width": "7 Feet", "Tractor Requirement": "45-55 HP", "No. of Blades": "48 L-Blades" },
    minHpRequired: 45, maxHpRequired: 55, fuelBurnLitersPerHour: 3.2,
    seller: { id: "s-103", name: "Gadihalli Agri Implements", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", rating: 4.8, reviewsCount: 45, location: "Gadihalli, Ajjampura Tq, KA", distanceMiles: 1, isVerified: true, phone: "+91 98450 11223" },
    location: "Gadihalli, Ajjampura Tq, KA", distanceMiles: 1, isVerifiedItem: true, operatorAvailable: false, rating: 4.8, reviewsCount: 45, createdDate: "2026-08-01"
  },

  // ==========================================
  // CATEGORY 3: 20+ CERTIFIED PESTICIDES & FERTILIZERS
  // ==========================================
  {
    id: "pest-1",
    title: "Trichoderma Viride Bio-Fungicide Powder (1 kg)",
    category: "supplies",
    type: "buy",
    price: 320,
    priceUnit: "/ 1 kg pack",
    imageUrl: "/images/vegetable_seeds.jpg",
    description: "Eco-friendly bio-fungicide for controlling root rot, stem rot, wilt, and damping-off diseases in Paddy, Ragi, and Vegetables.",
    specs: { "Type": "Bio-Fungicide", "Target": "Root Rot, Stem Rot, Leaf Blight", "Dosage": "5g / Liter Water", "Form": "Wettable Powder" },
    seller: { id: "s-[201]", name: "Chikkamagaluru Agro Chemicals", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 88, location: "Chikkamagaluru, KA", distanceMiles: 12, isVerified: true, phone: "+91 98450 55443" },
    location: "Chikkamagaluru, KA", distanceMiles: 12, isVerifiedItem: true, rating: 4.9, reviewsCount: 88, createdDate: "2026-08-08"
  },
  {
    id: "pest-2",
    title: "Copper Oxychloride 50% WP Broad Spectrum Fungicide (500 g)",
    category: "supplies",
    type: "buy",
    price: 450,
    priceUnit: "/ 500g box",
    imageUrl: "/images/vegetable_seeds.jpg",
    description: "Broad-spectrum contact fungicide for early blight, late blight, leaf spots, and downy mildew control in Arecanut & Tomatoes.",
    specs: { "Active Chemical": "Copper Oxychloride 50 WP", "Target": "Leaf Blight & Black Spot", "Dosage": "3g / Liter", "Safety": "CIB&RC Certified" },
    seller: { id: "s-[201]", name: "Chikkamagaluru Agro Chemicals", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 88, location: "Chikkamagaluru, KA", distanceMiles: 12, isVerified: true, phone: "+91 98450 55443" },
    location: "Chikkamagaluru, KA", distanceMiles: 12, isVerifiedItem: true, rating: 4.9, reviewsCount: 88, createdDate: "2026-08-08"
  },
  {
    id: "pest-3",
    title: "Neem Oil 10,000 PPM Organic Insecticide (1 Liter)",
    category: "supplies",
    type: "buy",
    price: 580,
    priceUnit: "/ 1 Liter bottle",
    imageUrl: "/images/vegetable_seeds.jpg",
    description: "Cold-pressed pure Azadirachtin organic neem oil for controlling aphids, whiteflies, thrips, and mites on leaf surfaces.",
    specs: { "Azadirachtin Concentration": "10,000 PPM", "Target": "Aphids, Whiteflies, Mites", "Dosage": "5ml / Liter", "Organic Certification": "NOP Certified Organic" },
    seller: { id: "s-[202]", name: "Malnad Organic Inputs", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", rating: 4.8, reviewsCount: 62, location: "Shivamogga, KA", distanceMiles: 28, isVerified: true, phone: "+91 98440 22334" },
    location: "Shivamogga, KA", distanceMiles: 28, isVerifiedItem: true, rating: 4.8, reviewsCount: 62, createdDate: "2026-08-08"
  },
  {
    id: "pest-4",
    title: "Mancozeb 75% WP Contact Fungicide (1 kg)",
    category: "supplies",
    type: "buy",
    price: 490,
    priceUnit: "/ 1 kg pack",
    imageUrl: "/images/vegetable_seeds.jpg",
    description: "Protectant fungicide with zinc & manganese trace elements to cure blast, rust, and leaf spot in Paddy & Coffee.",
    specs: { "Chemical": "Mancozeb 75% WP", "Crop": "Paddy, Coffee, Groundnut", "Dosage": "2.5g / Liter", "Mode": "Contact Defense Layer" },
    seller: { id: "s-[201]", name: "Chikkamagaluru Agro Chemicals", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 88, location: "Chikkamagaluru, KA", distanceMiles: 12, isVerified: true, phone: "+91 98450 55443" },
    location: "Chikkamagaluru, KA", distanceMiles: 12, isVerifiedItem: true, rating: 4.9, reviewsCount: 88, createdDate: "2026-08-08"
  },
  {
    id: "pest-5",
    title: "Emamectin Benzoate 5% SG Caterpillar Insecticide (250 g)",
    category: "supplies",
    type: "buy",
    price: 640,
    priceUnit: "/ 250g pack",
    imageUrl: "/images/vegetable_seeds.jpg",
    description: "Systemic translaminar insecticide for controlling bollworms, pod borers, and fall armyworm caterpillars in Maize & Cotton.",
    specs: { "Chemical": "Emamectin Benzoate 5 SG", "Target": "Fall Armyworm, Pod Borer", "Dosage": "0.5g / Liter", "Knockdown": "Rapid 2-Hour Action" },
    seller: { id: "s-[201]", name: "Chikkamagaluru Agro Chemicals", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 88, location: "Chikkamagaluru, KA", distanceMiles: 12, isVerified: true, phone: "+91 98450 55443" },
    location: "Chikkamagaluru, KA", distanceMiles: 12, isVerifiedItem: true, rating: 4.9, reviewsCount: 88, createdDate: "2026-08-08"
  },
  {
    id: "fert-1",
    title: "100% Water Soluble N-P-K 19:19:19 Fertilizer (1 kg)",
    category: "supplies",
    type: "buy",
    price: 240,
    priceUnit: "/ 1 kg pouch",
    imageUrl: "/images/commercial_oil_seeds.jpg",
    description: "Fully water-soluble balanced N-P-K 19-19-19 foliar spray for rapid vegetative growth, root expansion, and chlorophyll boost.",
    specs: { "NPK Ratio": "19:19:19", "Form": "Water Soluble Powder", "Application": "Drip Irrigation / Foliar Spray", "Dosage": "5g / Liter" },
    seller: { id: "s-[203]", name: "Karnataka Agri Inputs Co-Op", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 120, location: "Davangere, KA", distanceMiles: 34, isVerified: true, phone: "+91 98450 99887" },
    location: "Davangere, KA", distanceMiles: 34, isVerifiedItem: true, rating: 4.9, reviewsCount: 120, createdDate: "2026-08-08"
  },
  {
    id: "fert-2",
    title: "Chelated Zinc EDTA 12% Micronutrient Fertilizer (500 g)",
    category: "supplies",
    type: "buy",
    price: 360,
    priceUnit: "/ 500g box",
    imageUrl: "/images/commercial_oil_seeds.jpg",
    description: "Prevents zinc deficiency yellowing (khaira disease) in Paddy & Maize. Enhances tiller formation and grain filling.",
    specs: { "Micronutrient": "Zinc EDTA 12%", "Target": "Khaira Yellow Leaf Disease", "Dosage": "1g / Liter", "Solubility": "Instant Complete Dissolve" },
    seller: { id: "s-[203]", name: "Karnataka Agri Inputs Co-Op", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 120, location: "Davangere, KA", distanceMiles: 34, isVerified: true, phone: "+91 98450 99887" },
    location: "Davangere, KA", distanceMiles: 34, isVerifiedItem: true, rating: 4.9, reviewsCount: 120, createdDate: "2026-08-08"
  },
  {
    id: "fert-3",
    title: "Humic Acid 98% Shiny Flakes Organic Growth Stimulant (1 kg)",
    category: "supplies",
    type: "buy",
    price: 420,
    priceUnit: "/ 1 kg pack",
    imageUrl: "/images/commercial_oil_seeds.jpg",
    description: "Extracted from leonardite. Enhances soil cation exchange capacity (CEC), white root development, and nutrient absorption.",
    specs: { "Humic Content": "98% Bio Active", "Benefits": "Root Length +40%, Nutrient Uptake", "Dosage": "2g / Liter", "Form": "Shiny Soluble Flakes" },
    seller: { id: "s-[202]", name: "Malnad Organic Inputs", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", rating: 4.8, reviewsCount: 62, location: "Shivamogga, KA", distanceMiles: 28, isVerified: true, phone: "+91 98440 22334" },
    location: "Shivamogga, KA", distanceMiles: 28, isVerifiedItem: true, rating: 4.8, reviewsCount: 62, createdDate: "2026-08-08"
  },
  {
    id: "fert-4",
    title: "Neem Cake Organic Fertilizer Meal (50 kg Bag)",
    category: "supplies",
    type: "buy",
    price: 1150,
    priceUnit: "/ 50 kg bag",
    imageUrl: "/images/commercial_oil_seeds.jpg",
    description: "De-oiled neem cake for soil application. Protects roots from soil nematodes and subterranean termites while supplying slow-release nitrogen.",
    specs: { "Nematode Control": "100% Natural", "Nitrogen (N)": "5.2%", "Phosphorus (P)": "1.1%", "Potassium (K)": "1.4%" },
    seller: { id: "s-[202]", name: "Malnad Organic Inputs", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", rating: 4.8, reviewsCount: 62, location: "Shivamogga, KA", distanceMiles: 28, isVerified: true, phone: "+91 98440 22334" },
    location: "Shivamogga, KA", distanceMiles: 28, isVerifiedItem: true, rating: 4.8, reviewsCount: 62, createdDate: "2026-08-08"
  },

  // ==========================================
  // CATEGORY 4: SEEDS & NURSERY PLANT SAPLINGS
  // ==========================================
  {
    id: "plant-1",
    title: "Taiwanese Red Lady Papaya Nursery Plant Saplings (50 Plants)",
    category: "supplies",
    type: "buy",
    price: 1450,
    priceUnit: "/ 50 plants",
    imageUrl: "/images/papaya_plants.jpg",
    description: "Virus-indexed 45-day old Red Lady Taiwanese Papaya saplings. Early fruiting at 8 months, 40-50 kg yield per tree.",
    specs: { "Plant Type": "Red Lady Papaya Saplings", "Age": "45 Days", "Fruiting": "8 Months", "Yield": "50 kg / tree" },
    seller: { id: "s-203", name: "Chikkamagaluru Bio Nursery", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 110, location: "Chikkamagaluru, KA", distanceMiles: 12, isVerified: true, phone: "+91 98450 12345" },
    location: "Chikkamagaluru, KA", distanceMiles: 12, isVerifiedItem: true, seedGroup: "Vegetables", seedSubCategory: "Papaya Saplings", stockAvailable: 80, rating: 4.9, reviewsCount: 110, createdDate: "2026-08-08"
  },
  {
    id: "seed-3",
    title: "GPU-28 High Protein Ragi / Finger Millet Seeds (10 kg)",
    category: "supplies",
    type: "buy",
    price: 780,
    priceUnit: "/ 10kg bag",
    imageUrl: "/images/ragi_seeds.jpg",
    description: "Nutri-rich brown finger millet seeds suitable for rainfed cultivation in Chikkamagaluru & Ajjampura. High calcium & iron content.",
    specs: { "Crop": "Ragi", "Variety": "GPU-28", "Grain Color": "Reddish Brown", "Maturity": "110 Days" },
    seller: { id: "s-203", name: "Karnataka Millet Board", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", rating: 4.9, reviewsCount: 65, location: "Tumakuru, KA", distanceMiles: 65, isVerified: true, phone: "+91 98450 77889" },
    location: "Tumakuru, KA", distanceMiles: 65, isVerifiedItem: true, seedGroup: "Cereals & Millets", seedSubCategory: "Ragi", stockAvailable: 110, rating: 4.9, reviewsCount: 65, createdDate: "2026-08-03"
  }
];
