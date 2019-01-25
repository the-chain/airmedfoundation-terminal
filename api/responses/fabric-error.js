/**
 * fabric-error.js
**/

module.exports = function fabricError() {

    var res, result;
    
    res = this.res;

    result = {
        status: 500,
        message: 'SERVER ERROR - HYPERLEDGER FABRIC'
    };
  
    return res.status(500).json(result);
};
