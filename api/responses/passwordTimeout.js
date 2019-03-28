/**
 * passwordTimeout.js
**/

module.exports = function passwordTimeout() {

    var res, result;
    
    res = this.res;

    result = {
        status: 401,
        message: 'A password was sended previously, wait till tomorrow to generate a new password'
    };
  
    return res.status(401).json(result);
};
