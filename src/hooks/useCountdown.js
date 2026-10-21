import { useState, useEffect } from 'react';

export function useCountdown(targetIsoDate) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetIsoDate));

  function calculateTimeLeft(target) {
    const diff = new Date(target).getTime() - new Date().getTime();
    if (diff <= 0) {
      return {
        total: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isLive: true
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      total: diff,
      days,
      hours,
      minutes,
      seconds,
      isLive: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetIsoDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetIsoDate]);

  return timeLeft;
}
