module.exports = {

  friendlyName: 'New',

  description: 'New block.',

  inputs: {
    hash: {
      type: 'string',
      maxLength: 64
    },

    previousHash: {
      type: 'string',
      maxLength: 64
    },

    dataHash: {
      type: 'string',
      maxLength: 64
    },

    id: {
      type: 'number',
    },

    timestamp: {
      type: 'number',
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
    if(inputs.hash === undefined || inputs.previousHash === undefined || inputs.dataHash === undefined || inputs.id === undefined || inputs.timestamp === undefined) 
      throw 'invalid';

    // Create the new block
    let newBlock = await Block.create(Object.assign({
      hash: inputs.hash,
      previousHash: inputs.previousHash,
      dataHash: inputs.dataHash,
      id: inputs.id,
      timestamp: inputs.timestamp
    }))
    .intercept('E_UNIQUE', 'conflict')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return exits.success(newBlock);

  }


};
