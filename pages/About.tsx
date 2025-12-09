import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-display font-bold mb-8">
            ENGINEERING <br/> <span className="text-cyber-red">TRUST</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            DEFENDHUB was founded in Nigeria with a singular mission: to construct impenetrable digital infrastructure for the Middle East's and Africa's most critical sectors.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            We combine elite human intelligence with proprietary AI-driven threat detection systems. Our team consists of former intelligence officers, white-hat hackers, and cryptographers dedicated to the art of defense.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="p-6 border border-white/10 bg-white/5">
              <div className="text-4xl font-display font-bold text-white mb-2">10+</div>
              <div className="text-xs font-mono text-cyber-red tracking-widest">YEARS OF SERVICE</div>
            </div>
            <div className="p-6 border border-white/10 bg-white/5">
              <div className="text-4xl font-display font-bold text-white mb-2">$50B+</div>
              <div className="text-xs font-mono text-cyber-red tracking-widest">ASSETS PROTECTED</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-full min-h-[500px] border border-white/10 p-2"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center gap-2 text-cyber-red mb-2">
              <MapPin className="w-5 h-5" />
              <span className="font-mono">KANO, NIGERIA</span>
            </div>
            <h3 className="text-2xl font-bold text-white">HEADQUARTERS</h3>
          </div>
        </motion.div>
      </div>

      <div className="mt-32">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">COMMAND SQUAD</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="group relative">
               <div className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5">
                 <img 
                   src={`https://picsum.photos/seed/cyber${i}/500/700`} 
                   alt="Team Member" 
                   className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                 />
               </div>
               <div className="mt-4">
                 <h4 className="text-lg font-bold text-white">AGENT {i}</h4>
                 <p className="text-sm font-mono text-cyber-red">SECURITY ARCHITECT</p>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default About;