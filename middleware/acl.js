module.exports = function checkRoleWithPassport(roles, passport, strategy, opts){
    return function(req, res, next){
        passport.authenticate(strategy, opts, function(err, user, info){
            if(err) res.status(403).send('Not allowed');
            else if(!user) res.status(403).send('Not allowed');
            else{
                if(roles.length === 0){
                    req.user=user;
                    next();
                }
                else if(roles.includes(user.role)){
                    req.user=user;
                    next();
                }
                else
                    res.status(403).send('Not allowed')
            }
        })(req, res, next)
    }
};



