const ursa = require('ursa');

module.exports = {
    async generateKeys () {
        keys = ursa.generatePrivateKey(256+512, 65537);
        let key = {
            publicKey: keys.toPublicPem('base64'), 
            secretKey: keys.toPrivatePem('base64')
        }
        return key;
    },
    /**
     * @description Get public key from private key
     * @param {String} pem Private key
     * @returns Public key base64 (String)
     */
    async getPublicKey(pem){
        var key = ursa.createPrivateKey(pem,undefined,'base64')
        return key.toPublicPem('base64');
    },
    /**
     * @description Encrypt IPFS Hash
     * @param {String} pem PUBLIC KEY 
     * @param {String} hash IPFS HASH
     * @returns {String} Return encrypted hash in BASE64
     */
    async encryptIpfsHash(pem, hash) {
        var publicKey = ursa.createPublicKey(pem,'base64');
        return publicKey.encrypt(hash,'utf8','base64');
    },
    /**
     * @description Decrypt IPFS Hash
     * @param {String} pem PRIVATE KEY
     * @param {String} hash IPFS HASH ENCRYPTED
     * @returns {String} REturn IPFS Hash decrypted in UTF8
     */
    async decryptIpfsHash(pem, hash){
        var privateKey = ursa.createPrivateKey(pem,undefined,'base64');
        return privateKey.decrypt(hash, 'base64','utf8');
    },
    /**
     * @description Validate public key
     * @param {String} pem Public key
     * @returns Bool false/true
     */
    async isPublicKey(pem){
        try {
            await ursa.createPublicKey(pem,'base64');
        }catch(err){
            return false;
        }
        return true;
    },
    /**
     * @description Validate private key
     * @param {String} pem Private Key
     * @returns Bool false/true
     */
    async isPrivateKey(pem){
        try {
            await ursa.createPrivateKey(pem,undefined,'base64');
        }catch(err){
            return false;
        }
        return true; 
    },
    /**
     * @description Validate public key, throw error on false
     * @param {String} pem 
     */
    async assertPublicKey(pem){
        return ursa.assertPublicKey(ursa.createPublicKey(pem,'base64'));
    },
    /**
     * @description Validate private key, throw error on false
     * @param {String} pem 
     */
    async assertPrivateKey(pem){
        return ursa.assertPrivateKey(ursa.createPrivateKey(pem,undefined,'base64'));
    }
}