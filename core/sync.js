var Client = require('fabric-client');
var Channel = require('fabric-client').Channel;
var ledgerQuery = require('../fabric-api/queryLedger');
var client = Client.loadFromConfig("./fabric-api/config/configfile.yaml");
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
        // Leer la cantidad de bloques de la base de datos y
        // la cantidad de bloques de la cadena. Si son iguales, no hacer nada.
        const totalBlocks = 10 // Total de bloques que tiene la base de datos CAMBIAR
        const ledgerHeight = await ledgerQuery.ledgerHeight(channelName,mspId,peerNumber);
        // Si son distintos, entonces verificar los hashes de cada bloque
        if (totalBlocks == 0) {
            console.log("Sync the database from Block #0");
            await this.syncDataBaseFromBlock(channelName, mspId, peerNumber, 0, ledgerHeight);
            return;
        }
        if (totalBlocks == ledgerHeight){
            console.log("The database is updated.")
            return;
        }
        // Ultimo bloque de la base de datos CAMBIAR
        const lastBlockBD = "UltimoBloque" ;
        // Ultimo bloque de la cadena de bloques
        const lastBlockDBinLedger = await ledgerQuery.queryBlock(channelName,mspId,peerNumber,totalBlocks-1);
        if ( lastBlockBD.header.previous_hash == lastBlockDBinLedger.header.previous_hash &&
            lastBlockBD.header.data_hash == lastBlockDBinLedger.header.data_hash ) {
                console.log("Sync the database from Block #" + totalBlocks.toString());
            await this.syncDataBaseFromBlock(channelName,mspId,peerNumber,totalBlocks,ledgerHeight);
            return;
        }
        // Si la base de datos no coincide, entonces comienza desde 0, reemplazando toda la información por la actual
        console.log("The database does not match the blockchain");
        await this.dropDatabase(totalBlocks);
        await this.syncDataBaseFromBlock(channelName, mspId, peerNumber, 0, ledgerHeight);
        return;
    },
    async syncDataBaseFromBlock(channelName, mspId, peerNumber, blockNumber, ledgerHeight){
        console.log("Starting database synchronization from block #" + blockNumber.toString());
    },
    async dropDatabase(totalBlocks){
        console.log("Dropping database");
    }
}