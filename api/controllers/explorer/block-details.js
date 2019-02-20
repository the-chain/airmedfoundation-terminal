module.exports = {

  friendlyName: 'Block details',

  description: 'Blockchain explorer block details',

  inputs: {
    id: {
      type: 'number'
    }
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'explorer/block-details'
    },
    notFound: {
      responseType: 'view',
      viewTemplatePath: '404'
    },
  },

  fn: async function (inputs, exits) {
    let block, nBlocks, first, last;
    
    block = await Block.findOne({ id: (inputs.id + 1) }).populate('transactions');
    nBlocks = await Block.count();
    first = false;
    last = false;

    if (!block) throw 'notFound';

    if(block.id == 1) first = true;

    if(block.id == nBlocks) last = true;

    return exits.success({
      blockInfo: block,
      nTransactions: block.transactions.length,
      first: first,
      last: last
    });

  }

};