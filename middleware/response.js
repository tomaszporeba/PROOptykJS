module.exports = function (err, req, res, next) {

    return res.status(err.code).json({
        message: err.message
    });

};