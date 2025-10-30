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
  versesCount: number;
  verses: Array<{
    sanskrit: string;
    transliteration: string;
    english: string;
  }>;
};

function normalize(str: unknown): string {
  return typeof str === 'string' ? str : '';
}

function stripDiacritics(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase();
}

const DEITY_MAP: Record<string, string> = {
  agni: 'Agni',
  agnim: 'Agni',
  indra: 'Indra',
  indram: 'Indra',
  soma: 'Soma',
  somam: 'Soma',
  savitar: 'Savitr',
  savitr: 'Savitr',
  savita: 'Savitr',
  ushas: 'Ushas',
  uşas: 'Ushas',
  ushah: 'Ushas',
  surya: 'Surya',
  suryam: 'Surya',
  varuna: 'Varuna',
  mitra: 'Mitra',
  marut: 'Maruts',
  maruts: 'Maruts',
  ashvin: 'Ashvins',
  asvin: 'Ashvins',
  aswins: 'Ashvins',
  rudra: 'Rudra',
  vishnu: 'Vishnu',
  visnu: 'Vishnu',
  pushan: 'Pushan',
  pusan: 'Pushan',
  aditi: 'Aditi',
  sarasvati: 'Sarasvati',
  prthivi: 'Prithivi',
  prithivi: 'Prithivi',
  brahmanaspati: 'Brihaspati',
  brihaspati: 'Brihaspati',
  rbhus: 'Rbhus',
  tvastr: 'Tvastr',
  tvashta: 'Tvastr',
  dyava: 'Dyava-Prithivi',
  dyavaprthivi: 'Dyava-Prithivi',
  yama: 'Yama',
  kubera: 'Kubera',
  hiraNyagarbha: 'Hiranyagarbha',
};

const DEFAULT_RISHI_BY_MANDALA: Record<number, string> = {
  1: 'Various Seers (Mandala 1)',
  2: 'Gritsamada Angirasa',
  3: 'Vishvamitra',
  4: 'Vamadeva Gotama',
  5: 'Atri',
  6: 'Bharadvaja',
  7: 'Vasistha',
  8: 'Kanva',
  9: 'Various Soma Chanters',
  10: 'Various Seers (Mandala 10)',
};

// Detailed Rishi assignments for Mandala 1 suktas (based on traditional attributions)
const MANDALA_1_RISHI_MAP: Record<number, string> = {
  1: 'Madhuchchhandas',
  2: 'Madhuchchhandas',
  3: 'Madhuchchhandas',
  4: 'Madhuchchhandas',
  5: 'Madhuchchhandas',
  6: 'Madhuchchhandas',
  7: 'Madhuchchhandas',
  8: 'Madhuchchhandas',
  9: 'Madhuchchhandas',
  10: 'Madhuchchhandas',
  11: 'Jetri Madhucchandas',
  12: 'Medhyatithi Kanva',
  13: 'Medhyatithi Kanva',
  14: 'Medhyatithi Kanva',
  15: 'Medhyatithi Kanva',
  16: 'Medhyatithi Kanva',
  17: 'Medhyatithi Kanva',
  18: 'Medhyatithi Kanva',
  19: 'Medhyatithi Kanva',
  20: 'Medhyatithi Kanva',
  21: 'Medhyatithi Kanva',
  22: 'Medhyatithi Kanva',
  23: 'Medhyatithi Kanva',
  24: 'Sunahshepa Ajigarti',
  25: 'Sunahshepa Ajigarti',
  26: 'Sunahshepa Ajigarti',
  27: 'Shunahshepa Ajigarti',
  28: 'Shunahshepa Ajigarti',
  29: 'Shunahshepa Ajigarti',
  30: 'Shunahshepa Ajigarti',
  // Add more as needed - Mandala 1 has 191 suktas from various Rishis
  // For simplicity, we'll default the rest to Kanva lineage
};

const DEFAULT_DEITY_BY_MANDALA: Record<number, string> = {
  9: 'Soma',
};

function inferDeity(verses: HymnItem['verses'], mandala?: number): string | undefined {
  for (const verse of verses.slice(0, 3)) {
    const words = (verse.transliteration || verse.sanskrit)
      .split(/\s+/)
      .map(stripDiacritics)
      .filter(Boolean);
    for (const word of words) {
      if (DEITY_MAP[word]) {
        return DEITY_MAP[word];
      }
    }
  }
  if (mandala && DEFAULT_DEITY_BY_MANDALA[mandala]) {
    return DEFAULT_DEITY_BY_MANDALA[mandala];
  }
  return undefined;
}

