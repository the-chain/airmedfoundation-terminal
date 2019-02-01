module.exports = function(req, res, proceed) {
  if (req.secure) 
    return proceed();
  else
    res.redirect('https://' + req.headers.host + req.url);
};
