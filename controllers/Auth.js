const passport = require('passport');
const generator = require('generate-password');
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();
let AuthController = {};
const CipherService = require('../services/CipherService');
const User = require('../models').User;
const {accountNotFound, takenEmail, badRequest, serverError} = require('../middleware/responseType');


async function _onPassportAuth(req, res, next, error, user, info) {

    try {
        if (user != null) {
            const token= CipherService.createToken(user);
            let userFiltered = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: "JWT " + token
            };

            return res.send(userFiltered)
        } else {
            return next(accountNotFound());
        }
    } catch (e) {
        e.stackTrace
    }

}


AuthController.register = async (req,res,next) => {

    let firstName = req.param('firstName');
    let lastName = req.param('lastName');
    let password = req.param('password');
    let email = req.param('email');

    if (firstName != null && lastName != null && password != null && email != null) {


        User.findOne({
            where: {
                email: email
            }
        }).then(async function (user) {
            if (user) {
                return next(takenEmail())
            }
            else {
                User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    roleId: 1,
                    active: true
                }).then(function (newUser) {

                    if (!newUser) {
                        return next(serverError('',"Error while creating user"))
                    }

                    if (newUser) {
                        return res.send(newUser)
                    }

                })
            }
        })

    } else {
        return next(badRequest())
    }
};

AuthController.login = async (req, res, next) => {
    passport.authenticate('local', _onPassportAuth.bind(this, req, res, next))(req, res, next);
};


module.exports = AuthController;