import { motion } from 'framer-motion';
import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-500 font-mono tracking-widest uppercase text-sm mb-4 block">
            Développement Web/Mobile & Solutions Numériques
          </span>
          
          <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tight">
            Design. Code. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Innover.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10">
            Expert en architecture Full-Stack, je transforme vos idées complexes en 
            expériences numériques fluides et performantes.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="#mes-traveaux" 
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Voir mes projets
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all"
            >
              Me contacter
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

// THIS IS THE LINE YOU WERE MISSING:
export default Hero;