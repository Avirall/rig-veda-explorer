'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Home, 
  Bookmark, 
  BookmarkCheck,
  Award,
  Trophy,
  Star,
  Flame,
  Heart,
  Share2,
  Copy,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// Sample curated hymn data (extracted from dataset)
const hymnData = [
  {
    id: 1,
    mandala: 1,
    hymn: 1,
    rishi: "Madhuchchhandas",
    deity: "Agni",
    devanagari: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजं । होतारं रत्नधातमं ॥",
    transliteration: "agním īḷe puraḥ-hitam yajñásya devám ṛtvíjam | hotā́ram ratna-dhā́tamam ||",
    summary: "I glorify Agni, the high priest of the sacrifice, the divine ministrant who presents the oblation to the gods, and is the possessor of great wealth.",
    theme: "Fire & Ritual"
  },
  {
    id: 2,
    mandala: 1,
    hymn: 2,
    rishi: "Madhuchchhandas", 
    deity: "Agni",
    devanagari: "अग्निः पूर्वेभिर्ऋषिभिरीड्यो नूतनैरुत । स देवाँ एह वक्षति ॥",
    transliteration: "agníḥ pū́rvebhiḥ ṛ́ṣi-bhiḥ ī́ḍyaḥ nū́tanaiḥ utá | saḥ devā́n ā́ ihá vakṣati ||",
    summary: "Agni, who was praised by the ancient sages and is praised by the modern ones, brings the gods hither.",
    theme: "Fire & Praise"
  },
  {
    id: 3,
    mandala: 3,
    hymn: 1,
    rishi: "Vishvamitra",
    deity: "Indra",
    devanagari: "इन्द्रं वो विश्वतस्परि हवामहे जनेभ्यः । असद्यस्मिन्नुत प्रियाः ॥",
    transliteration: "índraṃ vo viśvátaḥ pári havā́mahe jánebhyaḥ | ásad yásminn utá priyā́ḥ ||",
    summary: "We call upon Indra from all sides for the people, in whom all dear things rest.",
    theme: "Divine Power"
  },
  {
    id: 4,
    mandala: 7,
    hymn: 75,
    rishi: "Vasistha",
    deity: "Ushas",
    devanagari: "उषा उच्छन्ती विभाती अग्रे गवां अनीकं । विश्वस्य केतुं भुवनस्य मध्ये ॥",
    transliteration: "uṣā́ ucchanتī́ vibhātī́ ágre gávām ánikam | víśvasya kétuṃ bhúvanasya mádhye ||",
    summary: "Dawn rises, shining forth at the head of cattle, the beacon of all creation in the midst of the world.",
    theme: "Dawn & Light"
  },
  {
    id: 5,
    mandala: 9,
    hymn: 1,
    rishi: "Atri",
    deity: "Soma",
    devanagari: "अभि त्या देवं देवयुः सुवाना इन्दवे सचा । पुनाना धारया कविम् ॥",
    transliteration: "abhí tyā́ dévam devayúḥ suvānā́ índave sácā | punānā́ dhā́rayā kavím ||",
    summary: "The devoted ones press the divine Soma, purifying the inspired one with streams for Indra.",
    theme: "Sacred Ritual"
  },
  {
    id: 6,
    mandala: 2,
    hymn: 1,
    rishi: "Gritsamada",
    deity: "Agni",
    devanagari: "त्वमग्ने यज्ञानां होता विश्वेषां हितः । देवेभिर्मानुषे जने ॥",
    transliteration: "tvám agne yajñā́nām hótā víśveṣām hitáḥ | devébhir mā́nuṣe jáne ||",
    summary: "You, O Agni, are the invoker of all sacrifices, established among gods and mortal men.",
    theme: "Sacred Fire"
  },
  {
    id: 7,
    mandala: 1,
    hymn: 154,
    rishi: "Dirghatamas",
    deity: "Vishnu",
    devanagari: "विष्णोः कर्माणि पश्यत यतो व्रतानि पस्पशे । इन्द्रस्य युज्यः सखा ॥",
    transliteration: "víṣṇoḥ kármāṇi paśyata yáto vrátāni paspaśe | índrasya yújyaḥ sákhā ||",
    summary: "Behold the works of Vishnu, who has established sacred laws, the worthy friend of Indra.",
    theme: "Divine Order"
  },
  {
    id: 8,
    mandala: 10,
    hymn: 129,
    rishi: "Prajapati",
    deity: "Creation",
    devanagari: "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।",
    transliteration: "nā́sad āsīn no sád āsīt tadānī́ṃ nā́sīd rájo no vyómā paró yát |",
    summary: "Then even nothingness was not, nor existence. There was no air nor the sky beyond.",
    theme: "Creation Hymn"
  }
];

// Achievement definitions
const achievements = [
  { id: 'first_page', title: 'First Step', description: 'Read your first verse', icon: Star, threshold: 1 },
  { id: 'explorer', title: 'Explorer', description: 'Read 3 verses', icon: Sparkles, threshold: 3 },
  { id: 'seeker', title: 'Truth Seeker', description: 'Read 5 verses', icon: Flame, threshold: 5 },
  { id: 'scholar', title: 'Vedic Scholar', description: 'Read all verses', icon: Trophy, threshold: 8 },
  { id: 'bookworm', title: 'Bookworm', description: 'Bookmark 3 verses', icon: BookmarkCheck, threshold: 3 },
];

