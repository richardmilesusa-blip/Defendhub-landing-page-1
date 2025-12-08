import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Standard interactive elements
      const isLink = target.closest('a');
      const isButton = target.closest('button');
      
      // Specific class check requested (Tailwind class with escaped colon for querySelector)
      const isTargetClass = target.closest('.group-hover\\:border-cyber-red');
      
      // Broad check for any element with cursor: pointer (covers interactive divs like Portfolio cards)
      const isPointer = window.getComputedStyle(target).cursor === 'pointer';

      if (isLink || isButton || isTargetClass || isPointer) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-exclusion"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        animate={{
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Center Dot */}
        <div className={`w-1 h-1 rounded-full transition-colors duration-200 ${hovered ? 'bg-cyber-red' : 'bg-white'}`} />
        
        {/* Outer Ring */}
        <motion.div
            animate={{
                scale: hovered ? 1.2 : 1,
                opacity: hovered ? 1 : 0.5,
                borderColor: hovered ? '#FF1A1A' : '#FFFFFF',
            }}
            className="absolute inset-0 rounded-full border border-white" 
        />
        
        {/* Crosshair accents for hacker vibe */}
        {hovered && (
            <>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-1 bg-cyber-red" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0.5 h-1 bg-cyber-red" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-0.5 bg-cyber-red" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1 h-0.5 bg-cyber-red" />
            </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MagneticCursor;