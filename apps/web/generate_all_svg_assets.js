const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function createCardSvg({ title, categoryText, modelCode, primaryColor, secondaryColor, iconType }) {
  let mainIconSvg = '';
  if (iconType === 'tractor') {
    mainIconSvg = `
      <g transform="translate(180, 70) scale(1.4)">
        <!-- Tractor Body -->
        <rect x="20" y="40" width="70" height="35" rx="8" fill="${primaryColor}" />
        <rect x="50" y="15" width="38" height="30" rx="4" fill="#0F172A" opacity="0.8" />
        <rect x="54" y="18" width="30" height="22" rx="2" fill="#38BDF8" opacity="0.6" />
        <!-- Engine Hood -->
        <path d="M 20 40 L 5 45 L 5 70 L 20 75 Z" fill="${secondaryColor}" />
        <rect x="2" y="38" width="18" height="37" rx="3" fill="${primaryColor}" />
        <!-- Exhaust Pipe -->
        <rect x="12" y="18" width="4" height="20" fill="#64748B" />
        <ellipse cx="14" cy="18" rx="4" ry="2" fill="#475569" />
        <!-- Front Wheel -->
        <circle cx="18" cy="78" r="16" fill="#1E293B" stroke="#64748B" stroke-width="4" />
        <circle cx="18" cy="78" r="7" fill="#94A3B8" />
        <!-- Rear Huge Wheel -->
        <circle cx="72" cy="75" r="26" fill="#0F172A" stroke="#475569" stroke-width="6" />
        <circle cx="72" cy="75" r="12" fill="#E2E8F0" />
        <!-- Wheel Tread Details -->
        <line x1="72" y1="49" x2="72" y2="101" stroke="#334155" stroke-width="3" />
        <line x1="46" y1="75" x2="98" y2="75" stroke="#334155" stroke-width="3" />
      </g>
    `;
  } else if (iconType === 'harvester') {
    mainIconSvg = `
      <g transform="translate(160, 65) scale(1.3)">
        <rect x="10" y="35" width="90" height="40" rx="6" fill="#EAB308" />
        <rect x="40" y="10" width="40" height="28" rx="4" fill="#1E293B" />
        <circle cx="30" cy="78" r="18" fill="#0F172A" stroke="#64748B" stroke-width="5" />
        <circle cx="85" cy="78" r="18" fill="#0F172A" stroke="#64748B" stroke-width="5" />
        <!-- Cutter Blade Reel -->
        <circle cx="-5" cy="65" r="22" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="8 4" />
      </g>
    `;
  } else if (iconType === 'rotavator') {
    mainIconSvg = `
      <g transform="translate(170, 70) scale(1.3)">
        <rect x="15" y="25" width="85" height="25" rx="4" fill="#DC2626" />
        <circle cx="30" cy="65" r="15" fill="none" stroke="#94A3B8" stroke-width="4" stroke-dasharray="6 6" />
        <circle cx="60" cy="65" r="15" fill="none" stroke="#94A3B8" stroke-width="4" stroke-dasharray="6 6" />
        <circle cx="90" cy="65" r="15" fill="none" stroke="#94A3B8" stroke-width="4" stroke-dasharray="6 6" />
      </g>
    `;
  } else {
    // Seed Bag Icon
    mainIconSvg = `
      <g transform="translate(195, 60) scale(1.2)">
        <!-- Sack Body -->
        <path d="M 15 25 Q 35 15 55 25 L 65 90 Q 35 100 5 90 Z" fill="${primaryColor}" />
        <!-- Top Tie String -->
        <rect x="12" y="22" width="46" height="8" rx="4" fill="#F59E0B" />
        <!-- Plant Leaf Emblem on Sack -->
        <path d="M 35 45 Q 50 45 50 60 Q 35 75 35 45 Z" fill="#10B981" />
        <path d="M 35 45 Q 20 45 20 60 Q 35 75 35 45 Z" fill="#059669" />
        <line x1="35" y1="45" x2="35" y2="78" stroke="#047857" stroke-width="3" />
      </g>
    `;
  }

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A" />
        <stop offset="50%" stop-color="#1E293B" />
        <stop offset="100%" stop-color="#0284C7" stop-opacity="0.2" />
      </linearGradient>
      <linearGradient id="cardBadgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${primaryColor}" />
        <stop offset="100%" stop-color="${secondaryColor}" />
      </linearGradient>
      <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="500" height="300" fill="url(#bgGrad)" />
    <rect width="500" height="300" fill="url(#gridPattern)" />

    <!-- Ambient Glowing Circle -->
    <circle cx="250" cy="130" r="110" fill="${primaryColor}" fill-opacity="0.15" filter="blur(20px)" />

    <!-- Decorative Corner Badge Strip -->
    <rect x="25" y="20" width="160" height="28" rx="14" fill="url(#cardBadgeGrad)" />
    <text x="37" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="11" fill="#FFFFFF" letter-spacing="1">
      ${categoryText.toUpperCase()}
    </text>

    <!-- Center Icon Artwork -->
    ${mainIconSvg}

    <!-- Bottom Dark Caption Card Overlay -->
    <rect x="0" y="210" width="500" height="90" fill="#090D16" fill-opacity="0.9" />
    <line x1="0" y1="210" x2="500" y2="210" stroke="${primaryColor}" stroke-opacity="0.5" stroke-width="2" />

    <!-- Title Label -->
    <text x="25" y="245" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">
      ${title}
    </text>
    <text x="25" y="272" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="13" fill="#10B981">
      MODEL: ${modelCode} • AgriMind AI Verified Asset
    </text>
  </svg>
  `;
}

// Items configuration
const ITEMS = [
  // Tractors & Implements
  { file: 'mahindra_yuvo_475.jpg', title: 'Mahindra Yuvo Tech+ 475 DI', categoryText: '42 HP TRACTOR', modelCode: 'YUVO-475-DI', primaryColor: '#E11D48', secondaryColor: '#991B1B', iconType: 'tractor' },
  { file: 'swaraj_744_fe.jpg', title: 'Swaraj 744 FE Heavy Duty', categoryText: '48 HP TRACTOR', modelCode: '744-FE-HD', primaryColor: '#0284C7', secondaryColor: '#0369A1', iconType: 'tractor' },
  { file: 'sonalika_750_di.jpg', title: 'Sonalika DI 750 III Sikander', categoryText: '55 HP TRACTOR', modelCode: 'DI-750-SIKANDER', primaryColor: '#2563EB', secondaryColor: '#1D4ED8', iconType: 'tractor' },
  { file: 'eicher_557_4wd.jpg', title: 'Eicher 557 Prima G3 4WD', categoryText: '50 HP 4WD TRACTOR', modelCode: 'EICHER-557-4WD', primaryColor: '#64748B', secondaryColor: '#475569', iconType: 'tractor' },
  { file: 'farmtrac_60.jpg', title: 'Farmtrac 60 PowerMaxx', categoryText: '55 HP TRACTOR', modelCode: 'FARMTRAC-60-PM', primaryColor: '#0D9488', secondaryColor: '#0F766E', iconType: 'tractor' },
  { file: 'new_holland_3630.jpg', title: 'New Holland 3630 TX Special', categoryText: '55 HP TRACTOR', modelCode: 'NH-3630-TX', primaryColor: '#0284C7', secondaryColor: '#075985', iconType: 'tractor' },
  { file: 'powertrac_euro50.jpg', title: 'Powertrac Euro 50 Next 4WD', categoryText: '52 HP 4WD TRACTOR', modelCode: 'EURO-50-NEXT', primaryColor: '#D97706', secondaryColor: '#B45309', iconType: 'tractor' },
  { file: 'massey_ferguson_241.jpg', title: 'Massey Ferguson 241 DI', categoryText: '42 HP TRACTOR', modelCode: 'MF-241-MAHA-SHAKTI', primaryColor: '#DC2626', secondaryColor: '#B91C1C', iconType: 'tractor' },
  { file: 'captain_280_mini.jpg', title: 'Captain 280 DI 4WD Mini', categoryText: '28 HP MINI TRACTOR', modelCode: 'CAPTAIN-280-4WD', primaryColor: '#EA580C', secondaryColor: '#C2410C', iconType: 'tractor' },
  { file: 'vst_zetor_4511.jpg', title: 'VST Zetor 4511 Paddy Special', categoryText: '45 HP PADDY 4WD', modelCode: 'VST-ZETOR-4511', primaryColor: '#16A34A', secondaryColor: '#15803D', iconType: 'tractor' },
  { file: 'digitrac_pp46i.jpg', title: 'Digitrac PP 46i Smart Tractor', categoryText: '50 HP SMART GPS', modelCode: 'DIGITRAC-PP-46I', primaryColor: '#7C3AED', secondaryColor: '#6D28D9', iconType: 'tractor' },
  { file: 'mahindra_575_tractor.jpg', title: 'Mahindra 575 DI SP Plus', categoryText: '47 HP TRACTOR', modelCode: '575-DI-SP-PLUS', primaryColor: '#E11D48', secondaryColor: '#BE123C', iconType: 'tractor' },
  { file: 'swaraj_855_tractor.jpg', title: 'Swaraj 855 FE Heavy Duty', categoryText: '52 HP TRACTOR', modelCode: '855-FE-52HP', primaryColor: '#0284C7', secondaryColor: '#0369A1', iconType: 'tractor' },
  { file: 'john_deere_tractor.jpg', title: 'John Deere 5310 GearPro 4WD', categoryText: '55 HP AC CABIN', modelCode: 'JD-5310-GEARPRO', primaryColor: '#16A34A', secondaryColor: '#EAB308', iconType: 'tractor' },
  { file: 'kubota_paddy_tractor.jpg', title: 'Kubota MU4501 Paddy Special', categoryText: '45 HP 4WD PADDY', modelCode: 'KUBOTA-MU4501', primaryColor: '#EA580C', secondaryColor: '#C2410C', iconType: 'tractor' },
  { file: 'shaktiman_rotavator.jpg', title: 'Shaktiman 7-ft Rotavator', categoryText: 'ROTARY TILLER', modelCode: 'SHAKTIMAN-7FT', primaryColor: '#DC2626', secondaryColor: '#991B1B', iconType: 'rotavator' },
  { file: 'preet_harvester.jpg', title: 'Preet 955 Combine Harvester', categoryText: 'GRAIN HARVESTER', modelCode: 'PREET-955-14FT', primaryColor: '#EAB308', secondaryColor: '#CA8A04', iconType: 'harvester' },

  // Seed Items
  { file: 'paddy_seeds.jpg', title: 'Pusa Basmati 1121 Paddy Seeds', categoryText: 'CEREALS & MILLETS', modelCode: 'PADDY-PUSA-1121', primaryColor: '#10B981', secondaryColor: '#047857', iconType: 'seed' },
  { file: 'maize_seeds.jpg', title: 'Hybrid Yellow Maize / Corn Seeds', categoryText: 'CEREALS & MILLETS', modelCode: 'MAIZE-PIONEER-F1', primaryColor: '#F59E0B', secondaryColor: '#D97706', iconType: 'seed' },
  { file: 'ragi_seeds.jpg', title: 'GPU-28 Ragi / Finger Millet', categoryText: 'CEREALS & MILLETS', modelCode: 'RAGI-GPU-28', primaryColor: '#854D0E', secondaryColor: '#713F12', iconType: 'seed' },
  { file: 'jowar_seeds.jpg', title: 'Hybrid Jowar / Sorghum CSH-16', categoryText: 'CEREALS & MILLETS', modelCode: 'JOWAR-CSH-16', primaryColor: '#E2E8F0', secondaryColor: '#CBD5E1', iconType: 'seed' },
  { file: 'bajra_seeds.jpg', title: 'Hybrid Bajra / Pearl Millet 86M86', categoryText: 'CEREALS & MILLETS', modelCode: 'BAJRA-86M86', primaryColor: '#D97706', secondaryColor: '#B45309', iconType: 'seed' },
  { file: 'groundnut_seeds.jpg', title: 'Kadiri-6 Bold Groundnut Seeds', categoryText: 'PULSES', modelCode: 'GROUNDNUT-K6', primaryColor: '#B45309', secondaryColor: '#78350F', iconType: 'seed' },
  { file: 'toordal_seeds.jpg', title: 'Red Gram / Toor Dal PRG-176', categoryText: 'PULSES', modelCode: 'TOOR-PRG-176', primaryColor: '#F59E0B', secondaryColor: '#B45309', iconType: 'seed' },
  { file: 'moong_seeds.jpg', title: 'Green Gram / Moong WGG-42', categoryText: 'PULSES', modelCode: 'MOONG-WGG-42', primaryColor: '#10B981', secondaryColor: '#059669', iconType: 'seed' },
  { file: 'chickpea_seeds.jpg', title: 'Bengal Gram Chickpea JG-11', categoryText: 'PULSES', modelCode: 'CHICKPEA-JG-11', primaryColor: '#FCD34D', secondaryColor: '#F59E0B', iconType: 'seed' },
  { file: 'seed_tomato.jpg', title: 'Syngenta Abhinav Tomato Nursery', categoryText: 'VEGETABLES', modelCode: 'TOMATO-ABHINAV-F1', primaryColor: '#EF4444', secondaryColor: '#DC2626', iconType: 'seed' },
  { file: 'seed_chilli.jpg', title: 'Guntur Hot Red Chilli F1 Seeds', categoryText: 'VEGETABLES', modelCode: 'CHILLI-GUNTUR-F1', primaryColor: '#DC2626', secondaryColor: '#991B1B', iconType: 'seed' },
  { file: 'onion_seeds.jpg', title: 'Nasik N-53 Dark Red Onion Seeds', categoryText: 'VEGETABLES', modelCode: 'ONION-NASIK-N53', primaryColor: '#9333EA', secondaryColor: '#7E22CE', iconType: 'seed' },
  { file: 'okra_seeds.jpg', title: 'Radhika F1 Okra / Bhendi Seeds', categoryText: 'VEGETABLES', modelCode: 'OKRA-RADHIKA-F1', primaryColor: '#16A34A', secondaryColor: '#15803D', iconType: 'seed' },
  { file: 'carrot_seeds.jpg', title: 'Kuroda F1 Orange Carrot Seeds', categoryText: 'VEGETABLES', modelCode: 'CARROT-KURODA-F1', primaryColor: '#EA580C', secondaryColor: '#C2410C', iconType: 'seed' },
  { file: 'cotton_seeds.jpg', title: 'Bt Cotton BG-II Hybrid Seeds', categoryText: 'COMMERCIAL CROPS', modelCode: 'COTTON-BG2-HYBRID', primaryColor: '#38BDF8', secondaryColor: '#0284C7', iconType: 'seed' },
  { file: 'soybean_seeds.jpg', title: 'JS-335 High Oil Soybean Seeds', categoryText: 'COMMERCIAL CROPS', modelCode: 'SOYBEAN-JS-335', primaryColor: '#EAB308', secondaryColor: '#CA8A04', iconType: 'seed' },
  { file: 'sunflower_seeds.jpg', title: 'Sunbred Hybrid Sunflower Seeds', categoryText: 'COMMERCIAL CROPS', modelCode: 'SUNFLOWER-SUNBRED', primaryColor: '#F59E0B', secondaryColor: '#D97706', iconType: 'seed' },
  { file: 'coriander_seeds.jpg', title: 'Aroma Multi-Cut Dhaniya Seeds', categoryText: 'OTHER & SPICES', modelCode: 'CORIANDER-AROMA', primaryColor: '#10B981', secondaryColor: '#047857', iconType: 'seed' },
  { file: 'marigold_seeds.jpg', title: 'African Orange Marigold Seeds', categoryText: 'OTHER & SPICES', modelCode: 'MARIGOLD-AFRICAN', primaryColor: '#F97316', secondaryColor: '#EA580C', iconType: 'seed' }
];

console.log('Generating high-resolution SVG artwork for all marketplace assets...');
for (const item of ITEMS) {
  const svgContent = createCardSvg(item);
  const destPath = path.join(outputDir, item.file);
  fs.writeFileSync(destPath, svgContent);
  console.log(`Generated SVG Asset: ${item.file}`);
}
console.log('All 36 SVG assets generated successfully in public/images/!');
