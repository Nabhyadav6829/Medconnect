// routes/users.js - New routes for user profile
const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { getProfile, updateProfile, uploadDocument } = require('../controllers/userController');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateProfile);

// @route   POST /api/users/documents/upload
// @desc    Upload user document
// @access  Private
router.post('/documents/upload', protect, upload.single('file'), uploadDocument);

module.exports = router;