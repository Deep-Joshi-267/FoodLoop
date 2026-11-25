import React from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import './CountdownTimer.css';

export const CountdownTimer = ({ deadlineIso }) => {
  const { hours, minutes, seconds, isUrgent, isExpired } = useCountdown(deadlineIso);

  if (isExpired) {
    return (
      <div className="countdown-timer countdown-timer--expired">
        <span className="countdown-timer__icon">⌛</span>
        <span>Pickup Expired</span>
      </div>
    );
  }

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={`countdown-timer ${isUrgent ? 'countdown-timer--urgent' : ''}`}>
      <span className="countdown-timer__icon">{isUrgent ? '🔥' : '⏰'}</span>
      <span className="countdown-timer__text">
        Ends in{' '}
        <strong>
          {hours > 0 ? `${pad(hours)}:` : ''}
          {pad(minutes)}:{pad(seconds)}
        </strong>
      </span>
    </div>
  );
};
