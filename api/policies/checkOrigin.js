module.exports = async function (req, res, proceed) {
    var host = '::ffff:127.0.0.1';
    if (req.connection.remoteAddress == host)
        return proceed();
    return res.forbidden();
  };