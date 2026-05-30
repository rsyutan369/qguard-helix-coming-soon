import React from 'react';
import { X, Calendar, CheckCircle2, ShieldEllipsis, AlertCircle, HelpCircle } from 'lucide-react';
import { roadmapData } from '../data';

interface RoadmapModalProps {
  onClose: () => void;
}

export default function RoadmapModal({ onClose }: RoadmapModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Glowing laser underline */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-indigo-650" />
            <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
              STRATEGIC ROADMAP MAP • PHASE REPORT
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close roadmap modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Vertical Timeline */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          <div className="relative border-l-2 border-slate-100 ml-4 pl-6 space-y-8 py-2">
            {roadmapData.map((phase) => {
              const isCompleted = phase.status === 'completed';
              const isCurrent = phase.status === 'current';

              return (
                <div key={phase.quarter} className="relative group">
                  {/* Anchor Point indicators with glowing state circles */}
                  <div className="absolute -left-[1.95rem] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200">
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-indigo-600"></span>
                      </span>
                    ) : (
                      <ShieldEllipsis className="h-3 w-3 text-slate-400" />
                    )}
                  </div>

                  {/* Context Block */}
                  <div className="space-y-1.5">
                    <span className={`inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${
                      isCompleted 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                        : isCurrent 
                        ? 'bg-indigo-50 border-indigo-100 text-indigo-700' 
                        : 'bg-slate-50 border-slate-150 text-slate-505'
                    }`}>
                      {phase.quarter} • {phase.status.toUpperCase()}
                    </span>

                    <h4 className="font-sans font-extrabold text-slate-800 text-base">
                      {phase.title}
                    </h4>

                    <p className="font-sans text-xs text-slate-500">
                      {phase.description}
                    </p>

                    {/* Step micro bullet actions */}
                    <ul className="mt-3 space-y-1.5 list-none">
                      {phase.points.map((point, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-slate-505">
                          <span className={`text-[10px] font-mono shrink-0 select-none ${isCompleted ? 'text-emerald-600' : isCurrent ? 'text-indigo-600' : 'text-slate-400'}`}>
                            [✓]
                          </span>
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer toolbar actions */}
        <div className="pt-4 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-750 font-sans font-bold text-xs text-white px-6 py-2.5 shadow-md shadow-indigo-100 transition-colors cursor-pointer"
          >
            Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
}
