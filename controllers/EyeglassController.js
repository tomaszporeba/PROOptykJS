const Eyeglass = require('../models').Eyeglass;
const Sequelize = require('sequelize');
const {serverError} = require('../middleware/responseType');
const Op = Sequelize.Op;

let EyeglassController = {};

EyeglassController.find =  async (req, res, next) => {

    let param = req.query.search || '';

    try {
        let eyeglasses = await Eyeglass.findAll({
            where: {
                [Op.or]:{
                    holder_name: {
                        [Op.like]: `%${param}%`
                    },
                    color: {
                        [Op.like]: `%${param}%`
                    },
                    salon: {
                        [Op.like]: `%${param}%`
                    }
                }

                }
        });
        res.send(eyeglasses);

    } catch (e) {
        return next(serverError(500, e.message))
    }
};

EyeglassController.findById = async (req, res, next) => {
    try {
        let eyeglass = await Eyeglass.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(eyeglass)
    } catch (e) {
        return next(serverError(500, e.message))
    }
};

EyeglassController.createOrUpdate = async (req, res, next) => {
    let eyeglass;
    try {
        eyeglass = await Eyeglass.findOne({
            where: {id: req.body.id}
        });
        if (eyeglass) {
           eyeglass.update(req.body)
        } else {
            eyeglass = await Eyeglass.create(req.body)
        }
        res.send(eyeglass);
    } catch (e) {
        return next(serverError(500, e.message))
    }
};

module.exports = EyeglassController;