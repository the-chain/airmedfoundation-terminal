/**
 * invalidPassword.js
**/

module.exports = function invalidPassword() {

    var res, result;
    
    res = this.res;

    result = {
        status: 400,
        message: 'Invalid password'
    };
  
    return res.status(400).json(result);
};
