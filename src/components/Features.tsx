import React from 'react';
import { motion } from 'motion/react';
import { Search, Eye, Shield, Cpu, RefreshCw, Shuffle, Lock, FileCheck } from 'lucide-react';
import { featuresData } from '../data';
import { FeatureItem } from '../types';
import { showStatusToast } from './Toast';

interface FeaturesProps {
  onSelectFeature: (feature: FeatureItem) => void;
}

export default function Features({ onSelectFeature }: FeaturesProps) {

  // High-Fidelity Cyber Lucide Icons with dynamic glowing effects
  const renderFeatureIcon = (name: string) => {
    switch (name) {
      case 'search':
        return <Search className="h-6 w-6 text-cyan-500 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.5)] animate-pulse" strokeWidth={2} />;
      case 'eye':
        return <Eye className="h-6 w-6 text-purple-500 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]" strokeWidth={2} />;
      case 'shield':
        return <Shield className="h-6 w-6 text-cyan-500 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" strokeWidth={2} />;
      case 'cpu':
        return <Cpu className="h-6 w-6 text-purple-500 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]" strokeWidth={2} />;
      case 'refresh':
        return <RefreshCw className="h-6 w-6 text-cyan-500 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.5)] animate-spin [animation-duration:10s]" strokeWidth={2} />;
      case 'shuffle':
        return <Shuffle className="h-6 w-6 text-purple-500 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]" strokeWidth={2} />;
      case 'lock':
        return <Lock className="h-6 w-6 text-cyan-500 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" strokeWidth={2} />;
      case 'filecheck':
        return <FileCheck className="h-6 w-6 text-purple-500 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]" strokeWidth={2} />;
      default:
        return <Shield className="h-6 w-6 text-cyan-500" />;
    }
  };

  // Motion variants for stagger entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const handleCardClick = (item: FeatureItem) => {
    showStatusToast(`Opening blueprint specs for ${item.shortTitle}...`, 'info');
    onSelectFeature(item);
  };

  return (
    <section id="features-section" className="relative w-full py-10">
      {/* Visual background anchor block */}
      <div className="absolute inset-0 bg-radial-gradient from-indigo-50/15 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Title sub-section matching the exact prompt phrasing */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            </div>
            <h3 className="font-sans text-xs font-bold tracking-[0.25em] text-indigo-600 uppercase">
              Qguard Helix Features and MORE...
            </h3>
          </div>
          <div className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
            DESCRIPTIVE SCHEMATICS V2.0a
          </div>
        </div>

        {/* 4-Column Grid beautifully laying out our 8 items with Staggered Entrance Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {featuresData.map((item, idx) => {
            const isPurpleFeature = idx % 2 === 1;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleCardClick(item)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition-all duration-300 hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-50/30"
              >
                {/* Visual Glow overlay on card hover */}
                <div className={`absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full blur-2xl transition-all duration-300 group-hover:opacity-100 ${isPurpleFeature ? 'bg-indigo-600/5' : 'bg-blue-600/5'
                  }`} />

                {/* Styled Icon Slot */}
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50/60 border ${isPurpleFeature ? 'border-indigo-100/30 text-indigo-600' : 'border-blue-100/30 text-blue-600'
                    } transition-colors group-hover:border-indigo-300`}>
                    {renderFeatureIcon(item.iconName)}
                  </div>
                  {/* Small alpha/beta status badge */}
                  <span className={`text-[8px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${item.status === 'Active'
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                      : item.status === 'Beta'
                        ? 'bg-indigo-50 border-indigo-100 text-indigo-700'
                        : item.status === 'Alpha'
                          ? 'bg-amber-50 border-amber-100 text-amber-700'
                          : 'bg-slate-50 border-slate-150 text-slate-600'
                    }`}>
                    {item.status}
                  </span>
                </div>

                {/* Feature Title */}
                <h4 className="font-sans font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 md:h-10 leading-snug">
                  {item.title}
                </h4>

                {/* Feature Brief Description */}
                <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Call-to-action indicator */}
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-indigo-500 hover:text-indigo-602 transition-colors uppercase">
                  <span>View Specs</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
