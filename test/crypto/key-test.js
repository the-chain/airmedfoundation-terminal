var ursa = require('../../crypto/keys');
var should = require('chai').should();
var expect = require('chai').expect;

module.exports = {
    generateKeyTest(){
        describe('Generate RSA Key', function(){
            it('Should generate public and private keys', function(done){
                ursa.generateKeys()
                .then(function(data){
                    should.exist(data.publicKey);
                    should.exist(data.secretKey);
                    data.publicKey.should.have.lengthOf(300).and.to.be.a('string');
                    data.secretKey.length.should.to.be.above(919);
                    data.secretKey.length.should.to.be.below(925);
                    data.secretKey.should.be.a('string');
                    done();
                })
                .catch(function(err){
                    done(err);
                })
            });
        })
    },
    getPublicKeyTest(){
        describe('Get Public Key', function(){
            it('Should return a public key', function(done){
                const privateKey = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCekFJQkFBSmhBT0Y5a2hiZm9LU1dPUkJpejNSYzZqM3V5cGFvS1VRYk5rcEhsVnVVRXFvMzlOVjByV1A1CmdZbmswaDUvVDh0bFBmS1J1UGxjdmJQQjNnQkwvRnE1MmwyZ0hpajdENWRlVzBubUlwa2JVVHJ0a1hHKzFVM1UKRWFRaU5mZURNQ2dDZ1FJREFRQUJBbUVBdXFSYmxiOUlrck1kVEtqZEdtNEdIWGxZQ3RmcVFFdGQ1cUhWeU5XSgpsWWQzaW05blRjY3FKOTlVNUpWd2tPU2NrZUdDRnQvNTQ0RzhzSk5uZzR6bEZudmdISFhzS3kzVnUzR0YrdTc0CkdpU2pCSGU3N0VjM2NQdFVqWlVSNUVvQkFqRUErcEtFYWxFWmNJd05Nb0VMMzE3VEtPSDVnTnY5Wmx0TTh1bEwKRXZTZmFsZjBCRnZkejdUN0hHRWRwY3B0eW0yUkFqRUE1bC80QWxPcHdoZnhJUlBWRmowNlUrbmNCRDJtRmxragozMVIvODUwOHIvaVNiUjVuWGZDMWFFaGhCUUhyWG8zeEFqRUFtcEZGSTN3eGtDNmtlWElIUzl2bnNBRnRjcUxCCnRxRTlYMTZ2MDlxWWQvWVhiWlRweUJYaERRbVBTMVVLMHVNeEFqRUF1UlFDb0lQc1R1V0RNQXJKMTFzTFFCMFMKU0VucTQrdHJXV0YraGc0ZGtsWUY5U3BHNnY2V0R4aU84VUh3Z1A5UkFqQVljYkNnWXd5NngyZFBnSnFCNG15RgpHS28rSktoWitvRUlsZlRuWHRLQ3NzSGhUbnhuWmxnRHdPUnpxMTJId05jPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=';
                ursa.getPublicKey(privateKey)
                .then(function(publicKey){
                    should.exist(publicKey);
                    publicKey.should.have.lengthOf(300).and.to.be.a('string');
                    done();
                })
                .catch(function(err){
                    done(err);
                });        
            });
        });
    },
    isPublicKeyTest(){
        describe('Is Public key test', function(){
            it('Should be a public key', function(done){
                const publicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBT0Y5a2hiZm9LU1dPUkJpejNSYzZqM3V5cGFvS1VRYgpOa3BIbFZ1VUVxbzM5TlYwcldQNWdZbmswaDUvVDh0bFBmS1J1UGxjdmJQQjNnQkwvRnE1MmwyZ0hpajdENWRlClcwbm1JcGtiVVRydGtYRysxVTNVRWFRaU5mZURNQ2dDZ1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==';
                ursa.isPublicKey(publicKey)
                .then(function(bool){
                    expect(bool).to.be.true;
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
        });
    },
    isPrivateKeyTest(){
        describe('Is Private key test', function(){
            it('Should be a private key', function(done){
                const privateKey = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCekFJQkFBSmhBT0Y5a2hiZm9LU1dPUkJpejNSYzZqM3V5cGFvS1VRYk5rcEhsVnVVRXFvMzlOVjByV1A1CmdZbmswaDUvVDh0bFBmS1J1UGxjdmJQQjNnQkwvRnE1MmwyZ0hpajdENWRlVzBubUlwa2JVVHJ0a1hHKzFVM1UKRWFRaU5mZURNQ2dDZ1FJREFRQUJBbUVBdXFSYmxiOUlrck1kVEtqZEdtNEdIWGxZQ3RmcVFFdGQ1cUhWeU5XSgpsWWQzaW05blRjY3FKOTlVNUpWd2tPU2NrZUdDRnQvNTQ0RzhzSk5uZzR6bEZudmdISFhzS3kzVnUzR0YrdTc0CkdpU2pCSGU3N0VjM2NQdFVqWlVSNUVvQkFqRUErcEtFYWxFWmNJd05Nb0VMMzE3VEtPSDVnTnY5Wmx0TTh1bEwKRXZTZmFsZjBCRnZkejdUN0hHRWRwY3B0eW0yUkFqRUE1bC80QWxPcHdoZnhJUlBWRmowNlUrbmNCRDJtRmxragozMVIvODUwOHIvaVNiUjVuWGZDMWFFaGhCUUhyWG8zeEFqRUFtcEZGSTN3eGtDNmtlWElIUzl2bnNBRnRjcUxCCnRxRTlYMTZ2MDlxWWQvWVhiWlRweUJYaERRbVBTMVVLMHVNeEFqRUF1UlFDb0lQc1R1V0RNQXJKMTFzTFFCMFMKU0VucTQrdHJXV0YraGc0ZGtsWUY5U3BHNnY2V0R4aU84VUh3Z1A5UkFqQVljYkNnWXd5NngyZFBnSnFCNG15RgpHS28rSktoWitvRUlsZlRuWHRLQ3NzSGhUbnhuWmxnRHdPUnpxMTJId05jPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=';
                ursa.isPrivateKey(privateKey)
                .then(function(bool){
                    expect(bool).to.be.true;
                    done();
                })
                .catch(function(err){
                    done(err);
                })
            });
        });
    },
    encryptHashTest(){
        describe('Encrypt Hash  Test', function(){
            it('Should encrypt ipfs hash', function(done){
                const publicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBT0Y5a2hiZm9LU1dPUkJpejNSYzZqM3V5cGFvS1VRYgpOa3BIbFZ1VUVxbzM5TlYwcldQNWdZbmswaDUvVDh0bFBmS1J1UGxjdmJQQjNnQkwvRnE1MmwyZ0hpajdENWRlClcwbm1JcGtiVVRydGtYRysxVTNVRWFRaU5mZURNQ2dDZ1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==';
                const hash = 'QmaD28EUqLdQMUcnzx8nQaH4WDKgWHY5hX7KsXdHRLN25f';
                ursa.encryptIpfsHash(publicKey,hash)
                .then(function(data){
                    should.exist(data);
                    data.should.have.lengthOf(128).and.to.be.a('string');
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
        });
    },
    decryptHashTest(){
        describe('Decrypt Hash Test', function(){
            it('Should decrpt ipfs hash', function(done){
                const privateKey = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCekFJQkFBSmhBT0Y5a2hiZm9LU1dPUkJpejNSYzZqM3V5cGFvS1VRYk5rcEhsVnVVRXFvMzlOVjByV1A1CmdZbmswaDUvVDh0bFBmS1J1UGxjdmJQQjNnQkwvRnE1MmwyZ0hpajdENWRlVzBubUlwa2JVVHJ0a1hHKzFVM1UKRWFRaU5mZURNQ2dDZ1FJREFRQUJBbUVBdXFSYmxiOUlrck1kVEtqZEdtNEdIWGxZQ3RmcVFFdGQ1cUhWeU5XSgpsWWQzaW05blRjY3FKOTlVNUpWd2tPU2NrZUdDRnQvNTQ0RzhzSk5uZzR6bEZudmdISFhzS3kzVnUzR0YrdTc0CkdpU2pCSGU3N0VjM2NQdFVqWlVSNUVvQkFqRUErcEtFYWxFWmNJd05Nb0VMMzE3VEtPSDVnTnY5Wmx0TTh1bEwKRXZTZmFsZjBCRnZkejdUN0hHRWRwY3B0eW0yUkFqRUE1bC80QWxPcHdoZnhJUlBWRmowNlUrbmNCRDJtRmxragozMVIvODUwOHIvaVNiUjVuWGZDMWFFaGhCUUhyWG8zeEFqRUFtcEZGSTN3eGtDNmtlWElIUzl2bnNBRnRjcUxCCnRxRTlYMTZ2MDlxWWQvWVhiWlRweUJYaERRbVBTMVVLMHVNeEFqRUF1UlFDb0lQc1R1V0RNQXJKMTFzTFFCMFMKU0VucTQrdHJXV0YraGc0ZGtsWUY5U3BHNnY2V0R4aU84VUh3Z1A5UkFqQVljYkNnWXd5NngyZFBnSnFCNG15RgpHS28rSktoWitvRUlsZlRuWHRLQ3NzSGhUbnhuWmxnRHdPUnpxMTJId05jPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=';
                const encryptedHash = 'EeKtNHHzaLIFNx1gi09XFR5RpTSqfoKtZbzT7jnIMJRmu316/PH3JgkSubGB58F9ihsVaPsrIz5+mmHns1+Ww/3rsIKEvzpj8RCZVTR83e9soQTghq/gU+VGdlEl2eZl';
                ursa.decryptIpfsHash(privateKey,encryptedHash)
                .then(function(data){
                    should.exist(data);
                    data.should.to.be.equal('QmaD28EUqLdQMUcnzx8nQaH4WDKgWHY5hX7KsXdHRLN25f');
                    done();
                })
                .catch(function(err){
                    done(err);
                });
            });
        });
    },
    assertPublicKeyTest(){
        describe('Assert public key test', function(){
            it('Should throw if not a public key', function(done){
                const publicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUh3d0RRWUpLb1pJaHZjTkFRRUJCUUFEYXdBd2FBSmhBT0Y5a2hiZm9LU1dPUkJpejNSYzZqM3V5cGFvS1VRYgpOa3BIbFZ1VUVxbzM5TlYwcldQNWdZbmswaDUvVDh0bFBmS1J1UGxjdmJQQjNnQkwvRnE1MmwyZ0hpajdENWRlClcwbm1JcGtiVVRydGtYRysxVTNVRWFRaU5mZURNQ2dDZ1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==';
                ursa.assertPublicKey(publicKey)
                .then(function(bool){
                    done();
                })
                .catch(function(err){
                    done(err);
                })
            });
        });
    },
    assertPrivateKeyTest(){
        describe('Assert private key test', function(){
            it('Should throw if not a private key', function(done){
                const privateKey = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCekFJQkFBSmhBT0Y5a2hiZm9LU1dPUkJpejNSYzZqM3V5cGFvS1VRYk5rcEhsVnVVRXFvMzlOVjByV1A1CmdZbmswaDUvVDh0bFBmS1J1UGxjdmJQQjNnQkwvRnE1MmwyZ0hpajdENWRlVzBubUlwa2JVVHJ0a1hHKzFVM1UKRWFRaU5mZURNQ2dDZ1FJREFRQUJBbUVBdXFSYmxiOUlrck1kVEtqZEdtNEdIWGxZQ3RmcVFFdGQ1cUhWeU5XSgpsWWQzaW05blRjY3FKOTlVNUpWd2tPU2NrZUdDRnQvNTQ0RzhzSk5uZzR6bEZudmdISFhzS3kzVnUzR0YrdTc0CkdpU2pCSGU3N0VjM2NQdFVqWlVSNUVvQkFqRUErcEtFYWxFWmNJd05Nb0VMMzE3VEtPSDVnTnY5Wmx0TTh1bEwKRXZTZmFsZjBCRnZkejdUN0hHRWRwY3B0eW0yUkFqRUE1bC80QWxPcHdoZnhJUlBWRmowNlUrbmNCRDJtRmxragozMVIvODUwOHIvaVNiUjVuWGZDMWFFaGhCUUhyWG8zeEFqRUFtcEZGSTN3eGtDNmtlWElIUzl2bnNBRnRjcUxCCnRxRTlYMTZ2MDlxWWQvWVhiWlRweUJYaERRbVBTMVVLMHVNeEFqRUF1UlFDb0lQc1R1V0RNQXJKMTFzTFFCMFMKU0VucTQrdHJXV0YraGc0ZGtsWUY5U3BHNnY2V0R4aU84VUh3Z1A5UkFqQVljYkNnWXd5NngyZFBnSnFCNG15RgpHS28rSktoWitvRUlsZlRuWHRLQ3NzSGhUbnhuWmxnRHdPUnpxMTJId05jPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=';
                ursa.assertPrivateKey(privateKey)
                .then(function(bool){
                    done();
                })
                .catch(function(err){
                    done(err);
                })
            });
        });
    }
}