const invoice = require('../models').Invoice;
const Client = require('../models').Client;
const Sequelize = require('sequelize');
const Eyeglass = require('../models').Eyeglass;
const {serverError} = require('../middleware/responseType');

const Op = Sequelize.Op;

let ClientController = {};

ClientController.find =  async (req, res, next) => {

    // let param = req.query.search || '';

    try {
        let clients = await Client.findAll({
            attributes: ['id', 'name', 'lastName', 'phoneNumber', 'leftEyeDefectOfVision', 'rightEyeDefectOfVision', 'orderDate', 'comments', 'createdAt', 'updatedAt'],
            include: [{
                model: Eyeglass,
                attributes: {exclude : ['createdAt', 'updatedAt']}
            }]
            }
        );
        res.send(clients);

    } catch (e) {
        return next(serverError(500, e.message))
    }
};

ClientController.findById = async (req, res, next) => {
    try {
        let client = await Client.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(client)
    } catch (e) {
        return next(serverError(500, e.message))
    }
};

ClientController.createOrUpdate = async (req, res, next) => {
    let client;
    try {
        client = await Client.findOne({
            where: {id: req.body.id}
        });
        if (client) {
            client.update(req.body)
        } else {
            client = await Client.create(req.body)
        }
        res.send(client);
    } catch (e) {
        return next(serverError(500, e.message))
    }
};


module.exports = ClientController;