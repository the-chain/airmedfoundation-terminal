module.exports = function(req, res, proceed) {
    if (req.session.auth.providerType !== 'pharmacy')
        return res.redirect('/services/secure-rec/dashboard');
    return proceed();
};