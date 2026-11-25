import React, { useState } from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'accent' | 'outline' | 'ghost' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg'
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 500);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {isRippling && (
        <span
          className="btn__ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      )}
      <span className="btn__content">{children}</span>
    </button>
  );
};
