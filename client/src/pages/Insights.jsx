import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaUserAlt,
  FaBuilding,
} from "react-icons/fa";

const insights = [
  {
    id: 1,
    title: "Future of Luxury Smart Homes in Chennai",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "Explore how futuristic smart homes are transforming premium living experiences.",
    author: "ARKHE Team",
    date: "May 2026",
  },
  {
    id: 2,
    title: "Modern Villa Interior Design Trends",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    desc: "Discover elegant lavender inspired interior trends for luxury villas.",
    author: "Design Studio",
    date: "April 2026",
  },
  {
    id: 3,
    title: "Commercial Spaces With Sustainable Design",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    desc: "Premium eco-friendly commercial spaces built with modern architecture.",
    author: "ARKHE Engineers",
    date: "March 2026",
  },
];

const trends = [
  "Luxury Villas",
  "Smart Homes",
  "Modern Interiors",
  "Sustainable Buildings",
  "Commercial Spaces",
];

const Insights = () => {
  return (
    <div className="bg-[#F5F0FF] min-h-screen text-[#1E1E1E]">

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden py-28 px-6 md:px-16 pt-36">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#E9D5FF] to-[#F5F0FF] opacity-80 pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[5px] text-sm text-[#7C4DFF] mb-4">
              ARKHE Insights
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Future Of{" "}
              <span className="text-[#7C4DFF]">Luxury Living</span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Explore architecture trends, modern interiors, smart homes,
              premium construction ideas, and futuristic real estate insights
              crafted by ARKHE.
            </p>


          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Real Estate"
              className="rounded-[40px] shadow-2xl h-[500px] w-full object-cover"
            />

            <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl px-6 py-5 text-white shadow-lg">
              <h2 className="text-3xl font-bold">250+</h2>
              <p className="text-sm">Luxury Projects Designed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TREND TAGS ── */}
      <section className="px-6 md:px-16 py-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          {trends.map((trend, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="bg-white border border-[#d8c5ff] shadow-md px-6 py-3 rounded-full text-[#7C4DFF] font-medium cursor-pointer select-none"
            >
              {trend}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── INSIGHTS CARDS ── */}
      <section className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-14">
          <div>
            <p className="uppercase text-[#7C4DFF] tracking-[4px] text-sm">
              Latest Articles
            </p>
            <h2 className="text-4xl font-bold mt-2">Explore Our Insights</h2>
          </div>

          <button className="border border-[#7C4DFF] text-[#7C4DFF] px-6 py-3 rounded-full hover:bg-[#7C4DFF] hover:text-white transition-all duration-300 cursor-pointer">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[30px] overflow-hidden shadow-lg border border-[#eee] flex flex-col"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[260px] w-full object-cover hover:scale-110 transition-all duration-500"
                />
              </div>

              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-sm text-[#7C4DFF] mb-4">
                  <FaBuilding />
                  <span>{item.category}</span>
                </div>

                <h3 className="text-2xl font-bold mb-4 leading-snug">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <FaUserAlt />
                    {item.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {item.date}
                  </div>
                </div>

                <button className="flex items-center gap-3 text-[#7C4DFF] font-semibold hover:gap-5 transition-all duration-300 cursor-pointer">
                  Read More
                  <FaArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Insights;
