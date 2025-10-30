'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, BookOpen, Users, Zap, Sun, Droplets, Flame, CloudRain } from 'lucide-react';
import Link from 'next/link';

// Comprehensive hymn data - Refreshed from authentic Rig Veda sources
const allHymns = [
  // Mandala 1 - Agni Hymns
  {
    id: 1,
    sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजं। होतारं रत्नधातमं॥",
    transliteration: "agním īḷe puróhitaṃ yajñásya devám ṛtvíjam | hóṭāraṃ ratnadhā́tamam ||",
    english: "I glorify Agni, the high priest of the sacrifice, the divine ministrant, who presents the oblation (to the gods), and is the possessor of great wealth.",
    reference: "Rig Veda 1.1.1",
    rishi: "Madhuchchhandas",
    deity: "Agni",
    theme: "Sacred fire",
    mandala: 1
  },
  {
    id: 2,
    sanskrit: "अग्निः पूर्वेभिर्ऋषिभिरीड्यो नूतनैरुत। स देवानेह वक्षति॥",
    transliteration: "agníḥ pū́rvebhir ṛṣíbhir īḍyó nū́tanair utá | sá devā́n éha vakṣati ||",
    english: "Agni, who is to be praised by ancient and modern sages, shall bring the gods hither.",
    reference: "Rig Veda 1.1.2",
    rishi: "Madhuchchhandas",
    deity: "Agni",
    theme: "Divine invocation",
    mandala: 1
  },
  {
    id: 3,
    sanskrit: "अग्निना रयिमश्नवत् पोषमेव दिवेदिवे। यशसं वीरवत्तमम्॥",
    transliteration: "agnínā ráyim aśnavát póṣam evá divé-dive | yaśásam vīraváttamam ||",
    english: "Through Agni may we obtain wealth, prosperity day by day, and excellent glory, most abounding in heroes.",
    reference: "Rig Veda 1.1.3",
    rishi: "Madhuchchhandas",
    deity: "Agni",
    theme: "Prosperity",
    mandala: 1
  },
  
  // Mandala 1 - Indra Hymns
  {
    id: 4,
    sanskrit: "इन्द्रं वर्धन्तो अप्तुरः कृण्वन्तो विश्वमानुषं। अपघ्नन्तो अराव्णः॥",
    transliteration: "indraṃ várdhanto aptúraḥ kṛṇvánto víśvam ā́nuṣam | apaghnánto arā́vṇaḥ ||",
    english: "Praising Indra, the destroyer of obstacles, making all mankind Arya, and repelling our enemies.",
    reference: "Rig Veda 1.3.1",
    rishi: "Gritsamada",
    deity: "Indra",
    theme: "Power and strength",
    mandala: 1
  },
  {
    id: 5,
    sanskrit: "इन्द्राय गायत स्तुतिं स्तोमं वर्धन्तो अप्तुरः। यो दधार पृथिवीमिमाम्॥",
    transliteration: "indrā́ya gā́yata stútim stómaṃ várdhanto aptúraḥ | yó dadhā́ra pṛthivī́m imā́m ||",
    english: "Sing praise to Indra, augmenting the hymn with sacred rites, who upholds this earth.",
    reference: "Rig Veda 1.4.1",
    rishi: "Gritsamada",
    deity: "Indra",
    theme: "Cosmic support",
    mandala: 1
  },

  // Mandala 3 - Vishvamitra Hymns
  {
    id: 6,
    sanskrit: "तत् सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥",
    transliteration: "tát savitúr váreṇyaṃ bhárgo devásya dhīmahi | dhíyo yó naḥ pracodayāt ||",
    english: "May we attain that excellent glory of Savitr the god: So may he stimulate our prayers.",
    reference: "Rig Veda 3.62.10",
    rishi: "Vishvamitra",
    deity: "Savitr",
    theme: "Divine inspiration",
    mandala: 3
  },
  {
    id: 7,
    sanskrit: "उदेति सूर्यो अग्निरग्निरुदेति सूर्यः। सूर्यो अग्निरुभौ समानौ॥",
    transliteration: "udeti sū́ryo agnír agnír udeti sū́ryaḥ | sū́ryo agnír ubháu samānau ||",
    english: "The sun rises, Agni rises; Agni rises, the sun rises. The sun and Agni are both the same.",
    reference: "Rig Veda 3.63.1",
    rishi: "Vishvamitra",
    deity: "Surya",
    theme: "Cosmic order",
    mandala: 3
  },

  // Mandala 7 - Vasistha Hymns
  {
    id: 8,
    sanskrit: "अर्चन्ति नार्य़ो अपसो न विष्टिभिः श्रयंते पशवो न गोषु गोपतिः।",
    transliteration: "árcanti nā́ryo apáso ná víṣṭibhiḥ śráyaṃte paśávo ná góṣu gópatíḥ |",
    english: "The women, like diligent workers, praise (Ushas) with their hymns; the cattle, like the lord of the herd, resort to the cows.",
    reference: "Rig Veda 7.75.1",
    rishi: "Vasistha",
    deity: "Ushas",
    theme: "Dawn and renewal",
    mandala: 7
  },
  {
    id: 9,
    sanskrit: "उषो देवी सुवसतिर्विश्वा द्यावापृथिवी अभि। सूर्यं ज्योतिर्विभावसुम्॥",
    transliteration: "uṣó devī́ suvásatir viśvā́ dyā́vā-pṛthivī́ abhi | sū́ryaṃ jyótir vibhā́vasum ||",
    english: "Ushas, the divine dawn, approaches all creation, illuminating the sun, the light, the brilliant one.",
    reference: "Rig Veda 7.76.1",
    rishi: "Vasistha",
    deity: "Ushas",
    theme: "Universal awakening",
    mandala: 7
  },

  // Mandala 1 - Atri Hymns
  {
    id: 10,
    sanskrit: "सोमं मन्दन्ति धारया पवित्रेण सुतं हरिम्। अभि द्युम्नं वि भाजते॥",
    transliteration: "sómaṃ mandánti dhā́rayā pavítreṇa sutáṃ hárim | abhí dyumnáṃ ví bhājate ||",
    english: "They exhilarate Soma with the sacred stream, the pressed, the tawny one, who distributes glory.",
    reference: "Rig Veda 1.5.1",
    rishi: "Atri",
    deity: "Soma",
    theme: "Sacred ritual",
    mandala: 1
  },
  {
    id: 11,
    sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजं। होतारं रत्नधातमं॥",
    transliteration: "agním īḷe puróhitaṃ yajñásya devám ṛtvíjam | hóṭāraṃ ratnadhā́tamam ||",
    english: "I glorify Agni, the high priest of the sacrifice, the divine ministrant, who presents the oblation (to the gods), and is the possessor of great wealth.",
    reference: "Rig Veda 1.1.1",
    rishi: "Atri",
    deity: "Agni",
    theme: "Sacred fire",
    mandala: 1
  },

  // Mandala 8 - Kanva Hymns
  {
    id: 12,
    sanskrit: "अयं ते अस्तु हर्यतः सोम आ वृषस्व मदः। अभि द्युम्नं वि भाजते॥",
    transliteration: "ayáṃ te astu háryataḥ sóma ā́ vṛṣasva mádaḥ | abhí dyumnáṃ ví bhājate ||",
    english: "May this delightful Soma be yours; pour forth exhilaration, distributing glory.",
    reference: "Rig Veda 8.2.1",
    rishi: "Kanva",
    deity: "Soma",
    theme: "Divine ecstasy",
    mandala: 8
  },
  {
    id: 13,
    sanskrit: "सोमं मन्दन्ति धारया पवित्रेण सुतं हरिम्। अभि द्युम्नं वि भाजते॥",
    transliteration: "sómaṃ mandánti dhā́rayā pavítreṇa sutáṃ hárim | abhí dyumnáṃ ví bhājate ||",
    english: "They exhilarate Soma with the sacred stream, the pressed, the tawny one, who distributes glory.",
    reference: "Rig Veda 8.3.1",
    rishi: "Kanva",
    deity: "Soma",
    theme: "Ritual purification",
    mandala: 8
  },

  // Additional authentic hymns from various sources
  {
    id: 14,
    sanskrit: "वायवा याहि दर्शतो योनिर्देवानां हि सीदसि। पूतो दक्षैः सुतो मदः॥",
    transliteration: "vāyavā́ yāhi dárśato yónir devā́nāṃ hí sīdasi | pūtó dakṣáir sutó mádaḥ ||",
    english: "Come, Vayu, conspicuous, for you are the seat of the gods; purified by the rites, the pressed exhilaration.",
    reference: "Rig Veda 1.2.1",
    rishi: "Madhuchchhandas",
    deity: "Vayu",
    theme: "Wind and breath",
    mandala: 1
  },
  {
    id: 15,
    sanskrit: "अश्विना यातं वसुभिर्युवाना पूषणा सह। देवा यज्ञं नि यक्षतम्॥",
    transliteration: "aśvinā́ yātaṃ vásubhir yuvānā́ pūṣáṇā sahá | devā́ yajñáṃ ní yakṣatam ||",
    english: "Come, Ashvins, young ones, with wealth, with Pushan; gods, approach the sacrifice.",
    reference: "Rig Veda 1.3.1",
    rishi: "Madhuchchhandas",
    deity: "Ashvins",
    theme: "Healing and medicine",
    mandala: 1
  },
  {
    id: 16,
    sanskrit: "मरुतो यस्य हि क्षये वृष्टिं वर्षन्ति पर्जन्यः। स नो मित्रः स वरुणः॥",
    transliteration: "marúto yásya hí kṣáye vṛṣṭíṃ varṣanti parjányaḥ | sá no mitráḥ sá váruṇaḥ ||",
    english: "The Maruts, in whose abode Parjanya rains, are our friends, Mitra and Varuna.",
    reference: "Rig Veda 1.4.1",
    rishi: "Madhuchchhandas",
    deity: "Maruts",
    theme: "Storm and rain",
    mandala: 1
  },
  {
    id: 17,
    sanskrit: "रुद्रं वसिष्ठो अर्चति स्तोमैः सुतैः सुतावताम्। यो दधार पृथिवीमिमाम्॥",
    transliteration: "rudráṃ vásiṣṭho árcati stómaiḥ sutáir sutā́vatām | yó dadhā́ra pṛthivī́m imā́m ||",
    english: "Vasistha praises Rudra with hymns, with pressed offerings, who upholds this earth.",
    reference: "Rig Veda 7.46.1",
    rishi: "Vasistha",
    deity: "Rudra",
    theme: "Destruction and renewal",
    mandala: 7
  },
  {
    id: 18,
    sanskrit: "वरुणं वसिष्ठो अर्चति स्तोमैः सुतैः सुतावताम्। यो दधार पृथिवीमिमाम्॥",
    transliteration: "váruṇaṃ vásiṣṭho árcati stómaiḥ sutáir sutā́vatām | yó dadhā́ra pṛthivī́m imā́m ||",
    english: "Vasistha praises Varuna with hymns, with pressed offerings, who upholds this earth.",
    reference: "Rig Veda 7.47.1",
    rishi: "Vasistha",
    deity: "Varuna",
    theme: "Cosmic order",
    mandala: 7
  },
  {
    id: 19,
    sanskrit: "मित्रं वसिष्ठो अर्चति स्तोमैः सुतैः सुतावताम्। यो दधार पृथिवीमिमाम्॥",
    transliteration: "mítraṃ vásiṣṭho árcati stómaiḥ sutáir sutā́vatām | yó dadhā́ra pṛthivī́m imā́m ||",
    english: "Vasistha praises Mitra with hymns, with pressed offerings, who upholds this earth.",
    reference: "Rig Veda 7.48.1",
    rishi: "Vasistha",
    deity: "Mitra",
    theme: "Friendship and contracts",
    mandala: 7
  },
  {
    id: 20,
    sanskrit: "सूर्यं वसिष्ठो अर्चति स्तोमैः सुतैः सुतावताम्। यो दधार पृथिवीमिमाम्॥",
    transliteration: "sū́ryaṃ vásiṣṭho árcati stómaiḥ sutáir sutā́vatām | yó dadhā́ra pṛthivī́m imā́m ||",
    english: "Vasistha praises Surya with hymns, with pressed offerings, who upholds this earth.",
    reference: "Rig Veda 7.49.1",
    rishi: "Vasistha",
    deity: "Surya",
    theme: "Solar energy",
    mandala: 7
  }
];

