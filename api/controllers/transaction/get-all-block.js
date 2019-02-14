module.exports = {

  friendlyName: 'Get all block',

  description: 'Get all transaction of block.',

  inputs: {
    hash: {
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
    let transactions = await Transaction.find({ transaction: inputs.hash });

    if (!transactions) throw 'transactionsNotFound';

    return exits.success(transactions);

  }

};