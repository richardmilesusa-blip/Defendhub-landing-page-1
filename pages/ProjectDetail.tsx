import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, Shield, Cpu, Lock, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

// Mock Data Database for Case Studies
const projectDatabase: Record<string, any> = {
  'p1': {
    title: 'ARAMCO SHIELD',
    client: 'Saudi Aramco',
    category: 'Oil & Gas',
    location: 'Dhahran, KSA',
    date: '2023-11-15',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    stats: [
        { label: 'THREATS NEUTRALIZED', value: '14,000+' }, 
        { label: 'UPTIME MAINTAINED', value: '100%' }, 
        { label: 'ASSETS SECURED', value: '$45B' }
    ],
    brief: 'To fortify critical extraction infrastructure against state-sponsored cyber espionage and ransomware attacks targeting legacy Industrial Control Systems (ICS). The client required a solution that could overlay modern security without disrupting decades-old SCADA protocols.',
    challenge: 'The primary facility operated on air-gapped networks that were becoming increasingly vulnerable to physical bridging attacks and sophisticated malware capable of jumping gaps via removable media.',
    solution: 'Deployed "DefendHub Core" Zero-Trust architecture integrated with custom AI-driven anomaly detection sensors across 400+ distinct IoT nodes. We implemented unidirectional gateways to ensure data could flow out for monitoring but never in for control, effectively sealing the digital perimeter.',
    stack: ['DarkTrace AI', 'Custom SCADA Firewalls', 'Biometric Access Control', 'Unidirectional Gateways'],
    log: [
        '0800: Deployment of sensor array to Sector 7G.',
        '1200: AI Model training on baseline traffic patterns.',
        '48h+: Anomaly detected in pressure valve controller. Isolated immediately.',
        'Outcome: Pre-emptive strike prevented a potential pipeline shutdown.'
    ]
  },
  'p2': {
    title: 'NIGERIA FINTECH',
    client: 'Confidential Neobank',
    category: 'Finance',
    location: 'Lagos, Nigeria',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    stats: [
        { label: 'TRANSACTIONS/SEC', value: '50K' }, 
        { label: 'FRAUD REDUCTION', value: '99.8%' }, 
        { label: 'LATENCY ADDED', value: '<2ms' }
    ],
    brief: 'Secure a high-velocity payment gateway for Nigeria\'s fastest-growing neobank against transaction injection attacks and sophisticated phishing campaigns targeting user credentials.',
    challenge: 'The client needed to scale from 5k to 50k transactions per second while maintaining strict PCI-DSS compliance and preventing real-time fraud without slowing down the user experience.',
    solution: 'Engineered a real-time transaction analysis engine using machine learning to score fraud probability in microseconds. Implemented end-to-end encryption for mobile app payloads and multi-factor authentication enforcement for high-value transfers.',
    stack: ['Real-time ML Scoring', 'HSM Integration', 'Mobile App Shielding', 'Behavioral Biometrics'],
    log: [
        'Day 1: Integration of fraud scoring API.',
        'Day 7: Stress testing against DDoS simulation (100Gbps).',
        'Live: Intercepted 4,000+ fraudulent transactions in first 24 hours.',
        'Outcome: Client secured Series B funding due to robust security architecture.'
    ]
  },
  'p3': {
    title: 'NEOM GRID',
    client: 'NEOM',
    category: 'Infrastructure',
    location: 'Tabuk, KSA',
    date: '2023-09-01',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    stats: [
        { label: 'NODES PROTECTED', value: '1M+' }, 
        { label: 'COVERAGE AREA', value: 'FULL' }, 
        { label: 'RESPONSE TIME', value: 'Automated' }
    ],
    brief: 'Design the cybersecurity framework for a cognitive city grid, ensuring smart energy, water, and transport systems are immune to cascading failures caused by cyberattacks.',
    challenge: 'The sheer scale of connected devices (IoT) created a massive attack surface. Traditional perimeter defense was impossible due to the decentralized nature of the grid.',
    solution: 'Implemented a mesh security network where every device acts as a security node. Blockchain-based identity verification ensures no rogue devices can join the network. Automated immune response protocols allow sections of the grid to "self-heal" by isolating compromised nodes instantly.',
    stack: ['Blockchain Identity', 'Mesh Networking', 'Automated Containment Scripts', 'Quantum-Resistant Encryption'],
    log: [
        'Phase 1: Architecture design for decentralized authentication.',
        'Phase 2: Deployment of 500k dummy nodes for penetration testing.',
        'Result: 0 successful breaches during "Red Team" assault simulation.'
    ]
  },
  'p4': {
    title: 'GOV ID SYSTEMS',
    client: 'Federal Government',
    category: 'Government',
    location: 'Abuja, Nigeria',
    date: '2023-05-20',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    stats: [
        { label: 'USER RECORDS', value: '3M+' }, 
        { label: 'ENCRYPTION', value: 'AES-256' }, 
        { label: 'DATA LEAKS', value: '0' }
    ],
    brief: 'Overhaul the national digital identity database to prevent identity theft and unauthorized access by foreign actors.',
    challenge: 'Legacy database systems were fragmented and used outdated hashing algorithms. Physical access controls to data centers were also identified as a risk factor.',
    solution: 'Migrated all records to a sovereign private cloud with AES-256 encryption at rest and in transit. Implemented a tiered access control system requiring multi-person authentication (MPA) for database modifications.',
    stack: ['Sovereign Private Cloud', 'AES-256', 'Hardware Security Modules (HSM)', 'Role-Based Access Control (RBAC)'],
    log: [
        'Migration: Secure transfer of 3TB of sensitive citizen data.',
        'Hardening: Physical security upgrade of Abuja data center.',
        'Outcome: Successful launch of new Digital ID card with embedded crypto-chip.'
    ]
  },
  'p5': {
    title: 'AEROSPACE LINK',
    client: 'Confidential Defense Contractor',
    category: 'Defense',
    location: 'Remote / Sky',
    date: '2024-02-01',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop',
    stats: [
        { label: 'ALTITUDE', value: '30,000FT' }, 
        { label: 'LINK SECURITY', value: 'MIL-SPEC' }, 
        { label: 'JAMMING RESISTANCE', value: 'HIGH' }
    ],
    brief: 'Secure air-to-ground communication links for unmanned aerial vehicles (UAVs) operating in hostile electronic warfare environments.',
    challenge: 'Prevent signal jamming and command-injection attacks that could hijack or crash the UAVs.',
    solution: 'Developed a frequency-hopping spread spectrum (FHSS) communication protocol overlaid with custom encryption. The system automatically detects jamming attempts and switches frequency bands in milliseconds.',
    stack: ['Frequency Hopping', 'Signal Encryption', 'Autonomous Fallback Modes'],
    log: [
        'Test Flight 1: Signal integrity maintained during active jamming.',
        'Test Flight 5: Successful autonomous return-to-base after simulated link loss.',
        'Status: Operational deployment approved.'
    ]
  }
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = id ? projectDatabase[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
           <AlertTriangle className="w-16 h-16 text-cyber-red mx-auto mb-4" />
           <h1 className="text-3xl font-bold font-display text-white mb-2">ACCESS DENIED</h1>
           <p className="text-gray-400 font-mono mb-8">CASE FILE NOT FOUND OR CLASSIFIED.</p>
           <Link to="/portfolio">
             <button className="px-6 py-2 border border-cyber-red text-cyber-red font-mono hover:bg-cyber-red hover:text-black transition-colors">
                RETURN TO LOGS
             </button>
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full overflow-hidden border-b border-cyber-red/20">
         <img 
            src={project.image} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
         
         {/* Scanline */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06)]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

         <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container mx-auto">
                <Link to="/portfolio" className="inline-flex items-center text-cyber-red hover:text-white font-mono text-sm mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO CASE LOGS
                </Link>
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-cyber-red text-black text-xs font-bold px-2 py-1 font-mono uppercase">
                            CONFIDENTIAL
                        </span>
                        <span className="text-gray-400 font-mono text-sm uppercase tracking-widest">
                            // {project.category}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-8 text-sm font-mono text-gray-400">
                        <span>CLIENT: {project.client}</span>
                        <span>LOC: {project.location}</span>
                        <span>DATE: {project.date}</span>
                    </div>
                </motion.div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
              
              {/* Mission Brief */}
              <section>
                  <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
                      <Terminal className="text-cyber-red w-5 h-5" />
                      <h2 className="text-2xl font-display font-bold text-white">MISSION BRIEF</h2>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                      {project.brief}
                  </p>
                  
                  <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                      <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                          <AlertTriangle className="text-yellow-500 w-4 h-4" /> THE THREAT VECTOR
                      </h3>
                      <p className="text-gray-400 text-sm">
                          {project.challenge}
                      </p>
                  </div>
              </section>

              {/* Solution */}
              <section>
                  <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
                      <Shield className="text-cyber-red w-5 h-5" />
                      <h2 className="text-2xl font-display font-bold text-white">DEFENSIVE STRATEGY</h2>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                      {project.solution}
                  </p>
              </section>

              {/* Execution Log */}
              <section>
                  <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
                      <FileText className="text-cyber-red w-5 h-5" />
                      <h2 className="text-2xl font-display font-bold text-white">EXECUTION LOG</h2>
                  </div>
                  <div className="bg-black border border-cyber-red/30 p-6 font-mono text-sm text-green-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      <div className="flex flex-col space-y-3">
                          {project.log.map((entry: string, i: number) => (
                              <div key={i} className="flex gap-4 opacity-80">
                                  <span className="text-gray-600">[{String(i + 1).padStart(2, '0')}]</span>
                                  <span>{entry}</span>
                              </div>
                          ))}
                          <div className="flex gap-4 mt-2 animate-pulse text-cyber-red">
                                <span className="text-gray-600">[END]</span>
                                <span>CASE FILE CLOSED successfully.</span>
                          </div>
                      </div>
                  </div>
              </section>

          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
              <div className="bg-neutral-900/50 border border-white/10 p-6">
                  <h3 className="text-cyber-red font-mono text-xs tracking-widest mb-6 border-b border-cyber-red/20 pb-2">MISSION METRICS</h3>
                  <div className="space-y-6">
                      {project.stats.map((stat: any, i: number) => (
                          <div key={i}>
                              <div className="text-gray-500 text-xs font-mono mb-1">{stat.label}</div>
                              <div className="text-2xl text-white font-bold font-display">{stat.value}</div>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="bg-neutral-900/50 border border-white/10 p-6">
                  <h3 className="text-cyber-red font-mono text-xs tracking-widest mb-6 border-b border-cyber-red/20 pb-2">TECH STACK</h3>
                  <div className="flex flex-wrap gap-2">
                      {project.stack.map((item: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
                              {item}
                          </span>
                      ))}
                  </div>
              </div>

              <Link to="/contact">
                  <button className="w-full py-4 bg-cyber-red text-black font-bold font-display tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2">
                      <Lock size={16} /> REQUEST SIMILAR
                  </button>
              </Link>
          </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
