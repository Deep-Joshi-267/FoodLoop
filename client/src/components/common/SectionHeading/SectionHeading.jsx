import React from 'react';
import './SectionHeading.css';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center', // 'left' | 'center'
  className = '',
}) => {
  return (
    <div className={`section-heading section-heading--${align} ${className}`}>
      {badge && <span className="section-heading__badge">{badge}</span>}
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
};
