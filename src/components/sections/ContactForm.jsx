import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle | loading | done | error

  const handleSend = (e) => {
    e.preventDefault();
    setStatus('loading');

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_CONTACT_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus('done');
      }, (error) => {
        console.error('EmailJS Error:', error);
        setStatus('error');
        alert("Une erreur est survenue lors de l'envoi.");
      });
  };

  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-white mb-4 uppercase tracking-tighter"
          >
            Contact
          </motion.h2>
          <p className="text-gray-500 font-medium">Prêt à donner vie à vos idées ?</p>
        </div>

        <div className="bg-[#050505] border border-white/5 p-4 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div 
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <div className="mb-6 inline-flex p-4 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Merci !</h3>
                <p className="text-gray-400 mb-8 max-w-xs mx-auto">Votre message a été transmis avec succès. Je vous répondrai sous 24h.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10 font-bold"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                ref={formRef}
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6" 
                onSubmit={handleSend}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.01 }} className="group">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-4 mb-2 block">Nom</label>
                    <input 
                      name="from_name"
                      required 
                      type="text" 
                      placeholder="Votre nom" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-700" 
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-4 mb-2 block">Email</label>
                    <input 
                      name="reply_to"
                      required 
                      type="email" 
                      placeholder="votre@email.com" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-700" 
                    />
                  </motion.div>
                </div>
                
                <motion.div whileFocus={{ scale: 1.005 }}>
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-4 mb-2 block">Votre Message</label>
                  <textarea 
                    name="message"
                    required 
                    rows="5" 
                    placeholder="Décrivez votre projet ou votre question..." 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 focus:bg-white/[0.05] outline-none transition-all resize-none placeholder:text-gray-700" 
                  />
                </motion.div>
                
                <button 
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group overflow-hidden relative active:scale-[0.98]"
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="tracking-widest">ENVOYER LE MESSAGE</span>
                      <motion.span 
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="group-hover:translate-x-2 transition-transform"
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default ContactForm;