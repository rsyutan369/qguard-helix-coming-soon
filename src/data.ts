import { NavItem, FeatureItem, RoadmapItem, SystemUpdate } from './types';

export const navigationItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Contact', href: '#contact' },
];

export const featuresData: FeatureItem[] = [
  {
    id: 'crypto-discovery',
    title: 'Crypto Asset Discovery & Inventory',
    shortTitle: 'Asset Discovery',
    description: 'Identify certificates, keys, endpoints, cryptographic dependencies, weak algorithms, and CBOM evidence across your environment.',
    fullDetails: 'Continuously scan your development and production workloads to map and catalog all cryptographic assets. Generate detailed Cryptographic Bill of Materials (CBOM) evidence, detect expired certificates, locate outdated TLS/SSL endpoints, and pinpoint obsolete hash functions or symmetric keys across cloud architectures.',
    iconName: 'search',
    status: 'Active'
  },
  {
    id: 'runtime-intel',
    title: 'Runtime Cryptographic Intelligence',
    shortTitle: 'Runtime Intel',
    description: 'Gain deep visibility into cryptographic operations, TLS behavior, key usage, and quantum exposure in real time.',
    fullDetails: 'Inspect passive TLS negotiations and live cryptographic session calls as they occur in production. Monitor key generation, trace cryptographic APIs to identify misuse, and evaluate quantum decryption exposure without degrading response times or throughput.',
    iconName: 'eye',
    status: 'Active'
  },
  {
    id: 'harvest-defense',
    title: 'Harvest Defense',
    shortTitle: 'Harvest Defense',
    description: 'Continuously discover, classify, and prioritize sensitive data vulnerable to Harvest Now, Decrypt Later threats.',
    fullDetails: 'Qguard Helix Harvest Defense continuously discovers, classifies, and prioritizes sensitive data vulnerable to Harvest Now, Decrypt Later attacks, enabling organizations to identify long-term cryptographic exposure, assess future decryption risk, and proactively implement quantum-safe protections before quantum adversaries can exploit archived encrypted data.',
    iconName: 'shield',
    status: 'Beta'
  },
  {
    id: 'risk-sandbox',
    title: 'Quantum Risk Assessment Sandbox',
    shortTitle: 'Risk Sandbox',
    description: 'Classify RSA, ECC, symmetric cryptography, and post-quantum readiness with interactive risk analysis.',
    fullDetails: 'An interactive virtual workshop to run simulated quantum decryption attacks on your actual cryptographic assets. Classify post-quantum readiness on all RSA, Diffie-Hellman, and ECC channels, giving you prioritized migration paths and compliance grades against upcoming federal regulations.',
    iconName: 'cpu',
    status: 'Beta'
  },
  {
    id: 'migration-orchestration',
    title: 'Post-Quantum Migration Orchestration',
    shortTitle: 'PQC Migration',
    description: 'Plan and automate migration to NIST-approved post-quantum cryptography with governance and rollback controls.',
    fullDetails: 'Plan and automate seamless hot-swapping to NIST-approved algorithms like ML-KEM and ML-DSA. Includes centralized security governance, continuous integrity verification, validation tests, and one-click fail-safe rollbacks to guarantee uninterrupted live node performance.',
    iconName: 'refresh',
    status: 'Development'
  },
  {
    id: 'transport-orchestrator',
    title: 'Quantum Transport Orchestrator',
    shortTitle: 'Transport Orchestrator',
    description: 'Upgrade communications from vulnerable classical key exchange to quantum-safe hybrid TLS without disruption.',
    fullDetails: 'Continuously discovers, assesses, upgrades, and monitors enterprise cryptographic communications, enabling organizations to transition from vulnerable classical key exchange to quantum-safe hybrid TLS with minimal operational disruption.',
    iconName: 'shuffle',
    status: 'Active'
  },
  {
    id: 'quantum-vault',
    title: 'Quantum Vault',
    shortTitle: 'Quantum Vault',
    description: 'Zero-knowledge, post-quantum encrypted storage designed to protect critical data against future threats.',
    fullDetails: 'Zero-knowledge encrypted storage engineered specifically to guard sensitive business databases and customer credentials. Employs advanced stateful quantum-resistant key encapsulation and strict identity-bounded consensus to stop persistent decryption threats in their tracks.',
    iconName: 'lock',
    status: 'Alpha'
  },
  {
    id: 'gov-compliance',
    title: 'Governance & Compliance',
    shortTitle: 'Governance',
    description: 'Align with emerging NIST post-quantum guidance while maintaining audit evidence and policy enforcement.',
    fullDetails: 'Correlate real-time cryptographic posture with global mandates, including NIST FIPS 203/204 Drafts, NSM-10, and FIPS-140 compliance guidelines. Keep continuous audit journals, security officer logs, and automated compliance reports up-to-date and ready for export.',
    iconName: 'filecheck',
    status: 'Active'
  }
];

