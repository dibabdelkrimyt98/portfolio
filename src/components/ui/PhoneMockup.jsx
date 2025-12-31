// src/components/ui/PhoneMockup.jsx
const PhoneMockup = ({ videoSrc }) => (
  /* Adjusted container to 9:16 Ratio (approx 240x426) */
  <div className="relative mx-auto border-gray-900 bg-black border-[8px] rounded-[2.5rem] h-[480px] w-[270px] shadow-2xl overflow-hidden ring-2 ring-gray-800">
    
    {/* Speaker / Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center">
        <div className="w-6 h-1 bg-gray-800 rounded-full"></div>
    </div>

    {/* The Video Container */}
    <div className="absolute inset-0 z-10 bg-black flex items-center justify-center">
      {videoSrc ? (
        <video 
          key={videoSrc}
          autoPlay 
          loop 
          muted 
          playsInline 
          /* CHANGE: object-contain ensures the WHOLE video is visible */
          className="w-full h-full object-contain" 
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="text-gray-500 text-[10px] uppercase tracking-widest">No Signal</div>
      )}
    </div>

    {/* Glass Reflection Overlay */}
    <div className="absolute inset-0 z-15 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />
  </div>
);

export default PhoneMockup;