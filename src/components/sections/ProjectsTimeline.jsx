import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { projectsData } from '../../data/projectsData';

const ProjectsTimeline = () => {
  const containerRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);
  // État pour gérer la modale "Lire la suite"
  const [selectedProject, setSelectedProject] = useState(null);

  const sortedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => b.id - a.id);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const contentWidth = containerRef.current.scrollWidth;
      const visibleWidth = window.innerWidth;
      setDragLimit(-(contentWidth - visibleWidth * 0.8));
    }
  }, [sortedProjects]);

  // Empêcher le scroll du fond quand la modale est ouverte
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="projets" className="py-20 bg-black overflow-hidden select-none relative">
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
          {sortedProjects.map((project, index) => (
            <motion.article 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // Ajout de l'effet de zoom au survol (scale: 1.03) et hauteur fixe (h-[420px])
              whileHover={{ scale: 1.03, y: -10 }}
              className="min-w-[85vw] md:min-w-[420px] max-w-[420px] h-[450px] flex flex-col relative z-10 bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/[0.06] transition-colors duration-300 group"
            >
              <div className="hidden md:block absolute -top-[45px] left-8 w-3 h-3 bg-black border border-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:scale-150 transition-transform duration-300" />
              <div className="hidden md:block absolute -top-[45px] left-[37px] w-[1px] h-[45px] bg-gradient-to-b from-blue-500/50 to-transparent" />

              <div className="flex-grow">
                <time className="text-blue-500 font-mono text-[11px] uppercase tracking-widest block mb-4">
                  {project.date}
                </time>
                
                <h3 className="text-white text-2xl font-bold mb-4 line-clamp-2">{project.title}</h3>
                
                {/* line-clamp-4 coupe le texte après 4 lignes */}
                <div className="text-gray-400 text-sm leading-relaxed mb-2 line-clamp-4">
                  {project.description}
                </div>
                
                {/* Bouton Lire la suite */}
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="text-blue-500 hover:text-blue-400 text-sm font-semibold mb-6 transition-colors"
                >
                  Lire la suite...
                </button>
              </div>
              
              {/* Conteneur des tags fixé en bas */}
              <ul className="flex flex-wrap gap-2 mt-auto" aria-label={`Technologies utilisées pour le projet ${project.title}`}>
                {project.techs.slice(0, 4).map((tech, techIdx) => (
                  <li key={techIdx} className="px-3 py-1.5 bg-blue-900/20 border border-blue-800/50 text-blue-300 rounded-lg text-xs font-medium">
                    {tech}
                  </li>
                ))}
                {project.techs.length > 4 && (
                  <li className="px-3 py-1.5 bg-transparent border border-gray-700 text-gray-500 rounded-lg text-xs font-medium">
                    +{project.techs.length - 4}
                  </li>
                )}
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

      {/* --- MODALE "LIRE LA SUITE" --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)} // Ferme la modale si on clique à l'extérieur
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative cursor-default"
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique dans la carte
            >
              {/* Bouton Fermer */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>

              <time className="text-blue-500 font-mono text-[12px] uppercase tracking-widest block mb-2">
                {selectedProject.date}
              </time>
              
              <h3 className="text-white text-3xl font-bold mb-6 pr-10">
                {selectedProject.title}
              </h3>
              
              <div className="text-gray-300 text-base leading-relaxed mb-8 whitespace-pre-line">
                {selectedProject.description}
              </div>

              <div>
                <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Technologies utilisées :</h4>
                <ul className="flex flex-wrap gap-2">
                  {selectedProject.techs.map((tech, index) => (
                    <li key={index} className="px-3 py-1.5 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsTimeline;