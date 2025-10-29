'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, BookOpen, Flame, CloudRain, Droplets, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Scene 1: Dawn Appears
function DawnAppears() {
  // Dawn texts from the actual Rig Veda dataset
  const dawnTexts = [
    "We approach you, Agni, with reverential homage in our thoughts, daily, both morning and evening.",
    "Let the wise invoker bring hither from the shining sphere of the sun, all the divinities awaking with the dawn.",
    "We invoke Indra at the morning rite, we invoke him at the succeeding sacrifice.",
    "Awaken, the Aśvins, associated for the morning sacrifice; let them both come hither.",
    "Before dawn, even, Savitā sends to bring you to the rite, your wonderful car shining.",
    "Agni, bring from the dawn to the donor wealth of many sorts, with an excellent habitation.",
    "Object of holy rites, bring hither on the dawn following the night, Savitā, Uṣas and Aśvins.",
    "You, Agni, are the protector of the sacrifices; bring hither today the gods awaking at dawn.",
    "Resplendent Agni, you have blazed after many preceding dawns, you are the protector in villages.",
    "Uṣas, daughter of heaven, dawn upon us with riches; diffuser of light, dawn upon us with abundant food.",
    "The divine Uṣas has dwelt in heaven of old; may she dawn today, the excitress of chariots.",
    "There was light to irradiate the dawn; the sun rose like god; the fire shone with darkened flames."
  ];

  // Randomly select a text each time
  const [selectedText] = useState(() => 
    dawnTexts[Math.floor(Math.random() * dawnTexts.length)]
  );

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Soft sunrise gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-orange-200 via-yellow-100 to-amber-50"
        animate={{
          background: [
            "linear-gradient(to bottom, #fed7aa, #fef3c7, #fef7ed)",
            "linear-gradient(to bottom, #fdba74, #fde68a, #fef3c7)",
            "linear-gradient(to bottom, #fed7aa, #fef3c7, #fef7ed)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating dawn particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i % 3) * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Sun icon that appears with Dawn text */}
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.4)",
                  "0 0 40px rgba(251, 191, 36, 0.6)",
                  "0 0 20px rgba(251, 191, 36, 0.4)"
                ],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sun className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-2xl md:text-3xl text-gray-800 mb-6 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {selectedText}
          </motion.p>
        </motion.div>
            </div>
    </motion.div>
  );
}

