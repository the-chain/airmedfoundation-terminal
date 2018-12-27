/**
 * success.js
**/

module.exports = function success() {

    var res, result;
    
    res = this.res;

    result = {
        status: 200,
        message: 'Ok.'
    };
  
    return res.json(result);
};
