import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function SeasonalCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isTabVisible = !document.hidden;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Particle sets
    const isMobile = width < 768;
    const baseCount = isMobile ? 22 : 45;

    let particles = [];
    let bats = [];
    let codeGlyphs = [];
    let snowflakes = [];

    const CODE_SYMBOLS = ['{ }', '</>', 'git', '01', 'commit', 'λ', '=>', '[]', '&&'];

    function initParticles() {
      particles = [];
      bats = [];
      codeGlyphs = [];
      snowflakes = [];

      if (theme === 'october') {
        // Fog embers & glowing dust
        const count = isMobile ? 25 : 55;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.8 + 0.8,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.6 - 0.2, // float upwards like embers
            alpha: Math.random() * 0.5 + 0.2,
            flickerSpeed: Math.random() * 0.03 + 0.01,
            color: Math.random() > 0.4 ? '#ff7700' : '#9d4edd'
          });
        }
        // Bats gliding
        const batCount = isMobile ? 3 : 6;
        for (let i = 0; i < batCount; i++) {
          bats.push({
            x: Math.random() * width,
            y: Math.random() * (height * 0.5),
            vx: (Math.random() * 1.5 + 0.8) * (Math.random() > 0.5 ? 1 : -1),
            vy: Math.sin(Math.random() * Math.PI) * 0.5,
            size: Math.random() * 9 + 8,
            wingPhase: Math.random() * Math.PI * 2
          });
        }
      } else if (theme === 'november') {
        // Circuit nodes
        const count = isMobile ? 28 : 50;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 1,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            alpha: Math.random() * 0.45 + 0.2
          });
        }
        // Floating code symbols
        const glyphCount = isMobile ? 6 : 14;
        for (let i = 0; i < glyphCount; i++) {
          codeGlyphs.push({
            text: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
            x: Math.random() * width,
            y: Math.random() * height,
            vy: -Math.random() * 0.4 - 0.2,
            alpha: Math.random() * 0.35 + 0.15,
            size: Math.floor(Math.random() * 5 + 11)
          });
        }
      } else if (theme === 'december') {
        // Snowflakes
        const count = isMobile ? 35 : 75;
        for (let i = 0; i < count; i++) {
          snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.8 + 1,
            density: Math.random() * count,
            vy: Math.random() * 1.2 + 0.6,
            vx: Math.random() * 0.6 - 0.3,
            alpha: Math.random() * 0.6 + 0.2
          });
        }
      }
    }

    initParticles();

    // Helper: draw bat silhouette
    function drawBat(b) {
      ctx.save();
      ctx.translate(b.x, b.y);
      if (b.vx < 0) ctx.scale(-1, 1);
      ctx.fillStyle = 'rgba(157, 78, 221, 0.45)';

      const wingFlap = Math.sin(b.wingPhase) * (b.size * 0.6);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Left wing
      ctx.quadraticCurveTo(-b.size * 0.6, -b.size + wingFlap, -b.size, -b.size * 0.2);
      ctx.quadraticCurveTo(-b.size * 0.5, 0, 0, b.size * 0.3);
      // Right wing
      ctx.quadraticCurveTo(b.size * 0.5, 0, b.size, -b.size * 0.2);
      ctx.quadraticCurveTo(b.size * 0.6, -b.size + wingFlap, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    let lastTime = performance.now();

    function render(currentTime) {
      if (!isTabVisible) return;
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // October rendering (Fog embers & bats)
      if (theme === 'october') {
        // Subtle ambient fog gradient at top
        const grad = ctx.createRadialGradient(width * 0.5, 0, 10, width * 0.5, 0, height * 0.7);
        grad.addColorStop(0, 'rgba(157, 78, 221, 0.08)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Embers
        for (let p of particles) {
          if (!prefersReducedMotion) {
            p.y += p.vy;
            p.x += p.vx;
            p.alpha += Math.sin(currentTime * p.flickerSpeed) * 0.008;
            if (p.y < -10) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.1, Math.min(0.7, p.alpha));
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Bats
        for (let b of bats) {
          if (!prefersReducedMotion) {
            b.x += b.vx;
            b.y += Math.sin(currentTime * 0.003) * 0.4;
            b.wingPhase += 0.25;
            if (b.vx > 0 && b.x > width + 40) b.x = -40;
            if (b.vx < 0 && b.x < -40) b.x = width + 40;
          }
          drawBat(b);
        }
      }

      // November rendering (Circuit grid lines & floating code)
      else if (theme === 'november') {
        // Draw circuit connections between close nodes
        ctx.lineWidth = 0.7;
        const maxDist = isMobile ? 80 : 120;
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          if (!prefersReducedMotion) {
            p1.x += p1.vx;
            p1.y += p1.vy;
            if (p1.x < 0 || p1.x > width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > height) p1.vy *= -1;
          }

          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#00F5D4';
          ctx.globalAlpha = p1.alpha;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = '#00F5D4';
              ctx.globalAlpha = (1 - dist / maxDist) * 0.18;
              ctx.stroke();
            }
          }
        }

        // Code glyphs
        ctx.font = '12px "Fira Code", monospace';
        ctx.fillStyle = '#00BBF9';
        for (let g of codeGlyphs) {
          if (!prefersReducedMotion) {
            g.y += g.vy;
            if (g.y < -20) {
              g.y = height + 20;
              g.x = Math.random() * width;
            }
          }
          ctx.globalAlpha = g.alpha;
          ctx.fillText(g.text, g.x, g.y);
        }
      }

      // December rendering (Snowfall & warm glow)
      else if (theme === 'december') {
        // Ambient golden warm glow near top right
        const glow = ctx.createRadialGradient(width * 0.8, height * 0.1, 20, width * 0.8, height * 0.1, 300);
        glow.addColorStop(0, 'rgba(255, 209, 102, 0.08)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        // Snowflakes
        for (let s of snowflakes) {
          if (!prefersReducedMotion) {
            s.y += s.vy;
            s.x += Math.sin(currentTime * 0.001 + s.density) * 0.5;
            if (s.y > height + 10) {
              s.y = -10;
              s.x = Math.random() * width;
            }
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = s.alpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    if (prefersReducedMotion) {
      render(0);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
}
