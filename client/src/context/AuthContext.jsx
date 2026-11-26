import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);
const BACKEND_URL = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // Local PostgreSQL user record
  const [loading, setLoading] = useState(true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState({
    title: 'Sign In to FoodLoop',
    message: 'Please log in or sign up to continue.',
    role: 'customer', // 'customer' | 'restaurant_owner'
  });

  // Function to sync Supabase user session to our local PostgreSQL database
  const syncWithBackend = async (currentSession) => {
    if (!currentSession?.access_token) return;

    try {
      // Prioritize Supabase cloud user_metadata, then fallback to local storage
      const metaRole = currentSession.user?.user_metadata?.role;
      const storedRole = metaRole || localStorage.getItem('foodloop_role') || 'customer';
      const fullName = currentSession.user?.user_metadata?.full_name || currentSession.user?.user_metadata?.name || null;

      const response = await fetch(`${BACKEND_URL}/api/auth/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentSession.access_token}`,
        },
        body: JSON.stringify({
          role: storedRole,
          fullName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        return data.user;
      } else {
        console.error('Failed to sync user with backend:', await response.text());
      }
    } catch (err) {
      console.error('Network error during backend sync:', err);
    }
  };

  useEffect(() => {
    // 1. Initial check for existing active session on mount
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession) {
        syncWithBackend(initialSession);
      }
      setLoading(false);
    });

    // 2. Realtime listener for auth state changes (login, logout, token refresh, OAuth redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession) {
        const syncedUser = await syncWithBackend(currentSession);
        // Clean up pending role from localStorage
        localStorage.removeItem('foodloop_role');

        // Route user if they are on the home page and just completed login/OAuth
        if (window.location.pathname === '/' || window.location.pathname === '') {
          const role = syncedUser?.role || 'customer';
          if (role === 'restaurant_owner') {
            window.location.pathname = '/information';
          } else {
            window.location.pathname = '/enter-details';
          }
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (config = {}) => {
    setAuthModalConfig({
      title: config.title || 'Sign In to FoodLoop',
      message: config.message || 'Please log in or sign up to continue.',
      role: config.role || 'customer',
    });
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    window.location.pathname = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        isAuthModalOpen,
        authModalConfig,
        openAuthModal,
        closeAuthModal,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
