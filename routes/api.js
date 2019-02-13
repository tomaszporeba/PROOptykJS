const express = require('express');
const router = express.Router();
const eyeglassController = require('../controllers/EyeglassController');
const invoiceController = require('../controllers/InvoiceController');
const examinationController = require('../controllers/examinationController');


// api

router.get('/eyeglass', eyeglassController.find);
router.get('/invoice', invoiceController.find);
router.get('/examination', examinationController.find);


module.exports = router;
