module.exports = {

    friendlyName: 'Transactions',
  
    description: 'Blockchain explorer transactions',

    exits: {
      success: {
        responseType: 'view',
        viewTemplatePath: 'explorer/transactions'
      },
      notFound: {
        responseType: 'view',
        viewTemplatePath: '404'
      },
    },
  
  
    fn: async function (inputs, exits) {
      let transactions = await Transaction.find();
  
      if (transactions.length == 0) throw 'notFound';
  
      return exits.success({
        transactions: transactions
      });
  
    }
  
  };