import { motion } from 'framer-motion';
import React from 'react';
import { collabData } from '../../data/collabData';

const Collaborators = () => {
  return (
    <section id="collaborateurs" className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
          <h2 className="text-gray-500 text-xs md:text-sm tracking-[0.4em] uppercase font-semibold">Collaborateurs Officiels</h2>
          <div className="h-[1px] w-12 bg-blue-500 mx-auto mt-4 opacity-50"></div>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 items-center">
          {collabData.map((collab) => (
            <motion.div 
              key={collab.id} 
              whileHover={{ 
                scale: 1.25, // Makes the logo BIG
                zIndex: 50,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex justify-center items-center p-6 md:p-10 grayscale hover:grayscale-0 transition-all duration-500 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm cursor-pointer relative"
            >
              <img 
                src={collab.logo} 
                alt={collab.name} 
                className="h-8 md:h-12 w-full object-contain opacity-40 group-hover:opacity-100 transition-opacity" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborators;