import React from 'react';
import { Mail, Globe, Linkedin, Twitter, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer-section" className="relative w-full border-t border-slate-100 bg-slate-50/50 py-10">
      {/* Decorative vertical separator glint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-full max-w-7xl bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          {/* Left Block: Contact coordinates, URLs, socials separated by dividers */}
          <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-xs text-slate-500 font-mono">
            {/* Email contact */}
            <a
              href="mailto:info@qguardhelix.com"
              className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
            >
              <Mail className="h-4 w-4 text-indigo-600" />
              <span>info@qguardhelix.com</span>
            </a>

            <span className="hidden sm:inline text-slate-200">|</span>

            {/* Platform Website link */}
            <a
              href="https://www.qguardhelix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
            >
              <Globe className="h-4 w-4 text-indigo-600" />
              <span>www.qguardhelix.com</span>
            </a>

            <span className="hidden sm:inline text-slate-200">|</span>

            {/* Social handles matching circular indicators in reference */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/qguardhelix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-250 bg-white text-slate-505 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-650 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://twitter.com/qguardhelix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-250 bg-white text-slate-505 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-650 transition-all shadow-sm"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Block: Copyright & security status statement */}
          <div className="flex flex-col gap-1.5 md:items-end">
            <p className="font-sans text-xs text-slate-500">
              © 2026 Qguard Helix. All Rights Reserved.{' '}
              <span className="hidden sm:inline text-slate-200 font-mono">|</span>{' '}
              <span className="font-sans text-indigo-600 font-semibold inline-block">
                Building the Quantum-Secure Future.
              </span>
            </p>
            
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
              <ShieldAlert className="h-3 w-3 text-indigo-600/40" />
              <span>TLS V1.3 CODESIGN SECURE MATRIX CONNECTION</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
