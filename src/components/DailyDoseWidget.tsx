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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
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
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Dawn gradient card */}
            <div className="relative bg-gradient-to-br from-yellow-100 via-rose-100 to-indigo-100 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Paper texture overlay */}
              <div className="absolute inset-0 bg-paper-texture opacity-30"></div>
              
              {/* Ink brush marks */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-amber-200/20 rounded-full blur-sm"></div>
              <div className="absolute bottom-6 left-6 w-6 h-6 bg-rose-200/20 rounded-full blur-sm"></div>
              <div className="absolute top-1/2 right-8 w-4 h-4 bg-indigo-200/20 rounded-full blur-sm"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Today's Light</h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Sanskrit text */}
                <div className="mb-6">
                  <div className="text-2xl font-serif text-gray-800 leading-relaxed mb-3">
                    {currentVerse.sanskrit}
                  </div>
                  <div className="text-sm text-gray-600 italic">
                    {currentVerse.transliteration}
                  </div>
                </div>

                {/* English translation */}
                <div className="mb-6">
                  <div className="text-lg text-gray-700 leading-relaxed mb-2">
                    "{currentVerse.english}"
                  </div>
                  <div className="text-sm text-gray-500">
                    — {currentVerse.reference} ({currentVerse.rishi} to {currentVerse.deity})
                  </div>
                </div>

                {/* Meaning */}
                <div className="mb-8 p-4 bg-white/30 rounded-lg border border-white/40">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🕊️</span>
                    <div className="text-sm text-gray-700 italic">
                      <strong>Meaning in one line:</strong> {currentVerse.meaning}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={handleNextVerse}
                    className="flex items-center space-x-2 text-amber-700 hover:text-amber-800 font-medium transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <span>Next Verse</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    onClick={copyAsMantra}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      copied 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-white/40 hover:bg-white/60 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-yellow-100 via-rose-100 to-indigo-100 rounded-full p-4 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        boxShadow: [
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        ]
      }}
      transition={{ 
        delay: 2, 
        duration: 0.5,
        boxShadow: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-paper-texture opacity-20 rounded-full"></div>
      
      {/* Icon */}
      <div className="relative z-10">
        <Sparkles className="w-6 h-6 text-amber-600 group-hover:text-amber-700 transition-colors duration-200" />
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-rose-200/30 to-indigo-200/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
