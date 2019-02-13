'use strict';
module.exports = (sequelize, DataTypes) => {
  const Examination = sequelize.define('Examination', {
    scheduledDate: DataTypes.DATE,
    rightEye: DataTypes.STRING,
    leftEye: DataTypes.STRING
  }, {});
  Examination.associate = function(models) {
      Examination.belongsTo(models.Client, {foreignKey: 'ClientId'});
  };
  return Examination;
};