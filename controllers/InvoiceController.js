const Invoice = require('../models').Invoice;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let InvoiceController = {};

InvoiceController.find =  async (req, res, next) => {

    let param = req.query.search || '';

    try {
        let invoices = await Invoice.findAll({
            where: {
                [Op.or]:{
                    number: {
                        [Op.like]: `%${param}%`
                    }
                }

            }
        });
        res.send(invoices);

    } catch (e) {
        next(e)
    }
};

module.exports = InvoiceController;