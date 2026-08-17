const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const NEW_SEED_IMAGES = {
  'brinjal_seeds.jpg': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
  'cabbage_seeds.jpg': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=80',
  'cauliflower_seeds.jpg': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800&auto=format&fit=crop&q=80',
  'beans_seeds.jpg': 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800&auto=format&fit=crop&q=80',
  'cucumber_seeds.jpg': 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&auto=format&fit=crop&q=80',
  'pumpkin_seeds.jpg': 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=800&auto=format&fit=crop&q=80',
  'bittergourd_seeds.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
  'bottlegourd_seeds.jpg': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80',
  'watermelon_seeds.jpg': 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&auto=format&fit=crop&q=80',
  'urad_seeds.jpg': 'https://images.unsplash.com/photo-1599321955726-e048426594af?w=800&auto=format&fit=crop&q=80',
  'cowpea_seeds.jpg': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=80',
  'sesame_seeds.jpg': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80',
  'fenugreek_seeds.jpg': 'https://images.unsplash.com/photo-1628102491629-778571d893a3?w=800&auto=format&fit=crop&q=80',
  'spinach_seeds.jpg': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=80'
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
          console.log(`Saved image: ${filename}`);
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
  console.log('Downloading photos for remaining seed subcategories...');
  for (const [file, url] of Object.entries(NEW_SEED_IMAGES)) {
    await downloadBinaryImage(url, file);
  }
  console.log('New seed photos download complete!');
}

run();
