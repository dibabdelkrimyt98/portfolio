import React, { useState } from 'react';

const Navbar = ({ onOpenDevis }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Mes travaux", href: "#mes-traveaux" },
    { name: "Collaborateurs", href: "#collaborateurs" },
    { name: "Expériences", href: "#experiences" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-4 md:px-8 py-3 flex items-center justify-between">
        
        <div className="text-white font-bold text-xl tracking-tighter">
          PORTFOLIO<span className="text-blue-500">.</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onOpenDevis} className="bg-blue-600 hover:bg-blue-500 text-white px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            Devis
          </button>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-black/90 border border-white/10 rounded-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 py-2 text-center border-b border-white/5">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;