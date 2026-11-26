import { useAuth } from '../context/AuthContext';

export const useRequireAuth = () => {
  const { user, openAuthModal } = useAuth();

  const requireAuth = (callback, customMessage, role = 'customer') => {
    if (user) {
      if (typeof callback === 'function') callback();
    } else {
      openAuthModal({
        title: role === 'restaurant_owner' ? 'Partner Access' : 'Sign In to FoodLoop',
        message: customMessage || 'Please log in or register to continue.',
        role,
      });
    }
  };

  return { requireAuth, isAuthenticated: !!user };
};
