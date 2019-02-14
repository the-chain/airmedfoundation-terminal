var rp = require('request-promise');
var host = "http://localhost"

module.exports = {
    /**
     * @async
     * @param {Object} blockInfo 
     * @description Save block to the database
     */
    async createBlock(blockInfo){
        console.log("Creating block #"+blockInfo.number);
        return 0;
    },
    /**
     * @async
     * @param {Object} transaction Object array 
     * @description Create transactions
     */
    async createTransaction(transaction){

    },
    /**
     * @async
     * @param {Number} blockNumber Block number
     * @description Delete block by number
     */
    async deleteBlock(blockNumber){

    },
    /**
     * @async
     * @param {Number} blockNumber Block number
     * @description Get block by id 
     */
    async getBlockByNumber(blockNumber){

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
    }
}