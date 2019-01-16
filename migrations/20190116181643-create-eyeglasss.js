'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Eyeglasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      holder_name: {
        type: Sequelize.STRING
      },
      purchase_price: {
        type: Sequelize.DOUBLE
      },
      price: {
        type: Sequelize.DOUBLE
      },
      vat: {
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      salon: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Eyeglassses');
  }
};