import React from 'react';
import './Toast.css';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast-notification toast--${type}`} role="alert">
      <span className="toast-icon">
        {type === 'success' ? '✓' : '⚠️'}
      </span>
      <span className="toast-message">{message}</span>
      {onClose && (
        <button className="toast-close" onClick={onClose} aria-label="Close notification">
          &times;
        </button>
      )}
    </div>
  );
};
