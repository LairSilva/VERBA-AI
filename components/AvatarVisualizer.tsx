import React from 'react';

interface AvatarVisualizerProps {
  imageUrl: string;
  isActive: boolean;
  mode: 'listening' | 'speaking' | 'idle';
}

const AvatarVisualizer: React.FC<AvatarVisualizerProps> = ({ imageUrl, isActive, mode }) => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      {/* Ripple Effects when speaking */}
      {mode === 'speaking' && (
        <>
          <div className="absolute inset-0 rounded-full bg-copper-500/20 animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-0 rounded-full bg-copper-500/10 animate-pulse" style={{ animationDuration: '1.5s' }}></div>
        </>
      )}
      
      {/* Listening Indicator */}
      {mode === 'listening' && (
         <div className="absolute -inset-2 rounded-full border-2 border-emerald-400/50 animate-pulse"></div>
      )}

      {/* Avatar Image */}
      <div className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-all duration-300 ${mode === 'speaking' ? 'border-copper-500 shadow-[0_0_30px_rgba(249,115,22,0.4)]' : mode === 'listening' ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/10'}`}>
        <img src={imageUrl} alt="Coach Avatar" className="w-full h-full object-cover" />
        
        {/* Overlay for Idle */}
        {mode === 'idle' && <div className="absolute inset-0 bg-black/20"></div>}
      </div>
      
      {/* Status Badge */}
      <div className="absolute -bottom-4 bg-surface_light border border-white/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-xl z-10">
        {mode === 'speaking' ? 'Speaking' : mode === 'listening' ? 'Listening' : 'Ready'}
      </div>
    </div>
  );
};

export default AvatarVisualizer;