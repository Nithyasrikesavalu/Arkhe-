import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSend, FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800 pt-20 pb-8 overflow-hidden">
      {/* Top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C4DFF]/60 to-transparent" />
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7C4DFF]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Company Summary */}
        <div className="space-y-6">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold font-serif tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#7C4DFF] to-[#B388FF]">
              ARKHE
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            ARKHE is a premium luxury architecture and construction company delivering futuristic living experiences since 2008.
          </p>
          <div className="flex space-x-3 pt-2">
            {[
              { icon: <FiFacebook size={16} />, href: 'https://facebook.com' },
              { icon: <FiInstagram size={16} />, href: 'https://instagram.com' },
              { icon: <FiTwitter size={16} />, href: 'https://twitter.com' },
              { icon: <FiLinkedin size={16} />, href: 'https://linkedin.com' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-[#7C4DFF] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7C4DFF]/30 border border-slate-700/50 hover:border-[#7C4DFF]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="text-white font-semibold text-lg tracking-wide mb-6 font-serif">Services</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            {[
              { name: 'Residential Construction', path: '/services' },
              { name: 'Commercial Buildings', path: '/services' },
              { name: 'Bespoke Interior Design', path: '/services' },
              { name: 'Historic Renovations', path: '/services' },
            ].map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="hover:text-secondary hover:translate-x-1 inline-block transition-all duration-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects Links */}
        <div>
          <h4 className="text-white font-semibold text-lg tracking-wide mb-6 font-serif">Projects</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            {[
              { name: 'Azure Palm Villa', path: '/projects' },
              { name: 'The Meridian Tower', path: '/projects' },
              { name: 'Villa Serenita', path: '/projects' },
              { name: 'Crescent Business Hub', path: '/projects' },
            ].map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="hover:text-secondary hover:translate-x-1 inline-block transition-all duration-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-6">
          <h4 className="text-white font-semibold text-lg tracking-wide mb-6 font-serif">Newsletter</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Subscribe to receive premium listings, architectural trends, and seasonal insights.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-full bg-slate-800/80 border border-slate-700/80 focus:border-primary text-white text-sm focus:outline-none placeholder-slate-500 pr-12 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 w-10 h-10 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="Subscribe"
            >
              <FiSend size={14} />
            </button>
          </form>
          <div className="flex items-start gap-2.5 text-xs text-slate-500">
            <FiMapPin className="text-secondary shrink-0 mt-0.5" size={14} />
            <span>108 Futuristic Square, Suite 400, Tech Park</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative max-w-7xl mx-auto px-6 border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        {/* Top accent */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#7C4DFF]/20 to-transparent" />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C4DFF]/60" />
          © 2026 ARKHE Luxury Real Estate Platform. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-slate-300 hover:text-[#B388FF] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 hover:text-[#B388FF] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 hover:text-[#B388FF] transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
