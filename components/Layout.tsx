import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import MagneticCursor from './MagneticCursor';
import CyberBackground from './CyberBackground';
import AIChatbot from './AIChatbot';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-cyber-red selection:text-white">
      <CyberBackground />
      <MagneticCursor />
      <Navbar />
      <main className="relative z-10 pt-20">
        {children}
      </main>
      
      <AIChatbot />

      <footer className="relative z-10 border-t border-white/5 bg-black py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
             <span className="text-2xl font-display font-bold tracking-widest text-white">DEFENDHUB</span>
          </div>
          <p className="text-gray-500 font-mono text-sm">
            © {new Date().getFullYear()} DEFENDHUB CYBER SECURITY NIGERIA. ALL RIGHTS RESERVED.
          </p>
          <p className="text-gray-600 text-xs mt-2 font-mono">
            SECURE. ENCRYPT. DEFEND.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;