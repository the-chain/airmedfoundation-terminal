module.exports = {

  friendlyName: 'New',

  description: 'New keyIn.',

  inputs: {
    keys: {
      type: 'json',
    },

    transaction: {
      type: 'string',
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
    if(inputs.keys === undefined || inputs.transaction === undefined) 
      throw 'invalid';

    // Create the new keyIn
    let newKeyIn = await KeyIn.create(Object.assign({
      keys: inputs.keys,
      transaction: inputs.transaction
    }))
    .intercept('E_UNIQUE', 'conflict')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return exits.success(newKeyIn);

  }

};
