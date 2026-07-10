const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const quality = 75;

const files = fs.readdirSync(publicDir).filter(f => /\.(jpe?g)$/i.test(f));

async function compress() {
  console.log('Comprimindo imagens JPEG...\n');
  
  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const originalSize = fs.statSync(filePath).size;
    const tempPath = filePath + '.tmp';

    try {
      await sharp(filePath)
        .resize(1200, null, { withoutEnlargement: true })
        .jpeg({ quality, progressive: true })
        .toFile(tempPath);

      const newSize = fs.statSync(tempPath).size;
      
      if (newSize < originalSize) {
        fs.renameSync(tempPath, filePath);
        const saving = ((1 - newSize / originalSize) * 100).toFixed(0);
        console.log(`✓ ${file}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (-${saving}%)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`— ${file}: já otimizado (${(originalSize/1024).toFixed(0)}KB)`);
      }
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
}

compress();
