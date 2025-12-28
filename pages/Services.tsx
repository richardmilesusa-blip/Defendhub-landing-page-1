import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ClipboardCheck, Cpu, Eye, Code, Wifi, FileText, BookOpen, ChevronRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import { jsPDF } from "jspdf";

const mainServices: Service[] = [
  {
    id: 's1',
    title: 'Penetration Testing',
    description: 'Simulated cyberattacks to identify vulnerabilities before bad actors do.',
    icon: Shield,
    specs: ['Red Teaming', 'Social Engineering', 'Vulnerability Scan']
  },
  {
    id: 's2',
    title: 'Security Auditing',
    description: 'Rigorous deep-dive inspections of system architecture to enforce compliance and eliminate zero-day risks.',
    icon: ClipboardCheck,
    specs: ['ISO 27001', 'Risk Analysis', 'Policy Review']
  },
  {
    id: 's3',
    title: 'AI Threat Detection',
    description: 'Machine learning algorithms that predict and neutralize zero-day exploits.',
    icon: Cpu,
    specs: ['Behavioral Analysis', 'Automated Response', '24/7 Watch']
  },
  {
    id: 's4',
    title: 'Forensic Analysis',
    description: 'Deep dive investigation into breaches to recover data and trace origins.',
    icon: Eye,
    specs: ['Data Recovery', 'Traceback', 'Legal Reporting']
  },
  {
    id: 's5',
    title: 'Secure Software Dev',
    description: 'DevSecOps integration ensuring code is born secure from the first commit.',
    icon: Code,
    specs: ['Code Review', 'Pipeline Security', 'Architecture Design']
  },
  {
    id: 's6',
    title: 'IoT Defense',
    description: 'Protecting the edge. Securing smart devices and industrial control systems.',
    icon: Wifi,
    specs: ['Firmware Audit', 'Network Seg', 'Protocol Analysis']
  }
];

const trainingCourses = [
  'Introduction to Cybersecurity',
  'Linux for Hackers',
  'Metasploit For Hackers',
  'Certified Ethical Hacking'
];

