'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Examination = sequelize.define('Examination', {
        scheduledDate: {
            type: DataTypes.DATEONLY
        },
        rightEye: DataTypes.STRING,
        leftEye: DataTypes.STRING
    }, {});
    Examination.associate = function (models) {
        Examination.belongsTo(models.Client, {foreignKey: 'clientId'});
    };
    return Examination;
};