import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  FiArrowRight,
  FiUsers,
  FiCpu,
  FiCheckCircle,
  FiInbox,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';
import { ProjectCardSkeleton } from '../components/SkeletonLoader';
import AnimatedCounter from '../components/AnimatedCounter';
import { projectsData } from '../projectsData';

/* ─────────────── helpers ─────────────── */
const CATEGORIES = ['All Projects', 'Residential', 'Commercial'];

const isResidential = (type = '') => {
  const t = type.toLowerCase();
  return t === 'villa' || t === 'smart home' || t === 'interior';
};

const isCommercial = (type = '') => {
  const t = type.toLowerCase();
  return t === 'commercial' || t === 'architecture' || t === 'renovation';
};

/* Static fallback list — mirrors mockProjects entries so the page
   always has content even when the backend is offline */
const FALLBACK_PROJECTS = [
  {
    _id: 'f1',
    name: 'Azure Palm Villa',
    description: 'High-end oceanfront luxury estate featuring stunning architecture and custom design.',
    price: '$4,850,000',
    location: 'Ocean Drive, Palm Beach',
    status: 'Completed',
    type: 'Villa',
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'],
    features: { size: '8,500 sq ft', bedrooms: 5, bathrooms: 6, year: 2024 },
  },
  {
    _id: 'f2',
    name: 'The Meridian Tower',
    description: 'A futuristic commercial skyscraper with sustainable LEED Gold workspaces.',
    price: '$18,500,000+',
    location: 'Financial District, Tech Corridor',
    status: 'Upcoming',
    type: 'Commercial',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'],
    features: { size: '180,000 sq ft', bedrooms: 0, bathrooms: 24, floors: 45, year: 2028 },
  },
  {
    _id: 'f3',
    name: 'Villa Serenita',
    description: 'A serene, contemporary private villa estate nested in forest highlands.',
    price: '$3,200,000',
    location: 'Highland Estates, Eco Valley',
    status: 'Upcoming',
    type: 'Villa',
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'],
    features: { size: '6,200 sq ft', bedrooms: 4, bathrooms: 4, year: 2027 },
  },
  {
    _id: 'f4',
    name: 'Crescent Business Hub',
    description: 'A state-of-the-art office complex built with futuristic architectural styling.',
    price: '$9,750,000',
    location: 'Gateway Circle, Cyberpark',
    status: 'Upcoming',
    type: 'Commercial',
    images: ['https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'],
    features: { size: '75,000 sq ft', bedrooms: 0, bathrooms: 12, year: 2027 },
  },
  {
    _id: 'f5',
    name: 'Aura Smart Condos',
    description: 'Voice-automated smart residences with customisable spatial layouts.',
    price: '$1,650,000',
    location: 'Metro Avenue, Downtown',
    status: 'Ongoing',
    type: 'Smart Home',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
    features: { size: '2,400 sq ft', bedrooms: 3, bathrooms: 3, year: 2026 },
  },
  {
    _id: 'f6',
    name: 'Lumina Penthouse',
    description: 'Premium double-height penthouse design highlighting sustainable luxury interiors.',
    price: '$2,950,000',
    location: 'Skyline Towers, Heights',
    status: 'Ongoing',
    type: 'Interior',
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'],
    features: { size: '4,500 sq ft', bedrooms: 4, bathrooms: 4, year: 2025 },
  },
];

/* ─────────────── stats ─────────────── */
const STATS = [
  { val: '15', suff: '+', label: 'Years of Excellence', desc: 'Over landmark projects' },
  { val: '250', suff: '+', label: 'Projects Delivered', desc: 'Relentless perfection' },
  { val: '100', suff: '%', label: 'Certified Engineers', desc: 'Specialised expertise' },
  { val: '98', suff: '%', label: 'On-Time Completion', desc: 'Project discipline' },
  { val: 'A+', suff: '', label: 'Sustainable Material', desc: 'Finest quality sourced' },
];

const SUB_FEATURES = [
  { label: 'Expert Team', icon: <FiUsers className="text-[#7C4DFF] dark:text-[#B388FF]" size={16} /> },
  { label: 'Modern Technology', icon: <FiCpu className="text-[#7C4DFF] dark:text-[#B388FF]" size={16} /> },
  { label: 'Client-First Approach', icon: <FiCheckCircle className="text-[#7C4DFF] dark:text-[#B388FF]" size={16} /> },
];

