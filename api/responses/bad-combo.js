/**
 * bad-combo.js
**/

module.exports = function badCombo() {

    var res, result;
    
    res = this.res;

    result = {
        status: 400,
        message: 'Invalid data provided'
    };
  
    return res.status(400).json(result);
};
