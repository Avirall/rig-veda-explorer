'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Filter,
  Search,
  BookOpen,
  Users,
  Zap,
  Sun,
  Droplets,
  Flame,
  CloudRain,
  ChevronLeft,
  ChevronRight,
  Hash,
  Sparkles,
} from 'lucide-react';
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

const deityAccent: Record<string, string> = {
  Agni: 'from-amber-500/20 via-orange-500/10 to-red-500/5 border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.08)]',
  Indra: 'from-sky-500/20 via-indigo-500/10 to-sky-500/5 border-sky-400/30 shadow-[0_0_30px_rgba(56,189,248,0.12)]',
  Savitr: 'from-yellow-400/20 via-amber-300/10 to-yellow-200/5 border-yellow-300/30 shadow-[0_0_30px_rgba(250,204,21,0.12)]',
  Ushas: 'from-rose-500/20 via-fuchsia-400/10 to-rose-300/5 border-rose-300/30 shadow-[0_0_30px_rgba(244,114,182,0.12)]',
  Soma: 'from-emerald-500/20 via-teal-500/10 to-emerald-400/5 border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.12)]',
  Surya: 'from-orange-500/20 via-yellow-400/10 to-orange-300/5 border-orange-300/30 shadow-[0_0_30px_rgba(249,115,22,0.12)]',
  Vayu: 'from-cyan-500/20 via-sky-400/10 to-cyan-300/5 border-cyan-300/30 shadow-[0_0_30px_rgba(34,211,238,0.12)]',
  Ashvins: 'from-pink-500/20 via-purple-500/10 to-pink-300/5 border-pink-300/30 shadow-[0_0_30px_rgba(236,72,153,0.12)]',
  Maruts: 'from-indigo-500/20 via-slate-500/10 to-indigo-300/5 border-indigo-300/30 shadow-[0_0_30px_rgba(99,102,241,0.12)]',
  Rudra: 'from-violet-500/20 via-purple-500/10 to-violet-300/5 border-violet-300/30 shadow-[0_0_30px_rgba(139,92,246,0.12)]',
  Varuna: 'from-blue-500/20 via-indigo-500/10 to-blue-300/5 border-blue-300/30 shadow-[0_0_30px_rgba(59,130,246,0.12)]',
  Mitra: 'from-lime-500/20 via-green-500/10 to-lime-300/5 border-lime-300/30 shadow-[0_0_30px_rgba(163,230,53,0.12)]',
};

