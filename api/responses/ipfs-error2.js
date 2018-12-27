/**
 * ipfs-error.js
**/

module.exports = function ipfsError2() {

    var res, result;
    
    res = this.res;

    result = {
        status: 405,
        message: 'Error uploading the file to IPFS, the server is not connected to ipfs daemon or internal server error'
    };
  
    return res.status(405).json(result);
};
