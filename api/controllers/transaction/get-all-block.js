module.exports = {

  friendlyName: 'Get all block',

  description: 'Get all transaction of block.',

  inputs: {
    id: {
      type: 'string',
      maxLength: 64
    }
  },

  exits: {
    transactionsNotFound: {
      responseType: 'not-found',
      description: 'No se encontro la transaccion.'
    },
  },


  fn: async function (inputs, exits) {
    // Search the transactions
    let transactions = await Transaction.find({ owner: inputs.id });

    if (!transactions) throw 'transactionsNotFound';

    return exits.success(transactions);

  }

};