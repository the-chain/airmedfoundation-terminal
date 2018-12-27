/**
 * not-found.js
**/

module.exports = function notFound() {

    var res, result;
    
    res = this.res;

    result = {
        status: 404,
        message: 'No se pudieron encontrar los recursos.'
    };
  
    return res.status(404).json(result);
};
