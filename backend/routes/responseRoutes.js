const express = require('express');
const { submitResponse, getAllResponses } = require('../controllers/responseController');

const router = express.Router();

router.get('/', getAllResponses); 
router.post('/submit', submitResponse);


module.exports = router;
