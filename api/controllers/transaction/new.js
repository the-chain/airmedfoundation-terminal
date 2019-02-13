module.exports = {

  friendlyName: 'New',

  description: 'New transaction.',

  inputs: {
    transactionId: {
      type: 'string',
      maxLength: 64
    },

    timestamp: {
      type: 'number',
    },

    channel: {
      type: 'string',
    },

    type: {
      type: 'string',
    },

    creator: {
      type: 'string',
    },

    chaincodeName: {
      type: 'string',
    },

    chaincodeVersion: {
      type: 'string',
    },

    imputsArgs: {
      type: 'json',
    },

    peerEndorsment: {
      type: 'json',
    },

    owner: {
      type: 'number'
    },
  },

  exits: {
    invalid: {
      responseType: 'bad-combo',
      description: 'Los parámetros proporcionados son inválidos.'
    },

    conflict: {
      responseType: 'conflict',
      description: 'Los parámetros proporcionados no son únicos.'
    },
  },


  fn: async function (inputs, exits) {
    // If one of required parameters is missing
    if(inputs.transactionId === undefined || inputs.timestamp === undefined || inputs.channel === undefined || inputs.type === undefined || inputs.creator === undefined || inputs.chaincodeName === undefined || inputs.chaincodeVersion === undefined || inputs.imputsArgs === undefined || inputs.peerEndorsment === undefined) 
      throw 'invalid';

    // Create the new transaction
    let newTransaction = await Transaction.create(Object.assign({
      transactionId: inputs.transactionId,
      timestamp: inputs.timestamp,
      channel: inputs.channel,
      type: inputs.type,
      creator: inputs.creator,
      chaincodeName: inputs.chaincodeName,
      chaincodeVersion: inputs.chaincodeVersion,
      imputsArgs: inputs.imputsArgs,
      peerEndorsment: inputs.peerEndorsment,
      owner: inputs.owner
    }))
    .intercept('E_UNIQUE', 'conflict')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();
    
    return exits.success(newTransaction);

  }

};
