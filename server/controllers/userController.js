const userModel = require('../models/userModel');

const userController = {
  // PATCH /api/users/me
  updateMe: async (req, res) => {
    try {
      const { sub: id } = req.user;
      const { full_name, phone, address } = req.body;

      // Validate phone if provided: must be 10 digits
      if (phone) {
        const cleanPhone = phone.trim();
        if (!/^\d{10}$/.test(cleanPhone)) {
          return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
        }
      }

      const updatedUser = await userModel.updateCustomerDetails({
        id,
        fullName: full_name !== undefined ? full_name.trim() : null,
        phone: phone !== undefined ? phone.trim() : null,
        address: address !== undefined ? address.trim() : null,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User record not found' });
      }

      return res.status(200).json({
        message: 'Details updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error updating customer details:', error);
      return res.status(500).json({ error: 'Failed to update details', details: error.message });
    }
  },
};

module.exports = userController;
