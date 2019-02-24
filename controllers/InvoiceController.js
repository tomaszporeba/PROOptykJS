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

InvoiceController.findById = async (req, res, next) => {
    try {
        let invoice = await Invoice.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(invoice)
    } catch (e) {
        console.log(e.message)
    }
};

InvoiceController.createOrUpdate = async (req, res, next) => {
    let invoice;
    try {
        invoice = await Invoice.findOne({
            where: {id: req.body.id}
        });
        if (req.body.Client != undefined) {
            req.body.clientId = req.body.Client.id
        }
        if (invoice) {
            invoice.update(req.body)
        } else {
            invoice = await Invoice.create(req.body)
        }
        res.send(invoice);
    } catch (e) {
        console.log(e.message)
    }
};


module.exports = InvoiceController;