'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { 
  Sun, 
  BookOpen, 
  Flame, 
  Droplets, 
  ArrowRight,
  Trophy,
  Zap,
  TrendingUp,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

// Gamification Hook - manages all user progress
function useGamification() {
  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vedaExplorerStats');
      if (saved) {
        const currentStats = JSON.parse(saved);
        const today = new Date().toDateString();
        const lastVisit = currentStats.lastVisitDate;
        
        // Update stats on initialization
        const newStats = { ...currentStats, totalVisits: currentStats.totalVisits + 1 };
        
        if (lastVisit !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toDateString();
          
          if (lastVisit === yesterdayStr) {
            // Continue streak
            newStats.currentStreak = currentStats.currentStreak + 1;
            newStats.longestStreak = Math.max(newStats.currentStreak, currentStats.longestStreak);
          } else if (lastVisit === null || currentStats.currentStreak === 0) {
            // First visit or starting new streak
            newStats.currentStreak = 1;
            newStats.longestStreak = Math.max(1, currentStats.longestStreak);
          } else {
            // Streak broken
            newStats.currentStreak = 1;
          }
          
          newStats.lastVisitDate = today;
          localStorage.setItem('vedaExplorerStats', JSON.stringify(newStats));
          return newStats;
        }
        
        localStorage.setItem('vedaExplorerStats', JSON.stringify(newStats));
        return newStats;
      }
    }
    return {
      totalVisits: 0,
      versesRead: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastVisitDate: null,
      achievements: [],
      bookmarkedVerses: [],
      favoriteRishis: [],
      completedSections: []
    };
  });

  const updateStats = (updates: Partial<typeof stats>) => {
    const newStats = { ...stats, ...updates };
    localStorage.setItem('vedaExplorerStats', JSON.stringify(newStats));
    setStats(newStats);
  };

  return { stats, updateStats };
}

