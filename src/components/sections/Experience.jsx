import { motion } from 'framer-motion';
import React from 'react';

const experiences = [
  {
    year: "2024 - Présent",
    role: "Senior Full-Stack Developer",
    company: "Freelance / Solutions Numériques",
    desc: "Architecture de systèmes complexes et déploiement cloud.",
    skills: ["React", "Node.js", "Docker"]
  },
  {
    year: "2022 - 2023",
    role: "Web & Mobile Developer",
    company: "Tech Agency",
    desc: "Développement d'applications natives et plateformes e-commerce.",
    skills: ["Flutter", "Next.js", "PostgreSQL"]
  },
  {
    year: "2020 - 2022",
    role: "UI/UX Designer",
    company: "Creative Studio",
    desc: "Conception d'interfaces centrées utilisateur et prototypage.",
    skills: ["Figma", "Adobe Suite", "Tailwind"]
  }
];

const Experience = () => {
  return (
    <section id="experiences" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-20 uppercase tracking-widest">
          Expériences
        </h2>

        {/* MOBILE: Snap-scroll Cards */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-10">
          {experiences.map((exp, index) => (
            <div key={index} className="min-w-[85vw] snap-center bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl">
              <span className="text-blue-500 font-mono text-sm">{exp.year}</span>
              <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
              <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">{exp.desc}</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map(s => <span key={s} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] rounded-full">{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: Representative Vertical Timeline */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-blue-600 via-purple-600 to-transparent opacity-30" />
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`relative flex items-center justify-between w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-[45%] bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 transition-all group shadow-2xl">
                  <span className="text-blue-500 font-mono text-sm">{exp.year}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                  <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{exp.desc}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)] z-10" />
                <div className="w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;