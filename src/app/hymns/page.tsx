'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, BookOpen, Users, Zap, Sun, Droplets, Flame, CloudRain, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Remove static allHymns; we will fetch from /api/hymns

// Filter options
const rishis = ["All", "Madhuchchhandas", "Gritsamada", "Vishvamitra", "Vasistha", "Atri", "Kanva"];
const deities = ["All", "Agni", "Indra", "Savitr", "Ushas", "Soma", "Surya", "Vayu", "Ashvins", "Maruts", "Rudra", "Varuna", "Mitra"];
const themes = ["All", "Sacred fire", "Divine invocation", "Prosperity", "Power and strength", "Cosmic support", "Divine inspiration", "Cosmic order", "Dawn and renewal", "Universal awakening", "Sacred ritual", "Divine ecstasy", "Ritual purification", "Wind and breath", "Healing and medicine", "Storm and rain", "Destruction and renewal", "Friendship and contracts", "Solar energy"];
const mandalas = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
} as const;

type Hymn = {
  sanskrit: string;
  transliteration: string;
  english: string;
  reference: string;
  rishi?: string;
  deity?: string;
  theme?: string;
  mandala?: number;
};

export default function AllHymnsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRishi, setSelectedRishi] = useState('All');
  const [selectedDeity, setSelectedDeity] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [selectedMandala, setSelectedMandala] = useState('All');

  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchHymns(p = page) {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    params.set('page', String(p));
    params.set('pageSize', String(pageSize));
    if (searchTerm) params.set('q', searchTerm);
    if (selectedRishi !== 'All') params.set('rishi', selectedRishi);
    if (selectedDeity !== 'All') params.set('deity', selectedDeity);
    if (selectedTheme !== 'All') params.set('theme', selectedTheme);
    if (selectedMandala !== 'All') params.set('mandala', String(selectedMandala));

    try {
      const res = await fetch(`/api/hymns?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setHymns(data.items || []);
      setTotal(data.total || 0);
      setPage(data.page || p);
    } catch (e: any) {
      setError(e?.message || 'Failed to load hymns');
    } finally {
      setLoading(false);
    }
  }

  // Fetch on mount and whenever filters/search/pageSize change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedRishi, selectedDeity, selectedTheme, selectedMandala, pageSize]);

  useEffect(() => {
    fetchHymns(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedRishi, selectedDeity, selectedTheme, selectedMandala, pageSize]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRishi('All');
    setSelectedDeity('All');
    setSelectedTheme('All');
    setSelectedMandala('All');
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  function goPrev() {
    if (!canPrev) return;
    const nextPage = page - 1;
    setPage(nextPage);
    fetchHymns(nextPage);
  }
  function goNext() {
    if (!canNext) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchHymns(nextPage);
  }

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
              {loading ? 'Loading…' : `${hymns.length} of ${total} hymns`}
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

        {/* Pagination controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={goPrev} disabled={!canPrev} className={`px-3 py-2 rounded-lg border ${canPrev ? 'bg-white hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={goNext} disabled={!canNext} className={`px-3 py-2 rounded-lg border ${canNext ? 'bg-white hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}>
              <ChevronRight className="w-4 h-4" />
            </button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
              className="ml-2 px-2 py-2 border rounded-lg text-sm"
            >
              {[15, 30, 60, 90].map(sz => (
                <option key={sz} value={sz}>{sz}/page</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 text-sm text-red-600">{error}</div>
        )}

        {/* Hymns Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {hymns.map((hymn, index) => {
            const DeityIcon = (deityIcons as any)[hymn.deity as keyof typeof deityIcons] || BookOpen;
            return (
              <motion.div
                key={`${hymn.reference}-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-6 hover:shadow-xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
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
                    {hymn.theme && <span className="text-amber-600 font-medium">{hymn.theme}</span>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {!loading && hymns.length === 0 && (
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
