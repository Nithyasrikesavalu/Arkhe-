import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhoneCall, FiArrowUpRight } from 'react-icons/fi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'About',     path: '/about' },
    { name: 'Services',  path: '/services' },
    { name: 'Projects',  path: '/projects' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Insights',  path: '/insights' },
  ];

  const handleConsultation = () => {
    navigate('/contact');
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 glass-panel shadow-lg shadow-[#7C4DFF]/5 border-b border-white/40'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="group flex items-baseline gap-1.5 transition-all duration-300"
        >
          <span className="text-2xl font-bold font-serif tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#7C4DFF] to-[#B388FF] group-hover:from-[#651FFF] group-hover:to-[#9E7CFF] transition-all duration-500">
            ARKHE
          </span>
          <span className="text-[10px] font-sans font-semibold tracking-[0.3em] text-slate-400 uppercase pb-0.5">
            Estates
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium tracking-wide rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-[#7C4DFF]'
                    : 'text-slate-600 hover:text-[#7C4DFF] hover:bg-[#7C4DFF]/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navActivePill"
                      className="absolute inset-0 rounded-xl bg-[#7C4DFF]/8 border border-[#7C4DFF]/15 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center">
          <button
            onClick={handleConsultation}
            className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full
                       bg-gradient-to-r from-[#7C4DFF] to-[#9E7CFF]
                       text-white text-sm font-semibold tracking-wide
                       shadow-[0_4px_20px_rgba(124,77,255,0.3)]
                       hover:shadow-[0_6px_28px_rgba(124,77,255,0.45)]
                       hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Shine sweep on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 ease-in-out" />
            <FiPhoneCall size={13} />
            <span>Get Consultation</span>
            <FiArrowUpRight size={13} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </button>
        </div>

        {/* ── Mobile Toggle ── */}
        <div className="flex md:hidden items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl glass-panel text-slate-700 cursor-pointer border border-white/40 shadow-sm"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMobileMenuOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-[#F5F0FF]/96 backdrop-blur-2xl z-40 flex flex-col justify-between p-8 border-t border-[#7C4DFF]/10"
          >
            <nav className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-medium tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'bg-[#7C4DFF]/10 text-[#7C4DFF] font-bold border border-[#7C4DFF]/15'
                          : 'text-slate-700 hover:bg-[#7C4DFF]/6 hover:text-[#7C4DFF]'
                      }`
                    }
                  >
                    {link.name}
                    <FiArrowUpRight size={16} className="opacity-40" />
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-4 pb-4">
              <button
                onClick={handleConsultation}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7C4DFF] to-[#9E7CFF] text-white font-semibold tracking-wide text-center shadow-lg shadow-[#7C4DFF]/25 flex justify-center items-center gap-2 cursor-pointer"
              >
                <FiPhoneCall size={16} />
                Get Consultation
              </button>
              <p className="text-center text-[11px] text-slate-400 tracking-wide">
                © 2026 ARKHE Estates. All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
