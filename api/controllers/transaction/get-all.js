module.exports = {

  friendlyName: 'Get all',

  description: 'Get all transactions',

  exits: {
    transactionsNotFound: {
        responseType: 'not-found',
        description: 'No se encontraron transacciones.'
    },
  },

  fn: async function (inputs, exits) {
    // Search the transactions
    let transactions = await Transaction.find().populate('block');

    if (!transactions) throw 'transactionsNotFound';

    return exits.success(transactions);
  }

};