import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
// Import the data from your data folder
import { projectsData } from '../../data/projectsData';

const ProjectsTimeline = () => {
  const containerRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const contentWidth = containerRef.current.scrollWidth;
      const visibleWidth = window.innerWidth;
      setDragLimit(-(contentWidth - visibleWidth * 0.8));
    }
  }, []);

  return (
    <section id="projets" className="py-20 bg-black overflow-hidden select-none">
      <div className="px-6 mb-16 md:mb-24 relative z-10">
        <h2 className="text-center text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
          Mes <span className="text-blue-500">Projets</span>
        </h2>
        <p className="text-center text-gray-500 font-mono text-xs mt-4 uppercase tracking-[0.3em]">
          Technologies & SEO
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-[45px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-900 to-transparent z-0 hidden md:block" />

        <motion.div 
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: dragLimit }}
          className="flex items-start px-6 md:px-[10vw] gap-8 md:gap-12 cursor-grab active:cursor-grabbing overflow-x-auto md:overflow-visible no-scrollbar pb-12"
        >
          {/* Using projectsData imported from your data folder */}
          {[...projectsData].sort((a, b) => b.id - a.id).map((project, index) => (
            <motion.article 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[85vw] md:min-w-[420px] max-w-[420px] relative z-10 bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="hidden md:block absolute -top-[45px] left-8 w-3 h-3 bg-black border border-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:scale-150 transition-transform duration-300" />
              <div className="hidden md:block absolute -top-[45px] left-[37px] w-[1px] h-[45px] bg-gradient-to-b from-blue-500/50 to-transparent" />

              <time className="text-blue-500 font-mono text-[11px] uppercase tracking-widest block mb-4">
                {project.date}
              </time>
              
              <h3 className="text-white text-2xl font-bold mb-4">{project.title}</h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8 min-h-[60px]">
                {project.description}
              </p>
              
              <ul className="flex flex-wrap gap-2" aria-label={`Technologies utilisées pour le projet ${project.title}`}>
                {project.techs.map((tech, techIdx) => (
                  <li key={techIdx} className="px-3 py-1.5 bg-blue-900/20 border border-blue-800/50 text-blue-300 rounded-lg text-xs font-medium">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="hidden md:flex justify-center items-center gap-4 mt-4">
        <span className="h-[1px] w-12 bg-gray-800"></span>
        <p className="text-gray-500 text-[9px] uppercase tracking-[0.5em]">
          Glissez pour explorer
        </p>
        <span className="h-[1px] w-12 bg-gray-800"></span>
      </div>
    </section>
  );
};

export default ProjectsTimeline;