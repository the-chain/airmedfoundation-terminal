module.exports = {

  friendlyName: 'Get count',

  description: 'Get a number of transactions',

  inputs: {
    skip: {
      type: 'number'
    },
    limit: {
      type: 'number'
    },
  },

  exits: {
    transactionsNotFound: {
      responseType: 'not-found',
      description: 'No se encontraron transacciones.'
    },
  },

  fn: async function (inputs, exits) {
    // Search the transactions
    let transactions = await Transaction.find()
    .populate('block')
    .skip(inputs.skip)
    .limit(inputs.limit)
    .sort('timestamp DESC');

    if (!transactions) throw 'transactionsNotFound';

    return exits.success(transactions);

  }


};
