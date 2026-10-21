import React, { useEffect, useState } from 'react';

export default function Counter({ value = 0, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10) || 0;
    if (start === end) {
      setCount(end);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const totalFrames = Math.round(duration / 16);
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      // easeOutExpo
      const progress = currentFrame / totalFrames;
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (end - start) * ease);

      setCount(current);

      if (currentFrame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
}
