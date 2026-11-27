const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifySupabaseToken = require('../middleware/authMiddleware');

// PATCH /api/users/me
router.patch('/me', verifySupabaseToken, userController.updateMe);

module.exports = router;
