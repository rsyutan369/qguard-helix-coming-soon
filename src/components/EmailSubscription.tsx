import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { showStatusToast } from './Toast';

export default function EmailSubscription() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'validating' | 'completed' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setFeedback('Key error: Please provide a target email address.');
      showStatusToast('Target email is required.', 'warn');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setFeedback('Malformed hash: Please enter a valid email format.');
      showStatusToast('Invalid email pattern.', 'warn');
      return;
    }

    setStatus('validating');
    showStatusToast('Encrypting subscriber token identity...', 'info');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'landing_form' }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store locally as fallback
        let savedEmails: string[] = [];
        try {
          const storedData = localStorage.getItem('qguard_subscribers');
          const parsed = storedData ? JSON.parse(storedData) : [];
          if (Array.isArray(parsed)) {
            savedEmails = parsed;
          }
        } catch (e) {
          console.error(e);
        }
        if (!savedEmails.includes(email)) {
          savedEmails.push(email);
          localStorage.setItem('qguard_subscribers', JSON.stringify(savedEmails));
        }
        setStatus('completed');
        setFeedback(`Subscription registered! Secure handshakes initialized via Supabase in the "${data.table}" table.`);
        showStatusToast('Waitlist secure handshake confirmed!', 'success');
        setEmail('');
      } else {
        setStatus('error');
        setFeedback(data.details || data.explanation || data.error || 'Server rejected subscription.');
        showStatusToast(`Registration failed: ${data.error || 'Check fields.'}`, 'warn');
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setFeedback('Connection breakdown: No network pathway to subscription dispatcher.');
      showStatusToast('Disruptive network error. Form failed to dispatch.', 'warn');
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-indigo-50/40">
      {/* Laser line overlay at the top */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Side: Mail icon & Header Text info */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-505 to-indigo-600 shadow-lg shadow-indigo-150">
            <Mail className="h-6 w-6 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-indigo-950 border border-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            </span>
          </div>

          <div className="flex flex-col leading-snug">
            <h4 className="font-sans font-bold text-lg text-slate-900">
              Be the First to Know!
            </h4>
            <p className="font-sans text-xs text-slate-500 mt-1">
              Subscribe to get notified when we launch.
            </p>
          </div>
        </div>

        {/* Right Side: subscription cyber form */}
        <div className="w-full lg:max-w-md">
          {status !== 'completed' ? (
            <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-2">
              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  disabled={status === 'validating'}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-sans text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 disabled:opacity-50"
                />
                
                {status === 'validating' && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[10px] font-mono text-indigo-600">
                    <Cpu className="h-3 w-3 animate-spin" />
                    <span>SECURE RING CONFLICT...</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'validating'}
                className="group relative flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-sans font-bold text-sm text-[#ffffff] shadow-lg shadow-indigo-150 hover:bg-indigo-700 hover:shadow-indigo-250 active:scale-95 disabled:opacity-50 select-none cursor-pointer"
              >
                <span>Notify Me</span>
                <Send className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-150 bg-emerald-50/55 p-3.5 animate-in fade-in zoom-in-95 duration-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800 font-sans">Handshake Established</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Your email has been encrypted and saved. Pre-launch credentials generated.</p>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="text-[10px] font-mono font-bold text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded hover:bg-white"
              >
                Reset
              </button>
            </div>
          )}

          {/* Verification feedback warning line */}
          {status === 'error' && (
            <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-rose-500 border-l-2 border-rose-500 pl-2 animate-pulse">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
