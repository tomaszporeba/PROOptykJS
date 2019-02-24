'use strict';
module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        name: DataTypes.STRING,
        lastName: DataTypes.STRING,
        phoneNumber: DataTypes.INTEGER,
        leftEyeDefectOfVision: DataTypes.STRING,
        rightEyeDefectOfVision: DataTypes.STRING,
        orderDate: DataTypes.DATE,
        comments: DataTypes.STRING
    }, {});
    Client.associate = function (models) {
        Client.hasMany(models.Examination, {foreignKey: 'clientId'});
        Client.hasMany(models.Invoice, {foreignKey: 'clientId'});
        Client.belongsTo(models.Eyeglass, {foreignKey: 'eyeglassId'});
    };
    return Client;
};