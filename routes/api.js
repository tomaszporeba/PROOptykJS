const express = require('express');
const router = express.Router();
const eyeglassController = require('../controllers/EyeglassController');
const invoiceController = require('../controllers/InvoiceController');
const examinationController = require('../controllers/examinationController');
const clientController = require('../controllers/clientController');


// api

router.get('/eyeglass', eyeglassController.find);
router.get('/eyeglass/:id', eyeglassController.findById);
router.post('/eyeglass/update', eyeglassController.createOrUpdate);
router.get('/invoice', invoiceController.find);
router.post('/invoice/update', invoiceController.createOrUpdate);
router.get('/examination', examinationController.find);
router.get('/client', clientController.find);
router.get('/client/:id', clientController.findById);
router.post('/client/update', clientController.createOrUpdate);


module.exports = router;
