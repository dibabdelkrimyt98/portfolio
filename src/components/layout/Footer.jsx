import { motion } from 'framer-motion';
import React from 'react';
// Import the professional icons
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/yourprofile', 
      icon: <Linkedin size={20} />, 
      color: 'hover:text-[#0077B5]' 
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/yourusername', 
      icon: <Github size={20} />, 
      color: 'hover:text-[#fafafa]' 
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/yourprofile', 
      icon: <Instagram size={20} />, 
      color: 'hover:text-[#E4405F]' 
    },
    { 
      name: 'Email', 
      href: 'mailto:dibabdelkrimyt98@gmail.com', 
      icon: <Mail size={20} />, 
      color: 'hover:text-blue-400' 
    },
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Brand Identity */}
          <div className="max-w-md">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white font-black text-3xl tracking-tighter mb-6 flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-sm shadow-lg shadow-blue-600/20">D</div>
              PORTFOLIO<span className="text-blue-600">.</span>
            </motion.div>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Développeur Full-Stack passionné par la création d'interfaces fluides 
              et d'expériences numériques mémorables. Disponible pour donner vie à vos projets les plus ambitieux.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-blue-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Disponible pour de nouvelles opportunités
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-12 md:gap-24 w-full lg:w-auto">
            <div>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em] mb-8 opacity-40">Navigation</h4>
              <ul className="space-y-4">
                {['Mes travaux', 'Collaborateurs', 'Expériences', 'Contact'].map((item) => (
                  <li key={item}>
                    <motion.a 
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      whileHover={{ x: 5 }}
                      className="text-gray-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-blue-500 group-hover:w-3 transition-all duration-300" />
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em] mb-8 opacity-40">Social Connect</h4>
              <div className="flex flex-col gap-4">
                {socialLinks.map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 8 }}
                    className={`flex items-center gap-3 text-gray-500 transition-all group ${social.color}`}
                  >
                    <span className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-current group-hover:bg-current/10 transition-all duration-500">
                      {social.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-wide text-gray-300 group-hover:text-white transition-colors">{social.name}</span>
                      <span className="text-[10px] text-gray-600 group-hover:text-inherit flex items-center gap-1">
                        Suivre <ArrowUpRight size={10} />
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase">
              © {currentYear} PORTFOLIO — DIB ABDELKRIM
            </p>
            <p className="text-[9px] text-gray-700 uppercase tracking-widest font-medium italic">
              Built with React, Tailwind & Coffee ☕
            </p>
          </div>
          
          <div className="flex gap-6 md:gap-10">
            <a href="#" className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest transition-all font-bold">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest transition-all font-bold">Mentions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;