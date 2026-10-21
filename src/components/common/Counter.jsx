import React, { useEffect, useState } from 'react';

export default function Counter({ value, duration = 1000 }) {
  const numValue = parseInt(value, 10);

  // Display 0 if value is 0 or not yet loaded
  if (value === undefined || value === null || isNaN(numValue) || numValue === 0) {
    return <span>0</span>;
  }

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = numValue;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const totalFrames = Math.max(1, Math.round(duration / 16));
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
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
  }, [numValue, duration]);

  return <span>{count.toLocaleString()}</span>;
}
