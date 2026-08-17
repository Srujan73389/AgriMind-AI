const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const NEW_PLANT_IMAGES = {
  'papaya_plants.jpg': 'https://images.unsplash.com/photo-1517446927357-196147424c7a?w=800&auto=format&fit=crop&q=80',
  'banana_plants.jpg': 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80',
  'capsicum_seeds.jpg': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&auto=format&fit=crop&q=80',
  'pudina_plants.jpg': 'https://images.unsplash.com/photo-1628102491629-778571d893a3?w=800&auto=format&fit=crop&q=80',
  'sugarcane_plants.jpg': 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80'
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
          console.log(`Saved new plant photo: ${filename}`);
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
  console.log('Downloading photos for additional seeds and plant saplings...');
  for (const [file, url] of Object.entries(NEW_PLANT_IMAGES)) {
    await downloadBinaryImage(url, file);
  }
  console.log('New seed & plant photos download complete!');
}

run();
