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
    let block, nBlocks, nTransactions, first, last;
    
    block = await Block.findOne({ id: inputs.id });
    nBlocks = await Block.count();
    nTransactions = await Transaction.count({ block: inputs.id });
    first = false;
    last = false;

    if(block.id == 1) first = true;
    if(block.id == nBlocks) last = true;

    if (!block) throw 'notFound';

    return exits.success({
      blockInfo: block,
      nTransactions: nTransactions,
      first: first,
      last: last
    });

  }

};