/**
 * data-exist.js
**/

module.exports = function dataExist() {

    var res, result;
    
    res = this.res;

    result = {
        status: 401,
        message: 'The user exist'
    };
  
    return res.status(401).json(result);
};
