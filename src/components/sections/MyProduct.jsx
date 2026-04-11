import { motion } from 'framer-motion';

const MyProduct = () => {
  return (
    <section id="mon-produit" className="py-20 bg-black text-white px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* En-tête de section */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tighter">
            Mon <span className="text-blue-500">Produit</span>
          </h2>
          <p className="text-center text-gray-500 font-mono text-xs mt-4 uppercase tracking-[0.3em]">
            Application en vedette
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Conteneur de l'image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden group">
              {/* Overlay de couleur */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent z-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-50" />
              
              {/* Remplace le src par l'image de ton produit */}
              <img 
                src="/images/lumina-app-preview.png" 
                alt="Aperçu de l'interface de Lumina App" 
                className="object-cover w-full h-full opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Fallback visuel si l'image n'est pas encore chargée */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <span className="text-gray-600 font-mono text-sm">Image Produit (UI/UX)</span>
              </div>
            </div>
          </motion.div>

          {/* Conteneur de la description */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
              Desktop & Mobile
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white">Lumina App</h3>
            
            <p className="text-gray-400 leading-relaxed text-lg">
              Une solution logicielle conçue avec une approche minimaliste. Inspirée par les interfaces fintech modernes, cette application intègre des ombres douces et des coins arrondis pour offrir une expérience utilisateur (UX) fluide, propre et hautement intuitive.
            </p>
            
            <div className="pt-6">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Découvrir le code
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MyProduct;