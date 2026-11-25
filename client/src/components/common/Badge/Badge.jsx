import React from 'react';
import './Badge.css';

export const Badge = ({
  children,
  variant = 'accent', // 'accent' | 'primary' | 'success' | 'outline'
  className = '',
}) => {
  return (
    <span className={`badge badge--${variant} ${className}`}>
      {children}
    </span>
  );
};