// Floating particles for background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Achievement notification
function AchievementNotification({ achievement, onClose }: { achievement: typeof achievements[0], onClose: () => void }) {
  const Icon = achievement.icon;
  
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="fixed top-4 right-4 z-50 max-w-sm"
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-300/50 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-200" />
              <p className="text-xs font-bold text-yellow-100 uppercase tracking-wide">Achievement Unlocked!</p>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
            <p className="text-sm text-white/90">{achievement.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Individual page component
function NotebookPage({ 
  hymn, 
  isVisible, 
  isBookmarked, 
  onBookmark,
  onLike,
  isLiked,
  onShare
}: { 
  hymn: typeof hymnData[0]; 
  isVisible: boolean;
  isBookmarked: boolean;
  onBookmark: () => void;
  isLiked: boolean;
  onLike: () => void;
  onShare: () => void;
}) {
  return (
    <motion.div
      className="relative w-full h-full bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0.95, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10"></div>
      
      {/* Decorative glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Page content */}
      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
        {/* Header with metadata and actions */}
        <div className="flex items-start justify-between mb-8">
          {/* Side annotations */}
          <div className="flex flex-col space-y-2">
            <motion.div 
              className="px-3 py-1.5 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs font-semibold text-emerald-300">{hymn.rishi}</p>
            </motion.div>
            <motion.div 
              className="px-3 py-1.5 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs font-semibold text-purple-300">{hymn.deity}</p>
            </motion.div>
            <motion.div 
              className="px-3 py-1.5 bg-slate-500/20 backdrop-blur-sm rounded-full border border-slate-500/30"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs font-semibold text-slate-300">M.{hymn.mandala}</p>
            </motion.div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col space-y-2">
            <motion.button
              onClick={onBookmark}
              className={`group p-2.5 backdrop-blur-sm rounded-full border transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-amber-500/30 border-amber-400/50' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-amber-300" />
              ) : (
                <Bookmark className="w-4 h-4 text-white/70 group-hover:text-white" />
              )}
            </motion.button>
            
            <motion.button
              onClick={onLike}
              className={`group p-2.5 backdrop-blur-sm rounded-full border transition-all duration-300 ${
                isLiked 
                  ? 'bg-pink-500/30 border-pink-400/50' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-pink-300 fill-pink-300' : 'text-white/70 group-hover:text-white'}`} />
            </motion.button>

            <motion.button
              onClick={onShare}
              className="group p-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Share2 className="w-4 h-4 text-white/70 group-hover:text-white" />
            </motion.button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
          {/* Sanskrit text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="text-2xl md:text-3xl lg:text-4xl font-serif text-white leading-relaxed mb-6 text-center">
              {hymn.devanagari}
            </div>
          </motion.div>

          {/* Transliteration */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="text-base md:text-lg text-emerald-300/90 italic leading-relaxed text-center">
              {hymn.transliteration}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="text-sm md:text-base text-slate-300 leading-relaxed text-center max-w-2xl mx-auto">
              {hymn.summary}
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="flex items-center justify-between mt-8">
          {/* Theme badge */}
          <motion.div
            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xs font-medium text-white/80">{hymn.theme}</p>
          </motion.div>

          {/* Page reference */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-xs text-slate-400 font-mono">
                Rig Veda {hymn.mandala}.{hymn.hymn}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Notebook Component
export default function RishisNotebook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [readPages, setReadPages] = useState<Set<number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('readPages');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [bookmarkedPages, setBookmarkedPages] = useState<Set<number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookmarkedPages');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [likedPages, setLikedPages] = useState<Set<number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('likedPages');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('unlockedAchievements');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [showAchievement, setShowAchievement] = useState<typeof achievements[0] | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Mark page as read when viewed
  useEffect(() => {
    const newReadPages = new Set(readPages);
    newReadPages.add(currentPage);
    setReadPages(newReadPages);
    localStorage.setItem('readPages', JSON.stringify([...newReadPages]));

    // Check for achievements
    checkAchievements(newReadPages, bookmarkedPages);
  }, [currentPage]);

  const checkAchievements = (read: Set<number>, bookmarked: Set<number>) => {
    achievements.forEach(achievement => {
      if (!unlockedAchievements.has(achievement.id)) {
        let shouldUnlock = false;
        
        if (achievement.id === 'bookworm') {
          shouldUnlock = bookmarked.size >= achievement.threshold;
        } else {
          shouldUnlock = read.size >= achievement.threshold;
        }

        if (shouldUnlock) {
          const newUnlocked = new Set(unlockedAchievements);
          newUnlocked.add(achievement.id);
          setUnlockedAchievements(newUnlocked);
          localStorage.setItem('unlockedAchievements', JSON.stringify([...newUnlocked]));
          setShowAchievement(achievement);
        }
      }
    });
  };

  const nextPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % hymnData.length);
      setIsFlipping(false);
    }, 300);
  };

  const prevPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + hymnData.length) % hymnData.length);
      setIsFlipping(false);
    }, 300);
  };

  const toggleBookmark = () => {
    const newBookmarked = new Set(bookmarkedPages);
    if (newBookmarked.has(currentPage)) {
      newBookmarked.delete(currentPage);
    } else {
      newBookmarked.add(currentPage);
    }
    setBookmarkedPages(newBookmarked);
    localStorage.setItem('bookmarkedPages', JSON.stringify([...newBookmarked]));
    checkAchievements(readPages, newBookmarked);
  };

  const toggleLike = () => {
    const newLiked = new Set(likedPages);
    if (newLiked.has(currentPage)) {
      newLiked.delete(currentPage);
    } else {
      newLiked.add(currentPage);
    }
    setLikedPages(newLiked);
    localStorage.setItem('likedPages', JSON.stringify([...newLiked]));
  };

  const handleShare = () => {
    const hymn = hymnData[currentPage];
    const text = `${hymn.devanagari}\n\n${hymn.transliteration}\n\n"${hymn.summary}"\n\n— Rig Veda ${hymn.mandala}.${hymn.hymn} (${hymn.rishi} to ${hymn.deity})`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    }
  };

  const progressPercentage = (readPages.size / hymnData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <FloatingParticles />
      
      {/* Radial gradient overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Achievement notification */}
      <AnimatePresence>
        {showAchievement && (
          <AchievementNotification 
            achievement={showAchievement} 
            onClose={() => setShowAchievement(null)} 
          />
        )}
      </AnimatePresence>

      {/* Copied message */}
      <AnimatePresence>
        {copiedMessage && (
          <motion.div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            <div className="bg-emerald-500/90 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border border-emerald-300/50 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Verse copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header with progress */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-amber-400 mr-3" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              The Rishi&apos;s Notebook
            </h1>
            <Sparkles className="w-8 h-8 text-amber-400 ml-3" />
          </div>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Progress</span>
              <span>{readPages.size} / {hymnData.length} verses</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Stats button */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 transition-all duration-300"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-slate-300">
              {unlockedAchievements.size} / {achievements.length} Achievements
            </span>
          </button>
        </motion.div>

        {/* Stats panel */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              className="mb-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-amber-400 mr-2" />
                Your Journey
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-300">{readPages.size}</div>
                  <div className="text-xs text-slate-400 mt-1">Verses Read</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-amber-300">{bookmarkedPages.size}</div>
                  <div className="text-xs text-slate-400 mt-1">Bookmarked</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-pink-300">{likedPages.size}</div>
                  <div className="text-xs text-slate-400 mt-1">Favorites</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-purple-300">{unlockedAchievements.size}</div>
                  <div className="text-xs text-slate-400 mt-1">Achievements</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Achievements</h4>
                {achievements.map(achievement => {
                  const Icon = achievement.icon;
                  const isUnlocked = unlockedAchievements.has(achievement.id);
                  return (
                    <div 
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                        isUnlocked 
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30' 
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isUnlocked ? 'bg-amber-500/30' : 'bg-white/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${isUnlocked ? 'text-amber-300' : 'text-slate-500'}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-slate-500">{achievement.description}</p>
                      </div>
                      {isUnlocked && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notebook container */}
        <motion.div 
          className="relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Page container with perspective */}
          <div className="relative min-h-[600px] md:min-h-[700px]" style={{ perspective: '2000px' }}>
            <AnimatePresence mode="wait">
              <NotebookPage 
                key={currentPage} 
                hymn={hymnData[currentPage]} 
                isVisible={true}
                isBookmarked={bookmarkedPages.has(currentPage)}
                onBookmark={toggleBookmark}
                isLiked={likedPages.has(currentPage)}
                onLike={toggleLike}
                onShare={handleShare}
              />
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <motion.button
              onClick={prevPage}
              disabled={isFlipping}
              className="group relative p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full shadow-xl border border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-emerald-300 group-hover:text-emerald-200 transition-colors" />
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
            
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
              <p className="text-sm font-medium text-white">
                Page <span className="text-emerald-300 font-bold">{currentPage + 1}</span> of <span className="text-slate-400">{hymnData.length}</span>
              </p>
            </div>
            
            <motion.button
              onClick={nextPage}
              disabled={isFlipping}
              className="group relative p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full shadow-xl border border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-emerald-300 group-hover:text-emerald-200 transition-colors" />
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
          </div>
        </motion.div>

        {/* Footer with navigation */}
        <motion.div
          className="text-center mt-12 space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm text-slate-400 mb-4">
            Bookmark your favorites • Track your progress • Unlock achievements
          </p>

          {/* Back to home */}
          <Link href="/">
            <motion.button
              className="group inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-4 h-4 text-slate-400 group-hover:text-emerald-300 transition-colors" />
              <span className="text-sm font-medium text-slate-400 group-hover:text-emerald-300 transition-colors">
                Return to Scroll Story
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
