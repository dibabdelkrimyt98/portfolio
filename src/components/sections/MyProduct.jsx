import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { myProductData } from '../../data/myProductData';

const MyProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sortedProducts = useMemo(() => {
    return [...myProductData].sort((a, b) => b.id - a.id);
  }, []);

  const nextProduct = () => setCurrentIndex((prev) => (prev + 1) % sortedProducts.length);
  const prevProduct = () => setCurrentIndex((prev) => (prev - 1 + sortedProducts.length) % sortedProducts.length);

  return (
    <section id="mes-outils" className="py-24 bg-black text-white px-6 relative overflow-hidden min-h-[900px] flex flex-col justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            La <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Galerie Produits</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs mt-4 uppercase tracking-[0.3em]">
            Exposition rotative 3D
          </p>
        </div>

        {/* Vitrine Rotative (Jewelry Showcase) */}
        <div className="relative h-[450px] w-full flex items-center justify-center" style={{ perspective: "1500px" }}>
          <AnimatePresence mode="popLayout">
            {sortedProducts.map((product, index) => {
              // Logique de positionnement circulaire
              const offset = (index - currentIndex + sortedProducts.length) % sortedProducts.length;
              let position = offset;
              if (offset > sortedProducts.length / 2) position -= sortedProducts.length;

              const isActive = position === 0;
              const isVisible = Math.abs(position) <= 1; // On ne montre que l'actif et ses voisins directs

              if (!isVisible) return null;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.5, x: position * 400, rotateY: position * -45 }}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1.1 : 0.7,
                    x: position * (window.innerWidth < 768 ? 200 : 450), // Responsive gap
                    rotateY: position * -35,
                    z: isActive ? 100 : -200,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute w-[300px] md:w-[500px] aspect-[4/3] cursor-pointer"
                  onClick={() => isActive ? setSelectedProduct(product) : setCurrentIndex(index)}
                >
                  {/* Cadre de l'image style Bijouterie */}
                  <div className="relative w-full h-full rounded-[2rem] p-[2px] bg-gradient-to-b from-blue-500/40 via-white/10 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                    <div className="relative w-full h-full bg-[#0a0a0a] rounded-[1.9rem] overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={`object-cover w-full h-full transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-40 grayscale'}`}
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-white/5 pointer-events-none" />
                      )}
                    </div>
                    {/* Reflet au sol individuel */}
                    <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-blue-600/20 blur-2xl rounded-full transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Info du produit actif (Sous la vitrine) */}
        <div className="mt-20 text-center max-w-2xl mx-auto h-[200px]">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-6">
              {sortedProducts[currentIndex].tagline}
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              {sortedProducts[currentIndex].name}
            </h3>
            <div className="flex justify-center gap-6 mt-8">
              <button onClick={prevProduct} className="p-4 rounded-full border border-white/10 hover:bg-white/5 hover:border-blue-500 transition-all group">
                <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
              <button 
                onClick={() => setSelectedProduct(sortedProducts[currentIndex])}
                className="px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-transform"
              >
                Expertise Technique
              </button>
              <button onClick={nextProduct} className="p-4 rounded-full border border-white/10 hover:bg-white/5 hover:border-blue-500 transition-all group">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODALE TECHNIQUE (Identique à votre demande, optimisée) */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#0f0f0f] border border-white/10 p-6 md:p-10 rounded-[2.5rem] max-w-lg w-full relative shadow-3xl"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white">✕</button>
              <h4 className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Technical Overview</h4>
              <h3 className="text-3xl font-black text-white mb-6">{selectedProduct.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-8">{selectedProduct.fullDetails}</p>
              <div className="space-y-4">
                <h5 className="text-white/40 text-[10px] font-bold uppercase mb-4 italic">Stack Technologique</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.technicalList.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-500/5 border border-blue-500/20 rounded-xl text-[11px] text-blue-300">{tech}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="w-full mt-10 py-4 bg-blue-600 rounded-2xl font-bold uppercase text-[10px] text-white">Retour à l'exposition</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MyProduct;