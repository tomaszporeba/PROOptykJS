'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER
  }, {});
  Client.associate = function(models) {
      Client.hasMany(models.Examination, {foreignKey: 'clientId'});
  };
  return Client;
};