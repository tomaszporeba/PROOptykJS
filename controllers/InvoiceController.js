const Invoice = require('../models').Invoice;
const client = require('../models').Client;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let InvoiceController = {};

InvoiceController.find =  async (req, res, next) => {

    let param = req.query.search || '';

    try {
        let invoices = await Invoice.findAll({
            attributes: ['id', 'number', 'amount', 'company', 'product', 'accountNumber', 'createdAt', 'updatedAt'],
            where: {
                [Op.or]:{
                    number: {
                        [Op.like]: `%${param}%`
                    }
                }
            },
            include: [{
                model: client,
                attributes: {exclude : ['createdAt', 'updatedAt']}
            }]
        });
        res.send(invoices);

    } catch (e) {
        next(e)
    }
};

module.exports = InvoiceController;