// Stats Dashboard Component
function StatsDashboard({ stats }: { stats: ReturnType<typeof useGamification>['stats'] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Intentional: Client-only rendering to prevent hydration mismatch
  // Stats are calculated from localStorage which differs on server/client
  // eslint-disable-next-line
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <motion.div 
      className="fixed top-4 right-4 z-40"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        {/* Compact Stats Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-white font-bold text-lg">{stats.currentStreak}</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-white font-bold text-lg">{stats.achievements.length}</span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-4 h-4 text-white/60 rotate-90" />
            </motion.div>
          </div>
        </motion.button>

        {/* Expanded Stats Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute top-full right-0 mt-4 w-80 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
                Your Journey
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center space-x-2 mb-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-slate-400">Current Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.currentStreak}</div>
                  <div className="text-[10px] text-slate-500">days</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-400">Longest Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.longestStreak}</div>
                  <div className="text-[10px] text-slate-500">days</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center space-x-2 mb-1">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-slate-400">Verses Read</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.versesRead}</div>
                  <div className="text-[10px] text-slate-500">total</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center space-x-2 mb-1">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-slate-400">Achievements</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.achievements.length}</div>
                  <div className="text-[10px] text-slate-500">unlocked</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <Link href="/notebook">
                  <motion.button
                    className="w-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/30 text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-semibold">Continue Learning</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Scene 1: Dawn Appears - Now with progress integration
function DawnAppears({ onSectionComplete }: { onSectionComplete: () => void }) {
  const dawnTexts = useMemo(() => [
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

  const [selectedText] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const idx = Math.floor(Math.random() * dawnTexts.length);
      return dawnTexts[idx];
    }
    return "";
  });

  useEffect(() => {
    onSectionComplete();
  }, [onSectionComplete]);

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
          {/* Sun icon */}
          <motion.div
            className="flex items-center justify-center mb-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.div
              className="relative w-28 h-28 rounded-full flex items-center justify-center"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Multiple glow layers */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 opacity-90 blur-2xl animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-300 via-orange-300 to-yellow-400 opacity-80 blur-xl" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-200 to-orange-300" />
              <Sun className="relative z-10 w-12 h-12 text-white drop-shadow-2xl" />
            </motion.div>
          </motion.div>

          <motion.p
            className="text-2xl md:text-3xl mb-6 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          >
            <span 
              className="bg-gradient-to-r from-amber-200 via-orange-200 to-amber-100 bg-clip-text text-transparent"
              suppressHydrationWarning
            >
              {selectedText}
            </span>
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-slate-400 text-sm flex flex-col items-center space-y-2"
            >
              <span>Begin your journey</span>
              <ArrowRight className="w-5 h-5 rotate-90" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Scene 2: The Rig Veda - Now with interactive stats
function TheRigVeda({ stats }: { stats: ReturnType<typeof useGamification>['stats'] }) {
  const [isMounted, setIsMounted] = useState(false);

  // Intentional: Client-only rendering to prevent hydration mismatch
  // eslint-disable-next-line
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const progressPercentage = Math.min((stats.versesRead / 1028) * 100, 100);

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Dark background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900" />
      
      {/* Animated circular mandala lines */}
      <motion.div className="absolute inset-0 flex items-center justify-center opacity-20">
        {[...Array(8)].map((_, i) => (
        <motion.div
            key={i}
            className="absolute rounded-full border border-emerald-400/30"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-serif mb-8 leading-tight tracking-tight"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
              The Rig Veda
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-12 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            10 Mandalas, 1,028 hymns, 10,000 verses — world&apos;s oldest Sanskrit poetry.
          </motion.p>

          {/* Interactive Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20"
              whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
                10
            </div>
              <div className="text-sm text-slate-400 mb-2">Mandalas</div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
            </div>
            </motion.div>

            <motion.div 
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20"
              whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                1,028
            </div>
              <div className="text-sm text-slate-400 mb-2">
                <span suppressHydrationWarning>
                  Hymns • {isMounted ? stats.versesRead : 0} explored
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-400 to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: isMounted ? `${progressPercentage}%` : '0%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
          </div>
        </motion.div>

            <motion.div 
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20"
              whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent mb-2">
                10,000
      </div>
              <div className="text-sm text-slate-400 mb-2">Verses of wisdom</div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Achievement teaser */}
          {isMounted && stats.currentStreak >= 3 && (
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-6 py-3 mb-8"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
            >
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-white font-semibold" suppressHydrationWarning>
                {stats.currentStreak} day streak! Keep going!
              </span>
              <Trophy className="w-5 h-5 text-amber-400" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Scene 3: The Voices - KEEPING EXISTING CARD FLIP FUNCTIONALITY
function TheVoices() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [playingCard, setPlayingCard] = useState<number | null>(null);
  const [currentHymns, setCurrentHymns] = useState<Record<number, {
    sanskrit: string;
    transliteration: string;
    english: string;
    reference: string;
    deity: string;
    theme: string;
  }>>({});

  const rishis = [
    { 
      name: "Madhuchchhandas", 
      hymns: "10 hymns",
      description: "First poet of the Rig Veda, invoker of Agni",
      family: "Viśvāmitra lineage"
    },
    { 
      name: "Gritsamada", 
      hymns: "40 hymns",
      description: "Author of Mandala 2, hymns to Agni and Indra",
      family: "Bhṛgu dynasty"
    },
    { 
      name: "Vishvamitra", 
      hymns: "46 hymns",
      description: "Seer-king, author of Mandala 3, creator of Gayatri",
      family: "Kuśika clan"
    },
    { 
      name: "Vamadeva", 
      hymns: "52 hymns",
      description: "Sage of Mandala 4, hymns to various deities",
      family: "Gautama family"
    },
    { 
      name: "Atri", 
      hymns: "87 hymns",
      description: "Ancient seer, author of Mandala 5",
      family: "Atri lineage"
    },
    { 
      name: "Vasistha", 
      hymns: "100 hymns",
      description: "Great sage, rival of Viśvāmitra, Mandala 7",
      family: "Vasiṣṭha clan"
    },
  ];

  const rishiHymnsData: Record<string, Array<{
    sanskrit: string;
    transliteration: string;
    english: string;
    reference: string;
    deity: string;
    theme: string;
  }>> = {
    "Madhuchchhandas": [
      {
        sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् । होतारं रत्नधातमम् ॥",
        transliteration: "agním īḷe puraḥ-hitam yajñásya devám ṛtvíjam | hotā́ram ratna-dhā́tamam ||",
        english: "I glorify Agni, the high priest of the sacrifice, the divine ministrant, the invoker who bestows treasure.",
        reference: "RV 1.1.1",
        deity: "Agni",
        theme: "Fire & Sacrifice"
      },
      {
        sanskrit: "अग्निः पूर्वेभिर्ऋषिभिरीड्यो नूतनैरुत । स देवाँ एह वक्षति ॥",
        transliteration: "agníḥ pū́rvebhiḥ ṛ́ṣi-bhiḥ ī́ḍyaḥ nū́tanaiḥ utá | saḥ devā́n ā́ ihá vakṣati ||",
        english: "Agni, worthy of praise by ancient and modern seers, shall bring the gods here.",
        reference: "RV 1.1.2",
        deity: "Agni",
        theme: "Invocation"
      }
    ],
    "Gritsamada": [
      {
        sanskrit: "त्वमग्ने द्युभिस्त्वमाशुशुक्षणिस्त्वमध्वरादधि । प्र बभूविथ ॥",
        transliteration: "tvám agne dyúbhiḥ tvám āśuśukṣáṇiḥ tvám adhvarā́d ádhi | prá babhū́vitha ||",
        english: "You, Agni, day by day, you the swift purifier, from sacrifice you have come forth.",
        reference: "RV 2.1.1",
        deity: "Agni",
        theme: "Daily Ritual"
      },
      {
        sanskrit: "स नः पार्षदति द्विषो विश्वा अग्निरमीवाः । प्रथद्विचर्षणिः ॥",
        transliteration: "sá naḥ pā́rṣad áti dvíṣo víśvā agnír amīvā́ḥ | práthad-vicarṣáṇiḥ ||",
        english: "May Agni guide us past all hatred and all distress, the widely active one.",
        reference: "RV 2.1.5",
        deity: "Agni",
        theme: "Protection"
      }
    ],
    "Vishvamitra": [
      {
        sanskrit: "आ त्वा रथं यतस्थिरं हिरण्ययमिषं हुवे । इन्द्रमुपब्रवाणि ॥",
        transliteration: "ā́ tvā rátham yatasthíraṃ híraṇyayam iṣáṃ huvé | índram upabravāṇi ||",
        english: "I call you to the well-yoked chariot, the golden, the impetuous, I address Indra.",
        reference: "RV 3.30.1",
        deity: "Indra",
        theme: "Power & Victory"
      },
      {
        sanskrit: "तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥",
        transliteration: "tát savitúr váreṇyaṃ bhárgó devásya dhīmahi | dhíyo yó naḥ pracodáyāt ||",
        english: "We meditate on that excellent glory of the divine Savitṛ; may he stimulate our thoughts.",
        reference: "RV 3.62.10 (Gayatri Mantra)",
        deity: "Savitar",
        theme: "Enlightenment"
      }
    ],
    "Vamadeva": [
      {
        sanskrit: "अह मनुरभवं सूर्यश्च अहं कक्षीवाँ ऋषिरस्म्यस्मि । अहं कुत्समार्जुनेयं न्यृञ्जे अहं कविरुशना पश्यता मा ॥",
        transliteration: "áha manúr abhavaṃ sū́ryaś ca ahám kakṣīvā́n ṛ́ṣir asmy asmí | ahám kutsam ārjuneyáṃ ny ṛñjé ahám kavír uśánā paśyatā́ mā ||",
        english: "I was Manu, I was the Sun; I am the wise sage Kakṣīvān; I propelled Kutsa, son of Arjuna; behold me! I am the inspired poet Uśanas.",
        reference: "RV 4.26.1",
        deity: "Indra",
        theme: "Mystical Union"
      },
      {
        sanskrit: "अह देवानामभवं पुरोहितः कीरे चित्सन्नाम यादयं । अह राजा सुयुधो जजान अह स्वर्णं भिक्षते दाशुषे नर ॥",
        transliteration: "áha devā́nām abhavaṃ puróhitaḥ kīré cit sánn āma yād ayáṃ | áha rā́jā suyúdho jajāna áha svarṇáṃ bhikṣate dā́śuṣe nára ||",
        english: "I became the priest of the gods, though still a child; I the good fighter was born a king; I, a man, bestow gold upon the worshipper.",
        reference: "RV 4.42.2",
        deity: "Indra",
        theme: "Divine Identity"
      }
    ],
    "Atri": [
      {
        sanskrit: "होता यज्ञं कृण्वन्नासाद्यतीनाम् । विद्वाँ अत्यो न तन्वा शंसमीयते ॥",
        transliteration: "hótā yajñáṃ kṛṇvánn āsādyátīnām | vidvā́ñ atyó ná tanvā́ śaṃsám īyate ||",
        english: "The invoker, performing sacrifice for those who sit, like a skilled racer with his body, goes toward praise.",
        reference: "RV 5.1.1",
        deity: "Agni",
        theme: "Sacred Duty"
      },
      {
        sanskrit: "पवस्व सोम धारया रवेण मदिन्तमः । पुनानो यासि खा दिवः ॥",
        transliteration: "pávasva soma dhā́rayā ráveṇa madíntamaḥ | punānó yāsi khā́ diváḥ ||",
        english: "Flow, O Soma, with your stream, with roaring, most exhilarating; purifying, you go to the filter of heaven.",
        reference: "RV 9.12.4",
        deity: "Soma",
        theme: "Purification"
      }
    ],
    "Vasistha": [
      {
        sanskrit: "त्वमग्ने रुद्रो असुरो महो दिवस्त्वं शर्धो मारुतं पृक्ष ईशिषे । त्वं वातैरीरयस्येजो अर्णवं त्वं पूषा विधता जायसे दिवे ॥",
        transliteration: "tvám agne rudró ásuro mahó divástvāṃ śárdhó mārutam pṛkṣá ī́śiṣe | tváṃ vātáir īrayasy éjo árṇavaṃ tváṃ pūṣā́ vidhatā́ jā́yase dívé ||",
        english: "You, Agni, are Rudra, the mighty asura of heaven; you command the troop of Maruts; with winds you set the ocean in motion; you are Pūṣan, the arranger, born for the sky.",
        reference: "RV 7.46.2",
        deity: "Agni-Rudra",
        theme: "Cosmic Power"
      },
      {
        sanskrit: "प्र बोधय जारगूर्तमुषो नाद्यद्य यस्य ते । द्युमद्यशो वसु क्षयम् ॥",
        transliteration: "prá bodhaya jāragūr tam uṣó nādyád yá yásya te | dyúmad-yaśó vásu kṣayám ||",
        english: "Awaken, O Dawn, the singer, that one who is yours, to that brilliant, glorious abode of treasure.",
        reference: "RV 7.75.3",
        deity: "Ushas",
        theme: "Dawn & Awakening"
      }
    ]
  };

  // Initialize current hymns on mount
  const initialHymnsRef = useMemo(() => {
    const initialHymns: typeof currentHymns = {};
    rishis.forEach((rishi, index) => {
      const hymns = rishiHymnsData[rishi.name];
      if (hymns && hymns.length > 0) {
        initialHymns[index] = hymns[0];
      }
    });
    return initialHymns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentHymns(initialHymnsRef);
  }, [initialHymnsRef]);

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
        // Select a random hymn for this rishi
        const rishi = rishis[index];
        const hymns = rishiHymnsData[rishi.name];
        if (hymns && hymns.length > 0) {
          const randomIndex = Math.floor(Math.random() * hymns.length);
          setCurrentHymns(prev => ({
            ...prev,
            [index]: hymns[randomIndex]
          }));
        }
      }
      return newSet;
    });
  };

  const handlePlayHymn = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card flip when clicking play button
    
    const hymn = currentHymns[index];
    if (!hymn) return;

    // Stop any currently playing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // If already playing this card, stop
    if (playingCard === index) {
      setPlayingCard(null);
      return;
    }

    // Speak the hymn
    const textToSpeak = `${hymn.transliteration}. ${hymn.english}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure speech
    utterance.rate = 0.8; // Slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Set language to English for better pronunciation
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      setPlayingCard(index);
    };

    utterance.onend = () => {
      setPlayingCard(null);
    };

    utterance.onerror = () => {
      setPlayingCard(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Dark background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-950 to-fuchsia-950" />
      
      {/* Floating mystical particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full blur-sm"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: (i % 4) * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
                    {/* Hymn Header with Play Button */}
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <h3 className="text-lg font-serif text-white">
                          {rishi.name}&apos;s Hymn
                        </h3>
                        {currentHymns[index] && (
                          <motion.button
                            onClick={(e) => handlePlayHymn(index, e)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                              playingCard === index
                                ? 'bg-emerald-500/30 border border-emerald-500/50'
                                : 'bg-white/10 border border-white/20 hover:bg-white/20'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {playingCard === index ? (
                              <VolumeX className="w-4 h-4 text-emerald-300" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-white/70" />
                            )}
                          </motion.button>
                        )}
                      </div>
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

// Scene 4: The Themes - Enhanced with interactive elements
function TheThemes() {
  // Component implementation
  const themes = [
    { 
      name: "Agni", 
      element: "Fire", 
      icon: Flame, 
      color: "red", 
      description: "Sacred fire, messenger between gods and humans",
      emoji: "🔥",
      count: 200
    },
    { 
      name: "Indra", 
      element: "Thunder", 
      icon: Zap, 
      color: "blue", 
      description: "King of gods, wielder of the thunderbolt",
      emoji: "⚡",
      count: 250
    },
    { 
      name: "Ushas", 
      element: "Dawn", 
      icon: Sun, 
      color: "yellow", 
      description: "Goddess of dawn, bringer of light and hope",
      emoji: "🌅",
      count: 20
    },
    { 
      name: "Soma", 
      element: "Nectar", 
      icon: Droplets, 
      color: "emerald", 
      description: "Divine elixir, essence of immortality",
      emoji: "🌊",
      count: 120
    },
  ];

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Dark background with red gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-slate-950 to-orange-950" />
      
      {/* Floating theme emojis */}
      <div className="absolute inset-0">
        {themes.map((theme, i) => (
        <motion.div
            key={theme.name}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${(i * 25) % 80 + 10}%`,
              top: `${(i * 30) % 70 + 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + (i % 3),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {theme.emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl text-slate-300 mb-16 font-light max-w-3xl mx-auto leading-relaxed">
            They sang of fire, rain, light, rivers, truth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {themes.map((theme, index) => {
            const Icon = theme.icon;
            const colorClasses = {
              red: { glow: 'from-red-500/20', border: 'border-red-500/30', text: 'text-red-300', icon: 'text-red-400' },
              blue: { glow: 'from-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-300', icon: 'text-blue-400' },
              yellow: { glow: 'from-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-300', icon: 'text-yellow-400' },
              emerald: { glow: 'from-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-300', icon: 'text-emerald-400' },
            }[theme.color] || { glow: 'from-white/20', border: 'border-white/30', text: 'text-white', icon: 'text-white' };

            return (
              <motion.div
                key={theme.name}
                className={`relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border ${colorClasses.border} overflow-hidden group`}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 0 40px ${theme.color === 'red' ? 'rgba(239, 68, 68, 0.3)' : 
                                         theme.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                                         theme.color === 'yellow' ? 'rgba(234, 179, 8, 0.3)' :
                                         'rgba(16, 185, 129, 0.3)'}`
                }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.glow} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  className="relative mb-6"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${colorClasses.glow} backdrop-blur-sm border ${colorClasses.border} flex items-center justify-center`}>
                    <Icon className={`w-10 h-10 ${colorClasses.icon}`} />
                  </div>
                </motion.div>
                
                {/* Content */}
                <h3 className={`text-2xl font-serif ${colorClasses.text} mb-2 relative`}>
                  {theme.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4 uppercase tracking-wider relative">
                  {theme.element}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 relative">
                  {theme.description}
                </p>
                
                {/* Hymn count */}
                <div className="relative flex items-center justify-center space-x-2 text-xs text-slate-500">
                  <BookOpen className="w-3 h-3" />
                  <span>~{theme.count} hymns</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
}

// Scene 5: Invitation - Call to action with gamification tease
function Invitation() {
  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Dark background with purple gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950" />
      
      {/* Animated stars/sparkles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
        <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
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
                  <span>Open the Rishi&apos;s Notebook</span>
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
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main Homepage Component
export default function Home() {
  const { stats, updateStats } = useGamification();
  
  // Prevent unused variable warning
  const hasUpdateStats = !!updateStats;
  
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

  const handleSectionComplete = () => {
    // Mark section as complete
    if (hasUpdateStats && !stats.completedSections.includes('dawn')) {
      updateStats({
        completedSections: [...stats.completedSections, 'dawn']
      });
    }
  };

  return (
    <div className="relative">
      {/* Stats Dashboard - Fixed at top right */}
      <StatsDashboard stats={stats} />

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
      <DawnAppears onSectionComplete={handleSectionComplete} />
      <TheRigVeda stats={stats} />
      <TheVoices />
      <TheThemes />
      <Invitation />
    </div>
  );
}
