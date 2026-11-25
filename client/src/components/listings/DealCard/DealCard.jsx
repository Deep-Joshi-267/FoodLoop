import React, { useState } from 'react';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import { Button } from '../../common/Button/Button';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import { APP_CONFIG } from '../../../config/appConfig';
import './DealCard.css';

export const DealCard = ({ deal }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { requireAuth } = useRequireAuth();

  const handleHeartClick = (e) => {
    e.stopPropagation();
    requireAuth(() => {
      setIsSaved(!isSaved);
    }, 'Sign in to save this item to your favorites.');
  };

  const handleReserveClick = () => {
    requireAuth(() => {
      alert(`Reserved: ${deal.itemName}!`);
    }, `Sign in to reserve "${deal.itemName}" at ${APP_CONFIG.currency}${deal.discountedPrice}.`);
  };

  return (
    <div className="deal-card" onClick={handleReserveClick} tabIndex={0} role="button">
      {/* Media Header */}
      <div className="deal-card__media">
        <img
          src={deal.image}
          alt={deal.itemName}
          className="deal-card__image"
          loading="lazy"
        />
        <div className="deal-card__overlay-top">
          <span className="deal-card__discount-pill">
            {deal.discountPercent}% OFF
          </span>

          <button
            className={`deal-card__heart-btn ${isSaved ? 'is-saved' : ''}`}
            onClick={handleHeartClick}
            aria-label="Save deal"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill={isSaved ? '#E23744' : 'none'} stroke={isSaved ? '#E23744' : '#1C1C1C'} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="deal-card__overlay-bottom">
          <CountdownTimer deadlineIso={deal.pickupDeadline} />
        </div>
      </div>

      {/* Body Content */}
      <div className="deal-card__content">
        <div className="deal-card__meta">
          <span className="deal-card__business">{deal.businessName}</span>
          <span className="deal-card__distance">{deal.distance}</span>
        </div>

        <h3 className="deal-card__title">{deal.itemName}</h3>
        <p className="deal-card__pickup-window">{deal.pickupWindow}</p>

        {/* Pricing & Calibrated Reserve Button */}
        <div className="deal-card__footer">
          <div className="deal-card__prices">
            <span className="deal-card__price-original">
              {APP_CONFIG.currency}{deal.originalPrice}
            </span>
            <span className="deal-card__price-discounted">
              {APP_CONFIG.currency}{deal.discountedPrice}
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleReserveClick();
            }}
          >
            Reserve Deal
          </Button>
        </div>
      </div>
    </div>
  );
};
