var ledgerQuery = require('../fabric-api/queryLedger');
var httpClient = require('./api/httpApi');
var status = require('../fabric-api/tools/transactionStatus');
var block = require('./create-block');

module.exports = {
    /**
     * @async
     * @param {String} channelName Channel name
     * @param {String} mspId  MSPID Of the organization (Org1MSP)
     * @param {Number} peerNumber Peer number (e.g 0 , 1, 2, ..)
     * @description 
     */
    async startSync(channelName, mspId, peerNumber) {
        console.log("Start sync process");
        // Leer la cantidad de bloques de la base de datos y la blockchain
        const totalBlocks = +await httpClient.getTotalBlocks();
        const ledgerHeight = await ledgerQuery.ledgerHeight(channelName,mspId,peerNumber);
        // Caso 1: Comenzar desde 0.
        if (totalBlocks == 0) {
            console.log("Sync the database from Block #1");
            await this.syncDataBaseFromBlock(channelName, mspId, peerNumber, 0, ledgerHeight);
            return;
        }
        
        // Caso 2: Esta actualizada la base de datos
        if (totalBlocks == ledgerHeight){
            console.log("The database is updated.");
            return;
        }

        // Caso 3: Hay mas bloques en la BD que en la blockchain
        if ( totalBlocks > ledgerHeight ){
            console.log("The database does not match the blockchain. Error #1");
            await this.dropDatabase(totalBlocks);
            await this.syncDataBaseFromBlock(channelName, mspId, peerNumber, 0, ledgerHeight);
            throw new Error("The database does not match the blockchain");
        }

        // Caso #4: Actualizar la base de datos
        const lastBlockBD = JSON.parse(await httpClient.getBlockByNumber(totalBlocks));
        const lastBlockDBinLedger = await ledgerQuery.queryBlock(channelName,mspId,peerNumber,totalBlocks-1);
        if (lastBlockBD.dataHash == lastBlockDBinLedger.header.data_hash ) {
            console.log("Sync the database from Block #" + totalBlocks.toString());
            await this.syncDataBaseFromBlock(channelName,mspId,peerNumber,totalBlocks,ledgerHeight);
            return;
        }

        // Caso #5: Drop Database y comenzar desde 0
        console.log("The database does not match the blockchain. Error #2");
        await this.dropDatabase(totalBlocks);
        //await this.syncDataBaseFromBlock(channelName, mspId, peerNumber, 0, ledgerHeight);
        throw new Error("The database does not match the blockchain");
    },
    async syncDataBaseFromBlock(channelName, mspId, peerNumber, blockNumber, ledgerHeight){
        console.log("Starting database synchronization from block #" + (blockNumber+1).toString());
        for ( i = blockNumber; i < ledgerHeight; i++ ){
            var newBlock = await ledgerQuery.queryBlock(channelName,mspId,peerNumber,parseInt(i));
            await block.createBlock(newBlock);
        }
    },
    async dropDatabase(totalBlocks){
        console.log("Dropping database");
    }
}