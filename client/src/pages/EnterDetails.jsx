import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container } from '../components/common/Container/Container';
import { Button } from '../components/common/Button/Button';
import { Toast } from '../components/common/Toast/Toast';

const BACKEND_URL = 'http://localhost:5000';

export const EnterDetails = () => {
  const { user, session, profile, setProfile } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem('foodloop_draft_profile'));
      return draft?.fullName || '';
    } catch {
      return '';
    }
  });

  const [phone, setPhone] = useState(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem('foodloop_draft_profile'));
      return draft?.phone || '';
    } catch {
      return '';
    }
  });

  const [address, setAddress] = useState(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem('foodloop_draft_profile'));
      return draft?.address || '';
    } catch {
      return '';
    }
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState(null);

  // Sync draft to sessionStorage only when the user actually types something
  useEffect(() => {
    if (!loading && (fullName || phone || address)) {
      sessionStorage.setItem(
        'foodloop_draft_profile',
        JSON.stringify({ fullName, phone, address })
      );
    }
  }, [fullName, phone, address, loading]);

  // Pre-fill user data on load from GET /api/auth/me
  useEffect(() => {
    let isMounted = true;

    const fetchCurrentDetails = async () => {
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.user) {
            let draft = null;
            try {
              draft = JSON.parse(sessionStorage.getItem('foodloop_draft_profile'));
            } catch {
              draft = null;
            }

            // Always prioritize saved database value, fallback to metadata, or active draft
            const dbName = data.user.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || '';
            const finalName = draft?.fullName !== undefined && draft?.fullName !== '' ? draft.fullName : dbName;
            const finalPhone = draft?.phone !== undefined && draft?.phone !== '' ? draft.phone : (data.user.phone || '');
            const finalAddress = draft?.address !== undefined && draft?.address !== '' ? draft.address : (data.user.address || '');

            setFullName(finalName);
            setPhone(finalPhone);
            setAddress(finalAddress);
          }
        }
      } catch (err) {
        console.error('Failed to pre-fill profile data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCurrentDetails();

    return () => {
      isMounted = false;
    };
  }, [session, user]);

  const handlePhoneChange = (e) => {
    // Only permit numeric digits up to 10 characters
    const numeric = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(numeric);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Phone validation
    if (phone && phone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save details. Please try again.');
      }

      // Clear draft on successful save
      sessionStorage.removeItem('foodloop_draft_profile');

      // Update state in context
      if (setProfile) setProfile(data.user);

      // Show success toast
      setToast({ message: 'Details saved successfully!', type: 'success' });

      // Redirect to customer explore page after brief moment
      setTimeout(() => {
        navigate('/explore');
      }, 1200);
    } catch (err) {
      console.error('Save details error:', err);
      setErrorMsg(err.message || 'Network error occurred while saving.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: '80vh', padding: '60px 0', backgroundColor: '#F8F9FA' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <Container>
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            padding: '36px',
            borderRadius: '12px',
            border: '1px solid #E8E8E8',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.78rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#E23744',
                backgroundColor: '#FDF2F2',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '8px',
              }}
            >
              Account Setup
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '850', color: '#1C1C1C', marginBottom: '6px' }}>
              Complete Your Details
            </h1>
            <p style={{ color: '#696969', fontSize: '0.92rem', lineHeight: '1.5' }}>
              Add your contact and delivery address so neighborhood kitchens can verify your pickup smoothly.
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: '#FDE8E8',
                color: '#C81E1E',
                border: '1px solid #F8B4B4',
                borderRadius: '6px',
                fontSize: '0.88rem',
                marginBottom: '20px',
              }}
            >
              {errorMsg}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#696969' }}>
              Loading profile details...
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Email (Read-Only) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1C1C1C' }}>
                  Email Address
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: '#F4F5F7',
                    border: '1px solid #E8E8E8',
                    borderRadius: '6px',
                    fontSize: '0.92rem',
                    color: '#696969',
                  }}
                >
                  <span>{user?.email || 'N/A'}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: '#03543F',
                      backgroundColor: '#DEF7EC',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Verified
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1C1C1C' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  style={{
                    height: '42px',
                    padding: '0 14px',
                    border: '1px solid #E8E8E8',
                    borderRadius: '6px',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                  }}
                  placeholder="e.g. Alex Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Phone (10 digits) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1C1C1C' }}>
                  Phone Number
                </label>
                <div style={{ display: 'flex' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      backgroundColor: '#F4F5F7',
                      border: '1px solid #E8E8E8',
                      borderRight: 'none',
                      borderTopLeftRadius: '6px',
                      borderBottomLeftRadius: '6px',
                      fontSize: '0.9rem',
                      color: '#1C1C1C',
                      fontWeight: '600',
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    style={{
                      flex: 1,
                      height: '42px',
                      padding: '0 14px',
                      border: '1px solid #E8E8E8',
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                    }}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>

              {/* Permanent Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1C1C1C' }}>
                  Permanent Address
                </label>
                <textarea
                  rows={3}
                  style={{
                    padding: '10px 14px',
                    border: '1px solid #E8E8E8',
                    borderRadius: '6px',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                  placeholder="Apartment, street name, area, and pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div style={{ paddingTop: '8px' }}>
                <Button variant="primary" size="lg" fullWidth type="submit" disabled={submitting}>
                  {submitting ? 'Saving Details...' : 'Save & Continue'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </main>
  );
};
