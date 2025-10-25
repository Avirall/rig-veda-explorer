'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

// Sample curated hymn data (extracted from dataset)
const hymnData = [
  {
    mandala: 1,
    hymn: 1,
    rishi: "Gritsamada",
    deity: "Agni",
    devanagari: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजं ।होतारं रत्नधातमं ॥",
    transliteration: "agním īḷe puraḥ-hitam yajñásya devám ṛtvíjam | hotā́ram ratna-dhā́tamam ||",
    summary: "I glorify Agni, the high priest of the sacrifice, the divine, the ministrant, who presents the oblation (to the gods), and is the possessor of great wealth."
  },
  {
    mandala: 1,
    hymn: 2,
    rishi: "Gritsamada", 
    deity: "Agni",
    devanagari: "अग्निः पूर्वेभिर्ऋषिभिरीड्यो नूतनैरुत ।स देवाँ एह वक्षति ॥",
    transliteration: "agníḥ pū́rvebhiḥ ṛ́ṣi-bhiḥ ī́ḍyaḥ nū́tanaiḥ utá | saḥ devā́n ā́ ihá vakṣati ||",
    summary: "Agni, who was praised by the ancient sages, and is praised by the modern ones, brings the gods hither."
  },
  {
    mandala: 1,
    hymn: 3,
    rishi: "Vishvamitra",
    deity: "Indra",
    devanagari: "इन्द्रं वर्धन्तो अप्तुरः कृण्वन्तो विश्वमानुषं ।अस्थुर्द्युम्नं सचाभुवं ॥",
    transliteration: "indraṃ vardhánto aptúraḥ kṛṇvánto viśva-mā́nuṣam | asthur dyúmnam sacā́-bhuvam ||",
    summary: "Praising Indra, the destroyer of obstacles, making him the lord of all men, they have established him as the possessor of brilliant energy."
  },
  {
    mandala: 1,
    hymn: 4,
    rishi: "Vasistha",
    deity: "Ushas",
    devanagari: "उषो देवी सुवसतिर्विश्वा द्यावापृथिवी अभि ।प्रति वस्तोरहानि ॥",
    transliteration: "uṣó devī́ suvásatir viśvā́ dyā́vā-pṛthivī́ abhi | práti vastór ahā́ni ||",
    summary: "Ushas, the divine dawn, the good dwelling, approaches all the heavens and earths, coming towards the dwelling of the morning."
  },
  {
    mandala: 1,
    hymn: 5,
    rishi: "Atri",
    deity: "Soma",
    devanagari: "सोमं मन्दन्ति धारया पवित्रेण सुतं हरिम् ।इन्द्राय पातवे सुतं ॥",
    transliteration: "sómaṃ mandánti dhā́rayā pavítreṇa sutáṃ hárim | indrā́ya pātáve sutáṃ ||",
    summary: "They exhilarate Soma with the stream, the pressed golden one, the pressed one for Indra to drink."
  }
];

// Individual page component
function NotebookPage({ hymn, isVisible }: { hymn: any; isVisible: boolean }) {
  return (
    <motion.div
      className="relative w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg border border-amber-200 overflow-hidden"
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ 
        rotateY: isVisible ? 0 : 180, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Ink bleed effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-8 h-8 bg-amber-800 rounded-full blur-sm"></div>
        <div className="absolute top-12 right-8 w-6 h-6 bg-amber-700 rounded-full blur-sm"></div>
        <div className="absolute bottom-8 left-12 w-4 h-4 bg-amber-600 rounded-full blur-sm"></div>
        <div className="absolute bottom-16 right-4 w-5 h-5 bg-amber-800 rounded-full blur-sm"></div>
      </div>

      {/* Page content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Side margin annotations */}
        <div className="absolute left-2 top-8 bottom-8 w-16 flex flex-col items-center justify-between text-xs text-amber-700">
          <div className="writing-vertical transform rotate-180">
            <div className="font-semibold">{hymn.rishi}</div>
            <div className="mt-2">{hymn.deity}</div>
            <div className="mt-2">M.{hymn.mandala}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-20 flex-1 flex flex-col justify-center">
          {/* Sanskrit text */}
          <div className="mb-8">
            <div className="text-2xl md:text-3xl font-serif text-amber-900 leading-relaxed mb-4">
              {hymn.devanagari}
            </div>
            <div className="text-lg text-amber-700 italic leading-relaxed">
              {hymn.transliteration}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-amber-300 pt-6">
            <div className="text-gray-700 leading-relaxed">
              {hymn.summary}
            </div>
          </div>
        </div>

        {/* Page number */}
        <div className="absolute bottom-4 right-4 text-xs text-amber-600">
          {hymn.mandala}.{hymn.hymn}
        </div>
      </div>
    </motion.div>
  );
}

// Main Notebook Component
export default function RishisNotebook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % hymnData.length);
      setIsFlipping(false);
    }, 400);
  };

  const prevPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + hymnData.length) % hymnData.length);
      setIsFlipping(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
      {/* Background texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif text-amber-900 mb-4">
            The Rishi's Notebook
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Ancient wisdom, one page at a time
          </p>
        </motion.div>

        {/* Notebook */}
        <div className="relative">
          {/* Notebook cover effect */}
          <div className="absolute -inset-4 bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl shadow-2xl transform rotate-1"></div>
          <div className="absolute -inset-2 bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl shadow-xl transform -rotate-1"></div>
          
          {/* Main notebook */}
          <div className="relative bg-white rounded-lg shadow-xl p-8 min-h-[600px]">
            {/* Binding holes */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-amber-600 rounded-full"></div>
              ))}
            </div>

            {/* Page container */}
            <div className="ml-8 h-full">
              <AnimatePresence mode="wait">
                <NotebookPage 
                  key={currentPage} 
                  hymn={hymnData[currentPage]} 
                  isVisible={true}
                />
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <motion.button
                onClick={prevPage}
                disabled={isFlipping}
                className="p-3 bg-amber-100 hover:bg-amber-200 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-amber-700" />
              </motion.button>
              
              <div className="text-sm text-amber-700 font-medium">
                {currentPage + 1} of {hymnData.length}
              </div>
              
              <motion.button
                onClick={nextPage}
                disabled={isFlipping}
                className="p-3 bg-amber-100 hover:bg-amber-200 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-amber-700" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-sm text-gray-600 mb-4">
            Flip through ancient knowledge • Each page reveals a different rishi's wisdom
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <span>• Sanskrit Original</span>
            <span>• Transliteration</span>
            <span>• English Summary</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
