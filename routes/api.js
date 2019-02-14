const express = require('express');
const router = express.Router();
const eyeglassController = require('../controllers/EyeglassController');
const invoiceController = require('../controllers/InvoiceController');
const examinationController = require('../controllers/examinationController');
const clientController = require('../controllers/clientController');


// api

router.get('/eyeglass', eyeglassController.find);
router.get('/invoice', invoiceController.find);
router.get('/examination', examinationController.find);
router.get('/client', clientController.find);


module.exports = router;
