module.exports = {

  friendlyName: 'Get count',

  description: 'Get a number of blocks',

  inputs: {
    skip: {
      type: 'number'
    },
    limit: {
      type: 'number'
    },
  },

  exits: {
    blocksNotFound: {
      responseType: 'not-found',
      description: 'No se encontraron bloques.'
    },
  },

  fn: async function (inputs, exits) {
    // Search the blocks
    let blocks = await Block.find()
    .skip(inputs.skip)
    .limit(inputs.limit)
    .sort('timestamp DESC');
    
    if (!blocks) throw 'blocksNotFound';
    
    return exits.success(blocks);
  }

};