import React, { useState } from 'react';
import { Menu, X, Bell, ExternalLink, ShieldCheck } from 'lucide-react';
import QguardLogo from './QguardLogo';
import { navigationItems } from '../data';

interface NavbarProps {
  onOpenSubscribeModal: () => void;
  onOpenAboutModal: () => void;
  onOpenRoadmapModal: () => void;
  onSelectFeature: (featureId: string) => void;
}

export default function Navbar({
  onOpenSubscribeModal,
  onOpenAboutModal,
  onOpenRoadmapModal,
  onSelectFeature
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const handleNavClick = (label: string, e: React.MouseEvent) => {
    setActiveItem(label);
    if (label === 'About') {
      e.preventDefault();
      onOpenAboutModal();
    } else if (label === 'Roadmap') {
      e.preventDefault();
      onOpenRoadmapModal();
    } else if (label === 'Features') {
      e.preventDefault();
      const element = document.getElementById('features-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (label === 'Solutions') {
      e.preventDefault();
      onSelectFeature('transport-orchestrator'); // Show a featured solution by default
    } else if (label === 'Contact') {
      e.preventDefault();
      const footer = document.getElementById('footer-section');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo block in the top-left */}
        <a href="#home" className="flex items-center" onClick={(e) => handleNavClick('Home', e)}>
          <QguardLogo size="md" showText={true} />
        </a>

        {/* Center Desktop Navigation menu items */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(item.label, e)}
                className={`relative px-4 py-2 font-sans font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? 'text-indigo-600 font-semibold'
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg'
                }`}
              >
                {item.label}
                {/* Visual Underline highlight for Active status */}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.3)] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Button (Get Updates with pulsing bell) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenSubscribeModal}
            className="group relative flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 font-sans font-bold text-sm text-[#ffffff] shadow-lg shadow-indigo-200 transition-all duration-300 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 cursor-pointer"
          >
            <span>Get Updates</span>
            <div className="relative flex items-center justify-center">
              <Bell className="h-4.5 w-4.5 text-white transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-300 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-100"></span>
              </span>
            </div>
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenSubscribeModal}
            className="p-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600"
            aria-label="Get notifications"
          >
            <Bell className="h-4.5 w-4.5 animate-pulse" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-950"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Slide-out Mobile Panel Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col h-full justify-between p-6">
            <div className="space-y-3">
              <div className="text-xs font-mono font-semibold tracking-widest text-slate-400 uppercase pb-2 border-b border-slate-100">
                Navigation Mesh
              </div>
              <div className="grid grid-cols-2 gap-3">
                {navigationItems.map((item) => {
                  const isActive = activeItem === item.label;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.label, e)}
                      className={`flex flex-col justify-center p-4 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? 'bg-indigo-50 border-indigo-100 text-indigo-600'
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="font-sans font-semibold text-base">{item.label}</span>
                      <span className="text-[10px] font-mono mt-0.5 opacity-60">
                        {item.label === 'Home' && 'Return index'}
                        {item.label === 'About' && 'Platform origin'}
                        {item.label === 'Features' && 'Defense suites'}
                        {item.label === 'Solutions' && 'NIST compliance'}
                        {item.label === 'Roadmap' && 'Milestone track'}
                        {item.label === 'Contact' && 'Secure channels'}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Status banner in mobile drawer */}
              <div className="mt-6 p-4 rounded-xl border border-dashed border-indigo-100 bg-indigo-50/50">
                <div className="flex gap-2 items-start">
                  <ShieldCheck className="h-5 w-5 text-indigo-650 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 font-sans">Enterprise Cryptography Suite</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      V3 scanning core is synchronized. Post-quantum defense is operating in beta status.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile notification trigger at bottom lock */}
            <div className="pb-8 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSubscribeModal();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-650 px-4 py-3.5 font-sans font-bold text-sm text-[#ffffff] hover:bg-indigo-700 transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span>Notify Me on Launch</span>
              </button>
              
              <div className="text-center text-[10px] font-mono text-slate-400">
                ACTIVE CODESPACE ACCESS • SECURE TLS V1.3
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
