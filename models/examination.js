'use strict';
module.exports = (sequelize, DataTypes) => {
  const Examination = sequelize.define('Examination', {
    scheduledDate: DataTypes.DATE,
    rightEye: DataTypes.STRING,
    leftEye: DataTypes.STRING
  }, {});
  Examination.associate = function(models) {
    // associations can be defined here
  };
  return Examination;
};