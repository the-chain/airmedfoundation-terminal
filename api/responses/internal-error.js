/**
 * internal-error.js
**/

module.exports = function internalError() {

    var res, result;
    
    res = this.res;

    result = {
        status: 500,
        message: 'Internal Error'
    };
  
    return res.status(500).json(result);
};
