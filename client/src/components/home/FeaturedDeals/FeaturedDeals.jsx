import React from 'react';
import { Container } from '../../common/Container/Container';
import { SectionHeading } from '../../common/SectionHeading/SectionHeading';
import { DealCard } from '../../listings/DealCard/DealCard';
import { Button } from '../../common/Button/Button';
import { MOCK_DEALS } from '../../../data/mockDeals';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import './FeaturedDeals.css';

export const FeaturedDeals = () => {
  const { requireAuth } = useRequireAuth();

  const handleViewAllClick = () => {
    requireAuth(() => {
      alert('Explore all 120+ active neighborhood deals');
    }, 'Sign in to access the full surplus catalog and map view.');
  };

  return (
    <section id="featured-deals" className="featured-deals-section">
      <Container>
        <div className="featured-deals-header">
          <SectionHeading
            title="Featured Surplus Deals Near You"
            subtitle="Snag these fresh, safe-to-consume bakery items, lunch bowls, and pizzas before pickup windows close."
            align="left"
          />
          <div className="featured-deals-header-action">
            <Button variant="outline" size="md" onClick={handleViewAllClick}>
              View All Deals (24) →
            </Button>
          </div>
        </div>

        <div className="featured-deals-grid">
          {MOCK_DEALS.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </Container>
    </section>
  );
};
