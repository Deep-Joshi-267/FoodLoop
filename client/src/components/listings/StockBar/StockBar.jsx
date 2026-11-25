import React from 'react';
import './StockBar.css';

export const StockBar = ({ available, total }) => {
  const percentage = Math.min(Math.max((available / total) * 100, 0), 100);
  const isLowStock = available <= 3;

  return (
    <div className="stock-bar">
      <div className="stock-bar__info">
        <span className={`stock-bar__count ${isLowStock ? 'stock-bar__count--low' : ''}`}>
          {isLowStock ? `Only ${available} left!` : `${available} of ${total} available`}
        </span>
        <span className="stock-bar__percentage">{Math.round(percentage)}%</span>
      </div>
      <div className="stock-bar__track">
        <div
          className={`stock-bar__fill ${isLowStock ? 'stock-bar__fill--low' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
