const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 15 Essential Implements Image URLs
const IMPLEMENT_IMAGES = {
  'imp_rotavator.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'imp_cultivator.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'imp_disc_plough.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'imp_disc_harrow.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'imp_seed_drill.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'imp_planter.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'imp_fertilizer_spreader.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'imp_boom_sprayer.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'imp_weeder.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'imp_ridger.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'imp_land_leveler.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'imp_reaper.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'imp_baler.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
  'imp_trailer.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'imp_water_tanker.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80'
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
          console.log(`Saved implement image: ${filename}`);
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
  console.log('Downloading 15 implement image assets...');
  for (const [file, url] of Object.entries(IMPLEMENT_IMAGES)) {
    await downloadBinaryImage(url, file);
  }
  console.log('Implement photos download complete!');
}

run();
