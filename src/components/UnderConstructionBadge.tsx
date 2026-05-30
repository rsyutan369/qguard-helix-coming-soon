import React from 'react';

export default function UnderConstructionBadge() {
  return (
    <div className="inline-flex flex-col items-center select-none shrink-0" aria-hidden="true">
      {/* Top flashing yellow lights */}
      <div className="flex gap-4 mb-1">
        {/* Left Flashing Light */}
        <div className="relative flex h-5 w-5 items-center justify-center">
          {/* Light bulb back casing */}
          <div className="absolute h-4 w-4 rounded-full bg-slate-100 border border-slate-200" />
          {/* Light emitter with pulsing warning halo */}
          <div className="absolute h-3.5 w-3.5 rounded-full bg-amber-500 animate-ping opacity-75" />
          <div className="relative h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] border border-amber-300" />
        </div>

        {/* Right Flashing Light */}
        <div className="relative flex h-5 w-5 items-center justify-center">
          <div className="absolute h-4 w-4 rounded-full bg-slate-100 border border-slate-200" />
          <div className="absolute h-3.5 w-3.5 rounded-full bg-amber-500 animate-ping opacity-75 [animation-delay:0.5s]" />
          <div className="relative h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] border border-amber-300" />
        </div>
      </div>

      {/* Yellow/Black striped heavy-duty barricade beam */}
      <div className="relative h-6 w-20 rounded border border-slate-200 overflow-hidden shadow-sm">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, #eab308 0px, #eab308 10px, #334155 10px, #334155 20px)'
          }}
        />
        {/* Subtle metallic overlay glint */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5" />
      </div>

      {/* Metal stands A-Frame */}
      <div className="flex gap-14 -mt-0.5 justify-between w-[5.5rem]">
        {/* Left leg stand */}
        <svg viewBox="0 0 10 12" className="h-3 w-3 text-slate-300">
          <polygon points="5,0 10,12 8,12 5,4 2,12 0,12" fill="currentColor" />
        </svg>
        {/* Right leg stand */}
        <svg viewBox="0 0 10 12" className="h-3 w-3 text-slate-300">
          <polygon points="5,0 10,12 8,12 5,4 2,12 0,12" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
