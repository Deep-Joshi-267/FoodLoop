import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button/Button';
import { Container } from '../components/common/Container/Container';

export const EnterDetails = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <main style={{ minHeight: '70vh', padding: '60px 0', backgroundColor: '#F8F9FA' }}>
      <Container>
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid #E8E8E8',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#DEF7EC',
              color: '#03543F',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 20px',
            }}
          >
            ✓
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px', color: '#1C1C1C' }}>
            Logged in, role: customer
          </h1>

          <p style={{ color: '#696969', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>
            Welcome to the Customer Portal! Your account is connected and synced with our PostgreSQL database.
          </p>

          <div
            style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #E8E8E8',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '30px',
              textAlign: 'left',
              fontSize: '0.88rem',
            }}
          >
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p style={{ marginTop: '6px' }}><strong>User ID:</strong> <code style={{ fontSize: '0.78rem' }}>{user?.id}</code></p>
            <p style={{ marginTop: '6px' }}><strong>Database Role:</strong> <span style={{ color: '#E23744', fontWeight: '700' }}>{profile?.role || 'customer'}</span></p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button variant="outline" size="md" onClick={() => window.location.pathname = '/'}>
              Back to Home
            </Button>
            <Button variant="primary" size="md" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};
