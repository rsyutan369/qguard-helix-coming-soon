import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warn';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

// Global invocation helper
export function showStatusToast(message: string, type: ToastType = 'success') {
  const event = new CustomEvent('qguard-toast', {
    detail: { message, type, id: Math.random().toString(36).substring(2, 9) }
  });
  window.dispatchEvent(event);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastItem>;
      if (customEvent.detail) {
        setToasts(prev => [...prev, customEvent.detail]);
        
        // Auto-cleanup after 4 seconds
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== customEvent.detail.id));
        }, 4000);
      }
    };

    window.addEventListener('qguard-toast', handleToastEvent);
    return () => window.removeEventListener('qguard-toast', handleToastEvent);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const isSuccess = toast.type === 'success';
          const isWarn = toast.type === 'warn';
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              layout
              className="pointer-events-auto w-full select-none overflow-hidden rounded-xl border bg-white p-4 shadow-xl transition-all flex gap-3.5 items-start relative border-slate-100"
            >
              {/* Highlight accent bar */}
              <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                isSuccess 
                  ? 'bg-emerald-500' 
                  : isWarn 
                  ? 'bg-rose-500' 
                  : 'bg-indigo-505'
              }`} />

              {/* Status Icons */}
              <div className="shrink-0 mt-0.5">
                {isSuccess ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 filter drop-shadow-[0_0_4px_rgba(16,185,129,0.2)]" />
                ) : isWarn ? (
                  <AlertTriangle className="h-5 w-5 text-rose-500 filter drop-shadow-[0_0_4px_rgba(244,63,94,0.2)]" />
                ) : (
                  <Info className="h-5 w-5 text-indigo-650 filter drop-shadow-[0_0_4px_rgba(79,70,229,0.2)]" />
                )}
              </div>

              {/* Message Details */}
              <div className="flex-1 min-w-0 pr-4">
                <p className="font-mono text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  {isSuccess ? 'Success Handshake' : isWarn ? 'System Warning' : 'Platform Alert'}
                </p>
                <p className="mt-1 font-sans text-xs font-semibold text-slate-800 leading-relaxed break-words">
                  {toast.message}
                </p>
              </div>

              {/* Dismiss controls */}
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-0.5 text-slate-405 hover:bg-slate-50 hover:text-slate-800 rounded transition-colors self-start cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
