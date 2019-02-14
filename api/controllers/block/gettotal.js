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
      let total = await Block.count();
      return exits.success(total);
    }
  
  };