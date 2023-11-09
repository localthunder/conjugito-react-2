const express = require('express');
const router = express.Router();
const verbController = require('../controllers/verbController');

router.get('/verbs', verbController.getAllVerbs); 
router.post('/randomverb', verbController.getRandomVerb);
router.post('/conjugation', verbController.getConjugation);
// In your verbRoutes.js (or a relevant route file)
router.get('/testDbConnection', verbController.testDbConnection);


module.exports = router;

