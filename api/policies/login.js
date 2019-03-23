module.exports = function(req, res, proceed) {
    if (req.session.auth === undefined ) {
        return res.redirect('/services/secure-rec');
    }
    return proceed();
};
  