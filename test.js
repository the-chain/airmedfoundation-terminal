var ipfs = require('./test/ipfs-test/ipfs-test');
var fabric = require('./test/fabric-test/fabric-test');
var crypto = require('./test/crypto/key-test');
// IPFS TEST
describe('InterPlanetary Filesystem API TEST', function() {
    ipfs.testDownloadAsync();
    ipfs.testDownloadCallback();
    ipfs.testUploadFromBuffer();
    ipfs.testUploadFromPath();
});
// Hyperledger Test
describe('Hyperledger Fabric API TEST', function(){
    this.timeout(60000);
    fabric.invoqueTransaction();
    fabric.queryChaincode();
});
// Crypto key test (Ursa Library)
describe('Crypto Library test', function(){
    crypto.generateKeyTest();
    crypto.getPublicKeyTest();
    crypto.isPublicKeyTest();
    crypto.isPrivateKeyTest();
    crypto.encryptHashTest();
    crypto.decryptHashTest();
    crypto.assertPublicKeyTest();
    crypto.assertPrivateKeyTest();
});