import { motion } from 'framer-motion';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '🔗' },
    { name: 'GitHub', href: '#', icon: '💻' },
    { name: 'Instagram', href: '#', icon: '📸' },
    { name: 'Email', href: 'dibabdelkrimyt98@gmail.com', icon: '📩' },
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          
          {/* Brand Identity */}
          <div className="max-w-xs">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-white font-black text-2xl tracking-tighter mb-6"
            >
              PORTFOLIO<span className="text-blue-600">.</span>
            </motion.div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Développeur Full-Stack passionné par la création d'interfaces fluides 
              et d'expériences numériques mémorables. Disponible pour de nouveaux projets.
            </p>
          </div>

          {/* Quick Links & Social */}
          <div className="grid grid-cols-2 gap-16 md:gap-32">
            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-50">Navigation</h4>
              <ul className="space-y-4">
                {['Mes travaux', 'Collaborateurs', 'Expériences', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-50">Social</h4>
              <ul className="space-y-4">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a href={social.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                      <span className="text-xs">{social.icon}</span>
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] font-medium tracking-wider">
            © {currentYear} PORTFOLIO. CONÇU AVEC PASSION.
          </p>
          
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-[10px] uppercase tracking-widest transition-colors">Politique de confidentialité</a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-[10px] uppercase tracking-widest transition-colors">Mentions Légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;