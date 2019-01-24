var Client = require('fabric-client');
var Channel = require('fabric-client').Channel;
var client = Client.loadFromConfig("./fabric-api/config/configfile.yaml");


module.exports = {
    /**
     * 
     * @param {String} channelName Channel name
     * @param {String} mspId MSPID of the organization
     * @param {String} chaincodeId Chaincode name
     * @param {String} fcn  Function (query, delete, invoke ... ) 
     * @param {Array} args String array that have the arguments of the function
     * @description Create transaction that modify the state of the ledger
     */
    async invokeTransaction(channelName, mspId, chaincodeId, fcn, args){
        var channel = new Channel(channelName, client);
        let tx_id = client.newTransactionID(true);
        let chaincodeInvokeRequest = {
            targets: client.getPeersForOrg(mspId),
            chaincodeId: chaincodeId,
            txId: tx_id,
            fcn: fcn,
            args: args
        }
        var result = await channel.sendTransactionProposal(chaincodeInvokeRequest, 60000);
        if(result[0][0].response.status != 200){
            return result[0][0].response;
        }
        let transactionRequest = {
            txId: tx_id,
            proposal: result[1],
            proposalResponses: result[0]
        }
        var invoke = await channel.sendTransaction(transactionRequest, 60000);
        invoke.hash = tx_id.getTransactionID();
        return (invoke);
    },
    /**
     * @param {String} channelName Channel name
     * @param {String} mspId MSPID Of the organization
     * @param {String} chaincodeId Chaincode name
     * @param {String} fcn Function (query, delete, invoke ... )
     * @param {Array} args String array that have the arguments of the function
     * @description Read state of the chaincode 
     */
    async queryChaincode(channelName,mspId,chaincodeId,fcn,args) {
        var channel = new Channel(channelName,client);
        let ChaincodeQueryRequest = {
            targets: client.getPeersForOrg(mspId),
            chaincodeId: chaincodeId,
            fcn: fcn,
            args: args
        }
        var result = await channel.queryByChaincode(ChaincodeQueryRequest,true);
        return result;
    }
}