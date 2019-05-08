var httpClient = require('./api/httpApi');
var ledgerQuery = require('../fabric-api/queryLedger');
var status = require('../fabric-api/tools/transactionStatus');

module.exports = {
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
            try{
                Transaction.status = await status.getTransactionStatusString(block.metadata.metadata[2][j]);
            }catch(err){
                Transaction.status = await status.getTransactionStatusString(254);
            }
            Transaction.block = blockInfo.number;
            Transaction.number = j;
            Transaction.timestamp = Date.parse(block.data.data[j].payload.header.channel_header.timestamp);
            Transaction.channel = block.data.data[j].payload.header.channel_header.channel_id;
            Transaction.id = block.data.data[j].payload.header.channel_header.tx_id;
            if ( Transaction.id == "")
                Transaction.id = blockInfo.data_hash;
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
                var firstArg = block.data.data[j].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args[0];
                if ( firstArg == 'deploy' || firstArg == 'upgrade'){
                    Transaction.inputArgs.push(firstArg);
                }else{
                var totalArgs = block.data.data[j].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args.length;
                for ( k = 0; k < totalArgs; k++) 
                    Transaction.inputArgs.push(block.data.data[j].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args[k].toString('utf8'));
                }
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
            var a,M,tempKey = [];
            try {
                M = block.data.data[j].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset.length;
                for ( a = 0; a < M; a++ )
                    tempKey = tempKey.concat(block.data.data[j].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[a].rwset.reads);
            }catch(err){tempKey = null}
            // Create key in
            if ( tempKey != null)
                for ( t = 0; t < tempKey.length; t++ )
                    await httpClient.createKeyIn({id: Transaction.id, keys: tempKey[t]});
            tempKey = [];
            try{
                M = block.data.data[j].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset.length;
                for ( a = 0; a < M; a++ )
                    tempKey = tempKey.concat(block.data.data[j].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[a].rwset.writes);
            }catch(err){tempKey = null}
            // Create keys out
            if ( tempKey != null)
                for ( t = 0; t < tempKey.length; t++ ) 
                    await httpClient.createKeyOut({id: Transaction.id, keys: tempKey[t]});
        }
    }
}