import { motion } from 'framer-motion';
import React, { useMemo, useRef } from 'react';
import { worksData } from '../../data/worksData';
import PhoneMockup from '../ui/PhoneMockup';

const WorksTimeline = () => {
  const containerRef = useRef(null);
  
  // Newest projects first
  const sortedWorks = useMemo(() => [...worksData].reverse(), []);

  return (
    <section id="mes-traveaux" className="py-20 bg-black overflow-hidden select-none">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-10 md:mb-20 uppercase tracking-widest">
        Mes Travaux
      </h2>

      {/* MOBILE & TABLET: Horizontal Snap Catalogue (Thumb-friendly) */}
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

      {/* DESKTOP: Interactive Drag Alternating Timeline */}
      <div className="hidden md:block relative h-[900px]">
        {/* The Central Axis Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent z-0" />

        <motion.div 
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: -(sortedWorks.length * 380) }}
          className="flex items-center h-full px-[20vw] cursor-grab active:cursor-grabbing relative z-10"
        >
          <div className="flex gap-32 items-center">
            {sortedWorks.map((work, index) => {
              // Alternating logic: Even = Up, Odd = Down
              const isUp = index % 2 === 0;

              return (
                <motion.div 
                  key={work.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative flex flex-col items-center min-w-[320px] 
                    ${isUp ? '-translate-y-1/4' : 'translate-y-1/4'}`}
                >
                  {/* Content Container */}
                  <div className="flex flex-col items-center">
                    {/* Render Phone Mockup */}
                    <PhoneMockup videoSrc={work.videoSrc} />
                    
                    {/* Title & Date */}
                    <div className="text-center mt-6">
                      <p className="text-blue-400 font-mono text-sm tracking-widest">{work.date}</p>
                      <h3 className="text-white text-2xl font-bold tracking-tight">{work.title}</h3>
                    </div>
                  </div>

                  {/* Vertical Connector Line to the Central Axis */}
                  <div className={`absolute left-1/2 w-[2px] bg-gradient-to-b from-blue-500/50 to-purple-500/50
                    ${isUp ? 'top-[100%] h-32' : 'bottom-[100%] h-32'}`} 
                  />
                  
                  {/* Glowing Connection Point on the Axis */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]
                    ${isUp ? 'bottom-[-135px]' : 'top-[-135px]'}`} 
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <p className="hidden md:block text-center text-gray-600 text-xs mt-10 animate-pulse uppercase tracking-[0.3em]">
        ← Maintenez et faites glisser pour explorer →
      </p>
    </section>
  );
};

export default WorksTimeline;