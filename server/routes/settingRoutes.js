const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Route to get settings for a user
router.get('/userpracticesettings/:userId', settingsController.getUserPracticeSettings);

// Route to update settings for a user
router.put('/updateuserpracticesettings/:userId', settingsController.updateUserSettings);

module.exports = router;
