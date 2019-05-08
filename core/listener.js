var Client = require('fabric-client');
var Channel = require('fabric-client').Channel;
var client = Client.loadFromConfig("./fabric-api/config/configfile.yaml");
var block = require('./create-block');

module.exports = {
    async startListener(channelName, mspId, peerNumber){
        var channel = new Channel(channelName,client);
        const eventHub = channel.newChannelEventHub(client.getPeersForOrg(mspId)[peerNumber]);
        block_reg = eventHub.registerBlockEvent(async (newBlock) => {
            try{
                await block.createBlock(newBlock);
            }catch(err){
                console.log(err);
            }
        }, (error)=> {
            console.log('Failed to receive the block event ::'+error);
        });
        eventHub.connect(true);
    }
}