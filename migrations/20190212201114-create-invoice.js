'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('invoices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            number: {
                type: Sequelize.STRING
            },
            amount: {
                type: Sequelize.DOUBLE
            },
            company: {
                type: Sequelize.STRING
            },
            product: {
                type: Sequelize.STRING
            },
            accountNumber: {
                type: Sequelize.INTEGER
            },
            clientId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Clients',
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
        return queryInterface.dropTable('invoices');
    }
};