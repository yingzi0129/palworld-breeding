const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const source = path.join(distDir, 'sitemap.xml');
const copy = path.join(distDir, 'sitemap-index.xml');

if (fs.existsSync(source)) {
  fs.copyFileSync(source, copy);
  console.log(`Sitemap ready at ${source}`);
  console.log(`Sitemap copy ready at ${copy}`);
} else {
  console.error(`Missing ${source}`);
  process.exit(1);
}
