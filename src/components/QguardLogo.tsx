import React from 'react';
import logoImage from '../assets/images/NEW_LOGO_FINAL.png';

interface QguardLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function QguardLogo({ size = 'md', showText = true, className = '' }: QguardLogoProps) {
  const dimensions = {
    sm: { avatar: 'w-10 h-10', textTitle: 'text-lg', textSub: 'text-[9px]' },
    md: { avatar: 'w-14 h-14', textTitle: 'text-2xl', textSub: 'text-[11px]' },
    lg: { avatar: 'w-24 h-24', textTitle: 'text-4xl', textSub: 'text-[14px]' }
  };

  const currentSize = dimensions[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* High-Fidelity SVG Logo Emblem */}
      <div className={`relative flex items-center justify-center select-none shrink-0 ${currentSize.avatar} overflow-hidden rounded-xl border border-slate-100 bg-white/80 p-0.5 shadow-sm`}>
        <img
          src={logoImage}
          alt="Qguard Helix"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_6px_rgba(79,70,229,0.2)]"
        />
      </div>

      {/* Typography block with exact letter spacing, styling and taglines */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex flex-col select-none">
            <span className={`font-sans font-black tracking-widest text-slate-800 uppercase leading-none ${currentSize.textTitle}`}>
              Qguard
            </span>
            <span className={`font-sans font-extrabold tracking-[0.25em] text-indigo-600 uppercase leading-none mt-0.5 ${currentSize.textSub} font-mono`}>
              Helix
            </span>
          </div>
          {size !== 'sm' && (
            <span className="text-[9px] text-slate-400 font-medium tracking-[0.15em] mt-1 hidden sm:inline-block font-sans whitespace-nowrap">
              Quantum. Secure. Future.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
