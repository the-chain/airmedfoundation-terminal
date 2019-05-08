var rp = require('request-promise');
//var host = "http://localhost"
var host = "http://127.0.0.1"

module.exports = {
    /**
     * @async
     * @param {Object} blockInfo 
     * @description Save block to the database
     */
    async createBlock(blockInfo){
        console.log("Creating block #"+blockInfo.number);
        var options = {
            method: 'POST',
            uri: host + '/block',
            body: {
                hash: blockInfo.hash,
                previousHash: blockInfo.previous_hash,
                dataHash: blockInfo.data_hash,
                id: blockInfo.number,
                timestamp: blockInfo.timestamp
            },
            json: true // Automatically stringifies the body to JSON
        };
        await rp(options);
    },
    /**
     * @async
     * @param {Object} transaction Object 
     * @description Create transactions
     */
    async createTransaction(transaction){
        var options = {
            method: 'POST',
            uri: host + '/transaction',
            body: {
                id: transaction.id,
                timestamp: transaction.timestamp,
                channel: transaction.channel,
                type: transaction.type,
                creator: transaction.creator,
                chaincodeName: transaction.chaincode.name,
                chaincodeVersion: transaction.chaincode.version,
                imputsArgs: transaction.inputArgs,
                peerEndorsment: transaction.peerEndorsment,
                block: transaction.block,
                number: transaction.number,
                last: transaction.last,
                status: transaction.status
            },
            json: true
        };
        await rp(options);
    },
    /**
     * @async 
     * @param {Object} key
     * @description Create key-out
     */
    async createKeyIn(key){
        var options = {
            method: 'POST',
            uri: host + '/key-in',
            body: {
                keys: key.keys,
                transaction: key.id
            },
            json: true
        };   
        await rp(options); 
    },
    /**
     * @async 
     * @param {Object} key
     * @description Create key-out
     */
    async createKeyOut(key){
        var options = {
            method: 'POST',
            uri: host + '/key-out',
            body: {
                keys: key.keys,
                transaction: key.id
            },
            json: true
        };   
        await rp(options); 
    },
    /**
     * @async
     * @param {Number} blockNumber Block number
     * @description Get block by id 
     */
    async getBlockByNumber(blockNumber){
        const options = {
            uri: host+'/block/id/'+blockNumber.toString()
        }
        var result = await rp(options);
        return result; 
    },
    /**
     * @async
     * @description Get number of blocks in the database
     */
    async getTotalBlocks(){
        const options = {
            uri: host+'/gettotal'
        }
        var result = await rp(options);
        return result;
    },

    /**
     * @async
     * @param {Number} blockNumber Block number
     * @description Delete block by number
     */
    async deleteBlock(blockNumber){

    }
}