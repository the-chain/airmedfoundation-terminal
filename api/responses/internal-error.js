/**
 * internal-error.js
**/

module.exports = function internalError() {

    var res, result;
    
    res = this.res;

    result = {
        status: 500,
        message: 'Error interno.'
    };
  
    return res.status(500).json(result);
};
