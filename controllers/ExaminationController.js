const Examination = require('../models').Examination;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let ExaminationController = {};

ExaminationController.find =  async (req, res, next) => {

    let param = req.query.search || '';

    try {
        let examinations = await Examination.findAll();
        res.send(examinations);

    } catch (e) {
        next(e)
    }
};

module.exports = ExaminationController;