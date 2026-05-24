import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiChevronDown, FiCompass } from 'react-icons/fi';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'Does ARKHE offer custom residential floor designs?',
      a: 'Yes, we collaborate with leading global architects to generate personalized 3D blueprints, custom structural loads, and unique biophilic layouts that fit your property shape.',
    },
    {
      q: 'How does ARKHE integrate energy sustainability?',
      a: 'We configure structures featuring solar active glass facade claddings, underfloor heat grids, carbon-neutral foundation insulations, and integrated rainwater recycling grids.',
    },
    {
      q: 'What regions do you develop properties in?',
      a: 'Our premium residential and commercial developments are primarily focused in high-end financial districts, private coastal shorelines, and smart tech corridors.',
    },
    {
      q: 'Are site inspections or initial consultations free?',
      a: 'Absolutely. We offer complimentary site valuations, soil assessment reports, and cost blueprint estimations for all genuine inquiries.',
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-lavender-bg/30 via-white to-lavender-bg/25 dark:from-dark-bg dark:via-[#130B21] dark:to-dark-bg/95 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary uppercase border border-primary/10">
            Contact ARKHE
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Start Your <span className="text-gradient">Dream Project</span> Today
          </h1>
          <p className="text-slate-600 dark:text-slate-355 text-sm md:text-base leading-relaxed">
            Have questions about pricing, layouts, or sustainable permits? Connect with our premium consultant desk for immediate support.
          </p>
        </div>

        {/* Contact info cards & form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column (Coordinates & Map) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Head Office Details</h3>
            
            {/* Cards */}
            <div className="space-y-4">
              {[
                { icon: <FiMapPin size={18} />, label: 'Headquarters', val: '108 Futuristic Square, Suite 400, Tech Park, Chennai' },
                { icon: <FiPhone size={18} />, label: 'Advisor Hotline', val: '+91 98765 43210 / +91 98765 43211' },
                { icon: <FiMail size={18} />, label: 'Official Desk', val: 'concierge@arkheestates.com' },
                { icon: <FiClock size={18} />, label: 'Operating Hours', val: 'Mon - Sat: 9:00 AM - 6:00 PM (GMT +5:30)' },
              ].map((coord, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary flex items-center justify-center shrink-0">
                    {coord.icon}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{coord.label}</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white mt-1 leading-relaxed">{coord.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Contact Form) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Quick answers about our builds</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/40 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer text-sm"
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown
                      className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
                      size={18}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-1 text-slate-650 dark:text-slate-400 text-xs md:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
