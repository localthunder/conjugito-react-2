import express from 'express';
const router = express.Router();
import * as settingsController from '../controllers/settingsController.js';

// Route to get settings for a user
router.get('/userpracticesettings/:userId', settingsController.getUserPracticeSettings);

// Route to update settings for a user
router.put('/updateuserpracticesettings/:userId', settingsController.updateUserSettings);

export default router;
