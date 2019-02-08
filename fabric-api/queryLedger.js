var Client = require('fabric-client');
var Channel = require('fabric-client').Channel;
var client = Client.loadFromConfig("./fabric-api/config/configfile.yaml");


module.exports = {
    /**
     * @async
     * @param {String} channelName Channel name
     * @param {String} mspId  MSPID Of the organization (Org1MSP)
     * @param {Number} peerNumber Peer number (e.g 0 , 1, 2, ..)
     * @description Get ledger info
     */
    async queryInfo (channelName, mspId, peerNumber) {
        var channel = new Channel (channelName, client);
        info = await channel.queryInfo(client.getPeersForOrg(mspId)[peerNumber],true);
        return info;
    },
    /**
     * @async
     * @param {String} channelName Name of the channel
     * @param {String} mspId MSPID of the organization
     * @param {Number} peerNumber Peer number (e.g 0 , 1, 2, ..)
     * @param {String} hash Hash of the transaction
     * @description Query transaction by hash
     */
    async getTransactionByHash(channelName, mspId, peerNumber, hash){
        var channel = new Channel(channelName,client);
        var transaction = await channel.queryTransaction(hash, client.getPeersForOrg(mspId)[peerNumber], true);
        return transaction;
    },
    /**
     * @async
     * @param {String} channelName Channel name
     * @param {String} mspId  MSPID Of the organization (Org1MSP)
     * @param {Number} peerNumber Peer number (e.g 0 , 1, 2, ..)
     * @description Get total number of blocks in the ledger
     */
    async ledgerHeight (channelName, mspId, peerNumber){
        var channel = new Channel (channelName, client);
        info = await channel.queryInfo(client.getPeersForOrg(mspId)[peerNumber],true);
        return info.height.low;
    },
    /**
     * @async
     * @param {String} channelName Channel name
     * @param {String} mspId  MSPID Of the organization (Org1MSP)
     * @param {Number} peerNumber Peer number (e.g 0 , 1, 2, ..)
     * @param {Number} blockNumber Block number (e.g 0, 1 , 2 , ... 15, etc);
     * @description Get block info by his number
     */
    async queryBlock(channelName, mspId, peerNumber, blockNumber){
        var channel = new Channel ( channelName, client );
        var result = await channel.queryBlock(blockNumber, client.getPeersForOrg(mspId)[peerNumber], true);
        return result;
    },
    /**
     * @async
     * @param {String} channelName Channel name
     * @param {String} mspId  MSPID Of the organization (Org1MSP)
     * @param {Number} peerNumber Peer number (e.g 0 , 1, 2, ..)
     * @param {Buffer} blockHash Block Hash
     * @description Get block by his hash
     */
    async queryBlockByHash(channelName, mspId, peerNumber, blockHash) {
        var channel = new Channel ( channelName, client);
        var result = await channel.queryBlockByHash(blockHash,client.getPeersForOrg(mspId)[peerNumber],true);
        return result;
    },
    /**
     * @async
     * @param {String} channelName Channel name
     * @param {String} mspId  MSPID Of the organization (Org1MSP)
     * @param {Number} peerNumber Peer number (e.g 0 , 1, 2, ..)
     * @param {String} txId Transaction ID
     * @description Get block by transaction
     */
    async queryBlockByTxID(channelName, mspId, peerNumber, txId){
        var channel = new Channel ( channelName, client);
        var result = await channel.queryBlockByTxID(txId,client.getPeersForOrg(mspId)[peerNumber],true);
        return result;
    }
}