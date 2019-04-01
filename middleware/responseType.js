module.exports.accountNotFound = (code, message) => {
    return {
        code: code || 403,
        message: message || 'Account or password is incorrect'
    }
};

module.exports.takenEmail = (code, message) => {
    return {
        code: code || 406,
        message: message || "Email is already taken"
    }
}

module.exports.unauthorized = (code, message) => {
    return {
        code: code || 401,
        message: message || 'Missing or invalid authentication token'
    }
};

module.exports.accountNotActivated = (code, message) => {
    return {
        code: code || 406,
        message: message || 'Account not yet activated'
    }
};

module.exports.forbidden = (code, message) => {
    return {
        code: code || 403,
        message: message || 'Forbidden'
    }
};

module.exports.badRequest = (code, message) => {
    return {
        code: code || 400,
        message: message || 'Bad request'
    }
};

module.exports.temporaryPasswordIncorrect = (code, message) => {
    return {
        code: code || 409,
        message: message || 'Temporary password is incorrect'
    }
};

module.exports.temporaryPasswordExpired = (code, message) => {
    return {
        code: code || 409,
        message: message || 'Temporary password is expired'
    }
};

module.exports.temporaryPasswordGenerated = (code, message) => {
    return {
        code: code || 409,
        message: message || 'Temporary password is generated'
    }
};

module.exports.serverError = (code, message) => {
    return {
        code: code || 500,
        message: message || 'Server Error'
    }
};

module.exports.notAuthorized = (code, message) => {
    return {
        code: code || 401,
        message: message || 'Not authorized'
    }
};