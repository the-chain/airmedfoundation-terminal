var transactions = require('../../fabric-api/chaincodeTransactions');
var expect = require('chai').expect;

module.exports = {
    async invoqueTransaction () {
        describe('invoqueTransaction', function(){
            it('Should invoke a transaction chaincode', function(done) {
                let args = [
                    'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBUEF6ZkgrQ2VmVjVDVWtUYWc0OWg4NDduVERCb1JFMQp4WjluY3Z2M0d5eEtXLzdtWEVsTUZxQzdTT29KdHVFSWRKZzRnNlhhOXpqMTBlODg0TXowMFVYVmhFMGV3U3VQCk9CVGJwN1NCT0RPdDY0ejNaN1NWRkV4aEFEejFNQllnMXdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==',
                    'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBTlJRUkZzWDd0VHdmdWFqWnZpaU1qTVV4RDlrQU9VUQpxdHkzTVZWK2dTVll5Wk9GYkx0elIrZ0xDMGxpeW1oQjQvNHg1eWFHK2NsNlJ0eGdrOGFSYVk0TjliQldzeThOCmRXbmUrSWpPWGNsTk5DRXc0bWduVlhlYkJxeGlsT1JMSndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==',
                    'dA67odsajEGWPkIcvcblEn0flEgcQt7hwWIiaUUhrJRhH0Wrap1hGK8dS/3Z2Cvlf6GOYBoAP7RNvMiYstnKDM2UNb7M+j0hUup9yWTnEaJx8ELl+oyNmAd/rPbF9PGg'
                ];
                transactions.invokeTransaction('mychannel','Org1MSP','airmed','sendHash',args)
                .then(function(result){
                    done();
                })
                .catch(function(err){
                    done(err);
                });

            });
        });
    },
    async queryChaincode (){
        describe('queryChaincode', function(){
            it('Should query a transaction chaincode', function(done){
                let args = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBUEF6ZkgrQ2VmVjVDVWtUYWc0OWg4NDduVERCb1JFMQp4WjluY3Z2M0d5eEtXLzdtWEVsTUZxQzdTT29KdHVFSWRKZzRnNlhhOXpqMTBlODg0TXowMFVYVmhFMGV3U3VQCk9CVGJwN1NCT0RPdDY0ejNaN1NWRkV4aEFEejFNQllnMXdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==';
                transactions.queryChaincode('mychannel','Org1MSP','airmed','query',[args])
                .then(function(result){
                    expect((result[0].toString()).includes('Error')).to.not.be.true;
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
        });
    }
}