const Eyeglass = require('../models').Eyeglass;
const Sequelize = require('sequelize');
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
        next(e)
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
        console.log(e.message)
    }
};

module.exports = EyeglassController;