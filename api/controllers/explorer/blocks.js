module.exports = {

    friendlyName: 'Blocks',
  
    description: 'Blockchain explorer blocks',

    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'explorer/blocks'
      },
      notFound: {
        responseType: 'view',
        viewTemplatePath: '404'
      },
    },
  
  
    fn: async function (inputs, exits) {
      let blocks = await Block.find()
      .populate('transactions')
      .sort('timestamp DESC');;
  
      if (blocks.length == 0) throw 'notFound';
  
      return exits.success({
        blocksInfo: blocks
      });
  
    }
  
  };