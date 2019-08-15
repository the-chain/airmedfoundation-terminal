process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var ipfs = require('./test/ipfs-test/ipfs-test');
var fabric = require('./test/fabric-test/fabric-test');
var crypto = require('./test/crypto/key-test');
var airmed = require('./test/airmed-test/airmed-test');
var explorer = require('./test/airmed-test/blockchain-explorer/blockchain-explorer');
var secureRecUser = require('./test/secure-rec-test/user');

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
// Airmed Test
describe('Airmed Foundation Test', function(){
    this.timeout(20000);
    airmed.uploadFileTest();
    airmed.uploadEncryptedFileTest();
    airmed.downloadFileTest();
    airmed.downloadEncryptedFileTest();
    airmed.getIdentityTest();
    airmed.recoveryIdentityTest();
    airmed.getFilesTest();
});
// Explorer test
describe("Airmed Foundation Blockchain Explorer Test", function(){
    describe("Blockchain Explorer http API", function(){
        explorer.createBlock();
        explorer.createTransaction();
        explorer.createKeyIn();
        explorer.createKeyOut();
        explorer.getTotalBlocks();
        explorer.getBlockByNumber();
    });
});
// SECURE REC USER TEST
describe('SECURE REC USER TEST', function() {
    this.timeout(200000);
    secureRecUser.newUserPatient();
    secureRecUser.newUserDoctor();
    secureRecUser.newUserInsurance();
    secureRecUser.newUserProviderClinic();
    secureRecUser.newUserProviderPharmacy();
    secureRecUser.newUserProviderLaboratory();
    secureRecUser.login();
    secureRecUser.logout();
    secureRecUser.profile();
    secureRecUser.changePassword();
    secureRecUser.passwordRecovery();
    secureRecUser.newAuthPatientDoctor();
    secureRecUser.newAuthPatientInsurance();
    secureRecUser.newAuthPatientProvider();
    secureRecUser.uploadFile();
    secureRecUser.downloadFile();
    // Prescription test
    secureRecUser.createPrescription();
    secureRecUser.updatePrescription();
    secureRecUser.consumePrescription();
    secureRecUser.deletePrescription();
    secureRecUser.downloadPrescription();
    // Delete Authorization (Secure-rec)
    secureRecUser.deleteAuth();
});