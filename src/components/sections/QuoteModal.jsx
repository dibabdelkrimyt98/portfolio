import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { countries } from '../../data/Countries';

const QuoteModal = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Secure IDs from environment variables
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_DEVIS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_DEVIS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
      }, (error) => {
        console.error('Email Error:', error);
        setStatus('error');
        alert("Une erreur est survenue. Veuillez réessayer.");
      });
  };

  const handleClose = () => {
    onClose();
    // Reset status after the exit animation completes
    setTimeout(() => setStatus('idle'), 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative bg-zinc-950 border border-white/10 w-full max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar p-6 md:p-10 rounded-[2.5rem] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Estimation Projet</h2>
              <button onClick={handleClose} className="text-white opacity-50 hover:opacity-100 transition-opacity">✕</button>
            </div>

            <AnimatePresence mode="wait">
              {status === 'idle' || status === 'sending' ? (
                <motion.form 
                  ref={formRef}
                  key="form"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6" 
                  onSubmit={handleSubmit}
                >
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nom Complet</label>
                      <input name="user_name" required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Email Pro</label>
                      <input name="user_email" required type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-600" />
                    </div>
                  </div>

                  {/* Row 2: Phone & Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Téléphone</label>
                      <input name="user_phone" required type="tel" placeholder="+33 6..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Pays</label>
                      <div className="relative">
                        <select name="user_country" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 appearance-none cursor-pointer">
                          {countries.map(c => <option key={c.code} value={c.name} className="bg-zinc-900">{c.flag} {c.name}</option>)}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">↓</div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Service & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Service</label>
                      <div className="relative">
                        <select name="project_type" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 appearance-none cursor-pointer">
                          <option value="App Mobile" className="bg-zinc-900">App Mobile</option>
                          <option value="SaaS" className="bg-zinc-900">SaaS / Web App</option>
                          <option value="E-commerce" className="bg-zinc-900">E-commerce</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">↓</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Budget</label>
                      <div className="relative">
                        <select name="budget" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 appearance-none cursor-pointer">
                          <option value="1500-3000" className="bg-zinc-900"> - 10000 DA </option>
                          <option value="3000-7000" className="bg-zinc-900"> 10000 DA - 70000 DA</option>
                          <option value="7000+" className="bg-zinc-900"> + 70000 DA </option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">↓</div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Message</label>
                    <textarea name="message" rows="3" placeholder="Décrivez brièvement votre projet..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 resize-none transition-all placeholder:text-gray-600" />
                  </div>

                  {/* Submit Button */}
                  <button 
                    disabled={status === 'sending'}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : "OBTENIR MON ESTIMATION"}
                  </button>
                </motion.form>
              ) : (
                /* Success State */
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 mx-auto border border-green-500/50">
                    <span className="text-green-500 text-3xl font-bold">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Devis envoyé !</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">Vérifiez votre boîte mail, je vous répondrai très bientôt avec une proposition.</p>
                  <button 
                    onClick={handleClose} 
                    className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 font-bold uppercase tracking-widest text-xs transition-all"
                  >
                    Retour
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;