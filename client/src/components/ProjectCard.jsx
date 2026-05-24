import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiMaximize, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';

const ProjectCard = ({ project }) => {
  const { _id, name, description, price, location, status, type, images, features } = project;
  const mainImage = images && images[0] ? images[0] : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80';

  const statusStyles = {
    Upcoming: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-secondary',
    Ongoing: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20 dark:bg-indigo-500/20 dark:text-indigo-300',
    Completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col h-full group"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider glass-panel text-slate-800 dark:text-slate-200 border border-white/40">
            {type}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border uppercase ${statusStyles[status] || ''}`}>
            {status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Name and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-1.5 font-medium">
            <FiMapPin className="text-primary dark:text-secondary" />
            <span>{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        {/* Specifications Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 dark:border-slate-800/60 mb-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col items-center gap-1">
            <FiMaximize size={15} className="text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{features.size}</span>
          </div>
          {features.bedrooms > 0 ? (
            <div className="flex flex-col items-center gap-1 border-x border-slate-100 dark:border-slate-800/60">
              <IoBedOutline size={16} className="text-slate-400" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">{features.bedrooms} Beds</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 border-x border-slate-100 dark:border-slate-800/60">
              <FiCalendar size={15} className="text-slate-400" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">{features.year} Year</span>
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <IoWaterOutline size={16} className="text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{features.bathrooms || '-'} Baths</span>
          </div>
        </div>

        {/* Footer info (Price & Link) */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Starting From</div>
            <div className="text-lg font-extrabold text-primary dark:text-secondary font-serif">{price}</div>
          </div>

          <Link
            to={`/projects/${_id}`}
            className="w-11 h-11 rounded-full bg-lavender-bg hover:bg-primary dark:bg-slate-800 dark:hover:bg-primary text-primary hover:text-white dark:text-slate-300 dark:hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-[-45deg] shadow-sm cursor-pointer"
            aria-label="View Project Details"
          >
            <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
