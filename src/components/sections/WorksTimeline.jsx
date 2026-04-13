import { motion, useAnimation } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { worksData } from '../../data/worksData';
import PhoneMockup from '../ui/PhoneMockup';

const WorksTimeline = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [dragLimit, setDragLimit] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sortedWorks = useMemo(() => {
    return [...worksData].sort((a, b) => b.id - a.id);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const contentWidth = containerRef.current.scrollWidth;
      const visibleWidth = window.innerWidth;
      const limit = -(contentWidth - visibleWidth);
      setDragLimit(limit);

      if (window.innerWidth > 768 && !isPaused) {
        controls.start({
          x: limit,
          transition: {
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      }
    }
  }, [sortedWorks, controls, isPaused]);

  const handleInteractionStart = () => {
    setIsPaused(true);
    controls.stop();
  };

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

      {/* MOBILE: Snap horizontal */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 gap-5 pb-10">
        {sortedWorks.map((work) => (
          <div key={work.id} className="min-w-[80vw] snap-center flex flex-col items-center group">
            <div className="w-full aspect-[9/16] max-h-[500px] overflow-hidden rounded-[2.5rem] bg-gray-900 border border-white/5 shadow-2xl">
                <PhoneMockup videoSrc={work.videoSrc} className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-6 bg-white/[0.02] border border-white/5 p-5 rounded-[2rem] w-full backdrop-blur-md">
              <p className="text-blue-500 font-mono text-[9px] uppercase tracking-widest mb-1">{work.date}</p>
              <h3 className="text-white text-lg font-bold">{work.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: Timeline Hybride Améliorée */}
      <div 
        className="hidden md:block relative h-[850px]"
        onMouseEnter={handleInteractionStart}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Ligne d'horizon (Axe Central) - Subtile et en arrière-plan */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-0" />

        <motion.div 
          ref={containerRef}
          drag="x"
          animate={controls}
          dragConstraints={{ right: 0, left: dragLimit }}
          onDragStart={handleInteractionStart}
          className="flex items-center h-full px-[5vw] cursor-grab active:cursor-grabbing relative z-10"
        >
          <div className="flex gap-32 items-center">
            {sortedWorks.map((work, index) => {
              const isUp = index % 2 === 0;

              return (
                <div key={work.id} className="relative flex flex-col items-center min-w-[400px]">
                  
                  {/* Carte Produit (Devant les connecteurs) */}
                  <motion.div 
                    initial={{ opacity: 0, y: isUp ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className={`relative z-30 flex flex-col items-center transition-transform duration-500
                    ${isUp ? '-translate-y-40' : 'translate-y-40'}`}
                  >
                    <div className="relative group p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[3rem] shadow-2xl transition-all duration-500 hover:scale-105">
                      <PhoneMockup videoSrc={work.videoSrc} />
                    </div>
                    
                    <div className="text-center mt-8">
                      <h3 className="text-white text-xl font-black tracking-tighter uppercase italic">{work.title}</h3>
                      <p className="text-blue-500/60 font-mono text-[9px] mt-2">{work.date}</p>
                    </div>
                  </motion.div>

                  {/* Connecteur Vertical (Derrière le téléphone) */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] z-10
                    ${isUp 
                      ? 'bottom-1/2 h-40 bg-gradient-to-t from-blue-500/40 via-blue-500/10 to-transparent' 
                      : 'top-1/2 h-40 bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent'
                    }`} 
                  />
                  
                  {/* Point d'ancrage avec Halo (Derrière le téléphone) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                     <div className="absolute inset-0 w-8 h-8 bg-blue-500/10 blur-xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                     <div className="w-2.5 h-2.5 bg-black border border-blue-400/50 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  </div>

                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Guide utilisateur */}
      <div className="hidden md:flex justify-center items-center gap-6 mt-6">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gray-800"></div>
        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.4em] flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
          Interactif : Glissez ou Survolez
        </p>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gray-800"></div>
      </div>
    </section>
  );
};

export default WorksTimeline;