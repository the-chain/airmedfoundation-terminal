var Client = require('fabric-client');
var Channel = require('fabric-client').Channel;
var client = Client.loadFromConfig("./fabric-api/config/configfile.yaml");


module.exports = {
    async startListener(channelName){
        var channel = new Channel(channelName,client);
        const eventHub = channel.newChannelEventHub(client.getPeersForOrg('Org1MSP')[0]);
        block_reg = eventHub.registerBlockEvent((block) => {
            console.log('Successfully received the block event');
            console.log(block);
        }, (error)=> {
            console.log('Failed to receive the block event ::'+error);
        });
        eventHub.connect(true);
    }
}