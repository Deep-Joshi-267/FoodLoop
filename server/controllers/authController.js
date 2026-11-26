const userModel = require('../models/userModel');

const authController = {
  // POST /api/auth/sync
  // Called by frontend after Supabase sign-in/OAuth redirect to sync user into PostgreSQL
  syncUser: async (req, res) => {
    try {
      const { sub: id, email, user_metadata } = req.user;
      const { role: requestedRole, fullName: bodyFullName } = req.body;

      // Determine role:
      // 1. Prioritize user_metadata (stored permanently in Supabase)
      // 2. Or from request body
      // 3. Fallback to 'customer'
      const role = user_metadata?.role || requestedRole || 'customer';
      const fullName = bodyFullName || user_metadata?.full_name || user_metadata?.name || null;

      const user = await userModel.upsertUser({
        id,
        email,
        fullName,
        role,
      });

      return res.status(200).json({
        message: 'User synced successfully',
        user,
      });
    } catch (error) {
      console.error('Error in syncUser:', error);
      return res.status(500).json({ error: 'Failed to sync user with database', details: error.message });
    }
  },

  // GET /api/auth/me
  // Fetches current authenticated user profile from PostgreSQL
  getMe: async (req, res) => {
    try {
      const { sub: id } = req.user;
      const user = await userModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User record not found in database' });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error('Error in getMe:', error);
      return res.status(500).json({ error: 'Failed to fetch user profile', details: error.message });
    }
  },
};

module.exports = authController;
