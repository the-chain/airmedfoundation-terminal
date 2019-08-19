/**
 * ipfs-error.js
**/

module.exports = function ipfsError() {

    var res, result;
    
    res = this.res;

    result = {
        status: 405,
        message: 'Error downloading the file from IPFS, the file does not exist or the server is not connected to ipfs daemon'
    };
  
    return res.status(405).json(result);
};
