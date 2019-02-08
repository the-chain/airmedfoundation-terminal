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
     * @description Get total number of blocks in the ledger
     */
    async startSync(channelName, mspId, peerNumber) {
        // Leer la cantidad de bloques de la base de datos y
        // la cantidad de bloques de la cadena. Si son iguales, no hacer nada.
        
        console.log(await ledgerQuery.ledgerHeight(channelName,mspId,peerNumber));
    }
}