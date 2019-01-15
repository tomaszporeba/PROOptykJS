'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
    }, {
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            },
            beforeUpdate: (user) => {
                if (user.password) {
                    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
                }

            },
            beforeBulkUpdate: (user) => {
                const salt = bcrypt.genSaltSync();
                if (user.attributes.hasOwnProperty("password")) {
                    user.attributes.password = bcrypt.hashSync(user.attributes.password, salt);
                }
            }

        },

    });
    User.associate = function (models) {
        User.belongsTo(models.Role, {foreignKey: 'roleId'});

    };

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    return User;
};