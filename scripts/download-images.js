const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const pals = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/pals.json'), 'utf-8'));
const outDir = path.join(process.cwd(), 'tmp/pal-icons');
fs.mkdirSync(outDir, { recursive: true });
function download(url, dest) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    client
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          download(res.headers.location, dest).then(resolve);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          resolve(false);
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      })
      .on('error', () => {
        file.close();
        resolve(false);
      });
  });
}
async function main() {
  let success = 0;
  let failed = 0;
  for (const p of pals) {
    if (!p.imageUrl) {
      failed++;
      continue;
    }
    const ext = path.extname(p.imageUrl) || '.webp';
    const dest = path.join(outDir, `${p.slug}${ext}`);
    if (fs.existsSync(dest)) {
      success++;
      continue;
    }
    const ok = await download(p.imageUrl, dest);
    if (ok) success++;
    else failed++;
    process.stdout.write(`\rDownloaded ${success}/${pals.length}, failed ${failed}`);
  }
  console.log(`\nDone. Success: ${success}, Failed: ${failed}`);
}

main();
