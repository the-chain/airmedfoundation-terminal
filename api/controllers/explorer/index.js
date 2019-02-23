module.exports = {

  friendlyName: 'Blockchain explorer',

  description: 'Blockchain explorer index.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'explorer/index'
    }
  },


  fn: async function (inputs, exits) {
    // Search the blocks
    let blocks = await Block.find()
    .populate('transactions')
    .limit(10)
    .sort('timestamp DESC');

    // Search the transactions
    let transactions = await Transaction.find()
    .limit(10)
    .sort('timestamp DESC');

    // Search the transactions
    let nTransactions = await Transaction.count();
    
    return exits.success({
      blocksInfo: blocks,
      transactions: transactions,
      nTransactions: nTransactions
    });

  }

};