type Hymn = {
  sanskrit: string;
  transliteration: string;
  english: string;
  reference: string;
  rishi?: string;
  deity?: string;
  theme?: string;
  mandala?: number;
  sukta?: number;
  versesCount: number;
  verses: Array<{
    sanskrit: string;
    transliteration: string;
    english: string;
  }>;
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
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);

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
    setSelectedHymn(null);
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_bottom,_rgba(99,102,241,0.15),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(30,64,175,0.12)_0%,rgba(76,29,149,0.08)_50%,rgba(13,148,136,0.08)_100%)] mix-blend-screen" />
      {/* Header */}
      <motion.div
        className="sticky top-0 z-40 bg-slate-900/65 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_60px_rgba(15,23,42,0.45)]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="group flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/60 hover:bg-emerald-400/10"
            >
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              <span>Back to Scroll Story</span>
            </Link>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-emerald-300">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.4em]">Rig Veda</span>
              </div>
              <h1 className="mt-1 text-3xl font-serif tracking-tight text-white md:text-4xl">All Hymns Library</h1>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {loading ? 'Loading…' : `${hymns.length} of ${total} hymns`}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <motion.div
          className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_25px_60px_rgba(8,47,73,0.25)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(56,189,248,0.08)_0%,rgba(14,165,233,0.06)_40%,transparent_100%)]" />

          <div className="relative mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-slate-100">
              <Filter className="h-4 w-4 text-emerald-300" />
              <span className="uppercase tracking-[0.35em] text-xs text-emerald-200/80">Filter Stack</span>
            </div>
            <button
              onClick={clearFilters}
              className="ml-auto rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-emerald-400/60 hover:text-emerald-200"
            >
              Clear All
            </button>
          </div>

          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Search</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search hymns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                />
              </div>
            </div>

            {/* Rishi Filter */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Rishi</label>
              <select
                value={selectedRishi}
                onChange={(e) => setSelectedRishi(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-100 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              >
                {rishis.map(rishi => (
                  <option key={rishi} value={rishi}>{rishi}</option>
                ))}
              </select>
            </div>

            {/* Deity Filter */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Deity</label>
              <select
                value={selectedDeity}
                onChange={(e) => setSelectedDeity(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-100 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              >
                {deities.map(deity => (
                  <option key={deity} value={deity}>{deity}</option>
                ))}
              </select>
            </div>

            {/* Mandala Filter */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Mandala</label>
              <select
                value={selectedMandala}
                onChange={(e) => setSelectedMandala(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-100 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              >
                {mandalas.map(mandala => (
                  <option key={mandala} value={mandala}>{mandala}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Theme Filter */}
          <div className="mt-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Theme</label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-100 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            >
              {themes.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Pagination controls */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Page {page} of {totalPages}</span>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-emerald-200">
              {total.toLocaleString()} total hymns
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={goPrev}
              disabled={!canPrev}
              className={`group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition ${canPrev ? 'hover:border-emerald-400/60 hover:bg-emerald-400/15' : 'opacity-40 cursor-not-allowed'}`}
            >
              <ChevronLeft className="h-4 w-4 text-slate-200 transition group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={goNext}
              disabled={!canNext}
              className={`group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition ${canNext ? 'hover:border-emerald-400/60 hover:bg-emerald-400/15' : 'opacity-40 cursor-not-allowed'}`}
            >
              <ChevronRight className="h-4 w-4 text-slate-200 transition group-hover:translate-x-0.5" />
            </button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
              className="ml-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            >
              {[15, 30, 60, 90].map(sz => (
                <option key={sz} value={sz} className="bg-slate-900 text-slate-100">{sz}/page</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
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
            const previewSanskrit = hymn.verses?.slice(0, 2).map(v => v.sanskrit).filter(Boolean).join('\n') || hymn.sanskrit;
            const previewTranslit = hymn.verses?.slice(0, 2).map(v => v.transliteration).filter(Boolean).join('\n') || hymn.transliteration;
            const previewEnglish = hymn.verses?.slice(0, 2).map(v => v.english).filter(Boolean).join('\n') || hymn.english;
            const accent = deityAccent[hymn.deity || ''] || 'from-emerald-500/15 via-teal-500/10 to-cyan-500/5 border-emerald-400/25 shadow-[0_0_35px_rgba(16,185,129,0.1)]';
            return (
              <motion.div
                key={`${hymn.reference}-${index}`}
                className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ease-out flex flex-col cursor-pointer backdrop-blur-xl ${accent}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedHymn(hymn)}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/60 via-transparent to-transparent" />

                {/* Header */}
                <div className="relative mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-emerald-200">
                      <DeityIcon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-white/90">{hymn.deity || 'Various Deities'}</span>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200/90">
                    {hymn.reference}
                  </span>
                </div>

                {/* Sanskrit Text */}
                <div className="relative mb-4 flex-1">
                  <div className="relative text-lg font-serif leading-relaxed text-white/95 max-h-24 overflow-hidden whitespace-pre-line">
                    {previewSanskrit}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/95 to-transparent" />
                  </div>
                  <div className="relative mt-3 text-sm text-emerald-100/90 italic max-h-12 overflow-hidden whitespace-pre-line">
                    {previewTranslit}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/95 to-transparent" />
                  </div>
                </div>

                {/* English Translation */}
                <div className="mb-4">
                  <p className="relative text-sm leading-relaxed text-slate-100/85 italic max-h-20 overflow-hidden whitespace-pre-line">
                    {previewEnglish}
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 block h-10 bg-gradient-to-t from-slate-950/95 to-transparent" />
                  </p>
                </div>

                {/* Footer */}
                <div className="relative border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-200/80">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="flex items-center space-x-1 min-w-0">
                        <Users className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{hymn.rishi || 'Various Seers'}</span>
                      </span>
                      <span className="flex items-center space-x-1 flex-shrink-0">
                        <Hash className="h-3 w-3" />
                        <span>M.{hymn.mandala ?? '—'}{hymn.sukta ? ` · S.${hymn.sukta}` : ''}</span>
                      </span>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-medium text-emerald-200/90 flex-shrink-0 text-xs whitespace-nowrap">
                      {hymn.versesCount || 0} verses
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {!loading && hymns.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-emerald-200">
              <BookOpen className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No hymns matched your filters</h3>
            <p className="text-slate-300/80 mb-6">Try another deity, mandala, or keyword to continue exploring.</p>
            <button
              onClick={clearFilters}
              className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-6 py-2 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/80 hover:bg-emerald-400/30"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedHymn && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHymn(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_30px_80px_rgba(8,47,73,0.45)] backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 flex items-center justify-between gap-4 rounded-t-3xl border-b border-white/10 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-transparent px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Rig Veda Hymn</p>
                  <h3 className="mt-1 text-3xl font-serif text-white">{selectedHymn.reference}</h3>
                </div>
                <button
                  onClick={() => setSelectedHymn(null)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/60 hover:text-emerald-100"
                >
                  Close
                </button>
              </div>

              <div className="space-y-6 px-6 py-6">
                <div className="grid grid-cols-1 gap-4 text-sm text-slate-300 md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rishi</p>
                    <p className="mt-1 text-sm text-slate-100">{selectedHymn.rishi || 'Various Seers'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Deity</p>
                    <p className="mt-1 text-sm text-slate-100">{selectedHymn.deity || 'Various Deities'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Mandala · Sukta</p>
                    <p className="mt-1 text-sm text-slate-100">M.{selectedHymn.mandala ?? '—'}{selectedHymn.sukta ? ` · S.${selectedHymn.sukta}` : ''}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {(selectedHymn.verses || []).map((verse, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      {verse.sanskrit && (
                        <div className="text-sm font-serif text-emerald-200 whitespace-pre-line mb-2">
                          {verse.sanskrit}
                        </div>
                      )}
                      {verse.transliteration && (
                        <div className="text-sm text-emerald-100/80 italic whitespace-pre-line mb-2">
                          {verse.transliteration}
                        </div>
                      )}
                      {verse.english && (
                        <div className="text-sm text-slate-100/85 italic whitespace-pre-line">
                          {verse.english}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
