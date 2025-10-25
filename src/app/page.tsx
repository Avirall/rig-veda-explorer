'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, BookOpen, ChevronRight, Flame, CloudRain, Droplets } from 'lucide-react';

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
  const rishis = [
    { name: "Gritsamada", hymns: "44 hymns", description: "Devotee of Indra" },
    { name: "Vishvamitra", hymns: "104 hymns", description: "Royal sage who achieved Brahmin status" },
    { name: "Vasistha", hymns: "102 hymns", description: "Priest of the Solar dynasty" },
    { name: "Atri", hymns: "87 hymns", description: "One of the seven great sages" },
    { name: "Bharadvaja", hymns: "78 hymns", description: "Scholar and teacher" },
    { name: "Kanva", hymns: "131 hymns", description: "Ancient sage of great wisdom" }
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
            >
              <motion.div
                className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-6 flex flex-col items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
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
                
                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
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