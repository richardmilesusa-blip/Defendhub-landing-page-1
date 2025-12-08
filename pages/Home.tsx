import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Terminal, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Hero Parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

  // Dynamic Threat Counter
  const [threatCount, setThreatCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Signature Section Scroll Logic
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(sectionProgress, { damping: 15, stiffness: 100 });

  // 1. Grid Background Transform (3D Tilt effect)
  const gridRotateX = useTransform(smoothProgress, [0, 0.2], [45, 20]);
  const gridScale = useTransform(smoothProgress, [0, 0.2], [1.5, 1.1]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.1, 0.8, 1], [0, 0.4, 0.4, 0]);
  const gridY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  // 2. Panel Movements (Flying in from sides)
  const leftPanelX = useTransform(smoothProgress, [0.15, 0.4], [-800, 0]);
  const rightPanelX = useTransform(smoothProgress, [0.15, 0.4], [800, 0]);
  const centerPanelScale = useTransform(smoothProgress, [0.3, 0.5], [0.5, 1]);
  const centerPanelOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  
  // 3. Inner Content Reveal (Text appearing inside panels)
  const contentOpacity = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.5, 0.7], [20, 0]);

  // Scroll Progress Bar for Signature Section
  const indicatorHeight = useTransform(sectionProgress, [0, 1], ["0%", "100%"]);
  const indicatorOpacity = useTransform(sectionProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const openChatbot = () => {
    window.dispatchEvent(new Event('open-chatbot'));
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden border-b border-cyber-border/50 bg-black">
        
        {/* Full-screen Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            style={{ 
              filter: 'hue-rotate(290deg) saturate(1.5) contrast(1.1) brightness(0.6)' 
            }}
          >
            {/* Tech/Circuit Board Animation - usually blue/green, shifted to red via hue-rotate */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-97-large.mp4" type="video/mp4" />
          </video>
          
          {/* Overlays for depth and readability */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)] z-10" />
          
          {/* Scanline effect */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-cyber-red font-mono mb-4 tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-red rounded-full animate-pulse shadow-[0_0_10px_#FF1A1A]"></span>
              SYSTEM ONLINE
            </h2>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 drop-shadow-[0_0_15px_rgba(255,26,26,0.15)] text-white">
              ELITE DIGITAL <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">DEFENSE SYSTEMS</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed border-l-2 border-cyber-red/50 pl-6 backdrop-blur-sm">
              We engineer military-grade cybersecurity solutions for the modern enterprise. 
              Nigeria's premier digital fortress architects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <button className="px-8 py-4 bg-cyber-red text-black font-bold font-display tracking-wider hover:bg-red-600 hover:shadow-[0_0_30px_rgba(255,26,26,0.4)] transition-all transform hover:scale-105 skew-x-[-10deg]">
                  <span className="skew-x-[10deg] inline-block">INITIATE PROTOCOL</span>
                </button>
              </Link>
              <Link to="/services">
                <button className="px-8 py-4 border border-white/20 text-white font-mono hover:bg-white/5 hover:border-cyber-red/50 transition-all flex items-center gap-2 group backdrop-blur-sm">
                  EXPLORE SOLUTIONS 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyber-red" />
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: useTransform(heroProgress, [0, 1], [0, -100]), opacity: heroOpacity }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto perspective-[1000px]">
               {/* 3D Rings */}
               <div className="absolute inset-0 border border-cyber-red/20 rounded-full animate-[spin_10s_linear_infinite]" style={{ transform: 'rotateX(60deg)' }} />
               <div className="absolute inset-4 border border-cyber-red/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ transform: 'rotateY(60deg)' }} />
               <div className="absolute inset-10 border border-white/10 rounded-full animate-pulse" />
               
               <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-32 h-32 text-cyber-red opacity-80 drop-shadow-[0_0_30px_rgba(255,26,26,0.6)]" />
               </div>
               
               {/* Floating Data Points */}
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-10 right-0 bg-black/90 backdrop-blur border-l-2 border-cyber-red p-4 shadow-lg"
               >
                 <div className="text-xs text-gray-500 font-mono mb-1">THREAT DETECTED</div>
                 <div className="text-xl font-mono text-white">{threatCount}</div>
               </motion.div>

               <motion.div 
                 animate={{ y: [0, 20, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-20 -left-10 bg-black/90 backdrop-blur border-r-2 border-cyber-red p-4 shadow-lg text-right"
               >
                 <div className="text-xs text-gray-500 font-mono mb-1">SYSTEM UPTIME</div>
                 <div className="text-xl font-mono text-cyber-red drop-shadow-[0_0_5px_#FF1A1A]">99.99%</div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SIGNATURE SCROLL SECTION - MULTI-DEPTH INTERFACE */}
      <section ref={targetRef} className="relative md:h-[400vh] h-[250vh] bg-black">
         <div className="sticky top-0 h-[100dvh] overflow-hidden flex items-center justify-center perspective-[2000px]">
             
             {/* Visual Scroll Indicator (Desktop) */}
             <motion.div 
               style={{ opacity: indicatorOpacity }}
               className="absolute left-10 top-1/2 -translate-y-1/2 h-[60vh] w-12 hidden lg:flex flex-col items-center justify-between z-30"
             >
                <div className="text-[10px] font-mono text-cyber-red tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">
                  SYSTEM ANALYSIS
                </div>
                <div className="relative w-[1px] flex-1 bg-white/10 mx-auto my-4 overflow-hidden">
                   {/* Track */}
                   <motion.div 
                     style={{ height: indicatorHeight }}
                     className="w-full bg-cyber-red shadow-[0_0_10px_#FF1A1A]"
                   />
                </div>
                <div className="text-[10px] font-mono text-gray-500">
                   01 // 03
                </div>
             </motion.div>

             {/* Layer 1: Animated Grid Floor */}
             <motion.div 
               style={{ rotateX: gridRotateX, scale: gridScale, opacity: gridOpacity, y: gridY }}
               className="absolute inset-[-50%] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [transform-style:preserve-3d] origin-bottom z-0"
             />
             
             {/* Layer 2: Cyber Interface Container */}
             <div className="relative z-10 container mx-auto px-4 w-full max-w-7xl min-h-[60vh] md:h-[80vh] flex flex-col lg:flex-row items-stretch justify-center gap-6">
                
                {/* Left Panel: Terminal & Diagnostics */}
                <motion.div 
                  style={{ x: leftPanelX }} 
                  className="hidden lg:flex flex-1 bg-black/80 border border-cyber-border p-1 backdrop-blur-md relative flex-col"
                >
                    <div className="bg-cyber-panel p-2 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2 text-cyber-red">
                            <Terminal size={16} />
                            <span className="font-mono text-xs tracking-widest">TERMINAL_01</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                            <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                            <div className="w-2 h-2 rounded-full bg-cyber-red"></div>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col font-mono text-xs text-green-500/80 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[size:100%_4px] pointer-events-none" />
                        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="space-y-2">
                            <p>> INITIALIZING DEFENSE PROTOCOLS...</p>
                            <p className="text-white">> CONNECTION ESTABLISHED</p>
                            <p>> SCANNING SECTOR 7G...</p>
                            <p className="text-cyber-red">> THREAT LEVEL: NULL</p>
                            <p>> QUANTUM ENCRYPTION: ACTIVE</p>
                            <p>> ZERO TRUST: ENFORCED</p>
                            <br/>
                            <div className="grid grid-cols-4 gap-1 opacity-50">
                                {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className="h-8 bg-green-500/10 border border-green-500/20 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    {/* Decorative Corner */}
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-cyber-red" />
                </motion.div>

                {/* Center Panel: Main Core Capabilities */}
                <motion.div 
                    style={{ scale: centerPanelScale, opacity: centerPanelOpacity }} 
                    className="flex-[1.5] bg-neutral-900/90 border-x border-cyber-red p-4 md:p-8 flex flex-col justify-center text-center relative z-20 shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-[90vw] sm:max-w-md lg:max-w-none mx-auto"
                >
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-red to-transparent opacity-50" />
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-red to-transparent opacity-50" />
                     
                     <ShieldCheck className="w-16 h-16 md:w-24 md:h-24 text-cyber-red mx-auto mb-6 md:mb-8 drop-shadow-[0_0_20px_rgba(255,26,26,0.6)] animate-pulse" />
                     
                     <motion.div style={{ opacity: contentOpacity, y: contentY }}>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white tracking-tight">
                            DEFENDHUB <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyber-red to-red-900">CORE</span>
                        </h2>
                        <p className="text-gray-400 mb-8 md:mb-10 text-sm md:text-base font-mono">
                            Deploying military-grade countermeasures against next-gen cyber threats.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="p-4 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-red transition-all duration-300 cursor-pointer group">
                                <h4 className="font-bold text-white group-hover:text-cyber-red flex items-center gap-2">
                                    <Lock size={16} /> ZERO TRUST
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">Identity verification at every level.</p>
                            </div>
                            <div 
                                onClick={openChatbot}
                                className="p-4 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-red transition-all duration-300 cursor-pointer group"
                            >
                                <h4 className="font-bold text-white group-hover:text-cyber-red flex items-center gap-2">
                                    <Terminal size={16} /> AI SENTINEL
                                </h4>
                                <p className="text-xs text-gray-500 mt-1 group-hover:text-cyber-red/80">
                                    <span className="inline-block w-2 h-2 rounded-full bg-cyber-red animate-pulse mr-2" />
                                    CLICK TO INITIALIZE
                                </p>
                            </div>
                        </div>
                     </motion.div>
                </motion.div>

                {/* Right Panel: Network Map */}
                <motion.div 
                  style={{ x: rightPanelX }} 
                  className="hidden lg:flex flex-1 bg-black/80 border border-cyber-border p-1 backdrop-blur-md relative flex-col"
                >
                    <div className="bg-cyber-panel p-2 flex items-center justify-between border-b border-white/5">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-cyber-red"></div>
                        </div>
                        <div className="flex items-center gap-2 text-cyber-red">
                            <span className="font-mono text-xs tracking-widest">GLOBAL_NET</span>
                            <Globe size={16} />
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
                             {/* Abstract Radar UI */}
                             <div className="absolute inset-0 border border-white/10 rounded-full" />
                             <div className="absolute inset-4 border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
                             <div className="absolute inset-12 border border-white/10 rounded-full" />
                             
                             <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-red to-transparent animate-[spin_4s_linear_infinite]" />
                             
                             {/* Blips */}
                             <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyber-red rounded-full animate-ping" />
                             <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyber-red rounded-full animate-ping delay-300" />
                        </motion.div>
                        
                        <motion.div style={{ opacity: contentOpacity }} className="mt-8 w-full space-y-3">
                             <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                 <span className="text-xs text-gray-500 font-mono">ACTIVE NODES</span>
                                 <span className="text-sm text-white font-mono font-bold">8,492</span>
                             </div>
                             <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                 <span className="text-xs text-gray-500 font-mono">LATENCY</span>
                                 <span className="text-sm text-cyber-red font-mono font-bold">12ms</span>
                             </div>
                        </motion.div>
                    </div>
                    {/* Decorative Corner */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-cyber-red" />
                </motion.div>
             </div>
         </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-32 relative border-t border-b border-white/5 bg-neutral-950 z-20">
         <div className="container mx-auto px-6 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative mb-10 w-full max-w-4xl h-64 bg-black border border-white/10 rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:border-cyber-red transition-colors relative">
                    <div className="absolute inset-0 rounded-full border border-cyber-red opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                 </div>
              </div>
            </motion.div>
            
            <h2 className="text-4xl font-display font-bold mb-6">SECURE OPERATIONS CENTER</h2>
            <p className="text-gray-400 max-w-2xl mb-8">
              Take a virtual tour of our Nigeria HQ. Witness the state-of-the-art monitoring systems protecting global assets 24/7.
            </p>
            <Link to="/about">
              <button className="px-10 py-3 border border-cyber-red text-cyber-red font-mono tracking-widest hover:bg-cyber-red hover:text-black transition-all">
                LAUNCH TOUR
              </button>
            </Link>
         </div>
      </section>
    </>
  );
};

export default Home;