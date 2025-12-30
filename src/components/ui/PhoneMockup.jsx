// src/components/ui/PhoneMockup.jsx
const PhoneMockup = ({ videoSrc }) => (
  <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[450px] w-[220px] overflow-hidden">
    {/* Temporary Placeholder until you put videos in /public/videos/ */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-500 text-xs text-center p-4">
      Video Placeholder <br/> (Place .mp4 in public/videos)
    </div>
  </div>
);
  
  export default PhoneMockup;