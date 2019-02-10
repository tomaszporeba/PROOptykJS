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

module.exports = EyeglassController;