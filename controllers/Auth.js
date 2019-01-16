const passport = require('passport');
const generator = require('generate-password');
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();
let AuthController = {};
const CipherService = require('../services/CipherService');
const User = require('../models').User;

async function _onPassportAuth(req, res, error, user, info) {
    if (error) return res.status(500).json({
        message: 'Server error',
        user   : user
    });
    if (!user) return res.status(401).json({
        message: 'Unauthorized'
    });


    try {
        if (user != null) {
            const token= CipherService.createToken(user);
            let userFiltered = {
                id: user.id,
                email: user.email,
                name: user.name,
                birthday: user.birthday,
                image_url: user.image_url,
                token: "JWT " + token
            };

            return res.send(userFiltered)
        } else {
            return res.status(401).json({
                message: 'Account not found',
                user   : user
            });
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
                return res.status(406).json({
                    message: 'Email is already taken'
                });
            }
            else {
                User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    roleId: 1,
                    active: true
                }).then(function (newUser, created) {

                    if (!newUser) {
                        res.status(500).json({
                            message: 'Server error'
                        });
                    }

                    if (newUser) {
                        return res.send(newUser)
                    }

                })
            }
        })

    } else {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
};

AuthController.login = async (req,res,next) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email != null && password != null) {

        let user = await User.findOne({where:{
                email: email}
        });

        if (!user) return res.status(400).json({
            message: 'Login failed'
        });

        if (user.active) {
            passport.authenticate('local',
                _onPassportAuth.bind(this, req, res))(req, res);
        } else {
            return res.status(400).json({
                message: 'user is unactive',
                user   : user
            });
        }

    } else {
        return res.status(500).json({
            message: 'Bad request',
        });
    }
};


module.exports = AuthController;