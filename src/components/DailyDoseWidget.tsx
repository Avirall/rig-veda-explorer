'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Copy, X, ChevronRight, Sparkles } from 'lucide-react';

// Daily verse data (curated from dataset)
const dailyVerses = [
  {
    sanskrit: "उदेति सूर्यो अग्निरग्निरुदेति सूर्यः",
    transliteration: "udeti sūryo agnir agnir udeti sūryaḥ",
    english: "Arise, O Dawn, revealing pathways of truth.",
    reference: "Rig Veda 7.75",
    rishi: "Vasistha",
    deity: "Ushas",
    meaning: "Hope renews itself every morning."
  },
  {
    sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजं",
    transliteration: "agním īḷe puraḥ-hitam yajñásya devám ṛtvíjam",
    english: "I glorify Agni, the high priest of the sacrifice.",
    reference: "Rig Veda 1.1",
    rishi: "Gritsamada",
    deity: "Agni",
    meaning: "Sacred fire connects heaven and earth."
  },
  {
    sanskrit: "इन्द्रं वर्धन्तो अप्तुरः कृण्वन्तो विश्वमानुषं",
    transliteration: "indraṃ vardhánto aptúraḥ kṛṇvánto viśva-mā́nuṣam",
    english: "Praising Indra, the destroyer of obstacles.",
    reference: "Rig Veda 1.3",
    rishi: "Vishvamitra",
    deity: "Indra",
    meaning: "Strength comes from overcoming challenges."
  },
  {
    sanskrit: "उषो देवी सुवसतिर्विश्वा द्यावापृथिवी अभि",
    transliteration: "uṣó devī́ suvásatir viśvā́ dyā́vā-pṛthivī́ abhi",
    english: "Ushas, the divine dawn, approaches all creation.",
    reference: "Rig Veda 1.4",
    rishi: "Vasistha",
    deity: "Ushas",
    meaning: "Dawn brings renewal to all beings."
  },
  {
    sanskrit: "सोमं मन्दन्ति धारया पवित्रेण सुतं हरिम्",
    transliteration: "sómaṃ mandánti dhā́rayā pavítreṇa sutáṃ hárim",
    english: "They exhilarate Soma with the sacred stream.",
    reference: "Rig Veda 1.5",
    rishi: "Atri",
    deity: "Soma",
    meaning: "Divine inspiration flows through sacred rituals."
  }
];

// Daily Dose Modal Component
function DailyDoseModal({ isVisible, onClose, onNext }: { 
  isVisible: boolean; 
  onClose: () => void; 
  onNext: () => void;
}) {
  const [currentVerse, setCurrentVerse] = useState(dailyVerses[0]);
  const [copied, setCopied] = useState(false);

  // Randomize verse on each open
  useEffect(() => {
    if (isVisible) {
      const randomIndex = Math.floor(Math.random() * dailyVerses.length);
      setCurrentVerse(dailyVerses[randomIndex]);
    }
  }, [isVisible]);

  // Randomize verse when Next is clicked
  const handleNextVerse = () => {
    const randomIndex = Math.floor(Math.random() * dailyVerses.length);
    setCurrentVerse(dailyVerses[randomIndex]);
    onNext();
  };

  const copyAsMantra = async () => {
    const mantraText = `"${currentVerse.english}"\n— ${currentVerse.reference} (${currentVerse.rishi} to ${currentVerse.deity})\n\n🕊️ ${currentVerse.meaning}`;
    
    try {
      await navigator.clipboard.writeText(mantraText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full mx-4"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Modern glassmorphic card */}
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_30px_80px_rgba(8,47,73,0.45)]">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10"></div>
              
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-400/10 rounded-full blur-sm"></div>
              <div className="absolute bottom-6 left-6 w-6 h-6 bg-cyan-400/10 rounded-full blur-sm"></div>
              <div className="absolute top-1/2 right-8 w-4 h-4 bg-teal-400/10 rounded-full blur-sm"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Today's Light</h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-slate-300" />
                  </button>
                </div>

                {/* Sanskrit text */}
                <div className="mb-6">
                  <div className="text-2xl font-serif text-emerald-200 leading-relaxed mb-3">
                    {currentVerse.sanskrit}
                  </div>
                  <div className="text-sm text-teal-200/80 italic">
                    {currentVerse.transliteration}
                  </div>
                </div>

                {/* English translation */}
                <div className="mb-6">
                  <div className="text-lg text-slate-100 leading-relaxed mb-2">
                    "{currentVerse.english}"
                  </div>
                  <div className="text-sm text-slate-400">
                    — {currentVerse.reference} ({currentVerse.rishi} to {currentVerse.deity})
                  </div>
                </div>

                {/* Meaning */}
                <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🕊️</span>
                    <div className="text-sm text-slate-200 italic">
                      <strong className="text-emerald-300">Meaning in one line:</strong> {currentVerse.meaning}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={handleNextVerse}
                    className="flex items-center space-x-2 text-emerald-300 hover:text-emerald-200 font-medium transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span>Next Verse</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    onClick={copyAsMantra}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      copied 
                        ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' 
                        : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {copied ? 'Copied!' : 'Copy as Mantra'}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Floating Widget Button Component
function FloatingWidgetButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-white/10 backdrop-blur-xl rounded-full p-4 border border-white/20 hover:border-emerald-400/60 transition-all duration-500 group overflow-hidden"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        boxShadow: [
          "0 20px 40px rgba(16, 185, 129, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          "0 25px 60px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.3)",
          "0 20px 40px rgba(16, 185, 129, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)"
        ]
      }}
      transition={{ 
        delay: 2, 
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        boxShadow: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-full"></div>
      
      {/* Icon */}
      <div className="relative z-10">
        <Sparkles className="w-6 h-6 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-cyan-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.button>
  );
}

// Main component that can be used anywhere
export default function DailyDoseWidget() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleNext = () => {
    // This will be handled by the modal's handleNextVerse function
  };

  return (
    <>
      {/* Floating Widget Button */}
      <FloatingWidgetButton onClick={handleOpen} />
      
      {/* Modal */}
      <DailyDoseModal
        isVisible={showModal}
        onClose={handleClose}
        onNext={handleNext}
      />
    </>
  );
}
