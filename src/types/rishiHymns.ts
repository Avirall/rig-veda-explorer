// TypeScript interfaces for Rishi Hymn data

export interface SampleHymn {
  sanskrit: string;
  transliteration: string;
  english: string;
  reference: string;
  deity: string;
  theme: string;
}

export interface Rishi {
  name: string;
  hymns: string;
  description: string;
  sampleHymn: SampleHymn;
}

export interface RishiWithMultipleHymns {
  name: string;
  hymns: string;
  description: string;
  mandala: number;
  sampleHymns: SampleHymn[];
}

export interface RishiHymnsData {
  rishis: Rishi[];
  metadata: {
    description: string;
    totalRishis: number;
    totalHymns: string;
    mandalas: number[];
    deities: string[];
    themes: string[];
    lastUpdated: string;
    source: string;
  };
}

export interface ComprehensiveRishiHymnsData {
  rishiHymns: Record<string, RishiWithMultipleHymns>;
  metadata: {
    description: string;
    totalRishis: number;
    totalHymns: string;
    mandalas: number[];
    deities: string[];
    themes: string[];
    lastUpdated: string;
    source: string;
    usage: string;
  };
}

// Utility types for component props
export interface HymnCardProps {
  rishi: Rishi;
  index: number;
  isFlipped: boolean;
  isHovered: boolean;
  onCardClick: (index: number) => void;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
}

export interface FlipCardState {
  flippedCards: Set<number>;
  hoveredCard: number | null;
}
