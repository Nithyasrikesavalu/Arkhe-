import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import axios from 'axios';
import { FiArrowRight, FiShield, FiAward, FiCpu, FiTrendingUp, FiCheckCircle, FiUsers, FiStar, FiArrowUp } from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';
import ProjectCard from '../components/ProjectCard';
import ProjectCardSkeleton from '../components/SkeletonLoader';
import { projectsData } from '../projectsData';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home = () => {
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedProject, setCompletedProject] = useState(null);
  const navigate = useNavigate();
  const [showScroll, setShowScroll] = useState(false);

  // Scroll categories
  const categories = [
    'Luxury Villas',
    'Commercial Projects',
    'Interior Construction',
    'Smart Homes',
    'Renovation',
    'Architecture',
  ];

  // Client Testimonials
  const testimonials = [
    {
      name: 'Alessandro Lorenzo',
      role: 'CEO, Lorenzo Enterprises',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
      comment: 'ARKHE did not just build our corporate headquarters; they created a masterpiece that reflects our environmental values and future goals. Their engineering precision is truly unmatched.',
    },
    {
      name: 'Dr. Evelyn Sinclair',
      role: 'Homeowner, Villa Serenita',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
      comment: 'The team at ARKHE turned our vision into reality. Every material used feels ultra-premium, and the built-in home automation system works flawlessly. Highly recommend their bespoke villas.',
    },
    {
      name: 'Marcus Thorne',
      role: 'Managing Partner, Zenith Capital',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
      comment: 'Their execution timeline was impeccable. 98% on-time completion was a core reason we chose ARKHE, and they delivered exactly on schedule with exceptional attention to finishing details.',
    },
  ];

  useEffect(() => {
    try {
      // Filter upcoming projects
      const upcoming = projectsData.filter(p => p.status === 'Upcoming').slice(0, 3);
      setUpcomingProjects(upcoming);
      
      // Set Azure Palm Villa as completed featured project if it exists
      const azure = projectsData.find(p => p.name === 'Azure Palm Villa') || projectsData.find(p => p.status === 'Completed');
      setCompletedProject(azure);
    } catch (error) {
      console.error('Error loading home projects:', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Scroll-to-top effect
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center bg-gradient-to-br from-lavender-bg via-white to-lavender-light/50 dark:from-dark-bg dark:via-[#130B21] dark:to-dark-bg/95 transition-colors duration-500">
        {/* Soft Background Gradients */}
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/20 dark:bg-secondary/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary uppercase border border-primary/10">
              Future Architectures
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-[1.1] text-slate-900 dark:text-white">
              Building Future <br />
              <span className="text-gradient">Landmarks</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-xl">
              We design, engineer, and construct exceptional spaces that stand the test of time with innovation, sustainability, and luxurious architecture.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold tracking-wide shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
              >
                Get Free Consultation
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 rounded-full glass-panel hover:bg-lavender-light dark:hover:bg-primary-dark/20 text-slate-800 dark:text-white font-semibold tracking-wide transition-all duration-300 hover:-translate-y-1"
              >
                View Projects
              </Link>
            </div>

            {/* Premium Metrics Row below buttons */}
            <div className="flex flex-wrap gap-6 items-center pt-8 border-t border-slate-200/40 dark:border-slate-800/40 mt-8">
              {/* Stat 1: 15+ Years */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C4DFF] to-[#B388FF] text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(124,77,255,0.25)] animate-pulse-slow">
                  <FiAward className="text-lg text-white" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-serif font-black text-gradient leading-none">
                    <AnimatedCounter value={15} suffix="+" />
                  </div>
                  <div className="text-[9px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 mt-1.5">
                    Years Experience
                  </div>
                </div>
              </div>

              {/* Divider line */}
              <div className="hidden sm:block w-[1px] h-8 bg-slate-200 dark:bg-slate-800"></div>

              {/* Stat 2: 500+ Clients */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B388FF]/10 dark:bg-[#7C4DFF]/20 text-[#7C4DFF] dark:text-[#B388FF] flex items-center justify-center shrink-0">
                  <FiUsers className="text-lg" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-serif font-extrabold text-slate-900 dark:text-white leading-none">
                    <AnimatedCounter value={500} suffix="+" />
                  </div>
                  <div className="text-[9px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 mt-1.5">
                    Happy Clients
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center w-full"
          >
            <div className="relative w-full max-w-md md:max-w-lg aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/60 dark:border-slate-800/40 group z-10">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                {[
                  {
                    src: "https://voora.co.in/wp-content/uploads/al_opt_content/IMAGE/voora.co.in/wp-content/uploads/2025/01/new_home_mob.webp.bv_resized_mobile.webp.bv.webp?bv_host=voora.co.in",
                    title: "ARKHE Apex Residence",
                    type: "Futuristic Smart Home",
                    loc: "Nungambakkam, Chennai"
                  },
                  {
                    src: "https://voora.co.in/wp-content/uploads/al_opt_content/IMAGE/voora.co.in/wp-content/uploads/2025/11/one-sea-project.jpg.bv_.webp.bv.webp?bv_host=voora.co.in",
                    title: "ARKHE Oceanfront Villa",
                    type: "Super-Luxury Waterfront",
                    loc: "East Coast Road, Chennai"
                  },
                  {
                    src: "https://voora.co.in/wp-content/uploads/al_opt_content/IMAGE/voora.co.in/wp-content/uploads/2025/08/beckford-nungambakkam-apartments-1.webp.bv.webp?bv_host=voora.co.in",
                    title: "ARKHE Beckford Elite",
                    type: "Contemporary Duplexes",
                    loc: "Nungambakkam, Chennai"
                  },
                  {
                    src: "https://voora.co.in/wp-content/uploads/al_opt_content/IMAGE/voora.co.in/wp-content/uploads/2025/07/VOORA-westside-2.webp.bv.webp?bv_host=voora.co.in",
                    title: "ARKHE Westside Plaza",
                    type: "High-End Commercial Hub",
                    loc: "Anna Nagar, Chennai"
                  }
                ].map((slide, idx) => (
                  <SwiperSlide key={idx} className="w-full h-full hero-carousel-slide relative">
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    
                    {/* Index Badge */}
                    <div className="absolute top-6 right-6 hero-slide-badge z-20">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-serif font-extrabold bg-white/20 dark:bg-slate-900/40 text-white border border-white/25 backdrop-blur-md shadow-lg">
                        0{idx + 1} / 04
                      </span>
                    </div>

                    {/* Floating Luxury Info Panel */}
                    <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-panel border border-white/25 dark:border-slate-800/40 shadow-xl hero-slide-info z-20 space-y-1">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-[#7C4DFF] dark:text-[#B388FF]">
                        {slide.type}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
                        {slide.title}
                      </h3>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide flex items-center gap-1">
                        <span>📍</span> {slide.loc}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </div>

        {/* Scrolling categories marquee */}
        <div className="mt-24 border-y border-slate-200/50 dark:border-slate-800/50 py-6 overflow-hidden bg-white/30 dark:bg-slate-900/10 backdrop-blur-sm">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...categories, ...categories].map((cat, idx) => (
              <span
                key={idx}
                className="text-lg md:text-xl font-bold tracking-wider font-serif text-slate-400 dark:text-slate-600 hover:text-primary dark:hover:text-secondary transition-colors cursor-default"
              >
                ✦ {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-24 bg-white dark:bg-dark-card transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {[
              {
                icon: <FiShield size={26} />,
                title: 'Premium Materials',
                desc: 'Locally sourced custom timbers, Calacatta granite, and certified structural steel.',
              },
              {
                icon: <FiAward size={26} />,
                title: 'Expert Engineers',
                desc: 'Highly trained professionals executing strict architectural blueprints.',
              },
              {
                icon: <FiCpu size={26} />,
                title: 'Sustainable Build',
                desc: 'Integrated rainwater filters, solar panel systems, and carbon insulation.',
              },
              {
                icon: <FiTrendingUp size={26} />,
                title: 'Timely Delivery',
                desc: 'Rigid timeline milestones showing 98% historical on-time handovers.',
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:bg-lavender-bg/30 dark:hover:bg-slate-900 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h4 className="font-bold text-base text-slate-800 dark:text-white mb-2">{card.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-secondary uppercase">
              Core Legacy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-slate-900 dark:text-white">
              Where Vision <br />
              Meets Craft
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
              Since 2008, ARKHE has been at the forefront of premium construction and architectural design. We merge traditional craftsmanship with cutting-edge technology, creating structures that are not just buildings — but living legacies.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              Every detail, from foundational reinforcement to smart environmental integration, is monitored to provide residences that inspire and businesses that empower.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-semibold text-primary dark:text-secondary hover:text-primary-dark group transition-colors cursor-pointer"
              >
                <span>Read Our Full Story</span>
                <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 bg-lavender-bg/40 dark:bg-dark-bg transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary dark:text-secondary uppercase">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white">Our Services</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Residential Construction',
              image: 'https://voora.co.in/wp-content/uploads/al_opt_content/IMAGE/voora.co.in/wp-content/uploads/2024/12/westside-1.jpg.bv.webp?bv_host=voora.co.in',
              desc: 'Custom-built premium villas and luxurious smart estates with zero-carbon designs.',
            },
            {
              title: 'Commercial Buildings',
              image: 'https://voora.co.in/wp-content/uploads/al_opt_content/IMAGE/voora.co.in/wp-content/uploads/2025/06/Voora_One-Sea_View6_19-04-25-1.jpg.bv.webp?bv_host=voora.co.in',
              desc: 'High-density business towers, sustainable corporate complexes, and green offices.',
            },
            {
              title: 'Interior Design',
              image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
              desc: 'Bespoke high-end interiors showcasing imported marbles, customized paneling and lighting.',
            },
            {
              title: 'Renovation',
              image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
              desc: 'Premium upgrades and heritage restoration combining modern features with history.',
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-[32px] overflow-hidden flex flex-col h-full group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold font-serif text-lg text-slate-800 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary dark:text-secondary group/btn cursor-pointer"
                  >
                    <span>Learn More</span>
                    <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. UPCOMING PROJECTS SECTION */}
      <section className="py-24 bg-white dark:bg-dark-card transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-secondary uppercase">Highly Anticipated</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white">Upcoming Projects</h2>
          </div>
          <Link
            to="/projects"
            className="px-6 py-3 rounded-full bg-slate-900 hover:bg-primary dark:bg-slate-800 dark:hover:bg-primary text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-primary/20 cursor-pointer"
          >
            Explore All Listings
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array(3)
                .fill(0)
                .map((_, idx) => <ProjectCardSkeleton key={idx} />)}
            </div>
          ) : upcomingProjects.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="pb-16 upcoming-projects-swiper"
            >
              {upcomingProjects.map((project) => (
                <SwiperSlide key={project._id} className="py-4">
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="py-12 text-center text-slate-400">
              No upcoming projects found. Run backend seeder or connection.
            </div>
          )}
        </div>
      </section>

      {/* 5. COMPLETED PROJECTS SECTION (Featured Azure Palm Villa) */}
      {completedProject && (
        <section className="py-24 bg-lavender-bg/30 dark:bg-dark-bg/80 border-t border-b border-slate-100 dark:border-slate-900 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 space-y-4">
              <span className="text-xs font-bold tracking-widest text-primary dark:text-secondary uppercase">Signature Landmark</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white">Featured Completed Project</h2>
            </div>

            {/* Asymmetric layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Image Showcase */}
              <div className="lg:col-span-7 relative">
                <div className="aspect-[16/10] rounded-[36px] overflow-hidden shadow-2xl border border-white dark:border-slate-800">
                  <img
                    src={completedProject.images[0]}
                    alt={completedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating specifications panel */}
                <div className="absolute bottom-[-30px] right-6 p-6 rounded-3xl glass-panel shadow-2xl border flex gap-6 max-w-sm hidden sm:flex">
                  <div>
                    <div className="text-2xl font-bold font-serif text-primary dark:text-secondary">{completedProject.features.size}</div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Area</div>
                  </div>
                  <div className="border-l border-slate-300 dark:border-slate-700/60 pl-6">
                    <div className="text-2xl font-bold font-serif text-primary dark:text-secondary">{completedProject.features.bedrooms} BHK</div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Configuration</div>
                  </div>
                </div>
              </div>

              {/* Text Description */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex gap-2">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-emerald-500/10 text-emerald-500 uppercase border border-emerald-500/25">
                    Completed
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-bold tracking-wider glass-panel text-slate-700 dark:text-slate-300 uppercase">
                    {completedProject.type}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white">
                  {completedProject.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  📍 {completedProject.location}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {completedProject.longDescription || completedProject.description}
                </p>
                <div className="pt-2">
                  <Link
                    to={`/projects/${completedProject._id}`}
                    className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-medium text-sm tracking-wide shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 w-fit cursor-pointer"
                  >
                    <span>View Architectural Gallery</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. TRUST STATISTICS SECTION */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        {/* Particle circles */}
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-secondary uppercase">ARKHE Certified</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold">Build On Trust Driven By Excellence</h2>
            <p className="text-slate-400 text-xs md:text-sm">
              We stand by transparent engineering standards and environmental integrations that set benchmarks globally.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { val: '15', suff: '+ Years', label: 'Experience' },
              { val: '250', suff: '+', label: 'Projects Delivered' },
              { val: '100', suff: '%', label: 'Certified Engineers' },
              { val: '98', suff: '%', label: 'On-Time Completion' },
              { val: '1', suff: 'A+', label: 'Sustainable Materials' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-secondary">
                  {stat.val === '1' ? 'A+' : <AnimatedCounter value={stat.val} suffix={stat.suff} />}
                </div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="py-24 bg-white dark:bg-dark-card transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-secondary uppercase">References</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white">What Our Clients Say</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="pb-16"
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="glass-card rounded-[36px] p-8 md:p-12 border border-slate-100 dark:border-slate-800 text-center space-y-6">
                    {/* Stars */}
                    <div className="flex justify-center text-amber-400 gap-1">
                      {Array(t.rating)
                        .fill(0)
                        .map((_, sIdx) => (
                          <FiStar key={sIdx} fill="currentColor" size={18} />
                        ))}
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg italic leading-relaxed font-serif max-w-2xl mx-auto">
                      "{t.comment}"
                    </p>

                    {/* Author Details */}
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-wide">{t.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 8. CONTACT CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-lavender-bg via-white to-lavender-light/50 dark:from-dark-bg dark:via-[#130B21] dark:to-dark-bg/95 relative transition-colors duration-500 border-t border-slate-200/40 dark:border-slate-800/40">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Let's Shape Your <br />
            <span className="text-gradient">Living Legacy</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            Connect with our premium consultants and architects. We offer customized design sketches, site valuations, and comprehensive structure estimates.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold tracking-wide shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              Start Your Dream Project Today
            </Link>
          </div>
        </div>
      </section>
      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        >
          <FiArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Home;
