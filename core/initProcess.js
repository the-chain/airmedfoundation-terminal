var sync = require('./sync');
var listen = require('./listener')
const slp = require('sleep');


module.exports = {
    async start() {
        try {
        await sync.startSync('mychannel','Org1MSP',0);
        }catch(err){
            console.log(err);
            console.log("Trying again in few second");
            slp.sleep(5);
            await this.start();
        }
        //await listen.startListener('mychannel');
    }
}
