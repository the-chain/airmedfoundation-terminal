const ursa = require('ursa');

module.exports = {
    /**
     * @description Encrypt IPFS hash
     * @param {String} pem PUBLIC KEY 
     * @param {String} hash IPFS HASH
     * @returns {String} Return encrypted hash
     */
    async encryptIpfsHash(pem, hash) {
        var publicKey = ursa.createPublicKey(pem,'base64');
        return publicKey.encrypt(hash,'utf8','base64');
    }
}