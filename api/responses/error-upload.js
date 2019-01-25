/**
 * upload-error.js
**/

module.exports = function uploadError() {

    var res, result;
    
    res = this.res;

    result = {
        status: 500,
        message: 'Error uploading the file'
    };
  
    return res.status(500).json(result);
};
