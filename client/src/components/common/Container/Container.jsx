import React from 'react';
import './Container.css';

export const Container = ({ children, className = '', fluid = false }) => {
  return (
    <div className={`container ${fluid ? 'container--fluid' : ''} ${className}`}>
      {children}
    </div>
  );
};
