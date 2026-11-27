import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container } from '../components/common/Container/Container';
import { Button } from '../components/common/Button/Button';
import { MOCK_DEALS } from '../data/mockDeals';
import { DealCard } from '../components/listings/DealCard/DealCard';

export const Explore = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <main style={{ minHeight: '85vh', padding: '40px 0', backgroundColor: '#F8F9FA' }}>
      <Container>
        {/* Welcome Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E8E8',
            borderRadius: '12px',
            padding: '28px 32px',
            marginBottom: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                color: '#E23744',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Customer Feed
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '850', color: '#1C1C1C', marginTop: '4px' }}>
              Welcome, {profile?.full_name || user?.email?.split('@')[0]}!
            </h1>
            <p style={{ color: '#696969', fontSize: '0.9rem', marginTop: '4px' }}>
              📍 Showing live surplus food within pickup radius of: <strong>{profile?.address || 'Indiranagar, Bengaluru'}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/enter-details">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Live Surplus Grid Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#1C1C1C' }}>
            Available Surplus Meals for Pickup Today
          </h2>
          <p style={{ color: '#696969', fontSize: '0.9rem' }}>
            Reserve surplus baked goods and meals directly before collection deadlines.
          </p>
        </div>

        {/* Grid of Deals */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {MOCK_DEALS.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </Container>
    </main>
  );
};
