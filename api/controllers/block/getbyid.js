module.exports = {

    friendlyName: 'Get',
  
    description: 'Get block.',
  
    inputs: {
      id: {
        type: 'number'
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
      let block = await Block.find({ id: inputs.id }).limit(1);

      if (!block) throw 'blockNotFound';
      
      return exits.success(block[0]);
  
    }
  
  };