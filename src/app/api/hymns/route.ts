import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

type HymnItem = {
  sanskrit: string;
  transliteration: string;
  english: string;
  reference: string;
  rishi?: string;
  deity?: string;
  theme?: string;
  mandala?: number;
  sukta?: number;
  rik?: number;
};

function normalize(str: unknown): string {
  return typeof str === 'string' ? str : '';
}

let CACHE: HymnItem[] | null = null;

async function loadAllHymns(): Promise<HymnItem[]> {
  if (CACHE) return CACHE;
  const datasetPath = path.join(process.cwd(), 'dataset', 'complete_rigveda_all_mandalas.json');
  const raw = await fs.readFile(datasetPath, 'utf8');
  const json = JSON.parse(raw);

  const items: HymnItem[] = [];

  // Shape A: { mandalas: [ { number, suktas: [ { number, riks: [ { number, ... } ] } ] } ] }
  if (Array.isArray(json?.mandalas)) {
    for (const m of json.mandalas) {
      const mNum = m?.number;
      const suktas = Array.isArray(m?.suktas) ? m.suktas : [];
      for (const s of suktas) {
        const sNum = s?.number;
        const sRishi = normalize(s?.rishi);
        const sDeity = normalize(s?.deity);
        const riks = Array.isArray(s?.riks) ? s.riks : [];
        for (const v of riks) {
          const vNum = v?.number ?? v?.rik_number;
          items.push({
            sanskrit: normalize(v?.samhita) || normalize(v?.devanagari) || normalize(v?.samhita?.devanagari?.text),
            transliteration: normalize(v?.padapatha_transliteration) || normalize(v?.transliteration) || normalize(v?.padapatha?.transliteration?.text),
            english: normalize(v?.english) || normalize(v?.translation),
            reference: `Rig Veda ${mNum}.${sNum}.${vNum}`,
            rishi: sRishi,
            deity: sDeity,
            mandala: typeof mNum === 'number' ? mNum : undefined,
            sukta: typeof sNum === 'number' ? sNum : undefined,
            rik: typeof vNum === 'number' ? vNum : undefined,
          });
        }
      }
    }
    CACHE = items;
    return items;
  }

  // Shape B: { "Mandala 1": { "Sukta 1": [ { rik_number, samhita: { devanagari: { text } }, padapatha: { transliteration: { text } }, translation } ], ... }, ...}
  const mandalaEntries = Object.entries(json || {}).filter(([k]) => k.toLowerCase().startsWith('mandala'));
  if (mandalaEntries.length > 0) {
    for (const [mKey, mVal] of mandalaEntries as [string, any][]) {
      const mNum = parseInt((mKey.match(/(\d+)/)?.[1]) || '');
      const suktaEntries = Object.entries(mVal || {}).filter(([k]) => k.toLowerCase().startsWith('sukta'));
      for (const [sKey, riks] of suktaEntries as [string, any[]][]) {
        const sNum = parseInt((sKey.match(/(\d+)/)?.[1]) || '');
        if (Array.isArray(riks)) {
          for (const v of riks) {
            const vNum = v?.number ?? v?.rik_number;
            items.push({
              sanskrit: normalize(v?.samhita?.devanagari?.text) || normalize(v?.samhita) || normalize(v?.devanagari),
              transliteration: normalize(v?.padapatha?.transliteration?.text) || normalize(v?.transliteration) || normalize(v?.padapatha_transliteration),
              english: normalize(v?.english) || normalize(v?.translation),
              reference: `Rig Veda ${mNum}.${sNum}.${vNum}`,
              rishi: normalize(v?.rishi),
              deity: normalize(v?.deity),
              mandala: Number.isFinite(mNum) ? mNum : undefined,
              sukta: Number.isFinite(sNum) ? sNum : undefined,
              rik: typeof vNum === 'number' ? vNum : undefined,
            });
          }
        }
      }
    }
    CACHE = items;
    return items;
  }

  // Fallback: empty
  CACHE = [];
  return [];
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(url.searchParams.get('pageSize') || '30', 10)));
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const rishi = url.searchParams.get('rishi') || '';
    const deity = url.searchParams.get('deity') || '';
    const theme = url.searchParams.get('theme') || '';
    const mandalaFilter = url.searchParams.get('mandala') || '';
    const items = await loadAllHymns();

    // Filters
    let filtered = items;
    if (q) {
      filtered = filtered.filter((h) =>
        h.sanskrit.toLowerCase().includes(q) ||
        h.transliteration.toLowerCase().includes(q) ||
        h.english.toLowerCase().includes(q) ||
        h.reference.toLowerCase().includes(q)
      );
    }
    if (rishi && rishi !== 'All') filtered = filtered.filter((h) => (h.rishi || '') === rishi);
    if (deity && deity !== 'All') filtered = filtered.filter((h) => (h.deity || '') === deity);
    if (theme && theme !== 'All') filtered = filtered.filter((h) => (h.theme || '') === theme);
    if (mandalaFilter && mandalaFilter !== 'All') filtered = filtered.filter((h) => String(h.mandala || '') === String(mandalaFilter));

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = filtered.slice(start, end);

    return NextResponse.json({ total, page, pageSize, items: pageItems });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
  }
}


