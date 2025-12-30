import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-white font-bold text-lg leading-tight">
            Solutions Numériques
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Conception & Développement Web/Mobile de haute performance.
          </p>
        </div>

        {/* Right Side: Copyright & Socials */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Twitter</a>
          </div>
          <p className="text-gray-600 text-xs">
            © {currentYear} Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;