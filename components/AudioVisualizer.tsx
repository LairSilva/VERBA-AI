import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  mode: 'listening' | 'speaking' | 'idle';
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isActive, mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      const centerY = height / 2;
      const color = mode === 'listening' ? '#f97316' : '#ffffff'; 
      
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let x = 0; x < width; x++) {
        const y = centerY + 
          Math.sin(x * 0.05 + time) * (mode === 'listening' ? 20 : 10) * Math.sin(time * 0.5) +
          Math.sin(x * 0.02 + time * 2) * 5;
          
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.shadowBlur = 0;
      time += 0.1;
      animationId = requestAnimationFrame(draw);
    };

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive, mode]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default AudioVisualizer;