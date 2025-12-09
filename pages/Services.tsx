import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ClipboardCheck, Cpu, Eye, Code, Wifi, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import { jsPDF } from "jspdf";

const services: Service[] = [
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

const Services: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCatalog = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    const primaryColor = [255, 26, 26]; // Cyber Red
    const darkGray = [40, 40, 40];
    const black = [0, 0, 0];

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

    services.forEach((service, index) => {
        // Page break if needed
        if (yPos > 250) {
            doc.addPage();
            yPos = 30;
        }

        // Service Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(`// 0${index + 1} ${service.title.toUpperCase()}`, 20, yPos);
        
        // Icon Marker
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.line(20, yPos + 2, 190, yPos + 2);

        yPos += 10;

        // Description
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50);
        const splitDesc = doc.splitTextToSize(service.description, 170);
        doc.text(splitDesc, 20, yPos);
        
        yPos += splitDesc.length * 5 + 5;

        // Specs
        doc.setFont("courier", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("SPECS:", 20, yPos);
        yPos += 5;
        service.specs.forEach(spec => {
            doc.text(`[+] ${spec}`, 25, yPos);
            yPos += 5;
        });

        yPos += 15; // Spacing between items
    });

    // --- FOOTER ---
    const pageHeight = doc.internal.pageSize.height;
    doc.setFillColor(10, 10, 10);
    doc.rect(0, pageHeight - 30, 210, 30, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("DEFENDHUB HEADQUARTERS", 20, pageHeight - 15);
    doc.text("Kano, Nigeria | +234 806 420 0257 | info@defendhub.ng", 20, pageHeight - 10);
    doc.setTextColor(255, 26, 26);
    doc.text("SECURE. ENCRYPT. DEFEND.", 20, pageHeight - 20);

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

        {/* Catalog Download Button */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
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
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-red/0 to-cyber-red/0 group-hover:from-cyber-red/5 group-hover:to-transparent transition-all duration-500" />
              
              <service.icon className="w-12 h-12 text-gray-500 group-hover:text-cyber-red transition-colors mb-6 relative z-10" />
              
              <h3 className="text-2xl font-display font-bold mb-4 relative z-10 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed relative z-10 flex-grow">
                {service.description}
              </p>

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

               {/* Interaction Hint */}
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-cyber-red text-xs font-mono border border-cyber-red/30 px-2 py-1 bg-black/50">REQUEST ACCESS</span>
               </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;