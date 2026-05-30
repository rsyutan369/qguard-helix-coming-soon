import React from 'react';
import { X, Network, ShieldCheck, History, Milestone } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Top glowing bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <History className="h-4.5 w-4.5 text-indigo-650" />
            <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
              PLATFORM PROSPECTUS • DOCUMENT DEE09
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close prospectus"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable specs info */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          <div className="space-y-3">
            <h3 className="font-sans font-black text-2xl text-slate-900 tracking-tight">
              Securing Tomorrow, Today.
            </h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              Qguard Helix was forged in response to the looming "Y2Q" threat—the day a Cryptographically Relevant Quantum Computer (CRQC) reaches the capability to break widely used asymmetric cryptography (RSA, Diffie-Hellman, ECC).
            </p>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              Our platform offers a turn-key cryptographic suite that allows enterprises to discover weaknesses using our advanced Cryptography Bill of Materials (CBOM) engine and seamlessly hot-swap legacy channels to NIST-approved post-quantum algorithms without network downtime.
            </p>
          </div>

          {/* Pillars of Quantum Defense */}
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-xs text-indigo-600 tracking-wider uppercase">
              CORE STRATEGICAL PILLARS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 shrink-0">
                <Network className="h-5 w-5 text-indigo-600 mb-2" />
                <h5 className="font-sans font-bold text-sm text-slate-800">1. Discovery</h5>
                <p className="text-[11px] text-slate-505 mt-1 leading-snug">
                  Uncover hidden legacy cryptographic keys, algorithms, and certificates.
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 shrink-0">
                <ShieldCheck className="h-5 w-5 text-indigo-600 mb-2" />
                <h5 className="font-sans font-bold text-sm text-slate-800">2. Transition</h5>
                <p className="text-[11px] text-slate-505 mt-1 leading-snug">
                  Orchestrate zero-touch updates to ML-KEM and ML-DSA standards.
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 shrink-0">
                <Milestone className="h-5 w-5 text-indigo-600 mb-2" />
                <h5 className="font-sans font-bold text-sm text-slate-800">3. Fabric</h5>
                <p className="text-[11px] text-slate-505 mt-1 leading-snug">
                  Deploy complete quantum-secure trust meshes globally.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance notice */}
          <div className="rounded-xl border border-dashed border-indigo-150 bg-indigo-50/50 p-4">
            <h5 className="text-xs font-bold text-indigo-600 font-sans">Federal Standards (NSM-10 & NSM-08)</h5>
            <p className="text-[11px] text-slate-505 mt-1 leading-relaxed">
              Qguard Helix is fully aligned with FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), and FIPS 205 (FN-DSA) drafts published by the National Institute of Standards and Technology. Our CBOM engine complies with the primary discovery orders regarding modern agency standards.
            </p>
          </div>
        </div>

        {/* Footer toolbar actions */}
        <div className="pt-4 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-750 font-sans font-bold text-xs text-white px-6 py-2.5 cursor-pointer shadow-md shadow-indigo-100 transition-colors"
          >
            Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
}
