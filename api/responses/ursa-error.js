/**
 * ursa-error.js
**/

module.exports = function ursaError() {

    var res, result;
    
    res = this.res;

    result = {
        status: 400,
        message: 'Error. The provided public key is not valid'
    };
  
    return res.status(400).json(result);
};
