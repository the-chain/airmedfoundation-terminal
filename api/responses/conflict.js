/**
 * conflict.js
**/

module.exports = function conflict() {

    var res, result;
    
    res = this.res;

    result = {
        status: 409,
        message: 'The data provided conflicts with the status of the resource.'
    };
  
    return res.status(409).json(result);
};
