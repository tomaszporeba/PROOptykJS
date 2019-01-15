const jwt = require('jsonwebtoken');
const jwtConfig= require('../auth');
const _ = require('underscore');

module.exports = {

    /**
     * Create a token based on the passed user
     * @param user
     */
    createToken: function (user) {
        const payload ={user:{id: user.id, email: user.email, role:user.Role.name}};

        return jwt.sign({
                payload
            },
            jwtConfig.jwtSettings.secret,
            {
                algorithm: jwtConfig.jwtSettings.algorithm,
                expiresIn: jwtConfig.jwtSettings.expiresInSeconds,
                issuer: jwtConfig.jwtSettings.issuer,
                audience: jwtConfig.jwtSettings.audience
            }
        );
    }
};