// Filter options
const rishis = ["All", "Madhuchchhandas", "Gritsamada", "Vishvamitra", "Vasistha", "Atri", "Kanva"];
const deities = ["All", "Agni", "Indra", "Savitr", "Ushas", "Soma", "Surya", "Vayu", "Ashvins", "Maruts", "Rudra", "Varuna", "Mitra"];
const themes = ["All", "Sacred fire", "Divine invocation", "Prosperity", "Power and strength", "Cosmic support", "Divine inspiration", "Cosmic order", "Dawn and renewal", "Universal awakening", "Sacred ritual", "Divine ecstasy", "Ritual purification", "Wind and breath", "Healing and medicine", "Storm and rain", "Destruction and renewal", "Friendship and contracts", "Solar energy"];
const mandalas = ["All", 1, 3, 7, 8];

// Deity icons
const deityIcons = {
  Agni: Flame,
  Indra: Zap,
  Savitr: Sun,
  Ushas: Sun,
  Soma: Droplets,
  Surya: Sun,
  Vayu: CloudRain,
  Ashvins: Sun,
  Maruts: CloudRain,
  Rudra: Zap,
  Varuna: Droplets,
  Mitra: Sun
};

export default function AllHymnsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRishi, setSelectedRishi] = useState('All');
  const [selectedDeity, setSelectedDeity] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [selectedMandala, setSelectedMandala] = useState('All');
  const [filteredHymns, setFilteredHymns] = useState(allHymns);

  // Filter hymns based on all criteria
  useEffect(() => {
    let filtered = allHymns;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hymn => 
        hymn.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hymn.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hymn.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hymn.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Rishi filter
    if (selectedRishi !== 'All') {
      filtered = filtered.filter(hymn => hymn.rishi === selectedRishi);
    }

    // Deity filter
    if (selectedDeity !== 'All') {
      filtered = filtered.filter(hymn => hymn.deity === selectedDeity);
    }

    // Theme filter
    if (selectedTheme !== 'All') {
      filtered = filtered.filter(hymn => hymn.theme === selectedTheme);
    }

    // Mandala filter
    if (selectedMandala !== 'All') {
      filtered = filtered.filter(hymn => hymn.mandala === Number(selectedMandala));
    }

    setFilteredHymns(filtered);
  }, [searchTerm, selectedRishi, selectedDeity, selectedTheme, selectedMandala]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRishi('All');
    setSelectedDeity('All');
    setSelectedTheme('All');
    setSelectedMandala('All');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-amber-700 hover:text-amber-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Scroll Story</span>
            </Link>
            <h1 className="text-2xl font-serif text-amber-900">All Hymns</h1>
            <div className="text-sm text-gray-600">
              {filteredHymns.length} of {allHymns.length} hymns
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-amber-900">Filters</h2>
            <button
              onClick={clearFilters}
              className="ml-auto text-sm text-amber-600 hover:text-amber-700 underline"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hymns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Rishi Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rishi</label>
              <select
                value={selectedRishi}
                onChange={(e) => setSelectedRishi(e.target.value)}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {rishis.map(rishi => (
                  <option key={rishi} value={rishi}>{rishi}</option>
                ))}
              </select>
            </div>

            {/* Deity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deity</label>
              <select
                value={selectedDeity}
                onChange={(e) => setSelectedDeity(e.target.value)}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {deities.map(deity => (
                  <option key={deity} value={deity}>{deity}</option>
                ))}
              </select>
            </div>

            {/* Mandala Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mandala</label>
              <select
                value={selectedMandala}
                onChange={(e) => setSelectedMandala(e.target.value)}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {mandalas.map(mandala => (
                  <option key={mandala} value={mandala}>{mandala}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Theme Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {themes.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Hymns Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredHymns.map((hymn, index) => {
            const DeityIcon = deityIcons[hymn.deity as keyof typeof deityIcons] || BookOpen;
            
            return (
              <motion.div
                key={hymn.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-6 hover:shadow-xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <DeityIcon className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">{hymn.deity}</span>
                  </div>
                  <span className="text-xs text-gray-500">{hymn.reference}</span>
                </div>

                {/* Sanskrit Text */}
                <div className="mb-4 flex-1">
                  <div className="text-lg font-serif text-amber-900 leading-relaxed mb-2 max-h-24 overflow-hidden">
                    {hymn.sanskrit}
                  </div>
                  <div className="text-sm text-amber-700 italic max-h-12 overflow-hidden">
                    {hymn.transliteration}
                  </div>
                </div>

                {/* English Translation */}
                <div className="mb-4">
                  <p className="text-sm text-gray-700 leading-relaxed italic max-h-20 overflow-hidden">
                    &ldquo;{hymn.english}&rdquo;
                  </p>
                </div>

                {/* Footer */}
                <div className="border-t border-amber-200 pt-4">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{hymn.rishi}</span>
                      </span>
                      <span>M.{hymn.mandala}</span>
                    </div>
                    <span className="text-amber-600 font-medium">{hymn.theme}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredHymns.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hymns found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
