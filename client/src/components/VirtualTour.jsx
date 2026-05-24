import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRotateCw, FiRotateCcw, FiZoomIn, FiInfo, FiCompass, FiPlay, FiPause } from 'react-icons/fi';

const VirtualTour = () => {
  const [panOffset, setPanOffset] = useState(50); // percentage offset (0 to 100)
  const [isRotating, setIsRotating] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Panorama wide-angle luxury interior image
  const panoramaUrl = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80';

  const hotspots = [
    {
      id: 1,
      name: 'Bespoke Smart Console',
      description: 'A voice-integrated panel that regulates solar energy, lighting, climate, and electrochromic glass opacity.',
      x: 35, // Horizontal position as % of panorama width
      y: 65, // Vertical position
    },
    {
      id: 2,
      name: 'Italian Calacatta Marble',
      description: 'Handpicked premium white marble with charcoal veins, featuring underfloor heat induction.',
      x: 52,
      y: 80,
    },
    {
      id: 3,
      name: 'Triple-Glazed Low-E Glass',
      description: 'Smart glass that filters UV radiation and adjusts tint dynamically to block solar heat while maximizing natural light.',
      x: 72,
      y: 45,
    },
  ];

  // Auto rotation effect
  useEffect(() => {
    if (!isRotating) return;

    const interval = setInterval(() => {
      setPanOffset((prev) => {
        let next = prev + 0.15;
        if (next > 100) next = 0;
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isRotating]);

  // Drag handlers for panoramic swipe simulation
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    setIsRotating(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.pageX - startX.current;
    startX.current = e.pageX;

    // Convert pixel delta to pan offset percent
    setPanOffset((prev) => {
      let next = prev - deltaX * 0.12;
      if (next < 0) next = 100;
      if (next > 100) next = 0;
      return next;
    });
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Touch controls for mobile
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    setIsRotating(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - startX.current;
    startX.current = e.touches[0].clientX;

    setPanOffset((prev) => {
      let next = prev - deltaX * 0.12;
      if (next < 0) next = 100;
      if (next > 100) next = 0;
      return next;
    });
  };

  const adjustPan = (amount) => {
    setIsRotating(false);
    setPanOffset((prev) => {
      let next = prev + amount;
      if (next < 0) next = 100;
      if (next > 100) next = 0;
      return next;
    });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-200/50 dark:border-slate-800/50 shadow-xl bg-slate-950">
      {/* 360 View Frame */}
      <div
        ref={containerRef}
        className="relative h-[480px] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
      >
        {/* Panorama Image Layer */}
        <div
          className="absolute top-0 bottom-0 h-full w-[240%] transition-transform duration-75 ease-out"
          style={{
            backgroundImage: `url(${panoramaUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateX(-${(panOffset / 100) * 58}%)`,
          }}
        >
          {/* Hotspots mapped relative to the panning layout */}
          {hotspots.map((spot) => {
            return (
              <button
                key={spot.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
                  setIsRotating(false);
                }}
                className="absolute w-8 h-8 rounded-full bg-primary/80 dark:bg-secondary/85 text-white flex items-center justify-center border-2 border-white cursor-pointer shadow-lg animate-pulse-slow hover:scale-110 transition-transform duration-300"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                }}
              >
                <FiInfo size={14} />
              </button>
            );
          })}
        </div>

        {/* Compass Overlay */}
        <div className="absolute top-6 left-6 p-3 rounded-full glass-panel flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 pointer-events-none">
          <FiCompass className="animate-spin" style={{ animationDuration: '8s' }} size={16} />
          <span>360° IMMERSIVE WALKTHROUGH</span>
        </div>

        {/* Hotspot details banner */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md p-5 rounded-2xl glass-panel text-slate-800 dark:text-slate-200 border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start gap-4">
                <h4 className="font-serif font-bold text-base text-primary dark:text-secondary">
                  {activeHotspot.name}
                </h4>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {activeHotspot.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-2.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isRotating ? 'Pause auto pan' : 'Play auto pan'}
          >
            {isRotating ? <FiPause size={18} /> : <FiPlay size={18} />}
          </button>
          <span className="text-xs tracking-wider text-slate-400 uppercase font-semibold">
            {isRotating ? 'Auto Rotating' : 'Manual Navigation'}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => adjustPan(-5)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Pan Left"
          >
            <FiRotateCcw size={16} />
          </button>
          <button
            onClick={() => adjustPan(5)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Pan Right"
          >
            <FiRotateCw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
