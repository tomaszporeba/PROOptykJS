const Eyeglass = require('../models').Eyeglass;

let EyeglassController = {};

EyeglassController.find =  async (req, res, next) => {

    try {
        let eyeglasses = await Eyeglass.findAll();
        res.send(eyeglasses);

    } catch (e) {
        next(e)
    }
};

module.exports = EyeglassController;