/* ════════════════════════════════════════
   COMPONENT
════════════════════════════════════════ */
const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialType = searchParams.get('type') || 'All Projects';
  const [selectedType, setSelectedType] = useState(initialType);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 9;

  /* ── fetch ── */
  useEffect(() => {
    setLoading(true);
    try {
      setProjects(projectsData);
      setTotal(projectsData.length);
    } catch {
      setProjects(FALLBACK_PROJECTS);
      setTotal(FALLBACK_PROJECTS.length);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  /* ── filter by category tab ── */
  const filteredProjects = projects.filter((p) => {
    if (selectedType === 'Residential') return isResidential(p.type);
    if (selectedType === 'Commercial') return isCommercial(p.type);
    return true;
  });

  /* ── paginate filtered list client-side ── */
  const totalFiltered = filteredProjects.length;
  const pages = Math.max(1, Math.ceil(totalFiltered / LIMIT));
  const safePage = Math.min(currentPage, pages);
  const paginatedProjects = filteredProjects.slice((safePage - 1) * LIMIT, safePage * LIMIT);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
    const next = new URLSearchParams(searchParams);
    if (type === 'All Projects') next.delete('type');
    else next.set('type', type);
    setSearchParams(next);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  /* ────────────────────── render ────────────────────── */
  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#F5F0FF]/30 via-white to-[#F5F0FF]/25 dark:from-[#0D0814] dark:via-[#130B21] dark:to-[#0D0814] transition-colors duration-500 overflow-hidden relative">

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-[-15%] w-[450px] h-[450px] rounded-full bg-[#7C4DFF]/5 dark:bg-[#7C4DFF]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[-10%] w-[350px] h-[350px] rounded-full bg-[#B388FF]/5 dark:bg-[#B388FF]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-14">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-[#7C4DFF]/10 text-[#7C4DFF] dark:bg-[#7C4DFF]/20 dark:text-[#B388FF] uppercase border border-[#7C4DFF]/10">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Crafted Spaces That{' '}
            <span className="bg-gradient-to-r from-[#7C4DFF] to-[#B388FF] bg-clip-text text-transparent">
              Inspire
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            A showcase of timeless architecture, luxury interiors, and visionary construction excellence — spanning residential villas and landmark commercial developments.
          </p>
        </motion.div>

        {/* ── Header row: title + CTA ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full">
          <div className="space-y-1">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wide uppercase border-b-2 border-[#7C4DFF]/30 pb-0.5">
              Our Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
              Completed &amp; Ongoing Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="px-6 py-2.5 rounded-full border border-[#7C4DFF]/30 hover:border-[#7C4DFF] bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-800 dark:text-white text-xs font-semibold tracking-wider flex items-center gap-2 transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span>Explore All Projects</span>
            <FiArrowRight size={14} />
          </Link>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="flex justify-center md:justify-start w-full">
          <div className="p-1 rounded-full bg-[#F5F0FF]/80 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex gap-1 max-w-full overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedType === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleTypeSelect(cat)}
                  className={`relative px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#7C4DFF]'
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="portfolioFilterPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#9E7CFF] shadow-md z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Results count ── */}
        {!loading && (
          <div className="flex items-center text-xs font-semibold tracking-wider text-slate-400 uppercase">
            <span>
              Showing {paginatedProjects.length} of {totalFiltered} Projects
            </span>
          </div>
        )}

        {/* ── Project Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array(LIMIT)
                .fill(0)
                .map((_, idx) => <ProjectCardSkeleton key={idx} />)
            ) : paginatedProjects.length > 0 ? (
              paginatedProjects.map((project, idx) => (
                <motion.div
                  key={project._id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-400 flex items-center justify-center">
                  <FiInbox size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                    No projects found
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                    Try selecting a different category filter above.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Pagination ── */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage === 1}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FiChevronLeft size={18} />
            </button>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Page {safePage} of {pages}
            </span>
            <button
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage === pages}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ── Trust Statistics ── */}
        <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-16 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left column */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[#7C4DFF] dark:text-[#B388FF] text-xs font-bold tracking-wider uppercase">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                Built On{' '}
                <span className="text-[#7C4DFF] dark:text-[#B388FF]">Trust</span>
                <br />
                Driven By{' '}
                <span className="text-[#7C4DFF] dark:text-[#B388FF]">Excellence</span>
              </h2>

              <div className="space-y-3 pt-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {SUB_FEATURES.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#7C4DFF]/10 dark:bg-[#7C4DFF]/20 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right stats grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-4">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 rounded-3xl bg-[#F5F0FF]/60 dark:bg-slate-900/40 border border-[#7C4DFF]/10 dark:border-slate-800/40 flex flex-col justify-center items-center text-center space-y-1 shadow-sm"
                >
                  <div className="text-3xl lg:text-4xl font-serif font-extrabold text-[#7C4DFF] dark:text-[#B388FF]">
                    {stat.val === 'A+'
                      ? 'A+'
                      : <AnimatedCounter value={stat.val} suffix={stat.suff} />}
                  </div>
                  <h4 className="text-[10px] font-bold text-slate-800 dark:text-white leading-tight">
                    {stat.label}
                  </h4>
                  <p className="text-[9px] text-slate-400 font-medium">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;
