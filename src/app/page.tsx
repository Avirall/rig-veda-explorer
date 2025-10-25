'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, BookOpen, ChevronRight } from 'lucide-react';

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
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
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
        
        {/* Central rotating element - behind text */}
        <motion.div
          className="w-32 h-32 border-4 border-amber-600/30 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <BookOpen className="w-16 h-16 text-amber-700/40" />
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
    </div>
  );
}