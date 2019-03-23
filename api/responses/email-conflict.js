/**
 * email-conflict.js
**/

module.exports = function emailConflict() {

    var res, result;
    
    res = this.res;

    result = {
        status: 409,
        message: 'The email provided is already in use. Please try again with another email.'
    };
  
    return res.status(409).json(result);
};
