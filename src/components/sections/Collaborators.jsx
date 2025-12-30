import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { collabData } from '../../data/collabData';

const Collaborators = ({ comments = [], onLike }) => {
  return (
    <section id="collaborateurs" className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- PART 1: LOGOS --- */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
          <h2 className="text-gray-500 text-xs md:text-sm tracking-[0.4em] uppercase font-semibold">Collaborateurs Officiels</h2>
          <div className="h-[1px] w-12 bg-blue-500 mx-auto mt-4 opacity-50"></div>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 items-center mb-32">
          {collabData.map((collab) => (
            <motion.div 
              key={collab.id} 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.05)", borderColor: "rgba(59, 130, 246, 0.3)" }}
              className="group flex justify-center items-center p-6 md:p-10 grayscale hover:grayscale-0 transition-all duration-500 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm cursor-pointer"
            >
              <img src={collab.logo} alt={collab.name} className="h-8 md:h-12 w-full object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* --- PART 2: LIVE FEEDBACKS --- */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
          <h2 className="text-white text-3xl font-bold tracking-tight mb-4">Retours Clients</h2>
          <p className="text-gray-500 text-sm">Avis interactifs de mes partenaires récents.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < comment.rating ? "text-yellow-500" : "text-white/10"}>★</span>
                      ))}
                    </div>
                    
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      onClick={() => onLike(comment.id)}
                      className="flex items-center gap-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 px-3 py-1 rounded-full transition-all group/like"
                    >
                      <span className="text-red-500 text-sm group-hover/like:scale-110 transition-transform">❤️</span>
                      <span className="text-xs font-bold text-gray-500 group-hover/like:text-white">{comment.likes || 0}</span>
                    </motion.button>
                  </div>
                  
                  <p className="text-gray-300 italic mb-6 leading-relaxed text-sm">"{comment.text}"</p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center text-white font-bold text-xs">
                    {comment.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm">{comment.name}</h4>
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">{comment.product}</p>
                  </div>
                  <span className="text-[9px] text-gray-600 font-mono">{comment.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {comments.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
            <p className="text-gray-600 italic">Soyez le premier à laisser un avis !</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collaborators;