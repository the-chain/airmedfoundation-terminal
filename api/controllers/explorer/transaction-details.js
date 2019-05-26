module.exports = {

    friendlyName: 'Transaction details',
  
    description: 'Blockchain explorer transaction details',
  
    inputs: {
      hash: {
        type: 'string',
        maxLength: 64
      }
    },
  
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'explorer/transaction-details'
      },
      notFound: {
        responseType: 'view',
        viewTemplatePath: '404'
      },
    },
  
    fn: async function (inputs, exits) {
      let transaction = await Transaction.findOne({ id: inputs.hash })
      .populate('read')
      .populate('write')

      if (!transaction) throw 'notFound';
  
      return exits.success({
        transaction: transaction
      });
  
    }
  
  };