import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

const FeedbackModal = ({ isOpen, onClose, onAddComment }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    
    const newComment = {
      id: Date.now(),
      name: formData.get('user_name'),
      product: formData.get('product_name'),
      text: formData.get('comment'),
      rating: rating,
      date: new Date().toLocaleDateString()
    };

    onAddComment(newComment);
    onClose();
    formRef.current.reset();
    setRating(5); // Reset stars
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-zinc-950 border border-white/10 w-full max-w-lg p-8 rounded-[2.5rem] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-white tracking-tight">Ajouter un Feedback</h2>
               <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 mb-1 block">Nom / Entreprise</label>
                <input name="user_name" required type="text" placeholder="Ex: Tech Solutions" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none transition-all" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 mb-1 block">Produit Livré</label>
                <input name="product_name" required type="text" placeholder="Ex: Application SaaS" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none transition-all" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 mb-1 block">Votre Note</label>
                <div className="flex gap-2 ml-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="text-2xl transition-all hover:scale-125">
                      <span className={(hover || rating) >= star ? "text-yellow-400" : "text-zinc-800"}>★</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 mb-1 block">Commentaire</label>
                <textarea name="comment" required rows="3" placeholder="Votre avis sur la collaboration..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-blue-500 outline-none resize-none" />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                PUBLIER MON AVIS
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;