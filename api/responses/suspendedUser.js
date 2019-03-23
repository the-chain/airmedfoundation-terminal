/**
 * suspendedUser.js
**/

module.exports = function suspendedUser() {

    var res, result;
    
    res = this.res;

    result = {
        status: 401,
        message: 'Suspended user'
    };
  
    return res.status(401).json(result);
};
