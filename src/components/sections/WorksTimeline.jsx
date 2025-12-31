import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { worksData } from '../../data/worksData';
import PhoneMockup from '../ui/PhoneMockup';

const WorksTimeline = () => {
  const containerRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);
  
  // FIXED LOGIC: Changed to b.id - a.id to show Newest (Highest ID) first
  const sortedWorks = useMemo(() => {
    return [...worksData].sort((a, b) => b.id - a.id);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const contentWidth = containerRef.current.scrollWidth;
      const visibleWidth = window.innerWidth;
      // Recalculate drag limit for the new order
      setDragLimit(-(contentWidth - visibleWidth * 0.8)); 
    }
  }, [sortedWorks]);

  return (
    <section id="mes-traveaux" className="py-20 bg-black overflow-hidden select-none">
      <div className="px-6 mb-12 md:mb-20 relative z-10">
        <h2 className="text-center text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
          Mes <span className="text-blue-500">travaux</span>
        </h2>
        <p className="text-center text-gray-500 font-mono text-xs mt-4 uppercase tracking-[0.3em]">
          Dernières réalisations
        </p>
      </div>

      {/* MOBILE: Horizontal Snap - Shows Newest First */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 gap-6 pb-10">
        {sortedWorks.map((work) => (
          <div key={work.id} className="min-w-[85vw] snap-center flex flex-col items-center">
            <PhoneMockup videoSrc={work.videoSrc} />
            <div className="text-center mt-6 bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] w-full backdrop-blur-xl">
              <p className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-2">{work.date}</p>
              <h3 className="text-white text-xl font-bold">{work.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: Interactive Drag Timeline - Starts with Newest */}
      <div className="hidden md:block relative h-[850px]">
        {/* Central Timeline Axis with Glow */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-0" />

        <motion.div 
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: dragLimit }}
          className="flex items-center h-full px-[10vw] cursor-grab active:cursor-grabbing relative z-10"
        >
          <div className="flex gap-20 items-center">
            {sortedWorks.map((work, index) => {
              const isUp = index % 2 === 0;

              return (
                <motion.div 
                  key={work.id} 
                  initial={{ opacity: 0, y: isUp ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative flex flex-col items-center min-w-[350px]"
                >
                  {/* Project Card (Alternating) */}
                  <div className={`flex flex-col items-center transition-all duration-700
                    ${isUp ? '-translate-y-32 group-hover:-translate-y-36' : 'translate-y-32 group-hover:translate-y-36'}`}>
                    
                    <PhoneMockup videoSrc={work.videoSrc} />
                    
                    <div className="text-center mt-8">
                      <span className="px-4 py-1 rounded-full border border-blue-500/20 text-blue-400 font-mono text-[9px] uppercase tracking-[0.2em] bg-blue-500/5">
                        {work.date}
                      </span>
                      <h3 className="text-white text-2xl font-black tracking-tighter mt-4 group-hover:text-blue-400 transition-colors">
                        {work.title}
                      </h3>
                    </div>
                  </div>

                  {/* Vertical Connector Line */}
                  <div className={`absolute left-1/2 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0
                    ${isUp ? 'top-[50%] h-40' : 'bottom-[50%] h-40'}`} 
                  />
                  
                  {/* Connection Point (Dot) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black border border-blue-500 rounded-full z-20 shadow-[0_0_15px_rgba(59,130,246,1)]" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="hidden md:flex justify-center items-center gap-4 mt-10">
        <span className="h-[1px] w-12 bg-gray-800"></span>
        <p className="text-gray-500 text-[9px] uppercase tracking-[0.5em] animate-pulse">
          Glissez pour explorer les archives
        </p>
        <span className="h-[1px] w-12 bg-gray-800"></span>
      </div>
    </section>
  );
};

export default WorksTimeline;