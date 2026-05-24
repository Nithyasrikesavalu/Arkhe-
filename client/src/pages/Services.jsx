import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiBriefcase, FiLayers, FiRefreshCw, FiArrowRight, FiPhoneCall } from 'react-icons/fi';

const Services = () => {
  const servicesList = [
    {
      icon: <FiHome size={28} />,
      title: 'Residential Construction',
      desc: 'We construct premium luxury villas, custom oceanfront estates, and carbon-neutral gated residences. Each project includes biophilic integrations, high-insulation structural frameworks, and customizable internal layouts.',
      features: ['Zero-Carbon Emission Designs', 'Smart Automation Prefabs', 'Teak & Hardwood Joinery', 'Underfloor Heating Panels'],
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <FiBriefcase size={28} />,
      title: 'Commercial Buildings',
      desc: 'Corporate hubs, global headquarters, and sustainable mixed-use towers. Designed with solar facades that convert UV light into structural electricity, premium double-height lobbies, and state-of-the-art climate circulation.',
      features: ['LEED Gold Rating Standards', 'Solar-Active Façade Claddings', 'High-Speed Automated Lift Grids', 'Dynamic Work Space Divisions'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <FiLayers size={28} />,
      title: 'Bespoke Interior Design',
      desc: 'Bespoke high-end interiors that mirror French contemporary art. Our design catalogs highlight imported Calacatta white marble tiles, brushed brass lighting grids, custom oak walk-in closets, and spatial acoustic panels.',
      features: ['Custom Acoustic Panelings', 'Imported Italian Marble Layouts', 'Integrated Smart Light Dimming', 'Acoustic Soundproofing Setup'],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <FiRefreshCw size={28} />,
      title: 'Premium Renovation',
      desc: 'Heritage restoration, structural reinforcement, and vintage modernization. We upgrade electrical layouts to support solar batteries, modify wall grids to maximize spatial integration, and reinforce old load-bearing concrete pillars.',
      features: ['Historical Masonry Restoration', 'Structural Seismic Retrofitting', 'Energy Grid Modernizations', 'Wall Removal & Spatial Merging'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Consultation', desc: 'Understanding your vision, evaluating site geography, setting initial budget estimations.' },
    { step: '02', title: 'Concept Design', desc: 'Generating photorealistic 3D renders, architectural layouts, and environmental plans.' },
    { step: '03', title: 'Pre-Engineering', desc: 'Executing soil tests, planning steel load-bearing structures, and choosing structural logs.' },
    { step: '04', title: 'Construction Phase', desc: 'Laying concrete, executing masonry, configuring electric networks, and HVAC assemblies.' },
    { step: '05', title: 'Handover & Finish', desc: 'Applying finishing paint, testing home automation systems, quality inspection, and key delivery.' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-lavender-bg/30 via-white to-lavender-bg/25 dark:from-dark-bg dark:via-[#130B21] dark:to-dark-bg/95 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary uppercase border border-primary/10">
            ARKHE Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Our Architectural <span className="text-gradient">Capabilities</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed">
            From foundation civil engineering to smart voice automation setups, ARKHE offers end-to-end luxury building solutions that prioritize sustainability.
          </p>
        </div>

        {/* Services Listings Grid */}
        <div className="space-y-16 mb-24">
          {servicesList.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/40 dark:bg-slate-900/30 p-8 rounded-[40px] border border-slate-100 dark:border-slate-850 glass-panel shadow-lg ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image panel */}
                <div className={`lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md border ${isEven ? '' : 'lg:order-2'}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text panel */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary flex items-center justify-center shrink-0">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                        <span className="font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-primary/25 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <FiPhoneCall size={12} />
                      Enquire For Service
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Construction Process Section */}
        <div className="bg-slate-950 text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-secondary uppercase">How We Operate</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Construction Process Walkthrough</h2>
            <p className="text-slate-400 text-xs leading-normal">
              A comprehensive view of the timeline phases we maintain across all build commitments.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* Horizontal line for connecting nodes (Desktop only) */}
            <div className="absolute top-[48px] left-[10%] right-[10%] h-0.5 bg-slate-800 hidden md:block z-0"></div>

            {processSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Step Circle */}
                <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-secondary flex items-center justify-center font-serif text-xl font-bold text-secondary shadow-lg">
                  {step.step}
                </div>
                
                <h4 className="font-bold text-slate-200 text-sm tracking-wide font-serif">{step.title}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
