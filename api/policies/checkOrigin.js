module.exports = async function (req, res, proceed) {
    console.log(req.method);
    console.log(req.originalUrl);
    var host = '127.0.0.1';
    if (req.hostname == host )
        return proceed();
    return res.forbidden();
  };