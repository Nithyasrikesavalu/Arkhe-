import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiInbox, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';
import { ProjectCardSkeleton } from '../components/SkeletonLoader';
import { projectsData } from '../projectsData';

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read params
  const initialStatus = searchParams.get('status') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  // States
  const [search, setSearch] = useState(initialSearch);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const statuses = [
    { label: 'All Projects', value: '' },
    { label: 'Upcoming', value: 'Upcoming' },
    { label: 'Ongoing', value: 'Ongoing' },
    { label: 'Completed', value: 'Completed' },
  ];

  // Sync state values with router URL params when Navbar links or parameters change
  useEffect(() => {
    const statusParam = searchParams.get('status') || '';
    const searchParam = searchParams.get('search') || '';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);

    setSelectedStatus(statusParam);
    setSearch(searchParam);
    setCurrentPage(pageParam);
  }, [searchParams]);

  // Premium Micro-animation effect (simulate short loading when changing filters)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [search, selectedStatus, currentPage]);

  // Sync state values with router URL params for shareability
  const updateUrlParams = (newParams) => {
    const nextParams = new URLSearchParams(searchParams);
    
    Object.keys(newParams).forEach((key) => {
      const val = newParams[key];
      if (val === undefined || val === null || val === '') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val.toString());
      }
    });

    setSearchParams(nextParams);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    updateUrlParams({ search: e.target.value, page: 1 });
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    updateUrlParams({ status, page: 1 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateUrlParams({ page });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Dynamically Filtered Data in Memory
  const filtered = projectsData.filter((project) => {
    // 1. Status filter
    if (selectedStatus && project.status !== selectedStatus) {
      return false;
    }
    // 2. Search filter
    if (search) {
      const query = search.toLowerCase();
      const matchName = project.name.toLowerCase().includes(query);
      const matchLocation = project.location.toLowerCase().includes(query);
      const matchDesc = project.description.toLowerCase().includes(query);
      const matchType = project.type.toLowerCase().includes(query);
      const matchAmenities = project.amenities.some(a => a.toLowerCase().includes(query));
      if (!matchName && !matchLocation && !matchDesc && !matchType && !matchAmenities) {
        return false;
      }
    }
    return true;
  });

  const limit = 6;
  const total = filtered.length;
  const pages = Math.ceil(total / limit) || 1;

  // Slice to Paginate
  const startIndex = (currentPage - 1) * limit;
  const paginatedProjects = filtered.slice(startIndex, startIndex + limit);


  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-lavender-bg/30 via-white to-lavender-bg/20 dark:from-dark-bg dark:via-[#130B21] dark:to-dark-bg/95 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary uppercase border border-primary/10">
            ARKHE catalog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Our Architectural <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            Explore our state-of-the-art properties, from smart environmental skyscrapers to beachfront luxury estates. Refine by status or type to find your match.
          </p>
        </div>

        {/* Filter Toolbar Container */}
        <div className="p-6 rounded-[32px] glass-panel border border-slate-200/50 dark:border-slate-800/50 mb-12 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search projects by name, location, keyword..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-6 py-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary text-slate-800 dark:text-white text-sm outline-none transition-all duration-300"
              />
            </div>

            {/* Status Selector */}
            <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {statuses.map((stat) => (
                <button
                  key={stat.value}
                  onClick={() => handleStatusSelect(stat.value)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    selectedStatus === stat.value
                      ? 'bg-primary text-white shadow-md'
                      : 'glass-panel text-slate-600 dark:text-slate-300 hover:bg-slate-200/40 dark:hover:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/30'
                  }`}
                >
                  {stat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 text-xs font-semibold tracking-wider text-slate-400 uppercase">
          <span>Found {total} Projects</span>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, idx) => <ProjectCardSkeleton key={idx} />)
            ) : paginatedProjects.length > 0 ? (
              paginatedProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
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
                  <h3 className="text-lg font-bold font-serif text-slate-850 dark:text-white">No properties found</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                    Try adjusting your keyword query, filters, or status settings to expand your search pool.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Section */}
        {pages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FiChevronLeft size={18} />
            </button>

            <span className="text-sm font-semibold text-slate-700 dark:text-slate-350">
              Page {currentPage} of {pages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pages}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;
