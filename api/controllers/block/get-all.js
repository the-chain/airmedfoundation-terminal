module.exports = {

  friendlyName: 'Get all',

  description: 'Get all blocks',

  exits: {
    blocksNotFound: {
        responseType: 'not-found',
        description: 'No se encontraron bloques.'
    },
  },

  fn: async function (inputs, exits) {
    // Search the blocks
    let blocks = await Block.find({
      select: ['hash', 'previousHash', 'dataHash', 'blockId', 'timestamp']
    });

    if (!blocks) throw 'blocksNotFound';
  
    return exits.success(blocks);
  }

};