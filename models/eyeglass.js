'use strict';
module.exports = (sequelize, DataTypes) => {
  const Eyeglass = sequelize.define('Eyeglass', {
    holder_name: DataTypes.STRING,
    purchase_price: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    vat: DataTypes.STRING,
    availability: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    salon: DataTypes.STRING
  }, {});
  Eyeglass.associate = function(models) {
    // associations can be defined here
  };
  return Eyeglass;
};