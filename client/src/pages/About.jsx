import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiTarget,
  FiAward,
  FiShield,
  FiBriefcase,
} from 'react-icons/fi';

const About = () => {
  const milestones = [
    {
      year: '2008',
      title: 'Founding of ARKHE',
      desc: 'Established with a focus on custom residential craftsmanship and premium structural integrity.',
    },
    {
      year: '2013',
      title: 'Luxury Villa Communities',
      desc: 'Pioneered Chennai gated villa communities with modern French-style architecture.',
    },
    {
      year: '2018',
      title: 'Commercial Skyscrapers',
      desc: 'Delivered our first 30-floor sustainable corporate complex in the financial corridor.',
    },
    {
      year: '2022',
      title: 'Sustainable Gold Certifications',
      desc: 'Standardized solar-paneled facades and green carbon-insulated foundations.',
    },
    {
      year: '2026',
      title: 'AI Smart Estates',
      desc: 'Launching fully voice-controlled carbon-neutral residences defining future luxury living.',
    },
  ];

  const values = [
    {
      icon: <FiAward size={24} />,
      title: 'Uncompromising Quality',
      desc: 'From certified grade steel to Italian white marbles, we source only the finest materials that guarantee timeless durability.',
    },
    {
      icon: <FiShield size={24} />,
      title: 'Intelligent Innovation',
      desc: 'We integrate smart automation, AI-controlled systems, and energy-efficient technologies into every development.',
    },
    {
      icon: <FiBriefcase size={24} />,
      title: 'Eco Sustainability',
      desc: 'Every ARKHE project is designed with green landscapes, solar infrastructure, and carbon-conscious engineering.',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-lavender-bg/30 via-white to-lavender-bg/25 dark:from-dark-bg dark:via-[#130B21] dark:to-dark-bg/95 transition-colors duration-500">

      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-5">

          <span className="px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary uppercase border border-primary/10">
            About ARKHE
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Crafting Living <span className="text-gradient">Legacies</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed">
            Since 2008, ARKHE has redefined structural luxury. We build iconic environments that merge futuristic innovation with timeless architecture.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-28">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white">
              Our Journey of Excellence
            </h2>

            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"></div>

            <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed">
              Founded in Chennai by visionary engineers and architects, ARKHE began with a simple mission — creating architectural masterpieces that redefine urban living.
            </p>

            <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed">
              Over the years, we evolved into a premium real estate brand known for innovation, luxury craftsmanship, sustainable engineering, and next-generation smart infrastructure.
            </p>

            <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed">
              Today, ARKHE stands as a symbol of trust, elegance, and futuristic development across residential and commercial sectors.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[16/11] rounded-[40px] overflow-hidden shadow-2xl border border-white dark:border-slate-800"
          >

            <img
              src="https://voora.co.in/wp-content/uploads/2024/12/A-Name-Trusted-by-Thousand.jpg"
              alt="ARKHE"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent"></div>

          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-28">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group glass-card rounded-[40px] overflow-hidden border border-slate-200/50 dark:border-slate-800/40 shadow-xl"
          >

            <div className="relative h-80 overflow-hidden">

              <img
                src="https://boms.co.in/UploadedFiles/AboutPage/2099ed0a96b44ee9aebe57fc21e44743.jpg"
                alt="Mission"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <FiTarget className="text-white text-xl" />
                </div>

                <h3 className="text-2xl font-serif font-bold text-white">
                  Our Mission
                </h3>

              </div>
            </div>

            <div className="p-8">
              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                To design and deliver world-class architectural spaces using advanced engineering, sustainable innovation, and uncompromising quality standards.
              </p>
            </div>

          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group glass-card rounded-[40px] overflow-hidden border border-slate-200/50 dark:border-slate-800/40 shadow-xl"
          >

            <div className="relative h-80 overflow-hidden">

              <img
                src="https://kdspl.co.in/wp-content/uploads/2020/08/mission-new.jpg"
                alt="Vision"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <FiTrendingUp className="text-white text-xl" />
                </div>

                <h3 className="text-2xl font-serif font-bold text-white">
                  Our Vision
                </h3>

              </div>
            </div>

            <div className="p-8">
              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                To become the global benchmark in sustainable luxury real estate through intelligent technology and visionary design.
              </p>
            </div>

          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mb-28">

          <div className="text-center mb-16">

            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
              Milestones of Growth
            </h2>

            <p className="text-xs uppercase tracking-[4px] text-slate-400 font-bold mt-3">
              A timeline of innovation and trust
            </p>

          </div>

          <div className="relative max-w-5xl mx-auto">

            <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>

            <div className="space-y-14">

              {milestones.map((m, idx) => {
                const even = idx % 2 === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative flex flex-col sm:flex-row items-start"
                  >

                    <div className="absolute left-[18px] sm:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-dark-bg -translate-x-1/2 z-10"></div>

                    <div
                      className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${
                        even
                          ? 'sm:pr-14 sm:text-right'
                          : 'sm:pl-14 sm:ml-auto'
                      }`}
                    >

                      <div className="text-3xl font-bold text-primary mb-2">
                        {m.year}
                      </div>

                      <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                        {m.title}
                      </h4>

                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        {m.desc}
                      </p>

                    </div>

                  </motion.div>
                );
              })}

            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div>

          <div className="text-center mb-16">

            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
              Our Core Philosophy
            </h2>

            <p className="text-xs uppercase tracking-[4px] text-slate-400 font-bold mt-3">
              The standards we live by
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-[32px] border border-slate-100 dark:border-slate-800 p-8 text-center flex flex-col items-center shadow-lg"
              >

                <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary flex items-center justify-center mb-5">
                  {value.icon}
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                  {value.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {value.desc}
                </p>

              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;