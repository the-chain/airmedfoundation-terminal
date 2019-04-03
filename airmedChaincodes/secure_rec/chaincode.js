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
  async sendRegister(stub, args) {
      // Validate number of arguments
      if ( args.length != 2) 
        throw new Error('Incorrect number of arguments. Expecting 2');
      // Validate arguments
      try {
        var Args = JSON.parse(args[1]);
      }catch(err){
        throw new Error('Incorrect arguments. Invalid json provided');
      }
      if ( !args[0] )
        throw new Error('Incorrect arguments. Invalid sender provided');
      // Validate Arrays
      if ( !Args.to.length || !Args.dataHash.length  )
        throw new Error('Incorrect arguments. Some arrays is empty or undefined');
      if ( Args.to.length != Args.dataHash.length && Args.lengt )
        throw new Error('Incorrect arguments. Arrays should be same length');
      if ( !Args.copy )
        throw new Error('Incorrect arguments. copy undefined');
      // Get sender
      let userSender = await stub.getState(args[0]);
      try{
        userSender = JSON.parse(userSender.toString());
      }catch(err){
        userSender={hashSent:[],hashReceived:[], copyToSender: []};
      }
      var i, N = Args.to.length;
      for ( i = 0; i < N; i ++ ){
        userSender.hashSent.push({to: Args.to[i], dataHash: Args.dataHash[i]});
        // For every one receiver
        let userReceiver = await stub.getState(Args.to[i]);
        try{
          userReceiver = JSON.parse(userReceiver.toString());
        }catch(err){
          userReceiver={hashSent:[],hashReceived:[], copyToSender: []};
        }
        userReceiver.hashReceived.push({from: args[0], dataHash: Args.dataHash[i]});
        await stub.putState(Args.to[i], Buffer.from(JSON.stringify(userReceiver)));
      }
      userSender.copyToSender.push(Args.copy);
      await stub.putState(args[0], Buffer.from(JSON.stringify(userSender)));
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