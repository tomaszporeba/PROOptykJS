const Examination = require('../models').Examination;
const Client = require('../models').Client;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let ExaminationController = {};

ExaminationController.find =  async (req, res, next) => {

    let param = req.query.search || '';

    try {
        let examinations = await Examination.findAll({
            attributes: ['id', 'scheduledDate', 'rightEye', 'leftEye', 'createdAt', 'updatedAt'],
            include: [{
                model: Client,
                attributes: {exclude : ['createdAt', 'updatedAt']}
            }]
            }
        );
        res.send(examinations);

    } catch (e) {
        next(e)
    }
};


module.exports = ExaminationController;