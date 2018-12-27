/**
 * conflict.js
**/

module.exports = function conflict() {

    var res, result;
    
    res = this.res;

    result = {
        status: 409,
        message: 'Los datos proporcionados tienen conflicto con el estado del recurso.'
    };
  
    return res.status(409).json(result);
};
