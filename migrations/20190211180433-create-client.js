'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Clients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.INTEGER
            },
            leftEyeDefectOfVision: {
                type: Sequelize.STRING
            },
            rightEyeDefectOfVision: {
                type: Sequelize.STRING
            },
            eyeglassId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Eyeglasses',
                    key: 'id'
                },
            },
            orderDate: {
                type: Sequelize.DATE,
                allowNull: true
            },
            comments: {
                type: Sequelize.STRING,
                allowNull: true
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
        return queryInterface.dropTable('Clients');
    }
};