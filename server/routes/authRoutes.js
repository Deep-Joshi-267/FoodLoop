const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifySupabaseToken = require('../middleware/authMiddleware');

// All auth sync endpoints require valid Supabase JWT
router.post('/sync', verifySupabaseToken, authController.syncUser);
router.get('/me', verifySupabaseToken, authController.getMe);

module.exports = router;