export const roadmapData: RoadmapItem[] = [
  {
    quarter: 'Q3 2025',
    title: 'Phase I: Cryptographic Scanning & CBOM Engine',
    description: 'Establish enterprise discovery frameworks to identify and locate current vulnerability vectors.',
    status: 'completed',
    points: [
      'Released the core CBOM scanner with automated CI/CD dependency analysis.',
      'Completed integration hooks for AWS, Google Cloud, and localized Kubernetes clusters.',
      'Launched exposure scanning dashboards predicting decryption vectors.'
    ]
  },
  {
    quarter: 'Q4 2025',
    title: 'Phase II: Co-existence & Dual-Tunneling (PQC Core)',
    description: 'Formulate dual-tunnel capabilities to bridge the transition to NIST-standard algorithms.',
    status: 'current',
    points: [
      'Dual Key Exchange (ECDH + ML-KEM) deployment in secondary testing rings.',
      'Near-zero latency assemblies for embedded network appliances.',
      'Active penetration testing by leading third-party quantum security firms.'
    ]
  },
  {
    quarter: 'Q1 2026',
    title: 'Phase III: Autonomous Orchestration & Migration Hub',
    description: 'Integrate the live hot-swapping software engines across multiple data centers.',
    status: 'upcoming',
    points: [
      'Autonomous credential rotation with fallback rolling resets.',
      'Launch of the Helix central console controller for secure key mapping.',
      'Initial previews of the low-overhead SDK wrapper library.'
    ]
  },
  {
    quarter: 'Q2 2026',
    title: 'Phase IV: Quantum Trust Fabric Integration',
    description: 'Inject optical and physics-based QRNG entropy into cloud routing protocols.',
    status: 'upcoming',
    points: [
      'Direct integration with commercial physical quantum entropy channels.',
      'Multi-node zero-knowledge trust confirmation protocol (ZK-TCP) launch.',
      'Global public beta of the full Qguard Helix network protection platform.'
    ]
  }
];

export const systemUpdates: SystemUpdate[] = [
  {
    id: 'u-1',
    title: 'NIST Standard Post-Quantum Suites Bundled',
    date: '2026-05-15',
    category: 'quantum',
    description: 'Successfully integrated production-grade bindings for ML-KEM and ML-DSA lattice parameters.'
  },
  {
    id: 'u-2',
    title: 'Advanced CBOM Scanning Latency Cut by 40%',
    date: '2026-05-02',
    category: 'features',
    description: 'Our dynamic memory allocation logic cuts enterprise file-system parsing from hours to minutes.'
  },
  {
    id: 'u-3',
    title: 'Beta Security Shield Visualized in Live Viewport',
    date: '2026-04-18',
    category: 'system',
    description: 'Optimized real-time graphics rendering pipelines to stream key-exchange feedback on the dashboard.'
  }
];
