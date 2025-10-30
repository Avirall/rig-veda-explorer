#!/usr/bin/env node
/*
  Refresh Rig Veda datasets into dataset/ by attempting multiple public sources.
  - Creates timestamped backups of existing files
  - Tries sources in order; skips gracefully on failures
  - Outputs merged hymn inventory to dataset/hymns_refreshed.json
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATASET_DIR = path.join(ROOT, 'dataset');
const OUT_FILE = path.join(DATASET_DIR, 'hymns_refreshed.json');

async function safeFetchJson(url) {
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json; q=1.0, */*; q=0.1' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // Some endpoints return jsonl or text; try parse json, else split lines
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      // try jsonl
      const lines = text.split('\n').filter(Boolean);
      return lines.map((l) => JSON.parse(l));
    }
  } catch (e) {
    console.warn(`[skip] ${url} → ${e.message}`);
    return null;
  }
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function backupIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const backup = `${filePath}.bak.${ts}`;
    fs.copyFileSync(filePath, backup);
    console.log(`[backup] ${path.basename(filePath)} → ${path.basename(backup)}`);
  }
}

function normalizeHymn(record) {
  // Attempt to map common fields from various sources into a unified shape
  const obj = record || {};
  return {
    sanskrit: obj.sanskrit || obj.devanagari || obj.text || obj.rv_devanagari || '',
    transliteration: obj.transliteration || obj.roman || obj.iast || obj.padapatha_translit || '',
    english: obj.english || obj.translation || obj.en || '',
    reference: obj.reference || obj.ref || obj.location || obj.rigveda_ref || '',
    rishi: obj.rishi || obj.seer || obj.author || '',
    deity: obj.deity || obj.devata || '',
    mandala: obj.mandala || obj.book || obj.m || null,
    sukta: obj.sukta || obj.hymn || obj.s || null,
    rik: obj.rik || obj.verse || obj.v || null,
    theme: obj.theme || obj.topic || '',
  };
}

async function main() {
  ensureDir(DATASET_DIR);

  // Backup key files
  const primaryJson = path.join(DATASET_DIR, 'complete_rigveda_all_mandalas.json');
  backupIfExists(primaryJson);
  backupIfExists(OUT_FILE);

  const sources = [
    // Hugging Face JSONL dataset (example; may require auth for some assets)
    // We'll try top-level file; if structure changes, script will skip gracefully.
    'https://huggingface.co/datasets/siddharthjadhav6565/vedas/resolve/main/data/vedas.jsonl',

    // E-Rigveda (community mirror providing JSON). If unavailable, skipped.
    'https://raw.githubusercontent.com/nishraranpura/e-rigveda/main/data/rigveda_sample.json',

    // Anindita Basu (metadata; previously public). If offline, skipped.
    'https://raw.githubusercontent.com/aninditabasu/indica/master/api/rv/rigveda_meta_sample.json',
  ];

  const aggregated = [];
  for (const url of sources) {
    const data = await safeFetchJson(url);
    if (!data) continue;
    if (Array.isArray(data)) {
      for (const row of data) aggregated.push(normalizeHymn(row));
    } else if (typeof data === 'object') {
      // Try common container keys
      const candidates = Array.isArray(data.items) ? data.items
        : Array.isArray(data.data) ? data.data
        : Array.isArray(data.verses) ? data.verses
        : null;
      if (candidates) {
        for (const row of candidates) aggregated.push(normalizeHymn(row));
      }
    }
  }

  // Fallback: if nothing fetched, derive a small index from existing primary file (if present)
  if (aggregated.length === 0 && fs.existsSync(primaryJson)) {
    try {
      const text = fs.readFileSync(primaryJson, 'utf8');
      const big = JSON.parse(text);
      // Heuristic: pull a small subset for index
      const sample = [];
      for (const m of big.mandalas || []) {
        for (const s of m.suktas || []) {
          for (const v of s.riks || []) {
            sample.push(normalizeHymn({
              sanskrit: v.samhita || v.devanagari || '',
              transliteration: v.padapatha_transliteration || '',
              english: v.english || '',
              reference: `Rig Veda ${m.number}.${s.number}.${v.number}`,
              rishi: s.rishi || '',
              deity: s.deity || '',
              mandala: m.number,
              sukta: s.number,
              rik: v.number,
            }));
            if (sample.length >= 1000) break;
          }
          if (sample.length >= 1000) break;
        }
        if (sample.length >= 1000) break;
      }
      aggregated.push(...sample);
    } catch (e) {
      console.warn(`[fallback-skip] Could not sample existing file: ${e.message}`);
    }
  }

  if (aggregated.length === 0) {
    console.error('No data fetched. Nothing to write.');
    process.exit(2);
  }

  // Deduplicate by reference + english text where available
  const seen = new Set();
  const deduped = [];
  for (const h of aggregated) {
    const key = `${h.reference || ''}|${(h.english || '').slice(0, 80)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(h);
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(deduped, null, 2), 'utf8');
  console.log(`[ok] Wrote ${deduped.length} hymns → ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


