var chai = require('chai');
var should = require('chai').should();
var expect = require('chai').expect;
var httpApi = require('../../../core/api/httpApi');

function makeid(length, type) {
    var characters, result= '';
    if (type == 'hash')
        characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    else if (type == 'number')
        characters = '0123456789';
    else
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ )
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

var blockHash = makeid(64,'hash');
var previousHash = makeid(64,'hash');
var dataHash = makeid(64,'hash');
var blockNumber = makeid(4,'number')+150;
var timeStamp = makeid(12,'number');
var transactionHash =  makeid(64,'hash');

module.exports = {
    createBlock: function(){
        describe('Create a new block', function(){
            it('Should create a new block', function(done){
                let newBlock = {
                    hash: blockHash,
                    previous_hash: previousHash,
                    data_hash: dataHash,
                    number: blockNumber,
                    timestamp: timeStamp
                }
                httpApi.createBlock(newBlock)
                .then(function(){done();})
                .catch(function(err){done(err)});
            });
        });
    },
    createTransaction: function(){
        describe('Create a new transaction', function(){
            it('Should create a new transaction', function(done){
                let newTransaction = {
                    id: transactionHash,
                    timestamp: timeStamp,
                    channel: 'mychannel',
                    type: 'ENDORSER_TRANSACTION',
                    creator: 'Org1MSP',
                    chaincode: {
                        name: 'airmed',
                        version: 'v1'
                    },
                    inputArgs: [],
                    peerEndorsment: [],
                    block: blockNumber,
                    number: 0,
                    last: true,
                    status: 'VALID'
                }
                httpApi.createTransaction(newTransaction)
                .then(function(){done()})
                .catch(function(err){done(err)});
            });
        });
    },
    createKeyIn: function(){
        describe('Create a new keyIn', function(){
            it('Should create a new keyIn', function(done){
                let keyin = {
                    id: transactionHash,
                    keys: []
                }
                httpApi.createKeyIn(keyin)
                .then(function(){done();})
                .catch(function(err){done(err)});
            });
        });
    },
    createKeyOut: function(){
        describe('Create a new keyOut', function(){
            it('Should create a new keyOut', function(done){
                let keyout = {
                    id: transactionHash,
                    keys: []
                }
                httpApi.createKeyOut(keyout)
                .then(function(){done();})
                .catch(function(err){done(err)});
            });
        });
    },
    getTotalBlocks: function(){
        describe('Get blockchain length', function(){
            it('Should get blockchain length', function(done){
                httpApi.getTotalBlocks()
                .then(function(result){
                    expect(parseInt(result)).to.be.an('number');
                    done();
                })
                .catch(function(err){ done(err); });
            });
        });
    },
    getBlockByNumber: function(){
        describe('Get a block by number', function(){
            it('Should get a block by number', function(done){
                httpApi.getBlockByNumber(blockNumber)
                .then(function(result){
                    result = JSON.parse(result);
                    expect(result.hash).to.be.equal(blockHash);
                    expect(result.previousHash).to.be.equal(previousHash);
                    expect(result.dataHash).to.be.equal(dataHash);
                    expect(parseInt(result.timestamp)).to.be.an('number');
                    done();
                }).catch(function(err){done(err);});
            });
        });
    }
}