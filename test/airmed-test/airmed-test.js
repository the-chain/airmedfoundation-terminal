var fs = require('fs');
var chai = require('chai');
var should = require('chai').should();
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp)
const url = 'localhost';
module.exports = {
    uploadFileTest () {
        describe('Upload file test', function(){
            it('Should upload a file', function(done){
                chai.request(url)
                    .post('/medical-file')
                    .type('multipart/form-data')
                    .field('imageName','TEST')
                    .field('encrypt','false')
                    .field('receiverPublicKey','')
                    .field('senderPrivateKey','')
                    .attach('imageFile', fs.readFileSync('./test/airmed-test/files/test1.jpg'), 'testImage')
                    .then(function(res){
                        expect(res.body.hash).to.be.equal('QmejZcwERLuZJ5uUu4AUaPQVnPHHFhsoVeBGnTsBrXreMS');
                        expect(res.status).to.be.equal(200);
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    })
            });
        });
    },
    uploadEncryptedFileTest(){
        describe('Upload encrypted file test', function(){
            it('Should upload a encrypted file', function(done){
                const privKey = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCeWdJQkFBSmhBTENidXF5ZU05K0R6R1JTN2FxYmQwMUFNZU1vM291OTJVVE4zMDFUYVlRVmxYRThxTFB0CmROVWFnck1OM2VnTFZPMzJsMFk5UkppV1h3NWJHMEQ2VHhISE9LTWxJeTlna3RpbFlKcHZuaDdsMXpDZlJ6eTcKYmN4Zm9TeEwzb2NSTXdJREFRQUJBbUI2S0UxMzVybTBxZ0p2aGxqMFFETEdFVmd3YXUxOE5TWWFqRmdmc1Vsegoza1lQSEVrSW8zL0RnMkhTSGc1VzJiYU94YXZwS29aSkdLTVAzUEtLOGVzT2N1RTBKUnA0ZkNxdEcwcjl2ZkhCCk5vb2R5R25SVnNlTWY0SXAzRS92MHlrQ01RRG9zRWI4Z3hHVS81QlZRWkI4UHFCV2t1ZU1LV1I0Q1pFRDhsZ2YKTTg2MXFHRzcyekt3bGRnRHU3WU53TWROMExVQ01RRENUU3ZhS3NtMXhPQ3dxWjdmcURkVHlPbHFaSnR0bnhWWApSWnFZVmJURmkxblE4R0ZkTlZTZUR4aUN1QTVaMDBjQ01HRnFNejNSN1pGd2NNK1FsRm0vcWthMFYrWHhDbFBLCnhZQmVmQkFNRTNVdjJrTFlZTjlXekVtNzAxcnNvMFBycFFJd1ZGYXBCVDd6WlVuNitkUDJtVUJzRzVzbTdqNlQKVk1icnZZRUI5TU9tL3VSWTdSK2FNNW8xaTVJajRvSEFBTzk3QWpFQTFqVXJaZUplVlJtb0pMWll2UXBLaVVRcAphbW9hWUMvRE1FT2JBeVBiNWY5c25oTE9EK2FYSTJqTU9zLzFtQ2U2Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==';
                const pubKey =  'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBTENidXF5ZU05K0R6R1JTN2FxYmQwMUFNZU1vM291OQoyVVROMzAxVGFZUVZsWEU4cUxQdGROVWFnck1OM2VnTFZPMzJsMFk5UkppV1h3NWJHMEQ2VHhISE9LTWxJeTlnCmt0aWxZSnB2bmg3bDF6Q2ZSenk3YmN4Zm9TeEwzb2NSTXdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==';
                chai.request(url)
                    .post('/medical-file')
                    .type('multipart/form-data')
                    .field('imageName','TEST')
                    .field('encrypt','true')
                    .field('receiverPublicKey',pubKey)
                    .field('senderPrivateKey',privKey)
                    .attach('imageFile', fs.readFileSync('./test/airmed-test/files/test1.jpg'), 'testImage')
                    .then(function(res){
                        expect(res.status).to.be.equal(200);
                        expect(res.body.transactionHash).to.have.lengthOf(64);
                        should.exist(res.body.hash);
                        res.body.hash.should.have.lengthOf(128).and.to.be.a('string');
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    })
            });
        });
    },
    downloadFileTest() {
        describe('Download file test', function(){
            it('Should download a file', function(done){
                chai.request(url)
                    .get('/medical-file')
                    .query({ipfsHash: 'QmejZcwERLuZJ5uUu4AUaPQVnPHHFhsoVeBGnTsBrXreMS', encrypted: false, secretKey: ''})
                    .then(function(res){
                        expect(res.status).to.be.equal(200);
                        done()
                    }) 
                    .catch(function(err){
                        done(err);
                    });
            });
        });
    },
    downloadEncryptedFileTest(){
        describe('Download encrypted file test', function(){
            it('Should download a encrypted file', function(done){
                const privKey = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCeWdJQkFBSmhBTENidXF5ZU05K0R6R1JTN2FxYmQwMUFNZU1vM291OTJVVE4zMDFUYVlRVmxYRThxTFB0CmROVWFnck1OM2VnTFZPMzJsMFk5UkppV1h3NWJHMEQ2VHhISE9LTWxJeTlna3RpbFlKcHZuaDdsMXpDZlJ6eTcKYmN4Zm9TeEwzb2NSTXdJREFRQUJBbUI2S0UxMzVybTBxZ0p2aGxqMFFETEdFVmd3YXUxOE5TWWFqRmdmc1Vsegoza1lQSEVrSW8zL0RnMkhTSGc1VzJiYU94YXZwS29aSkdLTVAzUEtLOGVzT2N1RTBKUnA0ZkNxdEcwcjl2ZkhCCk5vb2R5R25SVnNlTWY0SXAzRS92MHlrQ01RRG9zRWI4Z3hHVS81QlZRWkI4UHFCV2t1ZU1LV1I0Q1pFRDhsZ2YKTTg2MXFHRzcyekt3bGRnRHU3WU53TWROMExVQ01RRENUU3ZhS3NtMXhPQ3dxWjdmcURkVHlPbHFaSnR0bnhWWApSWnFZVmJURmkxblE4R0ZkTlZTZUR4aUN1QTVaMDBjQ01HRnFNejNSN1pGd2NNK1FsRm0vcWthMFYrWHhDbFBLCnhZQmVmQkFNRTNVdjJrTFlZTjlXekVtNzAxcnNvMFBycFFJd1ZGYXBCVDd6WlVuNitkUDJtVUJzRzVzbTdqNlQKVk1icnZZRUI5TU9tL3VSWTdSK2FNNW8xaTVJajRvSEFBTzk3QWpFQTFqVXJaZUplVlJtb0pMWll2UXBLaVVRcAphbW9hWUMvRE1FT2JBeVBiNWY5c25oTE9EK2FYSTJqTU9zLzFtQ2U2Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==';
                const encryptedHash = 'Lv/pFf+/vMixfeiofd6OeRYZDIiyFN9xTb/evob3JX9j4CKDD5Us7CWl0qKk0Z60nGSvK92ySpn9Uxq8Sn6ckF8zSTNegr64fG0hUOny8NX3mr/W6a8hS44RTfT06cxz';
                chai.request(url)
                    .get('/medical-file')
                    .query({ipfsHash: encryptedHash, encrypted: true, secretKey: privKey})
                    .then(function(res){
                        expect(res.status).to.be.equal(200);
                        done();
                    }) 
                    .catch(function(err){
                        done(err);
                    });
            });
        });        
    },
    getIdentityTest(){
        describe('Create new identity test', function(){
            it('Should create a new identity', function(done){
                chai.request(url)
                    .get('/new-identity')
                    .then(function(res){
                        should.exist(res.body.publicKey);
                        should.exist(res.body.secretKey);
                        res.body.publicKey.should.have.lengthOf(300).and.to.be.a('string');
                        res.body.secretKey.length.should.to.be.above(919);
                        res.body.secretKey.length.should.to.be.below(925);
                        res.body.secretKey.should.be.a('string');
                        expect(res.status).to.be.equal(200);
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    });
            });
        });
    },
    recoveryIdentityTest(){
        describe('Recovery public key test', function(){
            it('Should return a public key', function(done){
                const privKey = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCeWdJQkFBSmhBTENidXF5ZU05K0R6R1JTN2FxYmQwMUFNZU1vM291OTJVVE4zMDFUYVlRVmxYRThxTFB0CmROVWFnck1OM2VnTFZPMzJsMFk5UkppV1h3NWJHMEQ2VHhISE9LTWxJeTlna3RpbFlKcHZuaDdsMXpDZlJ6eTcKYmN4Zm9TeEwzb2NSTXdJREFRQUJBbUI2S0UxMzVybTBxZ0p2aGxqMFFETEdFVmd3YXUxOE5TWWFqRmdmc1Vsegoza1lQSEVrSW8zL0RnMkhTSGc1VzJiYU94YXZwS29aSkdLTVAzUEtLOGVzT2N1RTBKUnA0ZkNxdEcwcjl2ZkhCCk5vb2R5R25SVnNlTWY0SXAzRS92MHlrQ01RRG9zRWI4Z3hHVS81QlZRWkI4UHFCV2t1ZU1LV1I0Q1pFRDhsZ2YKTTg2MXFHRzcyekt3bGRnRHU3WU53TWROMExVQ01RRENUU3ZhS3NtMXhPQ3dxWjdmcURkVHlPbHFaSnR0bnhWWApSWnFZVmJURmkxblE4R0ZkTlZTZUR4aUN1QTVaMDBjQ01HRnFNejNSN1pGd2NNK1FsRm0vcWthMFYrWHhDbFBLCnhZQmVmQkFNRTNVdjJrTFlZTjlXekVtNzAxcnNvMFBycFFJd1ZGYXBCVDd6WlVuNitkUDJtVUJzRzVzbTdqNlQKVk1icnZZRUI5TU9tL3VSWTdSK2FNNW8xaTVJajRvSEFBTzk3QWpFQTFqVXJaZUplVlJtb0pMWll2UXBLaVVRcAphbW9hWUMvRE1FT2JBeVBiNWY5c25oTE9EK2FYSTJqTU9zLzFtQ2U2Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==';
                chai.request(url)
                    .post('/recovery-key')
                    .type('multipart/form-data')
                    .field('privateKey',privKey)
                    .then(function(res){
                        expect(res.status).to.be.equal(200);
                        should.exist(res.body.publicKey);
                        res.body.publicKey.should.have.lengthOf(300).and.to.be.a('string');
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    });
            });
        });
    },
    getFilesTest(){
        describe('Get files by identity', function(){
            it('Should return an object', function(done){
                const pubKey =  'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBTENidXF5ZU05K0R6R1JTN2FxYmQwMUFNZU1vM291OQoyVVROMzAxVGFZUVZsWEU4cUxQdGROVWFnck1OM2VnTFZPMzJsMFk5UkppV1h3NWJHMEQ2VHhISE9LTWxJeTlnCmt0aWxZSnB2bmg3bDF6Q2ZSenk3YmN4Zm9TeEwzb2NSTXdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==';
                chai.request(url)
                    .get('/get-files')
                    .query({key: pubKey})
                    .then(function(res){
                        expect(res.status).to.be.equal(200);
                        should.exist(res.body.userSender);
                        expect(res.body.userSender).to.be.an('object');
                        done();
                    })
                    .catch(function(err){
                        done(err);
                    });
            });
        });
    },
}