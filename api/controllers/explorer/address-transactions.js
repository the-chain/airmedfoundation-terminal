module.exports = {

    friendlyName: 'Address transactions',
  
    description: 'Blockchain explorer address transactions',
  
    inputs: {
      id: {
        type: 'string'
      }
    },
  
    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'explorer/address-transactions'
      },
      notFound: {
        responseType: 'view',
        viewTemplatePath: '404'
      },
    },
  
  
    fn: async function (inputs, exits) {
      let transactions;
      
      transactions = await Transaction.find({ 
        // select: ['id', 'block', 'timestamp', 'imputsArgs'],
        // or: [{ 'imputsArgs.args[1]': inputs.id }, { 'imputsArgs.args[2]': inputs.id } ]
      });
  
      if (transactions.length == 0) throw 'notFound';
  
      return exits.success({
        transactions: transactions,
        address: inputs.id
      });
  
    }
  
  };