var sync = require('./sync');
var listen = require('./listener')
const slp = require('sleep');


async function start() {
    await sync.startSync('mychannel','Org1MSP',0);
    await listen.startListener('mychannel', 'Org1MSP',0);
}

start();