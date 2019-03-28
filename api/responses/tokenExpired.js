/**
 * tokenExpired.js
**/

module.exports = function tokenExpired() {

    var res, result;
    
    res = this.res;

    result = {
        status: 401,
        message: 'The verify email was expired, a new verify email was sended'
    };
  
    return res.status(401).json(result);
};
