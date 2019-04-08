module.exports = {

  friendlyName: 'New',

  description: 'New transaction.',

  inputs: {
    id: {
      type: 'string',
      maxLength: 64
    },

    number: {
      type: 'number'
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

    block: {
      type: 'number'
    },
    last: {
      type: 'bool'
    },
    status: {
      type: 'string'
    }
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
    if( inputs.status === undefined || inputs.last === undefined || inputs.id === undefined || inputs.number === undefined || inputs.timestamp === undefined || inputs.channel === undefined || inputs.type === undefined || inputs.creator === undefined || inputs.chaincodeName === undefined || inputs.chaincodeVersion === undefined || inputs.imputsArgs === undefined || inputs.peerEndorsment === undefined || inputs.block === undefined) 
      throw 'invalid';

    // Create the new transaction
    let newTransaction = await Transaction.create(Object.assign({
      id: inputs.id,
      timestamp: inputs.timestamp,
      channel: inputs.channel,
      type: inputs.type,
      creator: inputs.creator,
      chaincodeName: inputs.chaincodeName,
      chaincodeVersion: inputs.chaincodeVersion,
      imputsArgs: inputs.imputsArgs,
      peerEndorsment: inputs.peerEndorsment,
      block: inputs.block,
      status: inputs.status,
      number: inputs.number
    }))
    .intercept('E_UNIQUE', 'conflict')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();
    if (inputs.last) {
      let block = await Block.findOne({ id: inputs.block }).populate('transactions');
      sails.sockets.blast('entry', {
        verb: 'created',
        data: {
          block: {
            hash: block.hash,
            id: block.id,
            ntransactions: block.transactions.length
          },
          transactions: block.transactions
        }
      });
    }

    return exits.success(newTransaction);

  }

};
