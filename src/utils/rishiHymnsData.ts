// Utility functions for Rishi Hymn data management

import { Rishi, RishiHymnsData, ComprehensiveRishiHymnsData } from '../types/rishiHymns';

// Load basic Rishi hymns data
export async function loadRishiHymns(): Promise<RishiHymnsData> {
  try {
    const response = await fetch('/dataset/rishi_hymns.json');
    if (!response.ok) {
      throw new Error('Failed to load Rishi hymns data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading Rishi hymns:', error);
    // Return fallback data
    return getFallbackRishiHymns();
  }
}

// Load comprehensive Rishi hymns data
export async function loadComprehensiveRishiHymns(): Promise<ComprehensiveRishiHymnsData> {
  try {
    const response = await fetch('/dataset/comprehensive_rishi_hymns.json');
    if (!response.ok) {
      throw new Error('Failed to load comprehensive Rishi hymns data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading comprehensive Rishi hymns:', error);
    // Return fallback data
    return getFallbackComprehensiveRishiHymns();
  }
}

// Get random hymn from a Rishi's collection
export function getRandomHymn(rishi: Rishi): Rishi['sampleHymn'] {
  return rishi.sampleHymn;
}

// Get random hymn from comprehensive data
export function getRandomHymnFromComprehensive(rishiName: string, data: ComprehensiveRishiHymnsData): any {
  const rishi = data.rishiHymns[rishiName];
  if (!rishi || !rishi.sampleHymns.length) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * rishi.sampleHymns.length);
  return rishi.sampleHymns[randomIndex];
}

// Filter Rishis by deity
export function filterRishisByDeity(rishis: Rishi[], deity: string): Rishi[] {
  return rishis.filter(rishi => rishi.sampleHymn.deity === deity);
}

// Filter Rishis by theme
export function filterRishisByTheme(rishis: Rishi[], theme: string): Rishi[] {
  return rishis.filter(rishi => rishi.sampleHymn.theme === theme);
}

// Get all unique deities from Rishis
export function getAllDeities(rishis: Rishi[]): string[] {
  const deities = new Set(rishis.map(rishi => rishi.sampleHymn.deity));
  return Array.from(deities);
}

// Get all unique themes from Rishis
export function getAllThemes(rishis: Rishi[]): string[] {
  const themes = new Set(rishis.map(rishi => rishi.sampleHymn.theme));
  return Array.from(themes);
}

// Fallback data for basic Rishi hymns
function getFallbackRishiHymns(): RishiHymnsData {
  return {
    rishis: [
      {
        name: "Gritsamada",
        hymns: "44 hymns",
        description: "Devotee of Indra",
        sampleHymn: {
          sanskrit: "इन्द्रं वर्धन्तो अप्तुरः कृण्वन्तो विश्वमानुषं",
          transliteration: "indraṃ vardhánto aptúraḥ kṛṇvánto viśva-mā́nuṣam",
          english: "Praising Indra, the destroyer of obstacles, making all mankind Arya",
          reference: "Rig Veda 1.3",
          deity: "Indra",
          theme: "Power and strength"
        }
      }
    ],
    metadata: {
      description: "Fallback Rishi hymns data",
      totalRishis: 1,
      totalHymns: "44 hymns",
      mandalas: [1],
      deities: ["Indra"],
      themes: ["Power and strength"],
      lastUpdated: "2024-12-19",
      source: "Fallback data"
    }
  };
}

// Fallback data for comprehensive Rishi hymns
function getFallbackComprehensiveRishiHymns(): ComprehensiveRishiHymnsData {
  return {
    rishiHymns: {
      "Gritsamada": {
        name: "Gritsamada",
        hymns: "44 hymns",
        description: "Devotee of Indra",
        mandala: 1,
        sampleHymns: [
          {
            sanskrit: "इन्द्रं वर्धन्तो अप्तुरः कृण्वन्तो विश्वमानुषं",
            transliteration: "indraṃ vardhánto aptúraḥ kṛṇvánto viśva-mā́nuṣam",
            english: "Praising Indra, the destroyer of obstacles, making all mankind Arya",
            reference: "Rig Veda 1.3",
            deity: "Indra",
            theme: "Power and strength"
          }
        ]
      }
    },
    metadata: {
      description: "Fallback comprehensive Rishi hymns data",
      totalRishis: 1,
      totalHymns: "44 hymns",
      mandalas: [1],
      deities: ["Indra"],
      themes: ["Power and strength"],
      lastUpdated: "2024-12-19",
      source: "Fallback data",
      usage: "For interactive hymn cards and educational displays"
    }
  };
}
