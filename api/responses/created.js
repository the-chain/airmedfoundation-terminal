/**
 * created.js
**/

module.exports = function created() {

    var res, result;
    
    res = this.res;

    result = {
        status: 201,
        message: 'The resource was created correctly.'
    };
  
    return res.json(result);
};
