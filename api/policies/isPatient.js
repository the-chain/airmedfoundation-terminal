module.exports = function(req, res, proceed) {
    if (req.session.auth.type !== 'patient')
        return res.redirect('/services/secure-rec/dashboard');
    return proceed();
};