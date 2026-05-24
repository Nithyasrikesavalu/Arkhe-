import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import toast from 'react-hot-toast';
import { FiMapPin, FiMaximize, FiCalendar, FiArrowLeft, FiCompass, FiDownload, FiCheck, FiLayers } from 'react-icons/fi';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsSkeleton from '../components/SkeletonLoader';
import VirtualTour from '../components/VirtualTour';
import { projectsData } from '../projectsData';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [project, setProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch project details & similar recommendations
  useEffect(() => {
    setLoading(true);
    try {
      const found = projectsData.find(p => p._id === id);
      if (found) {
        setProject(found);
        
        // Fetch similar projects
        const recommendations = projectsData
          .filter(p => p._id !== id && p.type === found.type)
          .slice(0, 3);
        setSimilarProjects(recommendations);
      } else {
        toast.error('Project not found.');
        navigate('/projects');
      }
    } catch (error) {
      console.error('Error finding project details:', error.message);
      toast.error('Unable to fetch project details.');
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [id, navigate]);



  // Generate and download mock brochure PDF/Text file
  const downloadBrochure = () => {
    if (!project) return;

    const content = `
=========================================
ARKHE LUXURY REAL ESTATE PLATFORM
OFFICIAL PROJECT BROCHURE
=========================================

PROJECT: ${project.name}
TYPE: ${project.type}
STATUS: ${project.status}
LOCATION: ${project.location}
STARTING PRICE: ${project.price}

-----------------------------------------
SPECIFICATIONS & SIZE
-----------------------------------------
Total Area: ${project.features.size}
Bedrooms: ${project.features.bedrooms} BHK
Bathrooms: ${project.features.bathrooms} Baths
Floors: ${project.features.floors} Floors
Completed/Estimated Year: ${project.features.year}

-----------------------------------------
AMENITIES
-----------------------------------------
${project.amenities.map(a => `- ${a}`).join('\n')}

-----------------------------------------
PROJECT DESCRIPTION
-----------------------------------------
${project.longDescription}

-----------------------------------------
CONTACT ADVISOR
-----------------------------------------
Website: https://voora.co.in/ (Inspiration)
Arkhe Desk: +91 98765 43210
Address: 108 Futuristic Square, Tech Park

=========================================
Thank you for interest in ARKHE Estates.
Building Future Landmarks since 2008.
=========================================
    `;

    // Trigger download
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ARKHE_${project.name.replace(/\s+/g, '_')}_Brochure.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Brochure document downloaded successfully!');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32">
        <ProjectDetailsSkeleton />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Project not found</h2>
        <Link to="/projects" className="mt-4 text-primary font-medium hover:underline">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-lavender-bg/30 via-white to-lavender-bg/25 dark:from-dark-bg dark:via-[#130B21] dark:to-dark-bg/95 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary mb-8 transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to Catalog
        </Link>

        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary uppercase border border-primary/20">
                {project.type}
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 uppercase border border-emerald-500/20">
                {project.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
              {project.name}
            </h1>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide">
              <span>📍 {project.location}</span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-4 lg:text-right p-6 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Starting Price</span>
            <div className="text-3xl font-extrabold text-primary dark:text-secondary font-serif mt-1">
              {project.price}
            </div>
            <button
              onClick={downloadBrochure}
              className="w-full mt-4 py-3 rounded-2xl bg-slate-900 hover:bg-primary dark:bg-slate-800 dark:hover:bg-primary text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-primary/25"
            >
              <FiDownload size={14} />
              Download Brochure
            </button>
          </div>
        </div>

        {/* Gallery Slider */}
        <div className="rounded-[40px] overflow-hidden mb-16 shadow-2xl border-4 border-white/60 dark:border-slate-800/40 relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="aspect-[16/9] md:aspect-[21/9]"
          >
            {project.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`${project.name} slide ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
          {[
            { label: 'Total Area', val: project.features.size, icon: <FiMaximize size={22} /> },
            { label: 'Bedrooms', val: project.features.bedrooms > 0 ? `${project.features.bedrooms} BHK` : 'N/A', icon: <IoBedOutline size={24} /> },
            { label: 'Bathrooms', val: project.features.bathrooms > 0 ? `${project.features.bathrooms} Baths` : 'N/A', icon: <IoWaterOutline size={24} /> },
            { label: 'Floors Configuration', val: `${project.features.floors} Floors`, icon: <FiLayers size={22} /> },
            { label: 'Completion Year', val: project.features.year, icon: <FiCalendar size={22} /> },
          ].map((spec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary flex items-center justify-center shrink-0">
                {spec.icon}
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{spec.label}</div>
                <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{spec.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Layout Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column (Details / Amenities) */}
          <div className="lg:col-span-12 space-y-12">
            
            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Project Overview</h3>
              <div className="w-12 h-0.5 bg-primary rounded-full"></div>
              <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Premium Amenities</h3>
              <div className="w-12 h-0.5 bg-primary rounded-full"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shrink-0">
                      <FiCheck size={14} />
                    </div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated 360 Virtual Tour */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Virtual Tour</h3>
              <div className="w-12 h-0.5 bg-primary rounded-full"></div>
              <VirtualTour />
            </div>

          </div>

        </div>

        

      </div>
    </div>
  );
};

export default ProjectDetails;
