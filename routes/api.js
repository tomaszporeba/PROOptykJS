const express = require('express');
const router = express.Router();
const eyeglassController = require('../controllers/EyeglassController');


// api

router.get('/eyeglass', eyeglassController.find);


module.exports = router;
