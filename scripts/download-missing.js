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
  const base = 'https://paldeck.cc/assets/palworld/pals';
  let good = 0;
  let bad = 0;
  const missing = pals.filter((p) => !p.imageUrl);
  for (const p of missing) {
    const url = `${base}/T_${p.internalName}_icon_normal.webp`;
    const dest = path.join(outDir, `${p.slug}.webp`);
    if (fs.existsSync(dest)) {
      good++;
      continue;
    }
    const ok = await download(url, dest);
    if (ok) good++;
    else {
      bad++;
      console.log('fail', p.slug, url);
    }
  }
  console.log(`Downloaded ${good}/${missing.length}, failed ${bad}`);
}

main();
