/**
 * Passport configuration file where you should configure strategies
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models').User;
const Role = require('../models').Role;
const EXPIRES_IN_SECONDS =  60 * 60 * 24 * 30;
const SECRET = process.env.tokenSecret || "tZTKmsqRaACzpDSsZ6dtbQqwFCa6PU3I";
const ALGORITHM = "HS256";
const ISSUER = "prooptyk.pl";
const AUDIENCE = "prooptyk.pl";

/**
 * Configuration object for local strategy
 */
const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
const JWT_STRATEGY_CONFIG = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: SECRET,
    issuer : ISSUER,
    audience: AUDIENCE,
    passReqToCallback: false
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {

    User.findOne({where:{email:email},include: [Role]})
        .then(user => {
            if (!user) return next(null, false, {
                code: 'E_USER_NOT_FOUND',
                message: email + ' is not found'
            });
            else if (!user.validPassword(password)) {
                return next(null, false, {
                    code: 'E_WRONG_PASSWORD',
                    message: 'Password is wrong'
                });
            }

            return next(null, user, {});
        })
        .catch(error => {
            return next(error, false, {});
        })
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
    const user = payload.payload.user;
    return next(null, user, {});
}

passport.use(
    new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
    new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
    expiresInSeconds: EXPIRES_IN_SECONDS,
    secret: SECRET,
    algorithm : ALGORITHM,
    issuer : ISSUER,
    audience : AUDIENCE
};

