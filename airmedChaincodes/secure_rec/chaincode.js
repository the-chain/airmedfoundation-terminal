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

  // SecureRec V1.1 - Prescription functions
  async createPrescription(stub, args){
    // args[0] = patient, args[1] = doctor, args[2] = ipfsHash
    if ( args.length != 3 )
      throw new Error('Incorrect number of arguments. Expecting 3');
    
    let test;
    try{
      test = await stub.getState(args[2]);
      test = JSON.parse(test.toString());
    }catch(err){
    }
    if ( test.hash == args[2] )
      throw new Error('Prescriptions exist in the blockchain');
    // Prepare and create prescription
    let prescription = {
      patient: args[0],
      doctor: args[1],
      insurance: '',
      status: 'UNSPENT',
      provider: '',
      hash: args[2]
    }

    await stub.putState(args[2], Buffer.from(JSON.stringify(prescription)));

    // Get and update patient
    let patient = await stub.getState(args[0]+'_prescriptions');
    try{
      patient = JSON.parse(patient.toString());
    }catch(err){
      patient = {
        prescriptions: new Array()
      }
    }
    patient.prescriptions.push(prescription.hash);
    await stub.putState(args[0]+'_prescriptions', Buffer.from(JSON.stringify(patient)));

    // Get and update doctor
    let doctor = await stub.getState(args[1]+'_prescriptions');
    try{
      doctor = JSON.parse(doctor.toString());
    }catch(err){
      doctor = {
        prescriptions: new Array()
      }
    }
    doctor.prescriptions.push(prescription.hash);
    await stub.putState(args[1]+'_prescriptions', Buffer.from(JSON.stringify(doctor)));
  }

  async consumePrescription(stub, args){
    // args[0] = provider, args[1] = prescriptionHash
    if ( args.length != 2 )
      throw new Error('Incorrect number of arguments. Expecting 2');
    // Get and update prescription
    let prescription = await stub.getState(args[1]);
    try{
      prescription = JSON.parse(prescription.toString());
    }catch(err){
      throw new Error('Prescription does not exist');
    }
    if ( prescription.status != 'UNSPENT')
      throw new Error('Prescription status should be UNSPENT');
    if ( prescription.provider != args[0] )
      throw new Error('Incorrect provider');
    prescription.status = 'SPENT';
    await stub.putState(args[1], Buffer.from(JSON.stringify(prescription)));
    
    // Get and update pharmacy
    let provider = await stub.getState(prescription.provider+'_prescriptions');
    try{
      provider = JSON.parse(provider.toString());
    }catch(err){
      provider = {
        prescriptions: new Array()
      }
    }
    provider.prescriptions.push(prescription.hash);
    await stub.putState(prescription.provider+'_prescriptions', Buffer.from(JSON.stringify(provider)));

    // Get and update insurance
    if ( prescription.insurance.length > 0) {
      let insurance = await stub.getState(prescription.insurance+'_prescriptions');
      try{
        insurance = JSON.parse(insurance.toString());
      }catch(err){
        insurance = {
          prescriptions: new Array()
        }
      }
      insurance.prescriptions.push(prescription.hash);
      await stub.putState(prescription.insurance+'_prescriptions', Buffer.from(JSON.stringify(insurance)));
    }
  }

  async updatePrescription(stub, args){
    // args[0] = patient, args[1] = provider, args[2] = insurance,  args[3] = prescriptionHash
    if ( args.length != 4 )
      throw new Error('Incorrect number of arguments. Expecting 4');
    // Get and update prescription
    let prescription = await stub.getState(args[3]);
    try{
      prescription = JSON.parse(prescription.toString());
    }catch(err){
      throw new Error('Prescription does not exist');
    }
    if ( prescription.status != 'UNSPENT')
      throw new Error('Prescription status should be UNSPENT');
    if ( prescription.patient != args[0] )
      throw new Error('Incorrect patient');
    prescription.provider = args[1];
    prescription.insurance = args[2];

    await stub.putState(args[3], Buffer.from(JSON.stringify(prescription)));
  }

  async deletePrescription(stub, args){
    // args[0] = doctor, args[1] = ipfsHash
    if ( args.length != 2 )
      throw new Error('Incorrect number of arguments. Expecting 2');
    // Get and update prescription
    let prescription = await stub.getState(args[1]);
    try{
      prescription = JSON.parse(prescription.toString());
    }catch(err){
      throw new Error('Prescription does not exist');
    }
    if ( prescription.status != 'UNSPENT')
      throw new Error('Prescription status should be UNSPENT');
    if ( prescription.doctor != args[0])
      throw new Error('Only the doctor who created the prescription can delete it');
    prescription.status = 'DELETED';
    await stub.putState(args[1], Buffer.from(JSON.stringify(prescription)));
  }

  async queryPrescription(stub,args){
    if ( args.length != 1 )
      throw new Error('Incorrect number of arguments. Expecting 1');
    let prescription = await stub.getState(args[0]);
    try{
      prescription = JSON.parse(prescription.toString());
    }catch(err){
      throw new Error('Prescription does not exist');
    }
    return Buffer.from(JSON.stringify(prescription));
  }

  async queryPrescriptions(stub, args){
    // args[0] = A user.
    if ( args.length != 1 )
      throw new Error('Incorrect number of arguments. Expecting 1');
    let user = await stub.getState(args[0]+'_prescriptions');
    try{
      user = JSON.parse(user.toString());
    }catch(err){
      return Buffer.from(JSON.stringify({}))
    }
    let response = {
      prescriptions: new Array()
    }
    for ( let i = 0; i < user.prescriptions.length; i ++ ) {
      let prescription = await stub.getState(user.prescriptions[i]);
      response.prescriptions.push(JSON.parse(prescription.toString()));
    }
    return Buffer.from(JSON.stringify(response));
  }
}

shim.start(new Chaincode());