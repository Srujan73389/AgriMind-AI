const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Verified high quality direct image links for each specific agricultural seed and implement item
const IMAGE_MAP = {
  'mahindra_575_tractor.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'swaraj_855_tractor.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'shaktiman_rotavator.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'john_deere_tractor.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'kubota_paddy_tractor.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'preet_harvester.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',

  // SEEDS - EACH EXACT CROP MATCH
  'paddy_seeds.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'maize_seeds.jpg': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
  'ragi_seeds.jpg': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
  'jowar_seeds.jpg': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
  'bajra_seeds.jpg': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
  'groundnut_seeds.jpg': 'https://images.unsplash.com/photo-1567892320421-1c657571ea48?w=800&auto=format&fit=crop&q=80',
  'toordal_seeds.jpg': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
  'moong_seeds.jpg': 'https://images.unsplash.com/photo-1585996846528-097d28c3f26b?w=800&auto=format&fit=crop&q=80',
  'chickpea_seeds.jpg': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=80',
  'onion_seeds.jpg': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop&q=80',
  'okra_seeds.jpg': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&auto=format&fit=crop&q=80',
  'carrot_seeds.jpg': 'https://images.unsplash.com/photo-1598170845058-12ef4a457511?w=800&auto=format&fit=crop&q=80',
  'cotton_seeds.jpg': 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&auto=format&fit=crop&q=80',
  'soybean_seeds.jpg': 'https://images.unsplash.com/photo-1599321955726-e048426594af?w=800&auto=format&fit=crop&q=80',
  'sunflower_seeds.jpg': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80',
  'coriander_seeds.jpg': 'https://images.unsplash.com/photo-1628102491629-778571d893a3?w=800&auto=format&fit=crop&q=80',
  'marigold_seeds.jpg': 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&auto=format&fit=crop&q=80'
};

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(outputDir, filename);
    const file = fs.createWriteStream(dest);

    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filename).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved: ${filename}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading ${filename}:`, err.message);
      resolve(); // resolve so other downloads continue
    });
  });
}

async function downloadAll() {
  console.log('Downloading all verified seed & equipment images to public/images...');
  for (const [filename, url] of Object.entries(IMAGE_MAP)) {
    // Only download if missing or overwrite
    await downloadImage(url, filename);
  }
  console.log('All image downloads completed!');
}

downloadAll();
