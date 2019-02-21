var sync = require('./sync');
var listen = require('./listener')
const slp = require('sleep');


async function start() {
    //while(true){
        try {
            await sync.startSync('mychannel','Org1MSP',0);
            await listen.startListener('mychannel', 'Org1MSP',0);
        }catch(err){
            console.log(err);
            console.log("Trying again in few second");
            slp.sleep(10);
        }
    //}
}

start();