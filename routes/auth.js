let express = require('express');
let router = express.Router();
let authController = require('../controllers/Auth');


// login
router.post('/login', authController.login);
router.post('/register', authController.register);



module.exports = router;
