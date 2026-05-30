import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldAlert, Cpu, Terminal as TermIcon, ShieldCheck } from 'lucide-react';
import { FeatureItem } from '../types';

interface SpecsModalProps {
  feature: FeatureItem | null;
  onClose: () => void;
}

interface LogItem {
  id: string;
  timestamp: string;
  address: string;
  category: string;
  text: string;
}

export default function SpecsModal({ feature, onClose }: SpecsModalProps) {
  const [terminalLogs, setTerminalLogs] = useState<LogItem[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Helper to generate elegant mock log items
  const makeLogItem = (rawString: string, stepIndex = 0): LogItem => {
    const now = new Date();
    // Offset timestamps in milliseconds to simulate incremental execution delays
    const timeOffset = new Date(now.getTime() - (10 - stepIndex) * 200);
    const h = String(timeOffset.getHours()).padStart(2, '0');
    const m = String(timeOffset.getMinutes()).padStart(2, '0');
    const s = String(timeOffset.getSeconds()).padStart(2, '0');
    const ms = String(timeOffset.getMilliseconds()).padStart(3, '0').substring(0, 3);
    
    const hexAddress = `0x${((stepIndex + 1) * 44 + 4096).toString(16).toUpperCase()}`;
    const match = rawString.match(/^\[([^\]]+)\]\s*(.*)$/);
    const category = match ? match[1] : 'SYSTEM';
    const text = match ? match[2] : rawString;

    return {
      id: `${rawString}-${timeOffset.getTime()}-${Math.random()}`,
      timestamp: `${h}:${m}:${s}.${ms}`,
      address: hexAddress,
      category,
      text
    };
  };

  useEffect(() => {
    if (!feature) {
      setTerminalLogs([]);
      setIsSimulating(false);
      return;
    }

    const simulationSteps = getSimulationSteps(feature.id);
    let currentStep = 0;

    // Initialize custom logs based on selected quantum module
    const initialLogs = [
      `[CRITICAL] Initializing Qguard Helix Decoupled Core...`,
      `[SECURITY] Handshake layer TLS v1.3 loaded with double-tunneling hooks.`,
      `[SYSTEM] Connecting to ${feature.title} kernel...`
    ];
    setTerminalLogs(initialLogs.map((log, idx) => makeLogItem(log, idx)));
    setIsSimulating(true);

    const interval = setInterval(() => {
      if (currentStep < simulationSteps.length) {
        const nextLogStr = simulationSteps[currentStep];
        setTerminalLogs(prev => [...prev, makeLogItem(nextLogStr, currentStep + 3)]);
        currentStep++;
      } else {
        const successLogStr = `[SUCCESS] ${feature.shortTitle} compilation verified. Service is ready at [STABLE LOCK].`;
        setTerminalLogs(prev => [
          ...prev, 
          makeLogItem(successLogStr, currentStep + 4)
        ]);
        setIsSimulating(false);
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [feature]);

  // Scroll to bottom of terminal whenever log appends
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  if (!feature) return null;

  function getSimulationSteps(id: string): string[] {
    switch (id) {
      case 'crypto-discovery':
        return [
          `[CBOM] Initiating network discovery and CBOM compilation engine...`,
          `[CBOM] Identified active x509 encryption keys and certificate chains.`,
          `[CBOM] CBOM evidence found: RSA-2048 and ECDSA secp256r1 algorithms identified.`,
          `[CBOM] Generating complete digital inventory payload of cryptographic assets...`,
          `[CBOM] Compliance check: Weak algorithms (SHA-1, 3DES) highlighted for deprecation.`
        ];
      case 'runtime-intel':
        return [
          `[INTEL] Starting live telemetry capture on microservice interfaces...`,
          `[INTEL] Tracking real-time TLS handshake behavior and active cipher negotiation.`,
          `[INTEL] Live API inspection: Identified 4.2k monthly active cryptographic calls.`,
          `[INTEL] Profiling entropy generation and key usage across production cluster.`,
          `[INTEL] Real-time warning: Legacy RSA signatures flagged for TLS negotiations.`
        ];
      case 'harvest-defense':
        return [
          `[SECURITY] Activating Harvest Defense perimeter guards...`,
          `[SECURITY] Running continuous classification scans for sensitive stored files.`,
          `[SECURITY] Categorized 1,248 assets high-risk for Harvest Now, Decrypt Later vulnerability.`,
          `[SECURITY] Deploying defensive ML-KEM wrapped transport boundaries...`,
          `[SECURITY] Hardening deep archive data layers ahead of future quantum decryptions.`
        ];
      case 'risk-sandbox':
        return [
          `[INTEL] Loading interactive risk simulation module v2.0...`,
          `[INTEL] Executing modeled Shor's algorithm over current RSA configurations...`,
          `[INTEL] Critical failure predicted: Classical asymmetric keys fully vulnerable.`,
          `[INTEL] Computing quantum readiness scores out of 100... Ready: 12%`,
          `[INTEL] Recommending transition roadmap to NIST FIPS 203 primary structures.`
        ];
      case 'migration-orchestration':
        return [
          `[MIGRATE] Spawning autonomous migration orchestrators across testbed...`,
          `[MIGRATE] Transitioning keys from classical RSA to NIST-approved post-quantum math.`,
          `[MIGRATE] Dual-control validation: Live key verification on gateway active.`,
          `[MIGRATE] Testing automatic rollback protocol under simulated cluster disconnection.`,
          `[MIGRATE] Rollback simulation: Validated. Zero downtime recorded during reversion.`
        ];
      case 'transport-orchestrator':
        return [
          `[MIGRATE] Binding to transport layer communication sockets...`,
          `[MIGRATE] Negotiating hybrid key exchanges using Kyber/ML-KEM algorithms.`,
          `[MIGRATE] Upgrading insecure TLS routes to quantum-secure tunnel models.`,
          `[MIGRATE] Monitoring live jitter and throughput of post-quantum network packets.`,
          `[MIGRATE] Transport optimized: Near-zero overhead recorded under high volume.`
        ];
      case 'quantum-vault':
        return [
          `[SECURITY] Spinning up zero-knowledge quantum protection container...`,
          `[SECURITY] Initializing stateful post-quantum authentication protocols.`,
          `[SECURITY] Formulating hybrid quantum-wrapped key management matrix.`,
          `[SECURITY] Cryptographic lock: Stored sensitive databases are now quantum-safe.`,
          `[SECURITY] Outer inspection confirmed: Secured records present pure chaotic noise.`
        ];
      case 'gov-compliance':
        return [
          `[CBOM] Aligning current posture with NIST FIPS 203/204 Drafts...`,
          `[CBOM] Mapping infrastructure rules against FIPS-140 standard boundaries.`,
          `[SYSTEM] Generating automated audit telemetry journals... Done.`,
          `[CBOM] Policy engine assessment: Zero critical policy gaps remaining.`,
          `[SUCCESS] Compliance audit certificate prepared for immediate export.`
        ];
      default:
        return [`[SYSTEM] Preparing safe diagnostic suites...`];
    }
  }

  // Calculate current loading progress
  const totalSteps = getSimulationSteps(feature.id).length + 4;
  const progressPercent = terminalLogs.length > 0 
    ? Math.min(Math.round((terminalLogs.length / totalSteps) * 100), 100)
    : 0;

  // Badge category colors mapper
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'SUCCESS':
        return 'bg-emerald-500/10 border-emerald-550 text-emerald-450';
      case 'CRITICAL':
        return 'bg-cyan-500/10 border-cyan-500 text-cyan-400';
      case 'SECURITY':
        return 'bg-indigo-500/10 border-indigo-500 text-indigo-400';
      case 'SYSTEM':
        return 'bg-slate-500/10 border-slate-600 text-slate-400';
      case 'CBOM':
        return 'bg-amber-500/10 border-amber-500 text-amber-400';
      case 'INTEL':
        return 'bg-purple-500/10 border-purple-500 text-purple-400';
      case 'MIGRATE':
        return 'bg-blue-500/10 border-blue-500 text-blue-400';
      default:
        return 'bg-slate-500/10 border-slate-600 text-slate-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Main card box container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Glowing laser underline in title bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500" />

        {/* Header toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2">
              <span className={`absolute inline-flex h-2 w-2 rounded-full ${isSimulating ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isSimulating ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            </span>
            <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
              MODULE SPECIFICATIONS • {feature.status} MODE
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable contents segment */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          <div>
            <h2 className="font-sans font-black text-2xl text-slate-900 tracking-tight leading-tight">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm text-slate-650 leading-relaxed font-sans">
              {feature.fullDetails}
            </p>
          </div>

          {/* Quick core metrics metrics panel */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <h4 className="font-mono text-[10px] text-slate-450 tracking-widest uppercase">
                LATENCY OVERHEAD
              </h4>
              <p className="mt-1 font-sans text-lg font-bold text-indigo-650">
                {feature.id === 'pqc-core' ? '< 35μs' : 'Inconsequential'}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <h4 className="font-mono text-[10px] text-slate-450 tracking-widest uppercase">
                INTEGRATION PROTOCOL
              </h4>
              <p className="mt-1 font-sans text-lg font-bold text-indigo-650">
                {feature.id === 'cbom' ? 'SBOM/CI-CD' : 'Dual-Tunneling TLS'}
              </p>
            </div>
          </div>

          {/* Immersive Sandbox Simulator Terminal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
                <TermIcon className="h-4.5 w-4.5 text-indigo-600" />
                <span>DYNAMIC INTEGRATION CONSOLE</span>
              </div>
              {isSimulating ? (
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-amber-500 animate-pulse">
                  <Cpu className="h-3.5 w-3.5 animate-spin" />
                  <span>TRANSACTION ACTIVE</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>COMPILATION SECURED</span>
                </span>
              )}
            </div>

            {/* Compiled Progress Meter for High Fidelity Sim */}
            <div className="rounded-xl border border-slate-900 bg-slate-950 p-3 flex flex-col gap-2 font-mono text-[11px] text-slate-450">
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex gap-2 text-indigo-400">
                  <span>SEGMENT: COMPREHENSIVE_SCHEMATIC</span>
                  <span className="opacity-40">|</span>
                  <span className="animate-pulse">{isSimulating ? 'COMPILING...' : 'STATUS: FINISHED'}</span>
                </div>
                <span className="font-bold text-slate-250">{progressPercent}%</span>
              </div>
              
              {/* Micro bar indicator */}
              <div className="w-full h-1.5 bg-slate-900 rounded overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Terminal logs view screen with high definition columns rendering */}
            <div
              ref={terminalRef}
              className="h-48 overflow-y-auto rounded-xl border border-slate-900 bg-slate-950 px-4 py-3 font-mono text-[11px] select-text scrollbar-thin scrollbar-thumb-zinc-850"
            >
              <div className="space-y-2">
                {terminalLogs.map((log) => {
                  return (
                    <div key={log.id} className="flex gap-3 items-start hover:bg-white/5 py-0.5 rounded px-1 transition-colors leading-relaxed">
                      {/* Left Side: Address Pointer & Timestamp columns */}
                      <span className="text-indigo-500/70 select-none hidden sm:inline">{log.address}</span>
                      <span className="text-slate-600 select-none">{log.timestamp}</span>
                      
                      {/* Category Badge Pill with custom borders */}
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider select-none shrink-0 ${getCategoryStyles(log.category)}`}>
                        {log.category}
                      </span>

                      {/* Log text content */}
                      <span className="text-slate-350 break-all flex-1">
                        {log.text}
                      </span>
                    </div>
                  );
                })}
                
                {isSimulating && (
                  <div className="flex gap-1.5 items-center text-indigo-400 pl-1 py-1">
                    <span className="h-2 w-3 bg-indigo-500 animate-pulse inline-block" />
                    <span className="text-[10px] font-mono select-none opacity-40">awaiting response package from socket tunnel...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer toolbar actions */}
        <div className="pt-4 border-t border-slate-100 flex justify-between shrink-0 items-center">
          <div className="flex gap-1.5 items-center text-xs text-slate-500 font-mono">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>FIPS 203 Cryptography Compliant</span>
          </div>
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
