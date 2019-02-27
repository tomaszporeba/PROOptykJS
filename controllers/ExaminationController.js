const Examination = require('../models').Examination;
const client = require('../models').Client;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let ExaminationController = {};

ExaminationController.find =  async (req, res, next) => {

    let param = req.query.search || '';

    try {
        let examinations = await Examination.findAll({
            attributes: ['id', 'scheduledDate', 'rightEye', 'leftEye', 'createdAt', 'updatedAt'],
            include: [{
                model: client,
                attributes: {exclude : ['createdAt', 'updatedAt']}
            }]
            }
        );
        res.send(examinations);

    } catch (e) {
        next(e)
    }
};

ExaminationController.findById = async (req, res, next) => {
    try {
        let examination = await Examination.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(examination)
    } catch (e) {
        console.log(e.message)
    }
};

ExaminationController.createOrUpdate = async (req, res, next) => {
    let examination;
    try {
        examination = await Examination.findOne({
            where: {id: req.body.id}
        });
        if (req.body.Client != undefined) {
            console.log(req.body);
            req.body.clientId = req.body.Client.id
        }
        if (examination) {
            examination.update(req.body)
        } else {
            examination = await Examination.create(req.body)
        }
        res.send(examination);
    } catch (e) {
        console.log(e.message)
    }
};

module.exports = ExaminationController;