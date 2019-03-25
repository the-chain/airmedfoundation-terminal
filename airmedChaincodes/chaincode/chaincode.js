const shim = require('fabric-shim');

var Chaincode = class {

  // Initialize the chaincode
  async Init(stub) {
      // Nothing to do
      return shim.success('Good!');
  }
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    let method = this[ret.fcn];
    if (!method) {
      console.log('no method of name:' + ret.fcn + ' found');
      return shim.success();
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }
  async sendHash(stub, args) {
      if ( args.length != 3) {
        throw new Error('Incorrect number of arguments. Expecting 3');
      }
      // Get sender
      let userSender = await stub.getState(args[0]);
      try{
          userSender = JSON.parse(userSender.toString());
      }catch(err){
        userSender = {
          hashSent: [],
          hashReceived: []
        }
      }
      // Save sender info
      userSender.hashSent.push({to: args[1], hash: args[2]});
      if ( args[0] != args[1] ) {
        await stub.putState(args[0], Buffer.from(JSON.stringify(userSender)));
        // Get receiver
        let userReceiver = await stub.getState(args[1]);
        try{
          userReceiver = JSON.parse(userReceiver.toString());
        }catch(err){
          userReceiver = {
            hashSent: [],
            hashReceived: []
          } 
        }
        // Save receiver info
        userReceiver.hashReceived.push({from: args[0], hash: args[2]});
        await stub.putState(args[1], Buffer.from(JSON.stringify(userReceiver)));
      }else{
        // Save receiver info
        userSender.hashReceived.push({from: args[0], hash: args[2]});
        await stub.putState(args[1], Buffer.from(JSON.stringify(userSender)));
      }
  }

  async query (stub, args){
    if ( args.length != 1) {
        throw new Error('Incorrect number of arguments. Expecting 1');
    }
    // Get user
    let user = await stub.getState(args[0]);
    return user;
  }
}

shim.start(new Chaincode());