/**
 * fabric-invalid.js
**/

module.exports = function fabricInvalid() {

    var res, result;
    
    res = this.res;

    result = {
        status: 400,
        message: 'Invalid data provided. Please check inputs again'
    };
  
    return res.status(400).json(result);
};
