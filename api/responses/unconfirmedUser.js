/**
 * unconfirmedUser.js
**/

module.exports = function unconfirmedUser() {

    var res, result;
    
    res = this.res;

    result = {
        status: 401,
        message: 'Unconfirmed user'
    };
  
    return res.status(401).json(result);
};
