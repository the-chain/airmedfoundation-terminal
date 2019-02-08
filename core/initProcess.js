var sync = require('./sync');
var listen = require('./listener')


async function start() {
    await sync.startSync('mychannel','Org1MSP',0);
    //await listen.startListener('mychannel');
}

start();
