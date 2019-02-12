'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    number: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    company: DataTypes.STRING,
    product: DataTypes.STRING,
    accountNumber: DataTypes.INTEGER
  }, {});
  Invoice.associate = function(models) {
    // associations can be defined here
  };
  return Invoice;
};