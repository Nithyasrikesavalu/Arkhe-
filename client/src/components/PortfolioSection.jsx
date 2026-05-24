import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiMapPin, FiMaximize, FiArrowRight, FiX, FiAward, FiPlus, FiChevronRight } from 'react-icons/fi';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PortfolioSection = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  

  const categories = ['All', 'Villas', 'Commercial', 'Interiors', 'Smart Homes', 'Architecture'];

  const projects = [
    {
      id: 'azure-palm-villa',
      title: 'Azure Palm Villa',
      category: 'Villas',
      location: 'Ocean Drive, Palm Beach',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ],
      desc: 'A breathtaking oceanfront luxury estate representing modern coastal living. Merging organic local granite with massive sliding double-height glass panels.',
      details: 'Spanning over 8,500 sq ft, it connects the living saloon seamlessly with a massive pool deck and private yacht mooring jetty. Fully voice-controlled with integrated climate recycling grids.',
      specs: { size: '8,500 sq ft', beds: 5, baths: 6, year: 2024 },
      amenities: ['Private Beach Access', 'Infinity Edge Pool', 'AI Automation Hub', 'Jetty Mooring', 'Underfloor Heating'],
      featured: true
    },
    {
      id: 'meridian-heights',
      title: 'Meridian Heights',
      category: 'Commercial',
      location: 'Tech Corridor, Cyber Hills',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
      ],
      desc: 'A premium corporate headquarters built with sustainable LEED Gold green standards.',
      details: 'A 45-floor double-glazed business tower designed to capture wind flows for natural cooling. Clad in solar-active facade plates that cover 40% of standard operations.',
      specs: { size: '180,000 sq ft', beds: 0, baths: 24, year: 2025 },
      amenities: ['Sky Lounge Deck', 'Helipad Access', 'Active Solar Facade', 'LEED Gold Certified', 'EV Charging Grid'],
      featured: false
    },
    {
      id: 'luxe-urban-spaces',
      title: 'Luxe Urban Spaces',
      category: 'Interiors',
      location: 'Skyline Towers, Downtown',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
      ],
      desc: 'Bespoke contemporary apartment interior blending Italian marbles with customized lighting templates.',
      details: 'Showcases hand-cut Calacatta gold white marble slabs, soundproof cedar wall panelings, and custom brushed brass accent arches. Pre-integrated with automated climate filters.',
      specs: { size: '4,200 sq ft', beds: 3, baths: 3.5, year: 2024 },
      amenities: ['Calacatta Gold Marble', 'Acoustic Soundproofing', 'Automated Light Dimmers', 'Walk-in Oak Wardrobes'],
      featured: false
    },
    {
      id: 'skyline-residence',
      title: 'Skyline Residence',
      category: 'Smart Homes',
      location: 'Metro Avenue, Heights',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
      ],
      desc: 'Voice-controlled smart residences with electrochromic privacy glass layouts.',
      details: 'High-density premium apartments featuring integrated AI console pads. Double-glazed smart glass blocks heat while optimizing natural light dynamically.',
      specs: { size: '2,800 sq ft', beds: 3, baths: 3, year: 2025 },
      amenities: ['AI Spatial Hub', 'Electrochromic Glass', 'Automated Valet', 'EV Superchargers', 'Rooftop Lounge Pool'],
      featured: false
    },
    {
      id: 'crystal-arc-towers',
      title: 'Crystal Arc Towers',
      category: 'Architecture',
      location: 'Gatecircle, Cyberpark',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
      ],
      desc: 'An architectural masterpiece merging residential duplexes and luxury shopping grids.',
      details: 'Features a cascading biophilic sky bridge covered in evergreen plants, triple-glazed insulation windows, and thermal solar panels ensuring high efficiency.',
      specs: { size: '120,000 sq ft', beds: 0, baths: 32, year: 2026 },
      amenities: ['Evergreen Sky Bridge', 'Biophilic Terraces', 'Triple-Glazed Glass', 'Thermal Solar Inverters'],
      featured: false
    },
    {
      id: 'horizon-elite-villas',
      title: 'Horizon Elite Villas',
      category: 'Villas',
      location: 'Highlands Eco Valley',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
      ],
      desc: 'Bespoke granite masonry villa nested in the highland forest valleys.',
      details: 'Built with local mountain stone to minimize shipping footprint, featuring a custom cantilevered wooden deck, yoga pavilion, and zero-edge valley swimming pool.',
      specs: { size: '6,400 sq ft', beds: 4, baths: 4.5, year: 2026 },
      amenities: ['Zero Edge Valley Pool', 'Granite Masonry Deck', 'Yoga Pavilion', 'Natural Spring Recycler'],
      featured: false
    }
  ];

  // Filter projects by selected tab category
  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  // Find the featured project (Azure Palm Villa) for highlighted asymmetric formatting
  const featuredProject = projects.find(p => p.featured);
  const regularProjects = filteredProjects.filter(p => p.id !== 'azure-palm-villa');


  return (
    <section className="relative py-24 bg-gradient-to-b from-[#F5F0FF] via-white to-[#F5F0FF] dark:from-[#0D0814] dark:via-[#130B21] dark:to-[#0D0814] transition-colors duration-500 overflow-hidden">
      
      {/* Visual background gradient blobs */}
      <div className="absolute top-1/4 left-[-15%] w-[450px] h-[450px] rounded-full bg-[#7C4DFF]/10 dark:bg-[#7C4DFF]/5 blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-[-15%] w-[450px] h-[450px] rounded-full bg-[#B388FF]/15 dark:bg-[#B388FF]/5 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-[#7C4DFF]/10 text-[#7C4DFF] dark:bg-[#7C4DFF]/20 dark:text-[#B388FF] uppercase border border-[#7C4DFF]/10"
          >
            Our Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight"
          >
            Crafted Spaces That <span className="text-gradient">Inspire</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed"
          >
            A showcase of timeless architecture, luxury interiors, and visionary construction excellence.
          </motion.p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#7C4DFF] to-[#B388FF] mx-auto rounded-full mt-4"></div>
        </div>

        {/* Categories Navigation Bar */}
        <div className="flex justify-center mb-16">
          <div className="p-2 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/40 shadow-lg flex flex-wrap gap-1 justify-center max-w-full overflow-x-auto">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#7C4DFF] dark:hover:text-[#B388FF]'
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#9E7CFF] shadow-md z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Portfolio Grid Layout */}
        <div className="space-y-8">
          
          {/* A. Featured Centerpiece Card (Azure Palm Villa) - Only shown on "All" or "Villas" filter tab */}
          {(activeTab === 'All' || activeTab === 'Villas') && featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group glass-card rounded-[40px] overflow-hidden border border-slate-200/50 dark:border-slate-800/40 shadow-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center"
            >
              {/* Featured Image */}
              <div className="w-full lg:w-[58%] aspect-[16/10] rounded-3xl overflow-hidden relative shadow-lg">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 uppercase border border-emerald-500/20 shadow-sm backdrop-blur-md">
                    Featured Masterpiece
                  </span>
                </div>
              </div>

              {/* Featured Content Details */}
              <div className="w-full lg:w-[42%] space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-widest text-[#7C4DFF] dark:text-[#B388FF] uppercase">
                    {featuredProject.category} ✦ {featuredProject.specs.size}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#7C4DFF] dark:group-hover:text-[#B388FF] transition-colors duration-300">
                    {featuredProject.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                    <FiMapPin className="text-[#7C4DFF] dark:text-[#B388FF]" />
                    <span>{featuredProject.location}</span>
                  </div>
                </div>

                <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed">
                  {featuredProject.desc} {featuredProject.details}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 dark:border-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col items-center gap-1.5">
                    <FiMaximize size={16} className="text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{featuredProject.specs.size}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 border-x border-slate-100 dark:border-slate-800/40">
                    <IoBedOutline size={18} className="text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{featuredProject.specs.beds} Beds</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <IoWaterOutline size={18} className="text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{featuredProject.specs.baths} Baths</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C4DFF] to-[#9E7CFF] hover:from-[#651FFF] hover:to-[#7C4DFF] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[#7C4DFF]/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:translate-x-1"
                >
                  <span>Explore Masterpiece Details</span>
                  <FiArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* B. Secondary Grid Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {regularProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative glass-card rounded-[32px] overflow-hidden flex flex-col h-full cursor-pointer border border-slate-200/50 dark:border-slate-800/40 hover:border-[#7C4DFF]/30 dark:hover:border-[#B388FF]/30 shadow-lg"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-108"
                    />
                    
                    {/* Dark/Gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70"></div>
                    <div className="absolute inset-0 bg-[#7C4DFF]/10 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 uppercase border border-white/30 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Floating Add/View trigger */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white flex items-center justify-center shadow-lg transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <FiPlus size={18} />
                    </div>
                  </div>

                  {/* Body Text Info */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-[#7C4DFF] dark:group-hover:text-[#B388FF] transition-colors duration-300">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                        <FiMapPin className="text-[#7C4DFF]" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/40 mt-6 flex justify-between items-center text-xs font-semibold text-[#7C4DFF] dark:text-[#B388FF] uppercase tracking-wider">
                      <span>View Gallery & details</span>
                      <FiChevronRight className="group-hover:translate-x-1.5 transition-transform" size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* C. IMMERSIVE LIGHTBOX MODAL WITH SWIPER SLIDESHOW */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl rounded-[40px] overflow-hidden glass-panel border border-slate-100 dark:border-slate-850 shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto lg:overflow-y-visible bg-white dark:bg-[#181124]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white transition-all cursor-pointer shadow-lg hover:scale-105"
                aria-label="Close details"
              >
                <FiX size={18} />
              </button>

              {/* 1. Left side: Swiper Gallery */}
              <div className="w-full lg:w-[55%] bg-slate-950 relative aspect-[16/10] lg:aspect-auto lg:min-h-[520px]">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full h-full"
                >
                  {selectedProject.gallery.map((img, idx) => (
                    <SwiperSlide key={idx} className="w-full h-full flex items-center justify-center">
                      <img
                        src={img}
                        alt={`${selectedProject.title} slide ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* 2. Right side: Details & Enquiry Form */}
              <div className="w-full lg:w-[45%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[520px] lg:max-h-[90vh]">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#7C4DFF] dark:text-[#B388FF] uppercase">
                      Completed Showcase ✦ {selectedProject.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                      <FiMapPin className="text-[#7C4DFF]" />
                      <span>{selectedProject.location}</span>
                    </div>
                  </div>

                  <p className="text-slate-650 dark:text-slate-350 text-xs md:text-sm leading-relaxed">
                    {selectedProject.details || selectedProject.desc}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Completed Year', val: selectedProject.specs.year },
                      { label: 'Total Area Size', val: selectedProject.specs.size },
                    ].map((spec, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/40 text-center">
                        <div className="text-[9px] uppercase font-bold tracking-widest text-slate-400">{spec.label}</div>
                        <div className="text-xs font-bold text-slate-800 dark:text-white mt-1">{spec.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Project Highlights</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.amenities.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-[#7C4DFF]/10 text-[#7C4DFF] dark:bg-[#7C4DFF]/20 dark:text-[#B388FF] text-[10px] font-semibold border border-[#7C4DFF]/10">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default PortfolioSection;
