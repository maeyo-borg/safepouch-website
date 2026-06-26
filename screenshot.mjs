// Usage: node screenshot.mjs http://localhost:3000 [label]
// Or:    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless ... (fallback)
//
// On systems without node-puppeteer, this script shells out to headless Chrome,
// which is what's available on this machine.
import { execSync } from 'node:child_process';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const dir = './temporary screenshots';
mkdirSync(dir, { recursive: true });

// Auto-increment number
const existing = readdirSync(dir).filter(f => /^screenshot-\d+/.test(f));
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0', 10));
const next = (nums.length ? Math.max(...nums) : 0) + 1;
const out = join(dir, `screenshot-${next}${label}.png`);

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const W = 1156, H = 11000;

execSync(
  `"${CHROME}" --headless --disable-gpu --hide-scrollbars ` +
  `--window-size=${W},${H} --virtual-time-budget=5000 ` +
  `--screenshot="${out}" "${url}"`,
  { stdio: 'inherit' }
);
console.log(`\nSaved ${out}`);
