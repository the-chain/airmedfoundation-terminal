var Client = require('fabric-client');
var Channel = require('fabric-client').Channel;
var client = Client.loadFromConfig("./fabric-api/config/configfile.yaml");
var httpClient = require('./api/httpApi');
var ledgerQuery = require('../fabric-api/queryLedger');

module.exports = {
    async startListener(channelName, mspId, peerNumber){
        var channel = new Channel(channelName,client);
        const eventHub = channel.newChannelEventHub(client.getPeersForOrg(mspId)[peerNumber]);
        block_reg = eventHub.registerBlockEvent(async (block) => {
            try{
                await this.createBlock(block);
            }catch(err){
                console.log(err);
            }
        }, (error)=> {
            console.log('Failed to receive the block event ::'+error);
        });
        eventHub.connect(true);
    },
    async createBlock(block){
        let blockInfo = {
            hash: await ledgerQuery.getBlockHash(block.header),
            number: parseInt(block.header.number)+1,
            timestamp: Date.parse(block.data.data[0].payload.header.channel_header.timestamp),
            previous_hash: block.header.previous_hash,
            data_hash: block.header.data_hash
        }
        // Create block
        await httpClient.createBlock(blockInfo);
        var N = block.data.data.length;
        for ( j = 0; j < N; j++ ){
            let Transaction = {};
            Transaction.block = blockInfo.number;
            Transaction.number = j;
            Transaction.timestamp = Date.parse(block.data.data[j].payload.header.channel_header.timestamp);
            Transaction.channel = block.data.data[j].payload.header.channel_header.channel_id;
            Transaction.id = block.data.data[j].payload.header.channel_header.tx_id;
            if ( Transaction.id == "")
                Transaction.id = blockInfo.hash;
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
            Transaction.inputArgs = [];
            try {
                var totalArgs = block.data.data[j].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args.length;
                for ( k = 0; k < totalArgs; k++)
                    Transaction.inputArgs.push(block.data.data[j].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args[k].toString('utf8'));
            }catch(err){
                Transaction.inputArgs = [];
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
            if ( j == N-1 ){
                Transaction.last = true;
            }else{
                Transaction.last = false;
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
}