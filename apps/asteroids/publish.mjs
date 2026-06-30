#!/usr/bin/env node
/**
 * publish.mjs — build script for the Asteroids app
 *
 * What it does:
 *   1. Copies index.html  →  public/apps/asteroids/index.html
 *   2. Creates a zip      →  public/apps/asteroids/asteroids.zip
 *
 * Usage (from atlas/ root):
 *   node apps/asteroids/publish.mjs
 *   npm run publish:asteroids
 */

import { execSync }         from 'node:child_process';
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname }    from 'node:path';
import { fileURLToPath }    from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '../..');

const SRC_HTML  = join(__dirname, 'index.html');
const DEST_DIR  = join(ROOT, 'public/apps/asteroids');
const DEST_HTML = join(DEST_DIR, 'index.html');
const DEST_ZIP  = join(DEST_DIR, 'asteroids.zip');

// ── 1. Ensure destination exists ────────────────────────────────────────────
mkdirSync(DEST_DIR, { recursive: true });

// ── 2. Copy HTML ────────────────────────────────────────────────────────────
cpSync(SRC_HTML, DEST_HTML);
console.log(`✓  Copied  index.html  →  public/apps/asteroids/index.html`);

// ── 3. Create ZIP (macOS / Linux — requires system zip) ─────────────────────
try {
  // -j = junk paths (store only filename, not directory tree)
  // -9 = maximum compression
  execSync(`zip -j9 "${DEST_ZIP}" "${SRC_HTML}"`, { stdio: 'inherit' });
  console.log(`✓  Created asteroids.zip  →  public/apps/asteroids/asteroids.zip`);
} catch {
  console.warn('⚠  zip not found — skipping .zip creation (install zip or use 7z)');
}

console.log('\nDone. Commit public/apps/asteroids/ to include in the build.');
