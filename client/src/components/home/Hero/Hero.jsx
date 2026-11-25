import React from 'react';
import { Container } from '../../common/Container/Container';
import { Button } from '../../common/Button/Button';
import { Badge } from '../../common/Badge/Badge';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import './Hero.css';

export const Hero = () => {
  const { requireAuth } = useRequireAuth();

  const handleBrowseClick = () => {
    const deals = document.getElementById('featured-deals');
    if (deals) deals.scrollIntoView({ behavior: 'smooth' });
  };

  const handleListStoreClick = () => {
    requireAuth(() => {
      alert('Merchant Portal: Register Store');
    }, 'Sign in to register your food establishment on FoodLoop.');
  };

  return (
    <section className="hero-section">
      <Container className="hero-container">
        {/* Left Column: Polished corporate narrative */}
        <div className="hero-content">
          <h1 className="hero-title">
            Rescue Premium Food. <br />
            <span className="hero-title__highlight">Save Up to 70%.</span> <br />
            Eliminate Urban Waste.
          </h1>

          <p className="hero-subtitle">
            Partnering with top neighborhood bakeries, cafes, and restaurants to make unsold daily 
            culinary surplus accessible to customers before closing hours.
          </p>

          <div className="hero-ctas">
            <Button variant="primary" size="lg" onClick={handleBrowseClick}>
              Explore Live Deals
            </Button>
            <Button variant="outline" size="lg" onClick={handleListStoreClick}>
              Partner With Us
            </Button>
          </div>

          {/* Clean Metric Bar */}
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="hero-stat-number">28,000+</span>
              <span className="hero-stat-label">Meals Rescued</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-number">180+</span>
              <span className="hero-stat-label">Verified Kitchens</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-number">₹14L+</span>
              <span className="hero-stat-label">Customer Savings</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-end photography with subtle floating enterprise badges */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
              alt="Freshly prepared artisan bakery items and meals"
              className="hero-main-image"
            />

            {/* Subtle Floating Status 1 */}
            <div className="hero-floating-card hero-floating-card--top">
              <div className="floating-indicator" />
              <div>
                <strong>Artisan Patisserie Pack</strong>
                <p>₹120 • 65% off regular menu</p>
              </div>
            </div>

            {/* Subtle Floating Status 2 */}
            <div className="hero-floating-card hero-floating-card--bottom">
              <div className="floating-indicator floating-indicator--urgent" />
              <div>
                <strong>Gourmet Kitchen Surplus</strong>
                <p>Pickup window ends in 25 mins</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
