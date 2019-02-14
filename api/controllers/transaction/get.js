module.exports = {

  friendlyName: 'Get',

  description: 'Get transaction.',

  inputs: {
    hash: {
      type: 'string',
      maxLength: 64
    }
  },

  exits: {
    transactionNotFound: {
      responseType: 'not-found',
      description: 'No se encontro la transaccion.'
    },
  },

  fn: async function (inputs, exits) {
    // Search the transaction
    let transaction = await Transaction.findOne({ id: inputs.hash }).populate('block');

    if (!transaction) throw 'transactionNotFound';

    return exits.success(transaction);

  }

};