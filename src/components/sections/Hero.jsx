import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);
  
  // Effet de parallaxe au scroll pour la profondeur
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Variantes pour l'animation séquentielle (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#030303]"
    >
      {/* 1. BACKGROUND LAYER: Grid & Dynamic Glow */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Mesh Glow */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"
        />
      </div>

      {/* 2. CONTENT LAYER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        {/* Badge animé */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em]">Disponibilité : Projets Senior</span>
        </motion.div>
          
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-[9rem] font-black text-white mb-8 tracking-tighter leading-[0.85]"
        >
          DESIGN. CODE. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 animate-gradient-x">
            INNOVER.
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-12 font-light leading-relaxed"
        >
          Expert en architecture <span className="text-white">Full-Stack</span>. 
          Je ne construis pas seulement des sites, je forge des outils de performance 
          et des interfaces qui marquent les esprits.
        </motion.p>

        {/* 3. CTA LAYER: Modern Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#mes-traveaux" 
            className="group relative px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)] group-hover:duration-1000">
               <div className="relative h-full w-8 bg-white/20 blur-md animate-[shimmer_2s_infinite]"></div>
            </div>
            <span className="relative z-10">Explorer l'Atelier</span>
          </a>

          <a 
            href="#contact" 
            className="group px-10 py-5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
          >
            Démarrer un Projet
          </a>
        </motion.div>
      </motion.div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-600 to-transparent"></div>
        <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-gray-600">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;