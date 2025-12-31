import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { experiences } from '../../data/experienceData';

const Experience = () => {
  // Sort logic: Highest ID first (Newest Experience at the top)
  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => b.id - a.id);
  }, []);

  return (
    <section id="experiences" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Mon <span className="text-blue-500">Parcours</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-4 tracking-widest uppercase">
            Expériences Professionnelles & Stages
          </p>
        </header>

        {/* MOBILE: Snap-scroll Cards (Visible only on small screens) */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-10">
          {sortedExperiences.map((exp) => (
            <div key={exp.id} className="min-w-[85vw] snap-center bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-md">
              <div className="flex justify-between items-start mb-6">
                <img src={exp.logo} alt={exp.company} className="w-12 h-12 object-contain grayscale brightness-200" />
                <span className="text-blue-500 font-mono text-xs font-bold">{exp.year}</span>
              </div>
              
              <div className="mb-4">
                 <span className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wider ${
                    exp.role.toLowerCase().includes("ingenieur") 
                    ? "border-orange-500/50 text-orange-400 bg-orange-500/5" 
                    : "border-blue-500/50 text-blue-400 bg-blue-500/5"
                  }`}>
                    {exp.role.toLowerCase().includes("ingenieur") ? "Télécom" : "Développement"}
                  </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-tight">{exp.role}</h3>
              <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">{exp.desc}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.skills.map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] rounded-lg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: Vertical Timeline (Visible only on md+) */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Main Vertical Axis Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />

          <div className="space-y-32">
            {sortedExperiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isTelecom = exp.role.toLowerCase().includes("ingenieur");

              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`relative flex items-center justify-between w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Experience Card */}
                  <div className="w-[44%] group">
                    <div className="relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-blue-500/50 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
                      
                      <div className="flex items-center justify-between mb-6">
                        <img 
                          src={exp.logo} 
                          alt={exp.company} 
                          className="h-10 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                        />
                        <div className="flex flex-col items-end">
                            <span className="text-blue-400 font-mono text-xs tracking-widest">{exp.year}</span>
                            <span className={`text-[9px] mt-2 px-2 py-0.5 rounded border uppercase ${
                                isTelecom ? "border-orange-500/30 text-orange-400" : "border-blue-500/30 text-blue-400"
                            }`}>
                                {isTelecom ? "Telecom" : "Software"}
                            </span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wide">{exp.company}</p>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                        {exp.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] uppercase rounded-md group-hover:border-blue-500/20 group-hover:text-gray-300 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Central Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 bg-black border-2 border-blue-500 rounded-full z-10 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                    <motion.div 
                        className="absolute w-8 h-8 bg-blue-500/20 rounded-full blur-md"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="w-[44%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;