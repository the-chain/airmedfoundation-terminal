module.exports = async function (req, res, proceed) {
    var host = '::ffff:66.42.87.100';
    if (req.connection.remoteAddress == host)
        return proceed();
    return res.forbidden();
  };
