import React, { useEffect, useRef } from 'react';

const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const columns = Math.floor(width / 20);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);
    
    // Grid lines
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 26, 26, 0.03)';
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x <= width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines (perspective illusion)
      const time = Date.now() * 0.0005;
      const offset = (time * 50) % 50;
      
      for (let y = offset; y <= height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#FF1A1A'; // Red text
      ctx.font = '12px "JetBrains Mono"';

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        
        // Random opacity for "glitch" feel
        ctx.globalAlpha = Math.random() > 0.95 ? 1 : 0.1;
        ctx.fillText(text, i * 20, drops[i] * 20);
        ctx.globalAlpha = 1;

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let animationFrameId: number;

    const render = () => {
      drawMatrix();
      drawGrid();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
};

export default CyberBackground;
