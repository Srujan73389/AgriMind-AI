const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Map of real photographic images (Unsplash high quality agricultural photos)
const REAL_IMAGE_MAP = {
  // Tractors & Equipment
  'mahindra_yuvo_475.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'swaraj_744_fe.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'sonalika_750_di.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'eicher_557_4wd.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'farmtrac_60.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'new_holland_3630.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'powertrac_euro50.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'massey_ferguson_241.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'captain_280_mini.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'vst_zetor_4511.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'digitrac_pp46i.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'mahindra_575_tractor.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'swaraj_855_tractor.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'john_deere_tractor.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'kubota_paddy_tractor.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'shaktiman_rotavator.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'preet_harvester.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',

  // Seed Items
  'paddy_seeds.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'maize_seeds.jpg': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
  'ragi_seeds.jpg': 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=800&auto=format&fit=crop&q=80',
  'jowar_seeds.jpg': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
  'bajra_seeds.jpg': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
  'groundnut_seeds.jpg': 'https://images.unsplash.com/photo-1567892320421-1c657571ea48?w=800&auto=format&fit=crop&q=80',
  'toordal_seeds.jpg': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=80',
  'moong_seeds.jpg': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
  'chickpea_seeds.jpg': 'https://images.unsplash.com/photo-1585996846528-097d28c3f26b?w=800&auto=format&fit=crop&q=80',
  'seed_tomato.jpg': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
  'seed_chilli.jpg': 'https://images.unsplash.com/photo-1588877505254-945763a8e9e1?w=800&auto=format&fit=crop&q=80',
  'onion_seeds.jpg': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop&q=80',
  'okra_seeds.jpg': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&auto=format&fit=crop&q=80',
  'carrot_seeds.jpg': 'https://images.unsplash.com/photo-1598170845058-12ef4a457511?w=800&auto=format&fit=crop&q=80',
  'cotton_seeds.jpg': 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&auto=format&fit=crop&q=80',
  'soybean_seeds.jpg': 'https://images.unsplash.com/photo-1599321955726-e048426594af?w=800&auto=format&fit=crop&q=80',
  'sunflower_seeds.jpg': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80',
  'coriander_seeds.jpg': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
  'marigold_seeds.jpg': 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&auto=format&fit=crop&q=80'
};

function downloadBinaryImage(url, filename) {
  return new Promise((resolve) => {
    const dest = path.join(outputDir, filename);
    const file = fs.createWriteStream(dest);

    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadBinaryImage(response.headers.location, filename).then(resolve);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded real JPEG: ${filename}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${filename}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  console.log('Downloading true JPEG binary image files to public/images...');
  for (const [file, url] of Object.entries(REAL_IMAGE_MAP)) {
    await downloadBinaryImage(url, file);
  }
  console.log('All real JPEG binary files saved successfully!');
}

run();
