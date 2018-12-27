/**
 * unauthorized.js
**/

module.exports = function unauthorized() {
    
    var res, result;
    
    res = this.res;

    result = {
        status: 401,
        message: 'No estas autorizado para realizar esta acción.'
    };
  
    return res.status(401).json(result);
  
  };
  