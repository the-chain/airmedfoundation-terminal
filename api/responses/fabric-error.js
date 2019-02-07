/**
 * fabric-error.js
**/

module.exports = function fabricError() {

    var res, result;
    
    res = this.res;

    result = {
        status: 500,
        message: 'Internal server error. Peer connection timeout expired. Please try later'
    };
  
    return res.status(500).json(result);
};
