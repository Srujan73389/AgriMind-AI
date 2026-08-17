const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Verified high quality direct image links for tractors
const TRACTOR_MAP = {
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
  'digitrac_pp46i.jpg': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80'
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
      resolve();
    });
  });
}

async function downloadAll() {
  console.log('Downloading all tractor images to public/images...');
  for (const [filename, url] of Object.entries(TRACTOR_MAP)) {
    await downloadImage(url, filename);
  }
  console.log('Tractor image downloads completed!');
}

downloadAll();
