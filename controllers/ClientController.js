const invoice = require('../models').Invoice;
const Client = require('../models').Client;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let ClientController = {};

ClientController.find =  async (req, res, next) => {

    let param = req.query.search || '';

    try {
        let clients = await Client.findAll({
                attributes: ['id', 'name', 'lastName', 'phoneNumber', 'createdAt', 'updatedAt']
            }
        );
        res.send(clients);

    } catch (e) {
        next(e)
    }
};


module.exports = ClientController;