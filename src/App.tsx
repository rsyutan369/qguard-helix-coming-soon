import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Bell, X, Cpu, Settings, RefreshCw, AlertTriangle, Send } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import SpecsModal from './components/SpecsModal';
import AboutModal from './components/AboutModal';
import RoadmapModal from './components/RoadmapModal';
import ToastContainer, { showStatusToast } from './components/Toast';
import { featuresData } from './data';
import { FeatureItem } from './types';

export default function App() {
  // Navigation & Interactive states representing system actions
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  // Email state for "Get Updates" Modal
  const [modalEmail, setModalEmail] = useState('');
  const [modalCategory, setModalCategory] = useState<'all' | 'logs' | 'news'>('all');
  const [modalStatus, setModalStatus] = useState<'idle' | 'submitting' | 'success' | 'warn'>('idle');
  const [modalMsg, setModalMsg] = useState('');

  const handleModalSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEmail) {
      setModalStatus('warn');
      setModalMsg('Please enter your email.');
      showStatusToast('Email parameter is required.', 'warn');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(modalEmail)) {
      setModalStatus('warn');
      setModalMsg('Invalid format. Please verify your address.');
      showStatusToast('Malformed email address hash.', 'warn');
      return;
    }

    setModalStatus('submitting');
    showStatusToast('Submitting launch codes signup request...', 'info');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: modalEmail, source: `modal_${modalCategory}` }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store locally
        let stored: string[] = [];
        try {
          const storedStr = localStorage.getItem('qguard_partners');
          const parsed = storedStr ? JSON.parse(storedStr) : [];
          if (Array.isArray(parsed)) {
            stored = parsed;
          }
        } catch (e) {
          console.error(e);
        }
        if (!stored.includes(modalEmail)) {
          stored.push(modalEmail);
          localStorage.setItem('qguard_partners', JSON.stringify(stored));
        }
        setModalStatus('success');
        setModalMsg(`Success! Saved in "${data.table}" table via Supabase.`);
        showStatusToast(`Alert subscription established securely!`, 'success');
        setModalEmail('');
      } else {
        setModalStatus('warn');
        const fallbackMsg = data.details || data.explanation || data.error || 'Server rejected subscription.';
        setModalMsg(fallbackMsg);
        showStatusToast(`Engine warning: ${data.error || 'Server rejected subscription.'}`, 'warn');
      }
    } catch (err: any) {
      console.error(err);
      setModalStatus('warn');
      setModalMsg('Connection breakdown: No network pathway to subscription dispatcher.');
      showStatusToast('Connection path failed. Retrying in bypass mode...', 'warn');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-indigo-100 selection:text-indigo-900 relative justify-between overflow-x-hidden">
      
      {/* Decorative ambient particles floating slowly in the backgrounds */}
      <div className="absolute top-1/4 left-1/12 h-1.5 w-1.5 rounded-full bg-indigo-400 opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 h-2 w-2 rounded-full bg-blue-400 opacity-20 animate-pulse [animation-delay:1.5s] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 h-1 w-1 rounded-full bg-indigo-505 opacity-25 animate-pulse [animation-delay:3s] pointer-events-none" />

      {/* Cybernetic Navigation Header */}
      <Navbar
        onOpenSubscribeModal={() => setIsSubscribeOpen(true)}
        onOpenAboutModal={() => setIsAboutOpen(true)}
        onOpenRoadmapModal={() => setIsRoadmapOpen(true)}
        onSelectFeature={(featureId) => {
          // Open details specs directly by searching the list
          const feat = featuresData.find(f => f.id === featureId) || featuresData[0];
          if (feat) {
            setSelectedFeature(feat);
          }
        }}
      />

      {/* Scrollable Layout main viewport */}
      <main className="flex-1">
        {/* Under Construction Hero Display & Interactive Core Terminal */}
        <Hero />

        {/* Features list showing target grid structures */}
        <div className="border-t border-slate-100 bg-slate-50/20 py-10">
          <Features onSelectFeature={(feature) => setSelectedFeature(feature)} />
        </div>

        {/* Live system telemetry indicators as shown in prime technical layouts */}
        <section className="py-8 bg-slate-50/50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl shadow-indigo-50/40 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-4 items-center shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <Settings className="h-5.5 w-5.5 animate-spin [animation-duration:8s]" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-sm text-slate-800">Quantum Engine Diagnostics</h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5 uppercase tracking-wider">
                    Core Version v3.9 • Integrity Check Passed
                  </p>
                </div>
              </div>

              {/* Technical indicators mapping */}
              <div className="flex flex-wrap gap-4 sm:gap-8 justify-center items-center text-center font-sans">
                <div>
                  <span className="block text-2xl font-black text-indigo-600 tracking-tight">
                    NIST FIPS
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                    Standards Compliance
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-slate-100 hidden sm:block" />
                <div>
                  <span className="block text-2xl font-black text-indigo-600 tracking-tight">
                    100%
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                    Decoupled Entropy
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-slate-100 hidden sm:block" />
                <div>
                  <span className="block text-2xl font-black text-indigo-600 tracking-tight">
                    0.00ms
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                    Migration Latency
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer segment */}
      <Footer />

      {/* 1. INTERACTIVE POPUP SPECS DESCRIPTIONS */}
      {selectedFeature && (
        <SpecsModal
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      )}

      {/* 2. ABOUT PROSPECTUS DRAWER POPUP */}
      {isAboutOpen && (
        <AboutModal onClose={() => setIsAboutOpen(false)} />
      )}

      {/* 3. ROADMAP VERTICAL TRAJECTORY */}
      {isRoadmapOpen && (
        <RoadmapModal onClose={() => setIsRoadmapOpen(false)} />
      )}

      {/* 4. NEWS SUBSCRIBER TELEMETRY MODAL */}
      {isSubscribeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-600" />
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-indigo-600">
                <Bell className="h-4.5 w-4.5 animate-bounce" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400">
                  SECURE NOTIFICATION PIPELINE
                </span>
              </div>
              <button 
                onClick={() => {
                  setIsSubscribeOpen(false);
                  setModalStatus('idle');
                  setModalEmail('');
                }}
                className="rounded p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {modalStatus !== 'success' ? (
              <form onSubmit={handleModalSubscribe} className="py-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-sans font-black text-xl text-slate-900">Subscribe for Launch Codes</h3>
                  <p className="text-xs text-slate-500">
                    Receive verified platform updates, technical progress audits, and access invitations directly.
                  </p>
                </div>

                {/* Subscribing feeds category options */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-400 tracking-wider block uppercase">
                    Select Channel Focus
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setModalCategory('all')}
                      className={`text-center py-2 px-1 rounded-lg border font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
                        modalCategory === 'all'
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      All Feeds
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalCategory('logs')}
                      className={`text-center py-2 px-1 rounded-lg border font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
                        modalCategory === 'logs'
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Sec Logs
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalCategory('news')}
                      className={`text-center py-2 px-1 rounded-lg border font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
                        modalCategory === 'news'
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      FIPS Alert
                    </button>
                  </div>
                </div>

                {/* Input text field block */}
                <div className="space-y-1.5">
                  <input
                    type="email"
                    value={modalEmail}
                    onChange={(e) => {
                      setModalEmail(e.target.value);
                      if (modalStatus === 'warn') setModalStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    disabled={modalStatus === 'submitting'}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-sans text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 disabled:opacity-50"
                  />
                  {modalStatus === 'warn' && (
                    <div className="flex gap-2 items-center text-[10px] font-mono text-rose-500 animate-pulse">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <span>{modalMsg}</span>
                    </div>
                  )}
                </div>

                {/* Confirm send */}
                <button
                  type="submit"
                  disabled={modalStatus === 'submitting'}
                  className="w-full relative flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 font-sans font-bold text-sm text-white hover:bg-indigo-750 transition-colors shadow-md shadow-indigo-100 cursor-pointer"
                >
                  {modalStatus === 'submitting' ? (
                     <>
                      <Cpu className="h-4 w-4 animate-spin" />
                      <span>Establishing Tunnel...</span>
                     </>
                  ) : (
                     <>
                      <Send className="h-4 w-4" />
                      <span>Configure Alerts</span>
                     </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-lg text-slate-800">Security Channel Open!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    A cryptographic routing token was registered for your email. You will receive real-time NIST transition reports.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsSubscribeOpen(false);
                    setModalStatus('idle');
                    setModalEmail('');
                  }}
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-755 font-sans font-bold text-xs text-white py-3.5 shadow-md shadow-indigo-100 transition-colors cursor-pointer"
                >
                  Exit Safe Connection
                </button>
              </div>
            )}

            <div className="text-center text-[9px] font-mono text-slate-400 select-none pb-1 shrink-0 pt-3 border-t border-slate-100">
              SECURE SHA-256 SIGNATURE APPLIED • TLS V1.3
            </div>
          </div>
        </div>
      )}

      {/* Persistent Dynamic Toast Engine alerts container */}
      <ToastContainer />

    </div>
  );
}
