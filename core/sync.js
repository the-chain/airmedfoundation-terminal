var Client = require('fabric-client');
var Channel = require('fabric-client').Channel;
var ledgerQuery = require('../fabric-api/queryLedger');
var client = Client.loadFromConfig("./fabric-api/config/configfile.yaml");
var httpClient = require('./api/httpApi');

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
        const totalBlocks = await httpClient.getTotalBlocks(); // Total de bloques que tiene la BD
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
        // Ultimo bloque de la base de datos
        const lastBlockBD = await httpClient.getBlockByNumber(totalBlocks);
        // Ultimo bloque de la cadena de bloques
        const lastBlockDBinLedger = await ledgerQuery.queryBlock(channelName,mspId,peerNumber,totalBlocks-1);
        if ( lastBlockBD.header.previous_hash == lastBlockDBinLedger.header.previous_hash &&
            lastBlockBD.header.data_hash == lastBlockDBinLedger.header.data_hash ) {
                console.log("Sync the database from Block #" + totalBlocks.toString());
            await this.syncDataBaseFromBlock(channelName,mspId,peerNumber,totalBlocks,ledgerHeight);
            return;
        }
        // Si la base de datos no coincide, entonces comienza desde 0, 
        // reemplazando toda la información por la actual
        console.log("The database does not match the blockchain");
        await this.dropDatabase(totalBlocks);
        await this.syncDataBaseFromBlock(channelName, mspId, peerNumber, 0, ledgerHeight);
        return;
    },
    async syncDataBaseFromBlock(channelName, mspId, peerNumber, blockNumber, ledgerHeight){
        console.log("Starting database synchronization from block #" + blockNumber.toString());
        for ( i = blockNumber; i < ledgerHeight; i++ ){
            var block = await ledgerQuery.queryBlock(channelName,mspId,peerNumber,i);
            let blockInfo = {
                hash: await ledgerQuery.getBlockHash(block.header),
                number: i,
                timestamp: Date.parse(block.data.data[0].payload.header.channel_header.timestamp),
                previous_hash: block.header.previous_hash,
                data_hash: block.header.data_hash
            }
            // Create block
            await httpClient.createBlock(blockInfo);
            var N = block.data.data.length;
            for ( j = 0; j < N; j++ ){
                let Transaction = {};
                Transaction.block = blockInfo.hash;
                Transaction.number = j;
                Transaction.timestamp = Date.parse(block.data.data[j].payload.header.channel_header.timestamp);
                Transaction.channel = block.data.data[j].payload.header.channel_header.channel_id;
                Transaction.id = block.data.data[j].payload.header.channel_header.tx_id;
                if ( Transaction.id == "")
                    Transaction.id = "0";
                Transaction.type = block.data.data[j].payload.header.channel_header.typeString;
                Transaction.creator = block.data.data[j].payload.header.signature_header.creator.Mspid
                try {
                    Transaction.chaincode = block.data.data[j].payload.data.actions[0].payload.action.proposal_response_payload.extension.chaincode_id;
                }catch(err){
                    Transaction.chaincode = {
                        name: "",
                        version: ""
                    }
                }
                try {
                    Transaction.imputsArgs = {
                        args: []
                    };
                    const totalArgs = block.data.data[j].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args.length;
                    for ( k = 0; k < totalArgs; k++)
                        Transaction.imputsArgs.args.push(block.data.data[j].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args[k].toString('utf8'));
                }catch(err){
                    Transaction.imputsArgs.args = [];
                }
                try {
                    Transaction.peerEndorsment = {
                        peers: []
                    };
                    const totalEnd = block.data.data[j].payload.data.actions[0].payload.action.endorsements.length;
                    for ( k = 0; k < totalEnd ; k++ )
                        Transaction.peerEndorsment.peers.push(block.data.data[j].payload.data.actions[0].payload.action.endorsements[k].endorser.Mspid);
                }catch(err){
                    Transaction.peerEndorsment.peers = [];
                }
                // Create Transaction
                await httpClient.createTransaction(Transaction);
                let key = {
                    id: Transaction.id,
                    keys: {}
                }
                try{
                    const arg = block.data.data[j].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args[0].toString('utf8');
                    if ( arg != 'upgrade' ){
                        key.keys = block.data.data[j].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.reads[0];
                    }
                }catch(err){
                    key.keys = {};
                }
                // Create from chaincode
                await httpClient.createKeyInChaincode(key);
                var tempKey;
                try {
                    tempKey = block.data.data[j].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[0].rwset.reads;
                }catch(err){tempKey = null}
                // Create key in
                if ( tempKey != null)
                    for ( t = 0; t < tempKey.length; t++ )
                        await httpClient.createKeyIn({id: Transaction.id, keys: tempKey[t]});
                
                try{
                    tempKey = block.data.data[j].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[0].rwset.writes;
                }catch(err){tempKey = null}
                // Create keys out
                if ( tempKey != null)
                    for ( t = 0; t < tempKey.length; t++ ) 
                        await httpClient.createKeyOut({id: Transaction.id, keys: tempKey[t]});
            }
        }
    },
    async dropDatabase(totalBlocks){
        console.log("Dropping database");
    }
}