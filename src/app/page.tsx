'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, BookOpen, Flame, CloudRain, Droplets, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

// Scene 1: Dawn Appears
function DawnAppears() {
  // Dawn texts from the actual Rig Veda dataset
  const dawnTexts = React.useMemo(() => [
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
  ], []);

  // Randomly select a text on client after mount to avoid SSR/CSR mismatch
  const [selectedText] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const idx = Math.floor(Math.random() * dawnTexts.length);
      return dawnTexts[idx];
    }
    return "";
  });

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Dark gradient background with dawn colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      
      {/* Animated gradient overlays */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 60%)",
            "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.2), transparent 65%)",
            "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 60%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating dawn particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/40 rounded-full blur-sm"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i % 3) * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Sun icon that appears with Dawn text */}
          <motion.div
            className="flex items-center justify-center mb-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.div
              className="relative w-28 h-28 rounded-full flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(251, 191, 36, 0.3), 0 0 60px rgba(249, 115, 22, 0.2)",
                  "0 0 50px rgba(251, 191, 36, 0.5), 0 0 100px rgba(249, 115, 22, 0.3)",
                  "0 0 30px rgba(251, 191, 36, 0.3), 0 0 60px rgba(249, 115, 22, 0.2)"
                ],
                scale: [1, 1.08, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 to-white/40 rounded-full" />
              <Sun className="w-14 h-14 text-white relative z-10" />
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-2xl md:text-3xl text-slate-100 mb-6 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          >
            <span suppressHydrationWarning className="bg-gradient-to-r from-amber-200 via-orange-200 to-amber-100 bg-clip-text text-transparent">
              {selectedText || "\u00A0"}
            </span>
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
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
      
      {/* Circular mandala lines radiating */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-emerald-400/10 rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Central rotating element - custom book design */}
        <motion.div
          className="w-36 h-36 border-2 border-emerald-400/20 rounded-full flex items-center justify-center bg-emerald-500/5 backdrop-blur-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: 360 
          }}
          transition={{ 
            scale: { duration: 1, delay: 1.8, ease: [0.34, 1.56, 0.64, 1] },
            opacity: { duration: 1, delay: 1.8 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear", delay: 2.8 }
          }}
        >
          {/* Custom book design */}
          <div className="relative w-16 h-20">
            {/* Book cover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 to-teal-700/40 rounded-sm shadow-2xl">
              {/* Book spine */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-500/60 to-teal-700/60 rounded-l-sm"></div>
              {/* Book pages */}
              <div className="absolute left-1 top-1 right-1 bottom-1 bg-gradient-to-br from-slate-800/60 to-slate-700/60 rounded-sm">
                {/* Page lines */}
                <div className="absolute top-2 left-2 right-2 h-0.5 bg-emerald-400/20"></div>
                <div className="absolute top-4 left-2 right-2 h-0.5 bg-emerald-400/20"></div>
                <div className="absolute top-6 left-2 right-2 h-0.5 bg-emerald-400/20"></div>
                <div className="absolute top-8 left-2 right-2 h-0.5 bg-emerald-400/20"></div>
                <div className="absolute top-10 left-2 right-2 h-0.5 bg-emerald-400/20"></div>
                <div className="absolute top-12 left-2 right-2 h-0.5 bg-emerald-400/20"></div>
                <div className="absolute top-14 left-2 right-2 h-0.5 bg-emerald-400/20"></div>
                <div className="absolute top-16 left-2 right-2 h-0.5 bg-emerald-400/20"></div>
            </div>
              {/* Decorative elements */}
              <div className="absolute top-1 left-2 w-2 h-2 bg-emerald-400/40 rounded-full"></div>
              <div className="absolute bottom-1 right-2 w-1 h-1 bg-emerald-400/40 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight tracking-tight"
            animate={{ 
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
              The Rig Veda
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 mb-16 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          >
            10 Mandalas, 1,028 hymns, 10,000 verses — world&rsquo;s oldest Sanskrit poetry.
          </motion.p>
          
          {/* Stats with animation */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-lg mb-12">
            <motion.div 
              className="text-center group"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative text-5xl md:text-6xl font-bold text-emerald-300 mb-2">10</div>
              </div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Mandalas</div>
            </motion.div>
            <motion.div 
              className="text-center group"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative text-5xl md:text-6xl font-bold text-teal-300 mb-2">1,028</div>
              </div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Hymns</div>
            </motion.div>
            <motion.div 
              className="text-center group"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative text-5xl md:text-6xl font-bold text-cyan-300 mb-2">10,000+</div>
              </div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Verses</div>
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
    { name: "Madhuchchhandas", hymns: "10 hymns", description: "First Rishi of Rig Veda" },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950" />
      
      {/* Background pattern */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full blur-sm"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 29) % 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + (i % 5) * 0.5,
              repeat: Infinity,
              delay: (i % 6) * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-serif mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-purple-200 via-fuchsia-200 to-pink-200 bg-clip-text text-transparent">
              The Voices
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-6 font-light max-w-3xl mx-auto leading-relaxed">
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
                  className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 flex flex-col items-center justify-center hover:scale-105 transition-all duration-500 ease-out"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    boxShadow: hoveredCard === index ? '0 0 40px rgba(168, 85, 247, 0.2)' : '0 25px 50px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10 rounded-3xl" />
                  
                  {/* Simple silhouette/avatar */}
                  <motion.div
                    className="relative w-24 h-24 rounded-full flex items-center justify-center mb-6"
                    animate={{
                      scale: hoveredCard === index ? [1, 1.15, 1] : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-fuchsia-400 to-pink-400 rounded-full opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/30 to-white/50 rounded-full" />
                    <span className="relative text-4xl font-serif text-white z-10">
                      {rishi.name.charAt(0)}
                    </span>
                  </motion.div>
                  
                  <h3 className="relative text-xl font-serif text-white mb-2 text-center px-2 break-words">
                    {rishi.name}
                  </h3>
                  <p className="relative text-xs text-purple-200/80 mb-4 text-center px-2">
                    {rishi.hymns}
                  </p>
                  <p className="relative text-slate-300 text-xs leading-relaxed text-center max-w-xs px-4">
                    {rishi.description}
                  </p>
                  
                  {/* Click hint */}
                  <motion.div
                    className="absolute bottom-4 text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  >
                    Click to see hymn
                  </motion.div>
                  
                  {/* Hover effect overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-400/10 to-fuchsia-400/10 rounded-3xl transition-opacity duration-500 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                
                {/* Back Face - Hymn Content */}
                <div
                  className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-4 overflow-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    willChange: 'transform',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10 rounded-3xl" />
                  
                  <div className="relative h-full flex flex-col justify-between">
                    {/* Hymn Header */}
                    <div className="text-center mb-3">
                      <h3 className="text-lg font-serif text-white mb-1">
                        {rishi.name}&apos;s Hymn
                      </h3>
                      <p className="text-xs text-purple-200/80">
                        {currentHymns[index]?.reference || 'Loading...'}
                      </p>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-start overflow-hidden">
                      <div className="space-y-1.5 overflow-auto max-h-44 pr-1 scrollbar-thin">
                        {/* Sanskrit Text */}
                        <div className="text-xs font-serif text-purple-100 leading-snug text-center break-words overflow-wrap-anywhere">
                          {currentHymns[index]?.sanskrit || 'Loading...'}
                        </div>
                        {/* Transliteration */}
                        <div className="text-[10px] text-fuchsia-200/90 italic text-center break-words leading-snug overflow-wrap-anywhere">
                          {currentHymns[index]?.transliteration || 'Loading...'}
                        </div>
                        {/* English Translation */}
                        <div className="text-center">
                          <p className="text-[10px] text-slate-300 leading-snug italic break-words overflow-wrap-anywhere">
                            &ldquo;{currentHymns[index]?.english || 'Loading...'}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Theme and Deity */}
                      {currentHymns[index] && (
                        <div className="text-center mt-2 pt-2 border-t border-white/10">
                          <div className="text-[10px] text-purple-300/90 mb-0.5 truncate px-1">
                            <span className="font-semibold">Deity:</span> {currentHymns[index].deity}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate px-1">
                            <span className="font-semibold">Theme:</span> {currentHymns[index].theme}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Click hint */}
                    <div className="text-center pt-2 mt-auto">
                      <p className="text-[10px] text-purple-300/80">
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
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <Link href="/hymns">
            <motion.button
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-full flex items-center space-x-3 mx-auto overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <BookOpen className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
              <span className="relative z-10 text-lg font-semibold">View All Hymns</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
              <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </Link>
          <p className="text-sm text-slate-400 mt-4">
            Explore all 1,028 hymns with advanced filters and search
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
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950 to-slate-900" />
      
      {/* Floating theme icons */}
      <div className="absolute inset-0">
        {themes.map((theme, i) => (
          <motion.div
            key={theme.name}
            className="absolute text-6xl opacity-15 blur-sm"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10 + i * 2,
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
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-serif mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-red-200 via-orange-200 to-amber-200 bg-clip-text text-transparent">
              The Themes
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-6 font-light max-w-3xl mx-auto leading-relaxed">
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
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center relative overflow-hidden"
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
                  {/* Glowing background */}
                  <div className={`absolute inset-0 rounded-full ${
                    theme.color === 'red' ? 'bg-gradient-to-br from-red-500/30 to-orange-500/30' :
                    theme.color === 'blue' ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30' :
                    theme.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400/30 to-amber-400/30' :
                    'bg-gradient-to-br from-emerald-500/30 to-teal-500/30'
                  } group-hover:scale-110 transition-transform duration-500`} />
                  
                  <div className={`absolute inset-0 rounded-full blur-xl ${
                    theme.color === 'red' ? 'bg-red-500/20' :
                    theme.color === 'blue' ? 'bg-blue-500/20' :
                    theme.color === 'yellow' ? 'bg-yellow-400/20' :
                    'bg-emerald-500/20'
                  } group-hover:blur-2xl transition-all duration-500`} />
                  
                  <IconComponent className={`relative z-10 w-16 h-16 ${
                    theme.color === 'red' ? 'text-red-300' :
                    theme.color === 'blue' ? 'text-blue-300' :
                    theme.color === 'yellow' ? 'text-yellow-300' :
                    'text-emerald-300'
                  }`} />
                  
                  {/* Floating emoji */}
                  <motion.div
                    className="absolute text-2xl z-20"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {theme.emoji}
                  </motion.div>
                </motion.div>
                
                <h3 className="text-2xl font-serif text-white mb-2">{theme.name}</h3>
                <p className={`text-lg mb-2 ${
                  theme.color === 'red' ? 'text-red-200/80' :
                  theme.color === 'blue' ? 'text-blue-200/80' :
                  theme.color === 'yellow' ? 'text-yellow-200/80' :
                  'text-emerald-200/80'
                }`}>{theme.element}</p>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">{theme.description}</p>
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
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15),transparent_70%)]" />
      {/* Gentle floating elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-indigo-400/20 rounded-full blur-sm"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 7 + (i % 7) * 0.5,
              repeat: Infinity,
              delay: (i % 5) * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-serif mb-8 leading-tight tracking-tight"
            animate={{ 
              opacity: [0.85, 1, 0.85],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Step into their world
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 mb-16 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            One verse a day.
          </motion.p>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            viewport={{ once: true }}
          >
            <Link href="/notebook">
              <motion.button
                className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white text-xl font-semibold px-12 py-6 rounded-full overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 10px 40px rgba(99, 102, 241, 0.3)",
                    "0 20px 60px rgba(99, 102, 241, 0.5)",
                    "0 10px 40px rgba(99, 102, 241, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                  <span>Open the Rishi&rsquo;s Notebook</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>
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
  // Animated intro overlay state - only show once per session
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasSeenIntro');
    }
    return false;
  });

  useEffect(() => {
    // Auto-hide intro after 3.5s if it's showing
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('hasSeenIntro', 'true');
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // Function to skip intro
  const skipIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <div className="relative">
      {/* Intro Overlay - blocks scrolling when visible */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-center cursor-pointer"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            onClick={skipIntro}
            style={{ 
              pointerEvents: 'auto',
              overflow: 'hidden',
              position: 'fixed',
              touchAction: 'none'
            }}
          >
            <div className="relative">
              <motion.p
                className="text-3xl md:text-5xl font-serif text-white mx-auto px-6 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
                transition={{ duration: 2.8, times: [0, 0.15, 0.85, 1], ease: 'easeInOut' }}
                style={{ 
                  textShadow: '0 0 40px rgba(99, 102, 241, 0.5), 0 0 80px rgba(99, 102, 241, 0.3)'
                }}
              >
                <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-amber-100 bg-clip-text text-transparent">
                  Long before writing, the sages spoke their poems to the dawn.
                </span>
              </motion.p>
              
              {/* Skip hint */}
              <motion.p
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Click anywhere to skip
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Block body scroll when intro is showing */}
      {showIntro && (
        <style jsx global>{`
          body {
            overflow: hidden !important;
            position: fixed;
            width: 100%;
          }
        `}</style>
      )}
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