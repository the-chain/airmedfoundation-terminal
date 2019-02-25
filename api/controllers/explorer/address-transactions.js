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
      let result = await sails.sendNativeQuery('SELECT * FROM transaction cross join json_array_elements_text("imputsArgs") where value in ($1)', [ inputs.id ]);
  
      let transactions = result.rows;

      if (transactions.length == 0) throw 'notFound';
  
      return exits.success({
        transactions: transactions,
        address: inputs.id
      });
  
    }
  
  };