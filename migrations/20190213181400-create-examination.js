'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Examinations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            scheduledDate: {
                type: Sequelize.DATE
            },
            rightEye: {
                type: Sequelize.STRING
            },
            leftEye: {
                type: Sequelize.STRING
            },
            clientId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Examinations',
                    key: 'id'
                },
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
        return queryInterface.dropTable('Examinations');
    }
};