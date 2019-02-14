module.exports = {

  friendlyName: 'Get',

  description: 'Get block.',

  inputs: {
    hash: {
      type: 'string',
      maxLength: 64
    }
  },

  exits: {
    blockNotFound: {
      responseType: 'not-found',
      description: 'No se encontro el bloque.'
    },
  },

  fn: async function (inputs, exits) {
    // Search the block
    let block = await Block.findOne({ hash: inputs.hash });

    if (!block) throw 'blockNotFound';
    
    return exits.success(block);

  }

};