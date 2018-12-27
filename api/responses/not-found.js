/**
 * not-found.js
**/

module.exports = function notFound() {

    var res, result;
    
    res = this.res;

    result = {
        status: 404,
        message: 'The resources could not be found'
    };
  
    return res.status(404).json(result);
};
