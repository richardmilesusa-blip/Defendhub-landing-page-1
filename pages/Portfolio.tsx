import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { Link } from 'react-router-dom';

const allProjects: Project[] = [
  {
    id: 'p1',
    title: 'ARAMCO SHIELD',
    category: 'Oil & Gas',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    stats: [{ label: 'THREATS', value: '0' }, { label: 'UPTIME', value: '100%' }]
  },
  {
    id: 'p2',
    title: 'NIGERIA FINTECH',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    stats: [{ label: 'TRANS/SEC', value: '50K' }, { label: 'LATENCY', value: '<2ms' }]
  },
  {
    id: 'p3',
    title: 'NEOM GRID',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    stats: [{ label: 'NODES', value: '1M+' }, { label: 'COVERAGE', value: 'FULL' }]
  },
  {
    id: 'p4',
    title: 'GOV ID SYSTEMS',
    category: 'Government',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    stats: [{ label: 'USERS', value: '3M' }, { label: 'ENCRYPTION', value: 'AES-256' }]
  },
  {
    id: 'p5',
    title: 'AEROSPACE LINK',
    category: 'Defense',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop',
    stats: [{ label: 'ALTITUDE', value: '30K' }, { label: 'SECURE', value: 'TRUE' }]
  },
];

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState(allProjects);
  
  // Dynamic rearranging effect on scroll/interval
  useEffect(() => {
    const interval = setInterval(() => {
      // Shuffle 2 items randomly to simulate "algorithmic" shifting
      setProjects(prev => {
        const newArr = [...prev];
        const idx1 = Math.floor(Math.random() * newArr.length);
        const idx2 = Math.floor(Math.random() * newArr.length);
        [newArr[idx1], newArr[idx2]] = [newArr[idx2], newArr[idx1]];
        return newArr;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h1 className="text-6xl font-display font-bold mb-4">
            CASE <span className="text-cyber-red">LOGS</span>
          </h1>
          <p className="text-gray-400 font-mono">
            // AUTHORIZED ACCESS ONLY
            <br/>
            // RECENT DEPLOYMENTS
          </p>
        </div>
        <div className="mt-8 md:mt-0 text-right">
             <div className="text-xs text-cyber-red animate-pulse">LIVE REORDERING ACTIVE</div>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Link to={`/portfolio/${project.id}`} className="block h-96 group relative cursor-pointer overflow-hidden border border-white/10 bg-neutral-900">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-cyber-red font-mono text-xs mb-2 tracking-widest">{project.category}</span>
                  <h3 className="text-3xl font-display font-bold mb-4 text-white">{project.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {project.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-xs text-gray-500 font-mono">{stat.label}</div>
                        <div className="text-white font-bold">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-red opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-red opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* View Detail Prompt */}
                <div className="absolute top-4 right-4 bg-cyber-red/10 border border-cyber-red px-2 py-1 text-[10px] text-cyber-red font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW LOG &gt;
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Portfolio;
