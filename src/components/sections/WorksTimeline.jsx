import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { worksData } from '../../data/worksData';
import PhoneMockup from '../ui/PhoneMockup';

const WorksTimeline = () => {
  const containerRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);
  
  // Logic: ID 1, 2, 3... (Oldest to Newest)
  const sortedWorks = useMemo(() => {
    return [...worksData].sort((a, b) => a.id - b.id);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const contentWidth = containerRef.current.scrollWidth;
      const visibleWidth = window.innerWidth;
      // Allows dragging all the way to the newest project on the far right
      setDragLimit(-(contentWidth - visibleWidth * 0.8)); 
    }
  }, [sortedWorks]);

  return (
    <section id="mes-traveaux" className="py-20 bg-black overflow-hidden select-none">
      <div className="px-6 mb-12 md:mb-20">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white uppercase tracking-widest">
          Mes travaux
        </h2>
        <p className="text-center text-blue-500 font-mono text-sm mt-2">Découvrez l'évolution de mes projets</p>
      </div>

      {/* MOBILE: Horizontal Snap */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 gap-6 pb-10">
        {sortedWorks.map((work) => (
          <div key={work.id} className="min-w-[85vw] snap-center flex flex-col items-center">
            <PhoneMockup videoSrc={work.videoSrc} />
            <div className="text-center mt-6 bg-white/5 p-5 rounded-3xl border border-white/10 w-full backdrop-blur-sm">
              <p className="text-blue-500 font-mono text-xs uppercase tracking-tighter">{work.date}</p>
              <h3 className="text-white text-lg font-bold">{work.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: Interactive Drag Timeline */}
      <div className="hidden md:block relative h-[850px]">
        {/* Central Timeline Axis */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 z-0" />

        <motion.div 
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: dragLimit }}
          className="flex items-center h-full px-[15vw] cursor-grab active:cursor-grabbing relative z-10"
        >
          <div className="flex gap-28 items-center">
            {sortedWorks.map((work, index) => {
              const isUp = index % 2 === 0;

              return (
                <motion.div 
                  key={work.id} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative flex flex-col items-center min-w-[320px]"
                >
                  {/* Project Card (Alternating Position) */}
                  <div className={`flex flex-col items-center transition-transform duration-500
                    ${isUp ? '-translate-y-28' : 'translate-y-28'}`}>
                    
                    <PhoneMockup videoSrc={work.videoSrc} />
                    
                    <div className="text-center mt-6">
                      <span className="px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 font-mono text-[10px] uppercase tracking-widest bg-blue-500/5">
                        {work.date}
                      </span>
                      <h3 className="text-white text-xl font-bold tracking-tight mt-3">{work.title}</h3>
                    </div>
                  </div>

                  {/* Connector to Axis */}
                  <div className={`absolute left-1/2 w-[1px] bg-gradient-to-t from-transparent via-blue-500/50 to-transparent
                    ${isUp ? 'top-[50%] h-32' : 'bottom-[50%] h-32'}`} 
                  />
                  
                  {/* Dot on Axis */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-blue-500 rounded-full z-20 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <p className="hidden md:block text-center text-gray-500 text-[10px] mt-10 animate-pulse uppercase tracking-[0.4em]">
        Glissez vers la droite pour voir mes projets récents →
      </p>
    </section>
  );
};

export default WorksTimeline;