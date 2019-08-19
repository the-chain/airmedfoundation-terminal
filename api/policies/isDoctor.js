module.exports = function(req, res, proceed) {
    if (req.session.auth.type !== 'doctor')
        return res.redirect('/services/secure-rec/dashboard');
    return proceed();
};