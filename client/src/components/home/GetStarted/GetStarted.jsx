import React from 'react';
import { Container } from '../../common/Container/Container';
import { Button } from '../../common/Button/Button';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import './GetStarted.css';

export const GetStarted = () => {
  const { requireAuth } = useRequireAuth();

  const handleBrowseDeals = () => {
    requireAuth(() => {
      const deals = document.getElementById('featured-deals');
      if (deals) deals.scrollIntoView({ behavior: 'smooth' });
    }, 'Sign in to start reserving surplus meals.');
  };

  const handleListStore = () => {
    requireAuth(() => {
      alert('Store Onboarding Registration');
    }, 'Sign in to register your restaurant or bakery.');
  };

  return (
    <section className="get-started-section">
      <Container>
        <div className="get-started-card">
          <div className="get-started-decor get-started-decor--left" />
          <div className="get-started-decor get-started-decor--right" />

          <div className="get-started-content">
            <span className="get-started-pill">Ready to Save Food & Money?</span>
            <h2 className="get-started-title">Join Thousands Rescuing Fresh Meals Daily</h2>
            <p className="get-started-subtitle">
              Whether you are an everyday foodie seeking unbeatable deals or a food business wanting
              zero waste and extra revenue, FoodLoop is built for you.
            </p>

            <div className="get-started-actions">
              <Button variant="accent" size="lg" onClick={handleBrowseDeals}>
                Browse Live Deals
              </Button>
              <Button variant="outline" size="lg" className="get-started-white-btn" onClick={handleListStore}>
                List Your Business
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
