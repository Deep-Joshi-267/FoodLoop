import { useState, useEffect } from 'react';

export const useCountdown = (deadlineIso) => {
  const calculateTimeLeft = () => {
    const diff = new Date(deadlineIso).getTime() - Date.now();
    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, totalMs: 0, isExpired: true };
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, totalMs: diff, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadlineIso]);

  // Is urgent if less than 30 minutes remain
  const isUrgent = !timeLeft.isExpired && timeLeft.totalMs < 30 * 60 * 1000;

  return { ...timeLeft, isUrgent };
};
