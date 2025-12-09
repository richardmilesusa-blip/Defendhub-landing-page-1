import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, MessageCircle, ChevronDown, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if state was passed via Link (e.g. from Services or Portfolio page)
    const state = location.state as { selectedService?: string; message?: string } | null;
    if (state) {
        setFormState(prev => ({ 
            ...prev, 
            service: state.selectedService || prev.service,
            message: state.message || prev.message
        }));
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', service: '', message: '' });
      
      // Hide success message after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-display font-bold mb-8">SECURE <br/><span className="text-cyber-red">CHANNEL</span></h1>
          <p className="text-gray-400 mb-12 text-lg">
            For sensitive inquiries, use the encrypted form below. Our team operates 24/7/365.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 text-cyber-red">
                <MapPin />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">HQ Location</h4>
                <p className="text-gray-400 font-mono text-sm">
                  Block E37, TIC Complex<br/>
                  Aim Street, Farm Centre<br/>
                  Kano City, Nigeria 700001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 text-cyber-red">
                <Mail />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Encrypted Mail</h4>
                <p className="text-gray-400 font-mono text-sm">info@defendhub.ng<br/>PGP Key: 0x4A2B9F</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 text-cyber-red">
                <Phone />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Company Hotline</h4>
                <p className="text-gray-400 font-mono text-sm">+234 806 420 0257</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-8 mt-8 border-t border-white/10">
                <motion.a 
                    href="https://wa.me/2348064200257" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-4 w-full bg-cyber-red/10 border border-cyber-red text-cyber-red hover:bg-cyber-red hover:text-black py-4 px-6 transition-all duration-300 group cursor-pointer"
                >
                    <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                    <span className="font-display font-bold tracking-wider">INITIATE WHATSAPP LINK</span>
                </motion.a>
                <p className="text-center text-xs text-gray-500 font-mono mt-3 uppercase tracking-widest">// Encrypted End-to-End</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-red/10 blur-3xl pointer-events-none" />
          
          {/* Success Overlay Animation */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center text-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-24 h-24 rounded-full border-2 border-cyber-red bg-cyber-red/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,26,26,0.3)]"
                >
                  <Check className="w-12 h-12 text-cyber-red" />
                </motion.div>
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-display font-bold text-white mb-2"
                >
                  TRANSMISSION RECEIVED
                </motion.h3>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 font-mono text-sm tracking-widest"
                >
                  OUR AGENTS WILL DECRYPT YOUR REQUEST SHORTLY.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyber-red tracking-widest">IDENTITY</label>
              <input 
                type="text" 
                required
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                className="w-full bg-black/50 border border-white/10 p-4 text-base text-white focus:border-cyber-red focus:outline-none transition-colors"
                placeholder="Full Name / Corp ID"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-cyber-red tracking-widest">CONTACT VECTOR</label>
              <input 
                type="email" 
                required
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
                className="w-full bg-black/50 border border-white/10 p-4 text-base text-white focus:border-cyber-red focus:outline-none transition-colors"
                placeholder="Official Email Address"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-xs font-mono text-cyber-red tracking-widest">TARGET PROTOCOL</label>
              <div className="relative">
                <select
                  required
                  value={formState.service}
                  onChange={e => setFormState({...formState, service: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 p-4 text-base text-white appearance-none focus:border-cyber-red focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-neutral-900 text-gray-500">Select Service Module...</option>
                  <option value="Penetration Testing" className="bg-neutral-900">Penetration Testing</option>
                  <option value="Security Auditing" className="bg-neutral-900">Security Auditing</option>
                  <option value="AI Threat Detection" className="bg-neutral-900">AI Threat Detection</option>
                  <option value="Forensic Analysis" className="bg-neutral-900">Forensic Analysis</option>
                  <option value="Secure Software Dev" className="bg-neutral-900">Secure Software Dev</option>
                  <option value="IoT Defense" className="bg-neutral-900">IoT Defense</option>
                  <option value="General Inquiry" className="bg-neutral-900">General Inquiry</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-cyber-red tracking-widest">MESSAGE DATA</label>
              <textarea 
                rows={5}
                required
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                className="w-full bg-black/50 border border-white/10 p-4 text-base text-white focus:border-cyber-red focus:outline-none transition-colors"
                placeholder="Brief on requirements..."
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyber-red text-black font-bold font-display py-4 tracking-wider hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="animate-pulse">ENCRYPTING & SENDING...</span>
              ) : (
                <>
                  TRANSMIT DATA <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

      </div>
      
      {/* Map Embed (Visual Placeholder for aesthetic) */}
      <div className="mt-20 w-full h-80 border border-white/10 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
        <iframe 
          title="Nigeria Map"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          marginHeight={0} 
          marginWidth={0} 
          scrolling="no"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Technology%20Incubation%20Centre%20Kano%20Farm%20Centre+(DefendHub)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;