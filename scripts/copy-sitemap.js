const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const source = path.join(distDir, 'sitemap.xml');

if (fs.existsSync(source)) {
  console.log(`Sitemap ready at ${source}`);
} else {
  console.error(`Missing ${source}`);
  process.exit(1);
}