function inferRishi(mandala?: number, sukta?: number): string | undefined {
  // Special handling for Mandala 1 with detailed sukta-level Rishi assignments
  if (mandala === 1 && sukta && MANDALA_1_RISHI_MAP[sukta]) {
    return MANDALA_1_RISHI_MAP[sukta];
  }
  if (mandala && DEFAULT_RISHI_BY_MANDALA[mandala]) {
    return DEFAULT_RISHI_BY_MANDALA[mandala];
  }
  return undefined;
}

let CACHE: HymnItem[] | null = null;

async function loadAllHymns(): Promise<HymnItem[]> {
  // Reset cache to pick up new Rishi mappings
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
          // collect verses for this sukta once outside loop
        }
      }
    }
    // remake as suktas
    for (const m of json.mandalas) {
      const mNum = m?.number;
      const suktas = Array.isArray(m?.suktas) ? m.suktas : [];
      for (const s of suktas) {
        const sNum = s?.number;
        const sRishi = normalize(s?.rishi);
        const sDeity = normalize(s?.deity);
        const riks = Array.isArray(s?.riks) ? s.riks : [];
        const verses = riks
          .map((v: any) => ({
            sanskrit: normalize(v?.samhita) || normalize(v?.devanagari) || normalize(v?.samhita?.devanagari?.text),
            transliteration:
              normalize(v?.padapatha_transliteration) ||
              normalize(v?.transliteration) ||
              normalize(v?.padapatha?.transliteration?.text),
            english: normalize(v?.english) || normalize(v?.translation),
          }))
          .filter((v: any) => v.sanskrit || v.transliteration || v.english);

        if (!verses.length) {
          continue;
        }

        const combinedSanskrit = verses.map((v: any) => v.sanskrit).filter(Boolean).join('\n').trim();
        const combinedTransliteration = verses
          .map((v: any) => v.transliteration)
          .filter(Boolean)
          .join('\n')
          .trim();
        const combinedEnglish = verses.map((v: any) => v.english).filter(Boolean).join('\n').trim();

        const inferredDeity = sDeity || inferDeity(verses, typeof mNum === 'number' ? mNum : undefined);
        const inferredRishi = sRishi || inferRishi(typeof mNum === 'number' ? mNum : undefined, typeof sNum === 'number' ? sNum : undefined);

        items.push({
          sanskrit: combinedSanskrit,
          transliteration: combinedTransliteration,
          english: combinedEnglish,
          reference: `Rig Veda ${mNum}.${sNum}`,
          rishi: inferredRishi,
          deity: inferredDeity,
          mandala: typeof mNum === 'number' ? mNum : undefined,
          sukta: typeof sNum === 'number' ? sNum : undefined,
          versesCount: verses.length,
          verses,
        });
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
          const verses = riks
            .map((v: any) => ({
              sanskrit: normalize(v?.samhita?.devanagari?.text) || normalize(v?.samhita) || normalize(v?.devanagari),
              transliteration:
                normalize(v?.padapatha?.transliteration?.text) ||
                normalize(v?.transliteration) ||
                normalize(v?.padapatha_transliteration),
              english: normalize(v?.english) || normalize(v?.translation),
            }))
            .filter((v: any) => v.sanskrit || v.transliteration || v.english);

          if (!verses.length) {
            continue;
          }

          const combinedSanskrit = verses.map((v: any) => v.sanskrit).filter(Boolean).join('\n').trim();
          const combinedTransliteration = verses
            .map((v: any) => v.transliteration)
            .filter(Boolean)
            .join('\n')
            .trim();
          const combinedEnglish = verses.map((v: any) => v.english).filter(Boolean).join('\n').trim();

          const inferredDeity =
            normalize(riks?.[0]?.deity) || inferDeity(verses, Number.isFinite(mNum) ? mNum : undefined);
          const inferredRishi =
            normalize(riks?.[0]?.rishi) || normalize(riks?.[0]?.seer) || inferRishi(Number.isFinite(mNum) ? mNum : undefined, Number.isFinite(sNum) ? sNum : undefined);

          items.push({
            sanskrit: combinedSanskrit,
            transliteration: combinedTransliteration,
            english: combinedEnglish,
            reference: `Rig Veda ${mNum}.${sNum}`,
            rishi: inferredRishi,
            deity: inferredDeity,
            mandala: Number.isFinite(mNum) ? mNum : undefined,
            sukta: Number.isFinite(sNum) ? sNum : undefined,
            versesCount: verses.length,
            verses,
          });
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


