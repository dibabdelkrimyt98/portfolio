import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ ip: '', city: '', country: '' });

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('welcome_seen');

    if (!hasSeenWelcome) {
      const fetchLocation = async () => {
        try {
          // Fetching IP and Location data from ip-api
          const response = await fetch('http://ip-api.com/json/');
          const result = await response.json();
          
          if(result.status === "success") {
            setData({
              ip: result.query,
              city: result.city,
              country: result.country
            });
          }

          // Show the modal after the site finishes loading animations
          setTimeout(() => {
            setIsOpen(true);
            sessionStorage.setItem('welcome_seen', 'true');
          }, 1500);
        } catch (error) {
          console.error("Error detecting visitor data:", error);
        }
      };

      fetchLocation();
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            className="relative bg-zinc-950 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center"
          >
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
              <span className="text-3xl">📍</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Hello Visitor!
            </h2>
            
            <div className="space-y-1 mb-8">
              <p className="text-gray-400 text-sm leading-relaxed">
                Welcome Mr/Melle from <span className="text-white font-semibold">{data.city}, {data.country}</span>.
              </p>
              <p className="text-gray-500 text-xs font-mono">
                Owner of IP: <span className="text-blue-400">{data.ip || "0.0.0.0"}</span>
              </p>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
            >
              Enter Portfolio
            </button>

            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;