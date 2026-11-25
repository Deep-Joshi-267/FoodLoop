import { useAuth } from '../context/AuthContext';

/**
 * useRequireAuth provides a single gatekeeper function.
 * Any interactive user action (reservation, search, location selector, browse)
 * calls `requireAuth(callback)`. If not authenticated, it intercepts and pops up the AuthModal.
 */
export const useRequireAuth = () => {
  const { user, openAuthModal } = useAuth();

  const requireAuth = (callback, customMessage) => {
    if (user) {
      // User is logged in, perform action
      if (typeof callback === 'function') callback();
    } else {
      // User not logged in: intercept and display AuthModal
      openAuthModal({
        title: 'Sign In to FoodLoop',
        message: customMessage || 'Please log in or sign up to continue with this action.',
      });
    }
  };

  return { requireAuth, isAuthenticated: !!user };
};
