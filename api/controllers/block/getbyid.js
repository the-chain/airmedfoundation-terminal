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
      let block = await Block.findOne({ id: inputs.id });

      if (!block) throw 'blockNotFound';
      
      return exits.success(block);
  
    }
  
  };