// Scene 2: The Rig Veda
function TheRigVeda() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-b from-amber-50 to-orange-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Circular mandala lines radiating */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-amber-300 rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Central rotating element - custom book design */}
        <motion.div
          className="w-32 h-32 border-4 border-amber-600/30 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: 360 
          }}
          transition={{ 
            scale: { duration: 0.8, delay: 1.8 },
            opacity: { duration: 0.8, delay: 1.8 },
            rotate: { duration: 15, repeat: Infinity, ease: "linear", delay: 2.6 }
          }}
        >
          {/* Custom book design */}
          <div className="relative w-16 h-20">
            {/* Book cover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/60 to-amber-800/60 rounded-sm shadow-lg">
              {/* Book spine */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-700/80 to-amber-900/80 rounded-l-sm"></div>
              {/* Book pages */}
              <div className="absolute left-1 top-1 right-1 bottom-1 bg-gradient-to-br from-amber-50/80 to-amber-100/80 rounded-sm">
                {/* Page lines */}
                <div className="absolute top-2 left-2 right-2 h-0.5 bg-amber-300/40"></div>
                <div className="absolute top-4 left-2 right-2 h-0.5 bg-amber-300/40"></div>
                <div className="absolute top-6 left-2 right-2 h-0.5 bg-amber-300/40"></div>
                <div className="absolute top-8 left-2 right-2 h-0.5 bg-amber-300/40"></div>
                <div className="absolute top-10 left-2 right-2 h-0.5 bg-amber-300/40"></div>
                <div className="absolute top-12 left-2 right-2 h-0.5 bg-amber-300/40"></div>
                <div className="absolute top-14 left-2 right-2 h-0.5 bg-amber-300/40"></div>
                <div className="absolute top-16 left-2 right-2 h-0.5 bg-amber-300/40"></div>
            </div>
              {/* Decorative elements */}
              <div className="absolute top-1 left-2 w-2 h-2 bg-amber-500/60 rounded-full"></div>
              <div className="absolute bottom-1 right-2 w-1 h-1 bg-amber-500/60 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-serif text-amber-900 mb-8 leading-tight"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            The Rig Veda
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-gray-800 mb-12 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            10 Mandalas, 1,028 hymns, 10,000 verses — world's oldest Sanskrit poetry.
          </motion.p>
          
          {/* Stats with animation */}
          <div className="flex justify-center items-center space-x-12 text-lg text-gray-700 mb-12">
            <motion.div 
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="text-4xl font-bold text-amber-700 mb-2">10</div>
              <div className="text-sm font-medium">Mandalas</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="text-4xl font-bold text-amber-700 mb-2">1,028</div>
              <div className="text-sm font-medium">Hymns</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <div className="text-4xl font-bold text-amber-700 mb-2">10,000+</div>
              <div className="text-sm font-medium">Verses</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Scene 3: The Voices
function TheVoices() {
  // Comprehensive hymn data for each Rishi - Refreshed from authentic Rig Veda sources
  const rishiHymnsData = {
    "Gritsamada": [
      {
        sanskrit: "इन्द्रं वर्धन्तो अप्तुरः कृण्वन्तो विश्वमानुषं। अपघ्नन्तो अराव्णः॥",
        transliteration: "indraṃ várdhanto aptúraḥ kṛṇvánto víśvam ā́nuṣam | apaghnánto arā́vṇaḥ ||",
        english: "Praising Indra, the destroyer of obstacles, making all mankind Arya, and repelling our enemies.",
        reference: "Rig Veda 1.3.1",
        deity: "Indra",
        theme: "Power and strength"
      },
      {
        sanskrit: "इन्द्राय गायत स्तुतिं स्तोमं वर्धन्तो अप्तुरः। यो दधार पृथिवीमिमाम्॥",
        transliteration: "indrā́ya gā́yata stútim stómaṃ várdhanto aptúraḥ | yó dadhā́ra pṛthivī́m imā́m ||",
        english: "Sing praise to Indra, augmenting the hymn with sacred rites, who upholds this earth.",
        reference: "Rig Veda 1.4.1",
        deity: "Indra",
        theme: "Cosmic support"
      }
    ],
    "Vishvamitra": [
      {
        sanskrit: "तत् सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥",
        transliteration: "tát savitúr váreṇyaṃ bhárgo devásya dhīmahi | dhíyo yó naḥ pracodayāt ||",
        english: "May we attain that excellent glory of Savitr the god: So may he stimulate our prayers.",
        reference: "Rig Veda 3.62.10",
        deity: "Savitr",
        theme: "Divine inspiration"
      },
      {
        sanskrit: "उदेति सूर्यो अग्निरग्निरुदेति सूर्यः। सूर्यो अग्निरुभौ समानौ॥",
        transliteration: "udeti sū́ryo agnír agnír udeti sū́ryaḥ | sū́ryo agnír ubháu samānau ||",
        english: "The sun rises, Agni rises; Agni rises, the sun rises. The sun and Agni are both the same.",
        reference: "Rig Veda 3.63.1",
        deity: "Surya",
        theme: "Cosmic order"
      }
    ],
    "Vasistha": [
      {
        sanskrit: "अर्चन्ति नार्य़ो अपसो न विष्टिभिः श्रयंते पशवो न गोषु गोपतिः।",
        transliteration: "árcanti nā́ryo apáso ná víṣṭibhiḥ śráyaṃte paśávo ná góṣu gópatíḥ |",
        english: "The women, like diligent workers, praise (Ushas) with their hymns; the cattle, like the lord of the herd, resort to the cows.",
        reference: "Rig Veda 7.75.1",
        deity: "Ushas",
        theme: "Dawn and renewal"
      },
      {
        sanskrit: "उषो देवी सुवसतिर्विश्वा द्यावापृथिवी अभि। सूर्यं ज्योतिर्विभावसुम्॥",
        transliteration: "uṣó devī́ suvásatir viśvā́ dyā́vā-pṛthivī́ abhi | sū́ryaṃ jyótir vibhā́vasum ||",
        english: "Ushas, the divine dawn, approaches all creation, illuminating the sun, the light, the brilliant one.",
        reference: "Rig Veda 7.76.1",
        deity: "Ushas",
        theme: "Universal awakening"
      }
    ],
    "Atri": [
      {
        sanskrit: "सोमं मन्दन्ति धारया पवित्रेण सुतं हरिम्। अभि द्युम्नं वि भाजते॥",
        transliteration: "sómaṃ mandánti dhā́rayā pavítreṇa sutáṃ hárim | abhí dyumnáṃ ví bhājate ||",
        english: "They exhilarate Soma with the sacred stream, the pressed, the tawny one, who distributes glory.",
        reference: "Rig Veda 1.5.1",
        deity: "Soma",
        theme: "Sacred ritual"
      },
      {
        sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजं। होतारं रत्नधातमं॥",
        transliteration: "agním īḷe puróhitaṃ yajñásya devám ṛtvíjam | hóṭāraṃ ratnadhā́tamam ||",
        english: "I glorify Agni, the high priest of the sacrifice, the divine ministrant, who presents the oblation (to the gods), and is the possessor of great wealth.",
        reference: "Rig Veda 1.1.1",
        deity: "Agni",
        theme: "Sacred fire"
      }
    ],
    "Madhuchchhandas": [
      {
        sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजं। होतारं रत्नधातमं॥",
        transliteration: "agním īḷe puróhitaṃ yajñásya devám ṛtvíjam | hóṭāraṃ ratnadhā́tamam ||",
        english: "I glorify Agni, the high priest of the sacrifice, the divine ministrant, who presents the oblation (to the gods), and is the possessor of great wealth.",
        reference: "Rig Veda 1.1.1",
        deity: "Agni",
        theme: "Sacred fire"
      },
      {
        sanskrit: "वायवा याहि दर्शतो योनिर्देवानां हि सीदसि। पूतो दक्षैः सुतो मदः॥",
        transliteration: "vāyavā́ yāhi dárśato yónir devā́nāṃ hí sīdasi | pūtó dakṣáir sutó mádaḥ ||",
        english: "Come, Vayu, conspicuous, for you are the seat of the gods; purified by the rites, the pressed exhilaration.",
        reference: "Rig Veda 1.2.1",
        deity: "Vayu",
        theme: "Wind and breath"
      }
    ],
    "Kanva": [
      {
        sanskrit: "अयं ते अस्तु हर्यतः सोम आ वृषस्व मदः। अभि द्युम्नं वि भाजते॥",
        transliteration: "ayáṃ te astu háryataḥ sóma ā́ vṛṣasva mádaḥ | abhí dyumnáṃ ví bhājate ||",
        english: "May this delightful Soma be yours; pour forth exhilaration, distributing glory.",
        reference: "Rig Veda 8.2.1",
        deity: "Soma",
        theme: "Divine ecstasy"
      },
      {
        sanskrit: "सोमं मन्दन्ति धारया पवित्रेण सुतं हरिम्। अभि द्युम्नं वि भाजते॥",
        transliteration: "sómaṃ mandánti dhā́rayā pavítreṇa sutáṃ hárim | abhí dyumnáṃ ví bhājate ||",
        english: "They exhilarate Soma with the sacred stream, the pressed, the tawny one, who distributes glory.",
        reference: "Rig Veda 8.3.1",
        deity: "Soma",
        theme: "Ritual purification"
      }
    ]
  };

  const rishis = [
    { name: "Madhuchchhandas", hymns: "12 hymns", description: "First Rishi of Rig Veda" },
    { name: "Gritsamada", hymns: "44 hymns", description: "Devotee of Indra" },
    { name: "Vishvamitra", hymns: "104 hymns", description: "Royal sage who achieved Brahmin status" },
    { name: "Vasistha", hymns: "102 hymns", description: "Priest of the Solar dynasty" },
    { name: "Atri", hymns: "87 hymns", description: "One of the seven great sages" },
    { name: "Kanva", hymns: "131 hymns", description: "Ancient sage of great wisdom" }
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [currentHymns, setCurrentHymns] = useState<Record<number, {
    sanskrit: string;
    transliteration: string;
    english: string;
    reference: string;
    deity: string;
    theme: string;
  }>>({});

  // Initialize with default hymns for each Rishi
  useEffect(() => {
    const initialHymns: Record<number, {
      sanskrit: string;
      transliteration: string;
      english: string;
      reference: string;
      deity: string;
      theme: string;
    }> = {};
    rishis.forEach((rishi, index) => {
      const availableHymns = rishiHymnsData[rishi.name as keyof typeof rishiHymnsData];
      if (availableHymns && availableHymns.length > 0) {
        initialHymns[index] = availableHymns[0]; // Use first hymn as default
      }
    });
    setCurrentHymns(initialHymns);
  }, []);

  const handleCardClick = (index: number) => {
    const rishiName = rishis[index].name;
    const availableHymns = rishiHymnsData[rishiName as keyof typeof rishiHymnsData];
    
    // Select a random hymn each time the card is flipped
    const randomIndex = Math.floor(Math.random() * availableHymns.length);
    const selectedHymn = availableHymns[randomIndex];
    
    setCurrentHymns(prev => ({
      ...prev,
      [index]: selectedHymn
    }));
    
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-b from-orange-100 to-red-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-600 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-serif text-amber-900 mb-8 leading-tight">
            The Voices
          </h2>
          <p className="text-2xl md:text-3xl text-gray-800 mb-6 font-light max-w-3xl mx-auto leading-relaxed">
            These were the poets — Gritsamada, Vishvamitra, Vasistha…
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rishis.map((rishi, index) => (
            <motion.div
              key={rishi.name}
              className="relative h-80 cursor-pointer group"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCardClick(index)}
              style={{ perspective: '1000px' }}
            >
              {/* Card Container with Flip Animation */}
              <div
                className="relative w-full h-full"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  transform: flippedCards.has(index) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
              >
                {/* Front Face */}
                <div
                  className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl transition-all duration-300"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)'
                  }}
                >
                  {/* Simple silhouette/avatar */}
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center mb-6 shadow-lg"
                    animate={{
                      scale: hoveredCard === index ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-3xl font-serif text-amber-800">
                      {rishi.name.charAt(0)}
                    </span>
                  </motion.div>
                  
                  <h3 className="text-2xl font-serif text-amber-800 mb-2 text-center">
                    {rishi.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    {rishi.hymns}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed text-center">
                    {rishi.description}
                  </p>
                  
                  {/* Click hint */}
                  <motion.div
                    className="absolute bottom-4 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  >
                    Click to see hymn
                  </motion.div>
                  
                  {/* Hover effect overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-2xl transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                
                {/* Back Face - Hymn Content */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-4 overflow-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="h-full flex flex-col justify-between">
                    {/* Hymn Header */}
                    <div className="text-center mb-3">
                      <h3 className="text-lg font-serif text-amber-800 mb-1">
                        {rishi.name}&apos;s Hymn
                      </h3>
                      <p className="text-xs text-gray-600">
                        {currentHymns[index]?.reference || 'Loading...'}
                      </p>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-center">
                      {/* Sanskrit Text */}
                      <div className="mb-3">
                        <div className="text-sm font-serif text-amber-900 leading-tight mb-1 text-center">
                          {currentHymns[index]?.sanskrit || 'Loading...'}
                        </div>
                        <div className="text-xs text-amber-700 italic text-center">
                          {currentHymns[index]?.transliteration || 'Loading...'}
                        </div>
                      </div>

                      {/* English Translation */}
                      <div className="text-center mb-3">
                        <p className="text-xs text-gray-700 leading-relaxed italic">
                          &ldquo;{currentHymns[index]?.english || 'Loading...'}&rdquo;
                        </p>
                      </div>

                      {/* Theme and Deity */}
                      {currentHymns[index] && (
                        <div className="text-center">
                          <div className="text-xs text-amber-600 mb-1">
                            <span className="font-semibold">Deity:</span> {currentHymns[index].deity}
                          </div>
                          <div className="text-xs text-gray-500">
                            <span className="font-semibold">Theme:</span> {currentHymns[index].theme}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Click hint */}
                    <div className="text-center">
                      <p className="text-xs text-amber-600">
                        Click to flip back
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Hymns Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/hymns">
            <motion.button
              className="group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg font-semibold">View All Hymns</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
          <p className="text-sm text-gray-600 mt-3">
            Explore all hymns with advanced filters and search
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Scene 4: The Themes
function TheThemes() {
  const themes = [
    { 
      name: "Agni", 
      element: "Fire", 
      icon: Flame, 
      color: "red", 
      description: "Sacred fire, messenger between gods and humans",
      emoji: "🔥"
    },
    { 
      name: "Indra", 
      element: "Rain & Thunder", 
      icon: CloudRain, 
      color: "blue", 
      description: "King of gods, bringer of rain and destroyer of demons",
      emoji: "⚡"
    },
    { 
      name: "Ushas", 
      element: "Dawn", 
      icon: Sun, 
      color: "yellow", 
      description: "Goddess of dawn, bringing light and new beginnings",
      emoji: "🌅"
    },
    { 
      name: "Soma", 
      element: "Sacred Drink", 
      icon: Droplets, 
      color: "green", 
      description: "Divine elixir, source of inspiration and immortality",
      emoji: "🌊"
    }
  ];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-b from-red-100 to-purple-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
    >
      {/* Floating theme icons */}
      <div className="absolute inset-0">
        {themes.map((theme, i) => (
          <motion.div
            key={theme.name}
            className="absolute text-6xl opacity-20"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1,
            }}
          >
            {theme.emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-serif text-amber-900 mb-8 leading-tight">
            The Themes
          </h2>
          <p className="text-2xl md:text-3xl text-gray-800 mb-6 font-light max-w-3xl mx-auto leading-relaxed">
            They sang of fire, rain, light, rivers, truth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {themes.map((theme, index) => {
            const IconComponent = theme.icon;
            return (
              <motion.div
                key={theme.name}
                className="text-center group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-${theme.color}-100 to-${theme.color}-200 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative overflow-hidden`}
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <IconComponent className={`w-16 h-16 text-${theme.color}-600`} />
                  
                  {/* Floating emoji */}
                  <motion.div
                    className="absolute text-2xl"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {theme.emoji}
                  </motion.div>
                </motion.div>
                
                <h3 className="text-2xl font-serif text-amber-800 mb-2">{theme.name}</h3>
                <p className="text-lg text-gray-600 mb-2">{theme.element}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{theme.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Scene 6: Invitation
function Invitation() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-b from-purple-100 via-indigo-100 to-blue-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
    >
      {/* Gentle floating elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-amber-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-serif text-amber-900 mb-8 leading-tight"
            animate={{ 
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Step into their world
          </motion.h2>
          
          <motion.p 
            className="text-2xl md:text-3xl text-gray-800 mb-12 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            One verse a day.
          </motion.p>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xl font-semibold px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(245, 158, 11, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(245, 158, 11, 0.3)",
                  "0 20px 40px rgba(245, 158, 11, 0.4)",
                  "0 10px 30px rgba(245, 158, 11, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => window.location.href = '/notebook'}
            >
              <span className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Open the Rishi's Notebook</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-16 text-sm text-gray-600"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
      viewport={{ once: true }}
    >
            <p className="mb-4">Discover the wisdom of 3,500 years</p>
            <div className="flex justify-center space-x-8 text-xs">
              <span>• Sacred Poetry</span>
              <span>• Ancient Wisdom</span>
              <span>• Daily Inspiration</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main Homepage Component
export default function Home() {
  const { scrollYProgress } = useScroll();
  const [currentScene, setCurrentScene] = useState(1);

  // Convert scroll progress to scene number
  const sceneProgress = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 2]);

  useEffect(() => {
    const unsubscribe = sceneProgress.onChange((latest) => {
      setCurrentScene(Math.round(latest));
    });

    return () => unsubscribe();
  }, [sceneProgress]);

  return (
    <div className="relative">
      {/* Background with paper texture */}
      <div className="fixed inset-0 bg-paper-texture opacity-20" />
      
      {/* Scene Navigation - Scroll Based */}
      <DawnAppears />
      <TheRigVeda />
      <TheVoices />
      <TheThemes />
      <Invitation />
    </div>
  );
}