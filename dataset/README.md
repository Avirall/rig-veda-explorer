# Rishi Hymns Data Documentation

This directory contains structured data for the Rig Veda Rishi hymns used in the interactive card flip feature.

## Files Overview

### 1. `rishi_hymns.json`
**Purpose**: Basic Rishi hymns data for the flip cards
**Structure**: Simple array of Rishis with one sample hymn each
**Usage**: Primary data source for the interactive hymn cards

### 2. `comprehensive_rishi_hymns.json`
**Purpose**: Extended Rishi hymns data with multiple hymns per Rishi
**Structure**: Object with Rishi names as keys, each containing multiple sample hymns
**Usage**: For advanced features, random hymn selection, and educational content

### 3. `src/types/rishiHymns.ts`
**Purpose**: TypeScript type definitions for type safety
**Structure**: Interfaces and types for all data structures
**Usage**: Imported by components for type checking

### 4. `src/utils/rishiHymnsData.ts`
**Purpose**: Utility functions for data management
**Structure**: Helper functions for loading, filtering, and manipulating data
**Usage**: Imported by components for data operations

## Data Structure

### Basic Rishi Structure
```typescript
interface Rishi {
  name: string;           // Rishi name (e.g., "Gritsamada")
  hymns: string;          // Hymn count (e.g., "44 hymns")
  description: string;    // Brief description
  sampleHymn: SampleHymn; // Single representative hymn
}
```

### Sample Hymn Structure
```typescript
interface SampleHymn {
  sanskrit: string;       // Devanagari script
  transliteration: string; // Roman script with diacritics
  english: string;        // English translation
  reference: string;       // Rig Veda citation
  deity: string;          // Primary deity
  theme: string;          // Theme category
}
```

## Rishis Included

1. **Gritsamada** (44 hymns) - Devotee of Indra
2. **Vishvamitra** (104 hymns) - Royal sage who achieved Brahmin status
3. **Vasistha** (102 hymns) - Priest of the Solar dynasty
4. **Atri** (87 hymns) - One of the seven great sages
5. **Bharadvaja** (78 hymns) - Scholar and teacher
6. **Kanva** (131 hymns) - Ancient sage of great wisdom

## Deities Covered

- **Indra** - King of gods, destroyer of obstacles
- **Savitr** - Solar deity, divine inspiration
- **Ushas** - Dawn goddess, renewal
- **Soma** - Sacred plant/deity, ritual ecstasy
- **Agni** - Fire god, sacred flame
- **Surya** - Sun god, cosmic order

## Themes Covered

- Power and strength
- Divine inspiration
- Dawn and renewal
- Sacred ritual
- Sacred fire
- Divine ecstasy
- Devotion and praise
- Cosmic order
- Universal awakening
- Universal welfare
- Ritual purification

## Usage Examples

### Loading Basic Data
```typescript
import { loadRishiHymns } from '../utils/rishiHymnsData';

const data = await loadRishiHymns();
const rishis = data.rishis;
```

### Loading Comprehensive Data
```typescript
import { loadComprehensiveRishiHymns } from '../utils/rishiHymnsData';

const data = await loadComprehensiveRishiHymns();
const kanvaHymns = data.rishiHymns.Kanva.sampleHymns;
```

### Getting Random Hymn
```typescript
import { getRandomHymnFromComprehensive } from '../utils/rishiHymnsData';

const randomHymn = getRandomHymnFromComprehensive('Vasistha', data);
```

### Filtering by Deity
```typescript
import { filterRishisByDeity } from '../utils/rishiHymnsData';

const indraRishis = filterRishisByDeity(rishis, 'Indra');
```

## Data Sources

- Rig Veda translations from scholarly sources
- Sanskrit text in Devanagari script
- Transliterations with proper diacritics
- English translations from established sources
- References to specific Rig Veda citations

## Maintenance

- **Last Updated**: December 19, 2024
- **Version**: 1.0
- **Status**: Active development
- **Contributors**: Rig Veda Explorer Team

## Future Enhancements

1. **Audio Integration**: Add audio files for hymn recitations
2. **More Rishis**: Expand to include additional major Rishis
3. **Multiple Hymns**: Add more sample hymns per Rishi
4. **Commentary**: Include scholarly commentary and interpretations
5. **Cross-references**: Link related hymns and themes
6. **Search Functionality**: Enable search by deity, theme, or keyword

## Technical Notes

- All JSON files are UTF-8 encoded
- Sanskrit text uses proper Unicode Devanagari characters
- Transliterations follow IAST (International Alphabet of Sanskrit Transliteration)
- Data is optimized for web performance
- TypeScript interfaces ensure type safety
- Utility functions provide error handling and fallbacks
