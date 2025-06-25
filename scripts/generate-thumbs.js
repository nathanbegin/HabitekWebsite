const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'images', 'team');
const destDir = path.join(srcDir, 'thumbs');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(srcDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  const inputPath = path.join(srcDir, file);
  const outputPath = path.join(destDir, file);
  sharp(inputPath)
    .resize(150, 150, { fit: 'cover' })
    .toFile(outputPath)
    .then(() => console.log(`Created ${outputPath}`))
    .catch(err => console.error(`Error processing ${file}:`, err));
});
