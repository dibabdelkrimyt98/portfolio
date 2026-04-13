import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { myProductData } from '../../data/myProductData';

const MyProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // États pour la galerie interne de la modale
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Pour mettre en pause l'autoplay

  const sortedProducts = useMemo(() => {
    return [...myProductData].sort((a, b) => b.id - a.id);
  }, []);

  // Sécurité pour gérer les images (unique ou tableau)
  const getProductImages = (product) => {
    if (!product) return [];
    return Array.isArray(product.images) ? product.images : [product.image];
  };

  // --- LOGIQUE HYBRIDE : Auto-Play & Reset ---
  useEffect(() => {
    setActiveImgIndex(0); // Reset quand on ouvre un nouveau produit
    setIsHovered(false);
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct) return;
    const images = getProductImages(selectedProduct);
    
    // Si une seule image ou si la souris est sur l'image -> pas d'autoplay
    if (images.length <= 1 || isHovered) return;

    // Défilement toutes les 3.5 secondes
    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [selectedProduct, activeImgIndex, isHovered]);

  // Contrôles manuels de la galerie
  const nextModalImage = (e) => {
    e.stopPropagation();
    const images = getProductImages(selectedProduct);
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalImage = (e) => {
    e.stopPropagation();
    const images = getProductImages(selectedProduct);
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Contrôles du showcase principal
  const nextProduct = () => setCurrentIndex((prev) => (prev + 1) % sortedProducts.length);
  const prevProduct = () => setCurrentIndex((prev) => (prev - 1 + sortedProducts.length) % sortedProducts.length);

  return (
    <section id="mes-outils" className="py-24 bg-black text-white px-6 relative overflow-hidden min-h-[900px] flex flex-col justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            La <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Galerie Produits</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs mt-4 uppercase tracking-[0.3em]">Exposition rotative & Adaptative</p>
        </div>

        {/* Showcase 3D Principal */}
        <div className="relative h-[350px] md:h-[450px] w-full flex items-center justify-center" style={{ perspective: "1500px" }}>
          <AnimatePresence mode="popLayout">
            {sortedProducts.map((product, index) => {
              const offset = (index - currentIndex + sortedProducts.length) % sortedProducts.length;
              let position = offset;
              if (offset > sortedProducts.length / 2) position -= sortedProducts.length;

              const isActive = position === 0;
              if (Math.abs(position) > 1) return null;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.5, x: position * 400 }}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? 1 : 0.7,
                    x: position * (window.innerWidth < 768 ? 180 : 450),
                    rotateY: position * -35,
                    z: isActive ? 100 : -200,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute w-[280px] md:w-[550px] aspect-video cursor-pointer"
                  onClick={() => isActive ? setSelectedProduct(product) : setCurrentIndex(index)}
                >
                  <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] p-[2px] bg-gradient-to-b from-blue-500/40 via-white/5 to-transparent shadow-2xl group">
                    <div className="relative w-full h-full bg-[#050505] rounded-[1.4rem] md:rounded-[2.4rem] overflow-hidden">
                      <img 
                        src={getProductImages(product)[0]} 
                        alt={product.name} 
                        className={`object-contain w-full h-full transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-40 grayscale'}`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Détails du produit actif */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <motion.div key={currentIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase">
              {sortedProducts[currentIndex].name}
            </h3>
            <div className="flex justify-center gap-4">
              <button onClick={prevProduct} className="p-4 rounded-full border border-white/5 hover:bg-blue-600/20 transition-all">
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
              <button 
                onClick={() => setSelectedProduct(sortedProducts[currentIndex])}
                className="px-8 py-4 bg-blue-600 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-full hover:bg-blue-500 transition-all"
              >
                Fiche Technique
              </button>
              <button onClick={nextProduct} className="p-4 rounded-full border border-white/5 hover:bg-blue-600/20 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODALE MULTI-IMAGES & RESPONSIVE */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/98 backdrop-blur-xl"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Galerie d'images adaptative (Gauche) */}
              <div 
                className="w-full lg:w-3/5 bg-black/50 p-4 md:p-8 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-white/5 min-h-[300px] relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* Flèche Précédent (affichée s'il y a plus d'une image) */}
                  {getProductImages(selectedProduct).length > 1 && (
                    <button 
                      onClick={prevModalImage} 
                      className="absolute left-2 md:left-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImgIndex}
                      src={getProductImages(selectedProduct)[activeImgIndex]}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-full max-h-[400px] lg:max-h-[500px] object-contain rounded-xl shadow-2xl z-10"
                    />
                  </AnimatePresence>

                  {/* Flèche Suivant */}
                  {getProductImages(selectedProduct).length > 1 && (
                    <button 
                      onClick={nextModalImage} 
                      className="absolute right-2 md:right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  )}
                </div>

                {/* Sélecteur d'images (Dots avec animation de progression au hover) */}
                {getProductImages(selectedProduct).length > 1 && (
                  <div className="flex gap-2 mt-6 z-20">
                    {getProductImages(selectedProduct).map((_, i) => (
                      <button 
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setActiveImgIndex(i); }}
                        className={`h-2 rounded-full transition-all duration-500 ${activeImgIndex === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/50'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Contenu Technique (Droite) */}
              <div className="w-full lg:w-2/5 p-8 md:p-12 overflow-y-auto">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">✕</button>
                
                <div className="mb-10">
                  <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em]">{selectedProduct.tagline}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mt-2 uppercase tracking-tighter">{selectedProduct.name}</h3>
                </div>

                <div className="space-y-8">
                  <div>
                    <h5 className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Description</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedProduct.fullDetails}</p>
                  </div>

                  <div>
                    <h5 className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Technologies</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.technicalList.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] text-blue-300 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={selectedProduct.link} 
                    target="_blank" rel="noreferrer"
                    className="block w-full py-4 bg-white text-black text-center font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    Découvrir le projet
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MyProduct;