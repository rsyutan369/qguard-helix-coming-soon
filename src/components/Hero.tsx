import React, { useState, useEffect } from 'react';
import { Rocket, ShieldAlert, Cpu, Lock, HelpCircle, HardDrive } from 'lucide-react';
import UnderConstructionBadge from './UnderConstructionBadge';
import EmailSubscription from './EmailSubscription';

export default function Hero() {
  const [loadPercentage, setLoadPercentage] = useState(85);
  const [activeTab, setActiveTab] = useState<'console' | 'health'>('console');
  const [ticks, setTicks] = useState(0);

  // Dynamic ticking simulation of network traffic
  useEffect(() => {
    const timer = setInterval(() => {
      setTicks(prev => prev + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full py-12 md:py-20 overflow-hidden">
      {/* Immersive background digital circuit/grid and laser shadows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      {/* Radiant radial gradient backing glow */}
      <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-indigo-100/30 blur-3xl" />
      <div className="absolute right-0 top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT COLUMN: Texts, Barricades, Progress Bar, Newsletter Form */}
          <div className="space-y-8 lg:col-span-7">
            
            {/* Headline and Barricade block */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="space-y-1">
                  <h1 className="font-sans font-black text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none uppercase">
                    Website is <br />
                    <span className="bg-gradient-to-r from-indigo-600 via-blue-605 to-cyan-500 bg-clip-text text-transparent">
                      Under Construction
                    </span>
                  </h1>
                </div>
                {/* Custom warning sign with flashing beacons */}
                <div className="shrink-0 self-start sm:self-center mt-2 sm:mt-0">
                  <UnderConstructionBadge />
                </div>
              </div>

              {/* Sub-heading & details */}
              <div className="space-y-3 max-w-xl">
                <p className="font-sans text-base sm:text-lg font-bold text-slate-800 leading-snug">
                  We are building the Future of{' '}
                  <span className="text-indigo-650 font-extrabold">
                    Quantum Cyber Defense.
                  </span>
                </p>
                <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Qguard Helix is an advanced cybersecurity platform engineered to protect organizations from today's threats and tomorrow's quantum risks.
                </p>
              </div>
            </div>

            {/* PROGRESS REGION (Rocket, 85%, gradient capsule bar) */}
            <div className="max-w-xl rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold">
                {/* Stiff floating rocket element */}
                <div className="flex items-center gap-2.5 text-indigo-600">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 shadow-[0_0_10px_rgba(79,70,229,0.1)] overflow-hidden">
                    {/* SVG rocket icon with glowing booster fire loop */}
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
                      <path d="M12 2C8 2 5 5 5 9c0 2.25 1 4.5 2 6.5L12 22l5-6.5c1-2 2-4.25 2-6.5 0-4-3-7-7-7z" />
                      <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                    {/* Animated thruster particles */}
                    <span className="absolute bottom-0 h-1 w-2 bg-amber-500 rounded-full animate-bounce" />
                  </div>
                  <span className="tracking-wide text-[11px] text-slate-600">Coming Soon...</span>
                </div>

                <div className="text-right text-indigo-600 font-bold text-[11px]">
                  {loadPercentage}%
                </div>
              </div>

              {/* Progress capsule */}
              <div className="relative h-4.5 w-full rounded-full bg-slate-100 border border-slate-200 p-0.5 overflow-hidden shadow-inner">
                {/* Glowing fill */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-505 via-indigo-600 to-cyan-500 shadow-[0_0_12px_rgba(79,70,229,0.3)] transition-all duration-1000 ease-out relative"
                  style={{ width: `${loadPercentage}%` }}
                >
                  {/* Internal shining core lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom-left interactive email subscription form */}
            <div className="max-w-xl">
              <EmailSubscription />
            </div>

          </div>

          {/* RIGHT COLUMN: Massive Smartphone/Tablet Interface */}
          <div className="lg:col-span-5 h-full relative">
            
            {/* Modern bracket terminal frame casing representing industrial machinery */}
            <div className="relative mx-auto max-w-md w-full scale-95 sm:scale-100 rounded-[2.5rem] border-8 border-slate-100 bg-white p-2 shadow-2xl shadow-indigo-100/50 overflow-hidden">
              
              {/* Glossy top sensor notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-32 rounded-full bg-slate-100 z-10 flex gap-2 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-505 animate-pulse" />
                <span className="h-1 w-8 rounded-full bg-slate-200" />
              </div>

              {/* High-Fidelity display viewport container */}
              <div className="relative h-[480px] w-full rounded-[2rem] border border-slate-150 bg-black overflow-hidden select-none">
                
                {/* The beautifully generated cyber image from AI Studio */}
                <img
                  src="/src/assets/images/qguard_under_construction_1780138360028.png"
                  alt="Qguard Helix Cyber Security Terminal Under Construction"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
                />

                {/* Laser scan lines sweeping down overlay */}
                <div 
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_10px_#4f46e5] pointer-events-none z-10" 
                  style={{
                    animation: 'sweep 3.5s linear infinite'
                  }}
                />

                {/* Cyber HUD elements overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-black/20 to-black/40 font-mono text-[9px] pointer-events-none">
                  
                  {/* Top indicators */}
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900 backdrop-blur-sm mt-3">
                    <div className="flex gap-1.5 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-cyan-400 font-bold">SECURE CHANNEL</span>
                    </div>
                    <span className="text-slate-500 font-bold">UPTIME: {(ticks * 1.5).toFixed(1)}s</span>
                  </div>

                  {/* Mid warning indicator */}
                  <div className="self-center flex flex-col items-center gap-1">
                    <div className="rounded border border-yellow-500/30 bg-yellow-950/20 px-3 py-1 animate-pulse backdrop-blur-sm text-yellow-400 font-bold">
                       CRITICAL STAGE SYNCHRONIZATION
                    </div>
                  </div>

                  {/* Bottom Console Overlays */}
                  <div className="space-y-2">
                    
                    {/* Live network status logs ticker */}
                    <div className="rounded-lg border border-slate-900 bg-slate-950/80 p-2.5 space-y-1 backdrop-blur-sm">
                      <div className="flex justify-between text-slate-500">
                        <span>SYS_LOGS: INIT</span>
                        <span className="text-cyan-400">STATE: PQC_ACTIVE</span>
                      </div>
                      <div className="text-slate-400 text-left">
                        {ticks % 3 === 0 && '>> [KEM_INIT] MLA Lattices matched. Entropy 100%'}
                        {ticks % 3 === 1 && '>> [CBOM] Cryptographic map parsed. 12 certs OK'}
                        {ticks % 3 === 2 && '>> [SYS_MON] Shunting legacy RSA pipelines to ML-KEM...'}
                      </div>
                    </div>

                    {/* Lower HUD controls */}
                    <div className="flex justify-between items-center text-slate-500">
                      <span>FIPS_203: APPROVED</span>
                      <span>SEC_LOCKED [SHA-512]</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Extra glowing status nodes floating behind the terminal */}
            <div className="absolute -top-3 -right-3 h-14 w-14 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />

          </div>

        </div>
      </div>

      {/* Embedded inline keyframes for sweeping laser effects */}
      <style>{`
        @keyframes sweep {
          0% { top: -2%; }
          50% { top: 102%; }
          100% { top: -2%; }
        }
      `}</style>
    </section>
  );
}
