const express = require('express');
const router = express.Router();
const eyeglassController = require('../controllers/EyeglassController');
const invoiceController = require('../controllers/InvoiceController');


// api

router.get('/eyeglass', eyeglassController.find);
router.get('/invoice', invoiceController.find);


module.exports = router;