const Services: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCatalog = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    const primaryColor = [255, 26, 26]; // Cyber Red
    
    // --- HEADER ---
    doc.setFillColor(5, 5, 5);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 26, 26);
    doc.text("DEFENDHUB", 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text("NIGERIA // CYBER SECURITY ARCHITECTURE", 20, 26);
    doc.text("SERVICE CAPABILITY CATALOG // CLASSIFIED", 20, 31);

    // --- WATERMARK ---
    doc.setTextColor(240, 240, 240);
    doc.setFontSize(60);
    doc.text("CONFIDENTIAL", 105, 150, { align: "center", angle: 45 });

    // --- CONTENT LOOP ---
    let yPos = 55;
    
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Defense Modules
    mainServices.forEach((service, index) => {
        if (yPos > 240) { doc.addPage(); yPos = 30; }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(`// 0${index + 1} ${service.title.toUpperCase()}`, 20, yPos);
        
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.line(20, yPos + 2, 190, yPos + 2);
        yPos += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50);
        const splitDesc = doc.splitTextToSize(service.description, 170);
        doc.text(splitDesc, 20, yPos);
        yPos += splitDesc.length * 5 + 5;

        doc.setFont("courier", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("SPECS:", 20, yPos);
        yPos += 5;
        service.specs.forEach(spec => {
            doc.text(`[+] ${spec}`, 25, yPos);
            yPos += 5;
        });
        yPos += 15;
    });

    // Training Section in PDF
    if (yPos > 200) { doc.addPage(); yPos = 30; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("// ACADEMY CURRICULUM (COMING SOON)", 20, yPos);
    yPos += 10;
    trainingCourses.forEach((course, i) => {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`${i + 1}. ${course}`, 25, yPos);
        yPos += 8;
    });

    // --- FOOTER ---
    const pageHeight = doc.internal.pageSize.height;
    doc.setFillColor(10, 10, 10);
    doc.rect(0, pageHeight - 30, 210, 30, 'F');
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("DEFENDHUB HEADQUARTERS | Kano, Nigeria", 20, pageHeight - 12);
    doc.setTextColor(255, 26, 26);
    doc.text("SECURE. ENCRYPT. DEFEND.", 20, pageHeight - 18);

    doc.save("DEFENDHUB_SERVICE_CATALOG.pdf");
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left"
        >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">
            DEFENSE <span className="text-cyber-red">MODULES</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg font-mono">
            Deployable security architecture for high-value targets.
            </p>
        </motion.div>

        <motion.button
            onClick={generateCatalog}
            disabled={isGenerating}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 md:mt-0 flex items-center gap-3 px-6 py-4 bg-white/5 border border-cyber-red/30 hover:bg-cyber-red/10 hover:border-cyber-red text-white transition-all group"
        >
            {isGenerating ? (
                <span className="animate-pulse">GENERATING...</span>
            ) : (
                <>
                    <div className="flex flex-col items-start text-left">
                        <span className="text-xs font-mono text-gray-400 group-hover:text-cyber-red">FULL SPECS</span>
                        <span className="font-bold font-display">DOWNLOAD CATALOG</span>
                    </div>
                    <FileText className="w-6 h-6 text-cyber-red group-hover:animate-bounce" />
                </>
            )}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {mainServices.map((service, idx) => (
          <Link 
            to="/contact" 
            state={{ selectedService: service.title }}
            key={service.id} 
            className="block h-full no-underline"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 p-8 overflow-hidden hover:border-cyber-red/50 transition-colors duration-500 h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-red/0 to-cyber-red/0 group-hover:from-cyber-red/5 group-hover:to-transparent transition-all duration-500" />
              <service.icon className="w-12 h-12 text-gray-500 group-hover:text-cyber-red transition-colors mb-6 relative z-10" />
              <h3 className="text-2xl font-display font-bold mb-4 relative z-10 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed relative z-10 flex-grow">{service.description}</p>
              <div className="relative z-10 pt-6 border-t border-white/5 mt-auto">
                <h4 className="text-xs font-mono text-cyber-red mb-3 uppercase tracking-wider">Specs</h4>
                <ul className="space-y-2">
                  {service.specs.map((spec, i) => (
                    <li key={i} className="text-xs text-gray-500 font-mono flex items-center">
                      <span className="w-1 h-1 bg-gray-500 mr-2 group-hover:bg-cyber-red transition-colors" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* DEDICATED TRAINING ACADEMY SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1 md:p-12 overflow-hidden"
      >
          {/* Section Decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <BookOpen className="w-64 h-64 text-cyber-red" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-cyber-red/20 border border-cyber-red">
                          <Terminal className="w-6 h-6 text-cyber-red" />
                      </div>
                      <span className="text-xs font-mono text-cyber-red tracking-[0.5em] uppercase font-bold">Training Academy</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                      TRAINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">COURSES</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-xl">
                      Bridge the gap between theory and combat. Our elite training modules are designed for teams operating in high-stakes digital environments.
                  </p>
                  
                  <Link 
                    to="/contact" 
                    state={{ selectedService: 'Training Courses' }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-cyber-red text-black font-bold font-display hover:bg-white transition-all transform hover:-translate-y-1 relative group"
                  >
                      ENROLL IN ACADEMY 
                      <span className="text-[10px] font-mono ml-2 opacity-70 border border-black/30 px-1 leading-none h-4 flex items-center bg-black/5">COMING SOON</span>
                      <ChevronRight className="w-5 h-5" />
                  </Link>
              </div>

              <div className="flex-1 w-full">
                  <div className="bg-black/80 border border-white/10 p-8 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-cyber-red/30 shadow-[0_0_15px_rgba(255,26,26,0.2)]" />
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-mono text-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
                            CURRICULUM_LOADOUT.EXE
                        </h3>
                        <span className="text-[10px] font-mono text-cyber-red animate-pulse tracking-widest border border-cyber-red/20 px-2 py-0.5">PRE-RELEASE_PHASE</span>
                      </div>
                      
                      <div className="space-y-4">
                          {trainingCourses.map((course, i) => (
                              <motion.div 
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-6 p-4 border border-white/5 bg-white/5 hover:border-cyber-red/40 hover:bg-cyber-red/5 transition-all group"
                              >
                                  <span className="text-cyber-red font-mono text-xl opacity-50 group-hover:opacity-100">0{i+1}</span>
                                  <span className="text-white font-display text-lg tracking-wide group-hover:text-cyber-red transition-colors">{course}</span>
                              </motion.div>
                          ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                          <span>Verified Certification</span>
                          <span>Hands-on Labs Included</span>
                      </div>
                  </div>
              </div>
          </div>
      </motion.section>
    </div>
  );
};

export default Services;